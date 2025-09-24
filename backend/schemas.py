from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    phone_number: Optional[str] = None
    date_of_birth: Optional[datetime] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Transaction schemas
class TransactionBase(BaseModel):
    description: str
    amount: float
    category: str
    transaction_type: str
    notes: Optional[str] = None

class TransactionCreate(TransactionBase):
    date: Optional[datetime] = None

class TransactionUpdate(BaseModel):
    description: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    notes: Optional[str] = None

class TransactionResponse(TransactionBase):
    id: int
    user_id: int
    date: datetime
    is_ai_categorized: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Budget schemas
class BudgetBase(BaseModel):
    category: str
    monthly_limit: float

class BudgetCreate(BudgetBase):
    month: int
    year: int

class BudgetResponse(BudgetBase):
    id: int
    user_id: int
    current_spent: float
    month: int
    year: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Goal schemas
class GoalBase(BaseModel):
    name: str
    description: Optional[str] = None
    target_amount: float
    target_date: datetime

class GoalCreate(GoalBase):
    pass

class GoalUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    target_amount: Optional[float] = None
    current_amount: Optional[float] = None
    target_date: Optional[datetime] = None

class GoalResponse(GoalBase):
    id: int
    user_id: int
    current_amount: float
    is_completed: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Analytics schemas
class AnalyticsSummary(BaseModel):
    total_income: float
    total_expenses: float
    net_savings: float
    savings_rate: float
    category_breakdown: dict

class MonthlyData(BaseModel):
    month: str
    income: float
    expenses: float
    savings: float

class ForecastData(BaseModel):
    month: str
    predicted_amount: float
    confidence: float

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    timestamp: datetime