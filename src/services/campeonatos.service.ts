import api from './api';
import { campeonatosMock } from '@/mock/campeonatos.mock';
import {
  CampeonatoResponse,
  CreateCampeonatoRequest,
  StatusCampeonato,
} from '@/types/api.types';

// Variável de controle: se true, força uso do mock. Se false, tenta API e faz fallback para mock em caso de erro.
const USE_MOCK = false;

export const campeonatosService = {
  /**
   * Obtém todos os campeonatos
   */
  async getAll(): Promise<CampeonatoResponse[]> {
    if (USE_MOCK) return campeonatosMock;
    try {
      const response = await api.get<CampeonatoResponse[]>('/campeonatos');
      return response.data;
    } catch (e) {
      // Fallback para mock se a API falhar
      return campeonatosMock;
    }
  },

  /**
   * Obtém um campeonato pelo ID
   */
  async getById(id: number): Promise<CampeonatoResponse> {
    if (USE_MOCK) return campeonatosMock.find(c => c.id === id)!;
    try {
      const response = await api.get<CampeonatoResponse>(`/campeonatos/${id}`);
      return response.data;
    } catch (e) {
      // Fallback para mock se a API falhar
      return campeonatosMock.find(c => c.id === id)!;
    }
  },

  /**
   * Obtém campeonatos por status
   */
  async getByStatus(status: StatusCampeonato): Promise<CampeonatoResponse[]> {
    if (USE_MOCK) return campeonatosMock.filter(c => c.status === status);
    try {
      const response = await api.get<CampeonatoResponse[]>(`/campeonatos/status/${status}`);
      return response.data;
    } catch (e) {
      // Fallback para mock se a API falhar
      return campeonatosMock.filter(c => c.status === status);
    }
  },

  /**
   * Obtém campeonatos ativos (em andamento ou agendados)
   */
  async getAtivos(): Promise<CampeonatoResponse[]> {
    if (USE_MOCK) return campeonatosMock.filter(c => c.status === StatusCampeonato.EmAndamento || c.status === StatusCampeonato.Planejado);
    try {
      const response = await api.get<CampeonatoResponse[]>('/campeonatos/ativos');
      return response.data;
    } catch (e) {
      // Fallback para mock se a API falhar
      return campeonatosMock.filter(c => c.status === StatusCampeonato.EmAndamento || c.status === StatusCampeonato.Planejado);
    }
  },

  /**
   * Cria um novo campeonato (requer autenticação admin)
   */
  async create(data: CreateCampeonatoRequest): Promise<CampeonatoResponse> {
    const response = await api.post<CampeonatoResponse>('/campeonatos', data);
    return response.data;
  },

  /**
   * Atualiza um campeonato (requer autenticação admin)
   */
  async update(id: number, data: Partial<CreateCampeonatoRequest>): Promise<CampeonatoResponse> {
    const response = await api.put<CampeonatoResponse>(`/campeonatos/${id}`, data);
    return response.data;
  },

  /**
   * Deleta um campeonato (requer autenticação admin)
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/campeonatos/${id}`);
  },
};

export default campeonatosService;
