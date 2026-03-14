import api from './api';
import { timesMock } from '@/mock/times.mock';
import type {
  TimeResponse,
  CreateTimeRequest,
  UpdateTimeRequest,
  PagedResult,
  PaginationParams,
} from '@/types/api.types';

// Permite forçar o uso dos mocks (útil para desenvolvimento offline)
const USE_MOCK = false;

export const timesService = {
  /**
   * Obtém todos os times (com paginação opcional)
   * Endpoint: GET /times
   */
  async getAll(params?: PaginationParams): Promise<TimeResponse[]> {
    if (USE_MOCK) {
      // Simula paginação básica
      const page = params?.page || 1;
      const pageSize = params?.pageSize || timesMock.length;
      return timesMock.slice((page - 1) * pageSize, page * pageSize);
    }
    try {
      const response = await api.get<TimeResponse[]>('/times', { params });
      return response.data;
    } catch (e) {
      // Fallback para mock se a API falhar
      const page = params?.page || 1;
      const pageSize = params?.pageSize || timesMock.length;
      return timesMock.slice((page - 1) * pageSize, page * pageSize);
    }
  },

  /**
   * Obtém todos os times paginados
   * Endpoint: GET /times/paged
   */
  async getAllPaged(params: PaginationParams): Promise<PagedResult<TimeResponse>> {
    if (USE_MOCK) {
      const page = params.page || 1;
      const pageSize = params.pageSize || timesMock.length;
      const items = timesMock.slice((page - 1) * pageSize, page * pageSize);
      return {
        items,
        totalCount: timesMock.length,
        page,
        pageSize,
        totalPages: Math.ceil(timesMock.length / pageSize),
        hasPreviousPage: page > 1,
        hasNextPage: page * pageSize < timesMock.length,
      };
    }
    try {
      const response = await api.get<PagedResult<TimeResponse>>('/times/paged', { params });
      return response.data;
    } catch (e) {
      const page = params.page || 1;
      const pageSize = params.pageSize || timesMock.length;
      const items = timesMock.slice((page - 1) * pageSize, page * pageSize);
      return {
        items,
        totalCount: timesMock.length,
        page,
        pageSize,
        totalPages: Math.ceil(timesMock.length / pageSize),
        hasPreviousPage: page > 1,
        hasNextPage: page * pageSize < timesMock.length,
      };
    }
  },

  /**
   * Obtém um time pelo ID
   * Endpoint: GET /times/{id}
   */
  async getById(id: number): Promise<TimeResponse> {
    if (USE_MOCK) return timesMock.find((t) => t.id === id)!;
    try {
      const response = await api.get<TimeResponse>(`/times/${id}`);
      return response.data;
    } catch (e) {
      return timesMock.find((t) => t.id === id)!;
    }
  },

  /**
   * Obtém um time pelo slug
   * Endpoint: GET /times/slug/{slug}
   */
  async getBySlug(slug: string): Promise<TimeResponse> {
    if (USE_MOCK) return timesMock.find((t) => t.slug === slug)!;
    try {
      const response = await api.get<TimeResponse>(`/times/slug/${slug}`);
      return response.data;
    } catch (e) {
      return timesMock.find((t) => t.slug === slug)!;
    }
  },

  /**
   * Cria um novo time (requer autenticação admin)
   * Endpoint: POST /times
   */
  async create(data: CreateTimeRequest): Promise<TimeResponse> {
    const response = await api.post<TimeResponse>('/times', data);
    return response.data;
  },

  /**
   * Atualiza um time (requer autenticação admin/capitão)
   * Endpoint: PUT /times/{id}
   */
  async update(id: number, data: UpdateTimeRequest): Promise<TimeResponse> {
    const response = await api.put<TimeResponse>(`/times/${id}`, data);
    return response.data;
  },

  /**
   * Deleta um time (requer autenticação admin)
   * Endpoint: DELETE /times/{id}
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/times/${id}`);
  },
};

export default timesService;
