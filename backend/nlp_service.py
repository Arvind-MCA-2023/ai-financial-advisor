import re
from typing import Dict, List

class ExpenseCategorizer:
    """Simple NLP-based expense categorization service."""
    
    def __init__(self):
        self.category_keywords = {
            "Food & Dining": [
                "restaurant", "food", "cafe", "dining", "bazaar", "grocery", 
                "swiggy", "zomato", "dominos", "pizza", "burger", "coffee",
                "tea", "breakfast", "lunch", "dinner", "snacks", "bakery",
                "supermarket", "vegetables", "fruits", "meat", "dairy"
            ],
            "Transportation": [
                "petrol", "gas", "uber", "taxi", "transport", "bus", "train",
                "metro", "auto", "rickshaw", "ola", "fuel", "parking",
                "toll", "vehicle", "car", "bike", "scooter", "maintenance"
            ],
            "Shopping": [
                "amazon", "shopping", "mall", "store", "purchase", "flipkart",
                "myntra", "clothes", "shoes", "electronics", "mobile", "laptop",
                "accessories", "jewelry", "cosmetics", "books", "gifts"
            ],
            "Bills & Utilities": [
                "bill", "electricity", "water", "internet", "phone", "utility",
                "mobile", "broadband", "wifi", "gas", "cylinder", "maintenance",
                "society", "rent", "emi", "loan", "insurance", "subscription"
            ],
            "Entertainment": [
                "movie", "netflix", "entertainment", "game", "music", "spotify",
                "youtube", "cinema", "theatre", "concert", "sports", "gym",
                "club", "party", "vacation", "travel", "hotel", "booking"
            ],
            "Healthcare": [
                "doctor", "hospital", "medicine", "pharmacy", "medical",
                "health", "clinic", "dentist", "checkup", "treatment",
                "surgery", "insurance", "ambulance", "lab", "test"
            ],
            "Education": [
                "school", "college", "university", "course", "tuition",
                "books", "education", "training", "certification", "exam",
                "fees", "library", "stationery", "uniform"
            ],
            "Investment": [
                "mutual", "fund", "sip", "stock", "share", "investment",
                "trading", "demat", "portfolio", "dividend", "bond",
                "fixed", "deposit", "savings", "ppf", "nsc"
            ]
        }
    
    def categorize(self, description: str) -> str:
        """Categorize transaction based on description."""
        description_lower = description.lower()
        
        # Remove special characters and extra spaces
        description_clean = re.sub(r'[^\w\s]', ' ', description_lower)
        description_clean = ' '.join(description_clean.split())
        
        # Score each category
        category_scores = {}
        for category, keywords in self.category_keywords.items():
            score = 0
            for keyword in keywords:
                if keyword in description_clean:
                    # Exact match gets higher score
                    if keyword == description_clean:
                        score += 10
                    # Word boundary match
                    elif re.search(r'\b' + keyword + r'\b', description_clean):
                        score += 5
                    # Partial match
                    else:
                        score += 1
            category_scores[category] = score
        
        # Return category with highest score
        if category_scores:
            best_category = max(category_scores, key=category_scores.get)
            if category_scores[best_category] > 0:
                return best_category
        
        return "Other"
    
    def get_confidence_score(self, description: str, predicted_category: str) -> float:
        """Get confidence score for the prediction."""
        description_lower = description.lower()
        keywords = self.category_keywords.get(predicted_category, [])
        
        matches = sum(1 for keyword in keywords if keyword in description_lower)
        confidence = min(matches / len(keywords) * 100, 95) if keywords else 50
        
        return confidence

# Singleton instance
categorizer = ExpenseCategorizer()

def categorize_expense(description: str) -> Dict[str, any]:
    """Categorize expense and return category with confidence."""
    category = categorizer.categorize(description)
    confidence = categorizer.get_confidence_score(description, category)
    
    return {
        "category": category,
        "confidence": confidence,
        "is_ai_categorized": True
    }

def get_spending_insights(transactions: List[Dict]) -> Dict[str, any]:
    """Generate spending insights from transactions."""
    if not transactions:
        return {"insights": []}
    
    # Calculate category totals
    category_totals = {}
    total_expenses = 0
    
    for transaction in transactions:
        if transaction.get("transaction_type") == "expense":
            category = transaction.get("category", "Other")
            amount = abs(transaction.get("amount", 0))
            category_totals[category] = category_totals.get(category, 0) + amount
            total_expenses += amount
    
    # Generate insights
    insights = []
    
    if category_totals:
        # Top spending category
        top_category = max(category_totals, key=category_totals.get)
        top_amount = category_totals[top_category]
        top_percentage = (top_amount / total_expenses) * 100
        
        insights.append({
            "type": "spending_pattern",
            "title": f"Top Spending Category: {top_category}",
            "message": f"You spent ₹{top_amount:,.2f} ({top_percentage:.1f}%) on {top_category} this month.",
            "category": top_category,
            "amount": top_amount,
            "percentage": top_percentage
        })
        
        # High spending alert
        if top_percentage > 40:
            insights.append({
                "type": "alert",
                "title": "High Spending Alert",
                "message": f"Your {top_category} expenses are {top_percentage:.1f}% of total spending. Consider reviewing this category.",
                "category": top_category,
                "severity": "medium"
            })
    
    return {"insights": insights}