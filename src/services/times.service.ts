import api from './api';
import type {
  TimeResponse,
  CreateTimeRequest,
  UpdateTimeRequest,
  PagedResult,
  PaginationParams,
} from '@/types/api.types';

export const timesService = {
  /**
   * Obtém todos os times (com paginação opcional)
   * Endpoint: GET /times
   */
  async getAll(params?: PaginationParams): Promise<TimeResponse[]> {
    const response = await api.get<TimeResponse[]>('/times', { params });
    return response.data;
  },

  /**
   * Obtém todos os times paginados
   * Endpoint: GET /times/paged
   */
  async getAllPaged(params: PaginationParams): Promise<PagedResult<TimeResponse>> {
    const response = await api.get<PagedResult<TimeResponse>>('/times/paged', { params });
    return response.data;
  },

  /**
   * Obtém um time pelo ID
   * Endpoint: GET /times/{id}
   */
  async getById(id: number): Promise<TimeResponse> {
    const response = await api.get<TimeResponse>(`/times/${id}`);
    return response.data;
  },

  /**
   * Obtém um time pelo slug
   * Endpoint: GET /times/slug/{slug}
   */
  async getBySlug(slug: string): Promise<TimeResponse> {
    const response = await api.get<TimeResponse>(`/times/slug/${slug}`);
    return response.data;
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
