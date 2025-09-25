const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: { email: string; password: string; full_name: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Transaction endpoints
  async getTransactions(params?: { skip?: number; limit?: number; category?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    
    const query = queryParams.toString();
    return this.request(`/transactions${query ? `?${query}` : ''}`);
  }

  async createTransaction(transaction: {
    amount: number;
    description: string;
    category?: string;
    transaction_type: 'income' | 'expense';
    date?: string;
  }) {
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  async updateTransaction(id: number, transaction: Partial<{
    amount: number;
    description: string;
    category: string;
    transaction_type: 'income' | 'expense';
  }>) {
    return this.request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction),
    });
  }

  async deleteTransaction(id: number) {
    return this.request(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics endpoints
  async getExpenseAnalytics(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    const query = params.toString();
    return this.request(`/analytics/expenses${query ? `?${query}` : ''}`);
  }

  async getIncomeExpenseSummary() {
    return this.request('/analytics/summary');
  }

  async getCategoryBreakdown() {
    return this.request('/analytics/categories');
  }

  // AI endpoints
  async getAIInsights() {
    return this.request('/ai/insights');
  }

  async getExpenseForecasting(months?: number) {
    const params = months ? `?months=${months}` : '';
    return this.request(`/ai/forecast${params}`);
  }

  async chatWithAdvisor(message: string) {
    return this.request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async categorizeTransaction(description: string, amount: number) {
    return this.request('/ai/categorize', {
      method: 'POST',
      body: JSON.stringify({ description, amount }),
    });
  }

  // Reports endpoints
  async generateReport(type: 'monthly' | 'annual', params?: { 
    year?: number; 
    month?: number;
    format?: 'json' | 'pdf';
  }) {
    const queryParams = new URLSearchParams();
    if (params?.year) queryParams.append('year', params.year.toString());
    if (params?.month) queryParams.append('month', params.month.toString());
    if (params?.format) queryParams.append('format', params.format);
    
    const query = queryParams.toString();
    return this.request(`/reports/${type}${query ? `?${query}` : ''}`);
  }
}

export const apiService = new ApiService();