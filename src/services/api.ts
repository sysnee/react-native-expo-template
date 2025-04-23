import axios from 'axios';

const API_BASE_URL = 'https://ris-api.kaiprevention.com.br/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface para o login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

// Serviço de autenticação
export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Extrair mensagem de erro do servidor, se disponível
        const serverErrorMessage = error.response?.data?.message;
        
        // Erro de credenciais (401)
        if (error.response?.status === 401) {
          throw new Error('Email ou senha incorretos');
        }
        
        // Usuário não encontrado (404)
        if (error.response?.status === 404) {
          throw new Error('Usuário não encontrado');
        }
        
        // Erro de acesso (403)
        if (error.response?.status === 403) {
          throw new Error('Acesso não autorizado');
        }
        
        // Muitas tentativas (429)
        if (error.response?.status === 429) {
          throw new Error('Muitas tentativas de login');
        }
        
        // Outros erros com mensagem do servidor
        if (serverErrorMessage) {
          throw new Error(serverErrorMessage);
        }
        
        // Erro de rede
        if (error.message === 'Network Error') {
          throw new Error('Erro de conexão. Verifique sua internet');
        }
        
        // Fallback para qualquer outro erro
        throw new Error('Erro ao fazer login');
      }
      
      // Erro desconhecido
      throw error;
    }
  },
};

// Configuração do interceptor para incluir o token em requisições autenticadas
export const setupAxiosInterceptors = (token: string) => {
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default api; 