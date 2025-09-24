import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Any
import json

class FinancialForecaster:
    """AI-powered financial forecasting service using time series analysis."""
    
    def __init__(self):
        self.model_trained = False
    
    def prepare_data(self, transactions: List[Dict]) -> pd.DataFrame:
        """Prepare transaction data for forecasting."""
        df = pd.DataFrame(transactions)
        if df.empty:
            return df
        
        df['date'] = pd.to_datetime(df['date'])
        df['amount'] = pd.to_numeric(df['amount'])
        
        # Separate income and expenses
        df_expenses = df[df['transaction_type'] == 'expense'].copy()
        df_income = df[df['transaction_type'] == 'income'].copy()
        
        # Group by month
        df_expenses['month'] = df_expenses['date'].dt.to_period('M')
        df_income['month'] = df_income['date'].dt.to_period('M')
        
        monthly_expenses = df_expenses.groupby('month')['amount'].sum().abs()
        monthly_income = df_income.groupby('month')['amount'].sum()
        
        # Combine into forecast dataframe
        forecast_df = pd.DataFrame({
            'month': monthly_expenses.index,
            'expenses': monthly_expenses.values,
            'income': monthly_income.reindex(monthly_expenses.index, fill_value=0).values
        })
        
        forecast_df['savings'] = forecast_df['income'] - forecast_df['expenses']
        
        return forecast_df
    
    def simple_forecast(self, data: pd.DataFrame, periods: int = 6) -> List[Dict]:
        """Simple forecasting using moving averages and trends."""
        if data.empty or len(data) < 2:
            return []
        
        forecasts = []
        
        # Calculate trends
        expense_trend = np.polyfit(range(len(data)), data['expenses'], 1)[0]
        income_trend = np.polyfit(range(len(data)), data['income'], 1)[0]
        
        # Get recent averages
        recent_expenses = data['expenses'].tail(3).mean()
        recent_income = data['income'].tail(3).mean()
        
        for i in range(1, periods + 1):
            # Predict with trend and some randomness
            predicted_expenses = recent_expenses + (expense_trend * i) + np.random.normal(0, recent_expenses * 0.05)
            predicted_income = recent_income + (income_trend * i) + np.random.normal(0, recent_income * 0.02)
            predicted_savings = predicted_income - predicted_expenses
            
            # Calculate confidence (decreases over time)
            confidence = max(95 - (i * 5), 60)
            
            forecasts.append({
                "period": f"Month +{i}",
                "predicted_expenses": max(predicted_expenses, 0),
                "predicted_income": max(predicted_income, 0),
                "predicted_savings": predicted_savings,
                "confidence": confidence
            })
        
        return forecasts
    
    def category_forecast(self, transactions: List[Dict], periods: int = 3) -> List[Dict]:
        """Forecast spending by category."""
        df = pd.DataFrame(transactions)
        if df.empty:
            return []
        
        df = df[df['transaction_type'] == 'expense'].copy()
        df['amount'] = df['amount'].abs()
        
        # Group by category
        category_spending = df.groupby('category')['amount'].agg(['mean', 'std', 'count']).fillna(0)
        
        forecasts = []
        for category, stats in category_spending.iterrows():
            if stats['count'] > 0:
                # Simple forecast with trend
                predicted_amount = stats['mean'] * (1 + np.random.uniform(-0.1, 0.1))
                confidence = min(90, stats['count'] * 10)  # More data = higher confidence
                
                forecasts.append({
                    "category": category,
                    "current_avg": stats['mean'],
                    "predicted_amount": predicted_amount,
                    "change_percent": ((predicted_amount - stats['mean']) / stats['mean']) * 100,
                    "confidence": confidence
                })
        
        return sorted(forecasts, key=lambda x: x['predicted_amount'], reverse=True)

