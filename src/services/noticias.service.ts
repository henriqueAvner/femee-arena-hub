import api from './api';
import type {
  NoticiaResponse,
  PagedResult,
  PaginationParams,
} from '@/types/api.types';

export const noticiasService = {
  /**
   * Obtém todas as notícias paginadas
   * Endpoint: GET /noticias?page=1&pageSize=10
   */
  async getAll(params?: PaginationParams): Promise<PagedResult<NoticiaResponse>> {
    const response = await api.get<PagedResult<NoticiaResponse>>('/noticias', {
      params: {
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
      },
    });
    return response.data;
  },

  /**
   * Obtém uma notícia pelo ID
   * Endpoint: GET /noticias/{id}
   */
  async getById(id: number): Promise<NoticiaResponse> {
    const response = await api.get<NoticiaResponse>(`/noticias/${id}`);
    return response.data;
  },

  /**
   * Obtém uma notícia pelo slug
   * Endpoint: GET /noticias/slug/{slug}
   */
  async getBySlug(slug: string): Promise<NoticiaResponse> {
    const response = await api.get<NoticiaResponse>(`/noticias/slug/${slug}`);
    return response.data;
  },

  /**
   * Obtém notícias recentes (para homepage)
   * Usa paginação com limite reduzido
   */
  async getRecentes(limit: number = 5): Promise<NoticiaResponse[]> {
    const response = await api.get<PagedResult<NoticiaResponse>>('/noticias', {
      params: { page: 1, pageSize: limit },
    });
    return response.data.items;
  },

  /**
   * Cria uma nova notícia (admin)
   * Endpoint: POST /noticias
   */
  async create(data: Partial<NoticiaResponse>): Promise<NoticiaResponse> {
    const response = await api.post<NoticiaResponse>('/noticias', data);
    return response.data;
  },

  /**
   * Atualiza uma notícia (admin)
   * Endpoint: PUT /noticias/{id}
   */
  async update(id: number, data: Partial<NoticiaResponse>): Promise<NoticiaResponse> {
    const response = await api.put<NoticiaResponse>(`/noticias/${id}`, data);
    return response.data;
  },

  /**
   * Deleta uma notícia (admin)
   * Endpoint: DELETE /noticias/{id}
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/noticias/${id}`);
  },
};

export default noticiasService;
