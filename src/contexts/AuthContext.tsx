import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { authService, LoginRequest, User, setupAxiosInterceptors } from '../services/api';

// Chaves para armazenamento seguro
const AUTH_TOKEN_KEY = 'auth_token';
const USER_INFO_KEY = 'user_info';

// Interface do contexto de autenticação
interface AuthContextData {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

// Propriedades do provedor
interface AuthProviderProps {
  children: ReactNode;
}

// Criação do contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Hook personalizado para usar o contexto
export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

// Provedor de autenticação
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar se há dados de autenticação salvos
  useEffect(() => {
    async function loadStoredAuthData() {
      try {
        setLoading(true);
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        const userString = await SecureStore.getItemAsync(USER_INFO_KEY);

        if (token && userString) {
          const userData = JSON.parse(userString) as User;
          setUser(userData);
          setupAxiosInterceptors(token);
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStoredAuthData();
  }, []);

  // Função para fazer login
  async function login(credentials: LoginRequest) {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      // Salvar dados de autenticação
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, response.accessToken);
      await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(response.user));
      
      // Configurar o interceptor de requisições
      setupAxiosInterceptors(response.accessToken);
      
      // Atualizar o estado
      setUser(response.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Função para fazer logout
  async function logout() {
    try {
      setLoading(true);
      
      // Limpar dados de autenticação
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_INFO_KEY);
      
      // Resetar o estado
      setUser(null);
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    } finally {
      setLoading(false);
    }
  }

  // Valores do contexto
  const contextValue: AuthContextData = {
    isLoggedIn: !!user,
    user,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
} 