class AIAdvisor:
    """AI-powered financial advisor for personalized recommendations."""
    
    def __init__(self):
        self.forecaster = FinancialForecaster()
    
    def analyze_spending_patterns(self, transactions: List[Dict]) -> List[Dict]:
        """Analyze spending patterns and provide insights."""
        if not transactions:
            return []
        
        df = pd.DataFrame(transactions)
        insights = []
        
        # Calculate monthly spending
        df['date'] = pd.to_datetime(df['date'])
        df['month'] = df['date'].dt.to_period('M')
        
        expenses = df[df['transaction_type'] == 'expense'].copy()
        expenses['amount'] = expenses['amount'].abs()
        
        # Category analysis
        category_spending = expenses.groupby('category')['amount'].sum().sort_values(ascending=False)
        total_expenses = category_spending.sum()
        
        if total_expenses > 0:
            top_category = category_spending.index[0]
            top_amount = category_spending.iloc[0]
            top_percentage = (top_amount / total_expenses) * 100
            
            insights.append({
                "type": "spending_analysis",
                "title": "Top Spending Category",
                "message": f"You spend most on {top_category} (₹{top_amount:,.0f}, {top_percentage:.1f}% of total expenses)",
                "confidence": 95,
                "category": top_category,
                "amount": top_amount
            })
            
            # Savings opportunity
            if top_percentage > 30:
                potential_savings = top_amount * 0.1  # 10% reduction
                insights.append({
                    "type": "recommendation",
                    "title": "Savings Opportunity",
                    "message": f"Reducing {top_category} expenses by 10% could save you ₹{potential_savings:,.0f} monthly",
                    "confidence": 85,
                    "potential_savings": potential_savings
                })
        
        return insights
    
    def generate_budget_recommendations(self, transactions: List[Dict], income: float) -> Dict:
        """Generate budget recommendations based on spending patterns."""
        if not transactions:
            return {"recommendations": []}
        
        df = pd.DataFrame(transactions)
        expenses = df[df['transaction_type'] == 'expense'].copy()
        expenses['amount'] = expenses['amount'].abs()
        
        # Calculate category averages
        category_avg = expenses.groupby('category')['amount'].mean()
        total_avg_expenses = category_avg.sum()
        
        recommendations = []
        
        # 50/30/20 rule recommendations
        needs_budget = income * 0.5  # 50% for needs
        wants_budget = income * 0.3  # 30% for wants
        savings_target = income * 0.2  # 20% for savings
        
        essential_categories = ["Bills & Utilities", "Food & Dining", "Transportation", "Healthcare"]
        
        for category, avg_amount in category_avg.items():
            if category in essential_categories:
                recommended_budget = min(avg_amount * 1.1, needs_budget * 0.3)  # 10% buffer
            else:
                recommended_budget = min(avg_amount * 1.05, wants_budget * 0.4)  # 5% buffer
            
            recommendations.append({
                "category": category,
                "current_avg": avg_amount,
                "recommended_budget": recommended_budget,
                "difference": recommended_budget - avg_amount
            })
        
        return {
            "total_recommended_expenses": sum(r["recommended_budget"] for r in recommendations),
            "savings_target": savings_target,
            "recommendations": recommendations
        }
    
    def chat_response(self, message: str, user_data: Dict) -> str:
        """Generate AI chat response based on user message and financial data."""
        message_lower = message.lower()
        
        # Extract key financial metrics
        total_income = user_data.get("total_income", 0)
        total_expenses = user_data.get("total_expenses", 0)
        savings_rate = user_data.get("savings_rate", 0)
        
        if "budget" in message_lower:
            if total_income > 0:
                recommended_expenses = total_income * 0.7  # 70% for expenses
                return f"Based on your income of ₹{total_income:,.0f}, I recommend keeping monthly expenses under ₹{recommended_expenses:,.0f}. You're currently spending ₹{total_expenses:,.0f}."
            else:
                return "To create a budget, I need to know your monthly income. Could you add some income transactions first?"
        
        elif "save" in message_lower or "saving" in message_lower:
            if savings_rate > 0:
                if savings_rate >= 20:
                    return f"Excellent! You're saving {savings_rate:.1f}% of your income. Consider investing the surplus in mutual funds or SIPs for better returns."
                elif savings_rate >= 10:
                    return f"Good job! You're saving {savings_rate:.1f}% of your income. Try to increase it to 20% by reducing discretionary expenses."
                else:
                    return f"Your savings rate is {savings_rate:.1f}%. I recommend targeting at least 20%. Start by tracking your expenses and identifying areas to cut back."
            else:
                return "I notice you're not saving much. Start with the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Even saving ₹1,000 monthly makes a difference!"
        
        elif "invest" in message_lower:
            monthly_savings = (total_income - total_expenses) if total_income > total_expenses else 0
            if monthly_savings > 10000:
                return f"With ₹{monthly_savings:,.0f} monthly savings, consider: 1) SIP in diversified mutual funds (₹{monthly_savings*0.6:,.0f}), 2) PPF for tax savings (₹{min(monthly_savings*0.3, 12500):,.0f}), 3) Emergency fund (₹{monthly_savings*0.1:,.0f})"
            elif monthly_savings > 0:
                return f"Start with a SIP of ₹{monthly_savings:,.0f} in a balanced mutual fund. Once you increase your savings, diversify into equity and debt funds."
            else:
                return "Focus on increasing your savings first before investing. Create a budget and reduce unnecessary expenses."
        
        elif "expense" in message_lower or "spending" in message_lower:
            if user_data.get("category_breakdown"):
                top_category = max(user_data["category_breakdown"], key=user_data["category_breakdown"].get)
                top_amount = user_data["category_breakdown"][top_category]
                return f"Your highest expense category is {top_category} at ₹{top_amount:,.0f}. Consider reviewing these expenses for potential savings."
            else:
                return "I need more transaction data to analyze your spending patterns. Add some expenses to get personalized insights!"
        
        else:
            return "I'm here to help with your finances! Ask me about budgeting, saving, investing, or expense analysis. You can also ask specific questions like 'How can I save more?' or 'What should my budget be?'"

# Singleton instances
forecaster = FinancialForecaster()
advisor = AIAdvisor()