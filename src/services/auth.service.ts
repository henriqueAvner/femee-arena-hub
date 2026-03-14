import api from './api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  AuthUser,
} from '@/types/api.types';

const AUTH_TOKEN_KEY = 'femee_token';
const AUTH_USER_KEY = 'femee_user';

/**
 * Ativa modo mock para autenticação (usar sem backend).
 * - email: user@femee.test / senha: password -> Usuário comum
 * - email: admin@femee.test / senha: password -> Administrador
 */
const USE_MOCK = true;

const mockUsers = [
  {
    id: 1,
    name: 'Usuário Teste',
    email: 'user@femee.test',
    password: 'password',
    tipoUsuario: 'JOGADOR',
  },
  {
    id: 2,
    name: 'Administrador',
    email: 'admin@femee.test',
    password: 'password',
    tipoUsuario: 'ADMIN',
  },
];

// ============================================
// Tipos internos para comunicação com o backend
// O backend usa campos em inglês (name, password)
// O frontend usa campos em português (nome, senha)
// ============================================

interface BackendLoginRequest {
  email: string;
  password: string;
}

interface BackendRegisterRequest {
  name: string;
  email: string;
  password: string;
  tipoUsuario?: string;
}

interface BackendLoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    tipoUsuario: string | number;
  };
}

/**
 * Mapeia a resposta do backend para o formato interno do frontend
 */
function mapLoginResponse(backendResponse: BackendLoginResponse): LoginResponse {
  return {
    token: backendResponse.token,
    userId: backendResponse.user.id,
    email: backendResponse.user.email,
    nome: backendResponse.user.name,
    tipoUsuario: typeof backendResponse.user.tipoUsuario === 'string'
      ? mapTipoUsuario(backendResponse.user.tipoUsuario)
      : backendResponse.user.tipoUsuario,
    expiresAt: '', // Backend não retorna, pode ser extraído do JWT se necessário
  };
}

/**
 * Mapeia string de tipoUsuario do backend para enum numérico
 */
function mapTipoUsuario(tipo: string): number {
  const map: Record<string, number> = {
    'ADMIN': 1,
    'ADMINISTRADOR': 1,
    'CAPITAO': 2,
    'JOGADOR': 3,
    'USER': 4,
    'VISITANTE': 4,
    'MODERADOR': 5,
  };
  return map[tipo.toUpperCase()] ?? 4;
}

export const authService = {
  /**
   * Realiza login do usuário
   * Mapeia: { email, senha } → { email, password }
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    if (USE_MOCK) {
      const mock = mockUsers.find((u) => u.email === data.email && u.password === data.senha);
      if (!mock) {
        return Promise.reject({ response: { data: { message: 'Email ou senha incorretos.' } } });
      }

      const response: LoginResponse = {
        token: 'mock-token',
        userId: mock.id,
        email: mock.email,
        nome: mock.name,
        tipoUsuario: mapTipoUsuario(mock.tipoUsuario),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      };

      localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify({
        userId: response.userId,
        email: response.email,
        nome: response.nome,
        tipoUsuario: response.tipoUsuario,
      }));

      return response;
    }

    const backendPayload: BackendLoginRequest = {
      email: data.email,
      password: data.senha,
    };

    const response = await api.post<BackendLoginResponse>('/auth/login', backendPayload);
    const mappedResponse = mapLoginResponse(response.data);

    // Salva token e dados do usuário
    if (mappedResponse.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, mappedResponse.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify({
        userId: mappedResponse.userId,
        email: mappedResponse.email,
        nome: mappedResponse.nome,
        tipoUsuario: mappedResponse.tipoUsuario,
      }));
    }

    return mappedResponse;
  },

  /**
   * Registra novo usuário
   * Mapeia: { nome, email, senha, confirmacaoSenha } → { name, email, password, tipoUsuario }
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    if (USE_MOCK) {
      const newUser = {
        id: mockUsers.length + 1,
        name: data.nome,
        email: data.email,
        password: data.senha,
        tipoUsuario: 'JOGADOR',
      };
      mockUsers.push(newUser);

      const response: LoginResponse = {
        token: 'mock-token',
        userId: newUser.id,
        email: newUser.email,
        nome: newUser.name,
        tipoUsuario: mapTipoUsuario(newUser.tipoUsuario),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      };

      localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify({
        userId: response.userId,
        email: response.email,
        nome: response.nome,
        tipoUsuario: response.tipoUsuario,
      }));

      return response;
    }

    const backendPayload: BackendRegisterRequest = {
      name: data.nome,
      email: data.email,
      password: data.senha,
      tipoUsuario: 'USER',
    };

    const response = await api.post<BackendLoginResponse | { message: string }>('/auth/register', backendPayload);

    // Backend pode retornar apenas { message } ou um LoginResponse completo
    if ('message' in response.data) {
      // Registro sem auto-login: retorna dados mínimos
      return {
        token: '',
        userId: 0,
        email: data.email,
        nome: data.nome,
        tipoUsuario: 4, // Visitante
        expiresAt: '',
      };
    }

    const mappedResponse = mapLoginResponse(response.data as BackendLoginResponse);

    if (mappedResponse.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, mappedResponse.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify({
        userId: mappedResponse.userId,
        email: mappedResponse.email,
        nome: mappedResponse.nome,
        tipoUsuario: mappedResponse.tipoUsuario,
      }));
    }

    return mappedResponse;
  },

  /**
   * Obtém dados do usuário autenticado
   */
  async getMe(): Promise<AuthUser> {
    const response = await api.get<{ id: number; name: string; email: string; tipoUsuario: string | number }>('/users/me');
    return {
      userId: response.data.id,
      email: response.data.email,
      nome: response.data.name,
      tipoUsuario: typeof response.data.tipoUsuario === 'string'
        ? mapTipoUsuario(response.data.tipoUsuario)
        : response.data.tipoUsuario,
    };
  },

  /**
   * Realiza logout do usuário
   */
  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Obtém o token atual
   */
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Obtém dados do usuário do localStorage
   */
  getStoredUser(): AuthUser | null {
    const userJson = localStorage.getItem(AUTH_USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },
};

export default authService;
