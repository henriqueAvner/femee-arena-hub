import api from './api';
import { noticiasMock } from '@/mock/noticias.mock';
import type {
  NoticiaResponse,
  PagedResult,
  PaginationParams,
} from '@/types/api.types';

const USE_MOCK = false;

export const noticiasService = {
  /**
   * Obtém todas as notícias paginadas
   * Endpoint: GET /noticias?page=1&pageSize=10
   */
  async getAll(params?: PaginationParams): Promise<PagedResult<NoticiaResponse>> {
    if (USE_MOCK) {
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 10;
      const items = noticiasMock.slice((page - 1) * pageSize, page * pageSize);
      return {
        items,
        totalCount: noticiasMock.length,
        page,
        pageSize,
        totalPages: Math.ceil(noticiasMock.length / pageSize),
        hasPreviousPage: page > 1,
        hasNextPage: page * pageSize < noticiasMock.length,
      };
    }
    try {
      const response = await api.get<PagedResult<NoticiaResponse>>('/noticias', {
        params: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
        },
      });
      return response.data;
    } catch (e) {
      // Fallback para mock se a API falhar
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 10;
      const items = noticiasMock.slice((page - 1) * pageSize, page * pageSize);
      return {
        items,
        totalCount: noticiasMock.length,
        page,
        pageSize,
        totalPages: Math.ceil(noticiasMock.length / pageSize),
        hasPreviousPage: page > 1,
        hasNextPage: page * pageSize < noticiasMock.length,
      };
    }
  },

  /**
   * Obtém uma notícia pelo ID
   * Endpoint: GET /noticias/{id}
   */
  async getById(id: number): Promise<NoticiaResponse> {
    if (USE_MOCK) return noticiasMock.find(n => n.id === id)!;
    try {
      const response = await api.get<NoticiaResponse>(`/noticias/${id}`);
      return response.data;
    } catch (e) {
      return noticiasMock.find(n => n.id === id)!;
    }
  },

  /**
   * Obtém uma notícia pelo slug
   * Endpoint: GET /noticias/slug/{slug}
   */
  async getBySlug(slug: string): Promise<NoticiaResponse> {
    if (USE_MOCK) return noticiasMock.find(n => n.slug === slug)!;
    try {
      const response = await api.get<NoticiaResponse>(`/noticias/slug/${slug}`);
      return response.data;
    } catch (e) {
      return noticiasMock.find(n => n.slug === slug)!;
    }
  },

  /**
   * Obtém notícias recentes (para homepage)
   * Usa paginação com limite reduzido
   */
  async getRecentes(limit: number = 5): Promise<NoticiaResponse[]> {
    if (USE_MOCK) return noticiasMock.slice(0, limit);
    try {
      const response = await api.get<PagedResult<NoticiaResponse>>('/noticias', {
        params: { page: 1, pageSize: limit },
      });
      return response.data.items;
    } catch (e) {
      return noticiasMock.slice(0, limit);
    }
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
