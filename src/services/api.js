const API_BASE = import.meta.env.VITE_API_URL; // Замени на свою!

export default {
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
    const response = await fetch(`${API_BASE}/api/finance/transactions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: Number(payload.amount),
        merchant: payload.merchant,
        category: payload.category
      })
    });
    return response.json();
  }
}