const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(username: string, password: string) {
    return this.request<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async register(userData: { email: string; username: string; password: string; full_name: string }) {
    return this.request<{ message: string; user_id: number }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Transaction endpoints
  async getTransactions() {
    return this.request<Array<{
      id: number;
      user_id: number;
      description: string;
      amount: number;
      category: string;
      transaction_type: 'income' | 'expense';
      date: string;
      is_ai_categorized: boolean;
      created_at: string;
    }>>('/transactions');
  }

  async createTransaction(transaction: {
    amount: number;
    description: string;
    category?: string;
    transaction_type: 'income' | 'expense';
    date?: string;
  }) {
    return this.request<{
      id: number;
      user_id: number;
      description: string;
      amount: number;
      category: string;
      transaction_type: 'income' | 'expense';
      date: string;
      is_ai_categorized: boolean;
      created_at: string;
    }>('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  // Analytics endpoints
  async getAnalyticsSummary() {
    return this.request<{
      total_income: number;
      total_expenses: number;
      net_savings: number;
      savings_rate: number;
      category_breakdown: Record<string, number>;
    }>('/analytics/summary');
  }

  // AI endpoints
  async getForecast() {
    return this.request<{
      forecast: Array<{
        month: string;
        predicted_expenses: number;
        confidence: number;
      }>;
    }>('/ai/forecast', {
      method: 'POST',
    });
  }

  async chatWithAdvisor(message: string) {
    return this.request<{ response: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }
}

export const apiService = new ApiService();