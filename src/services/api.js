const API_BASE = import.meta.env.VITE_API_URL; // Замени на свою!

export default {
  async register(email, password, name) {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      // Identity выдает ошибки в сложном формате, вытащим первую понятную
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.errors 
        ? Object.values(errorData.errors)[0][0] 
        : 'Ошибка регистрации. Возможно, пароль слишком простой.';
      throw new Error(message);
    }

    localStorage.setItem('userName', firstName);
    return this.login(email, password);
  },
  
  async login(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error('Неверный логин или пароль');
    
    const data = await response.json();
    localStorage.setItem('token', data.accessToken);
    return data;
  },

  async getTransactions() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/api/finance/transactions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  
  async addTransaction(payload) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/finance/transactions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        Amount: Number(payload.amount),
        Category: payload.category,
        Merchant: payload.merchant || 'Без названия'
      })
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      console.error("Ошибка бэкенда:", errorDetail);
      throw new Error('Ошибка при сохранении транзакции');
    }
    return response.json();
  }
}