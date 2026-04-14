// API сервис для взаимодействия с бэкендом
const API_BASE_URL = 'http://localhost:5226';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Получить заголовки для запроса
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Универсальный метод для запросов
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // === AUTHENTICATION ===
  async register(email, password) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async login(email, password) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.accessToken) {
      this.token = response.accessToken;
      localStorage.setItem('authToken', response.accessToken);
    }
    
    return response;
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // === TRANSACTIONS ===
  async getTransactions() {
    return this.request('/api/finance/transactions', {
      method: 'GET',
    });
  }

  async addTransaction(transaction) {
    return this.request('/api/finance/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  // === GOALS ===
  async getGoals() {
    return this.request('/api/finance/goals', {
      method: 'GET',
    });
  }

  async addGoal(goal) {
    return this.request('/api/finance/goals', {
      method: 'POST',
      body: JSON.stringify({
        title: goal.title,
        targetAmount: goal.targetAmount || goal.target,
        currentAmount: goal.currentAmount || goal.current || 0
      }),
    });
  }

  async updateGoal(id, goal) {
    return this.request(`/api/finance/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: goal.title,
        targetAmount: goal.targetAmount || goal.target,
        currentAmount: goal.currentAmount || goal.current
      }),
    });
  }

  async deleteGoal(id) {
    return this.request(`/api/finance/goals/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
