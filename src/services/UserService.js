import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000'
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  handleError(error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 401:
        throw new Error('Sessão expirada. Faça login novamente.');
      case 403:
        throw new Error('Acesso negado.');
      case 404:
        throw new Error('Usuário não encontrado.');
      case 409:
        throw new Error('Email já cadastrado.');
      case 422:
        throw new Error('Dados inválidos.');
      default:
        throw new Error(message || 'Erro interno do servidor.');
    }
  }

  async list() {
    try {
      const response = await this.api.get('/users');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async get(id) {
    try {
      const response = await this.api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(data) {
    try {
      const response = await this.api.post('/users', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id, data) {
    try {
      const response = await this.api.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id) {
    try {
      const response = await this.api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

const userService = new UserService();
export default userService;
