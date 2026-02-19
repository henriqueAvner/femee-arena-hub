import api from './api';
import type {
  InscricaoCampeonatoResponse,
  CreateInscricaoCampeonatoRequest,
} from '@/types/api.types';

export const inscricoesService = {
  /**
   * Cria uma nova inscrição em campeonato
   * Endpoint: POST /inscricoes-campeonato
   */
  async create(data: CreateInscricaoCampeonatoRequest): Promise<InscricaoCampeonatoResponse> {
    const response = await api.post<InscricaoCampeonatoResponse>('/inscricoes-campeonato', data);
    return response.data;
  },

  /**
   * Obtém inscrição pelo ID
   * Endpoint: GET /inscricoes-campeonato/{id}
   */
  async getById(id: number): Promise<InscricaoCampeonatoResponse> {
    const response = await api.get<InscricaoCampeonatoResponse>(`/inscricoes-campeonato/${id}`);
    return response.data;
  },

  /**
   * Obtém inscrições de um campeonato
   * Endpoint: GET /inscricoes-campeonato/{campeonatoId}
   */
  async getByCampeonato(campeonatoId: number): Promise<InscricaoCampeonatoResponse[]> {
    const response = await api.get<InscricaoCampeonatoResponse[]>(
      `/inscricoes-campeonato/${campeonatoId}`
    );
    return response.data;
  },

  /**
   * Obtém inscrições de um time
   * Endpoint: GET /inscricoes-time/{timeId}
   */
  async getByTime(timeId: number): Promise<InscricaoCampeonatoResponse[]> {
    const response = await api.get<InscricaoCampeonatoResponse[]>(
      `/inscricoes-time/${timeId}`
    );
    return response.data;
  },

  /**
   * Atualiza uma inscrição (ex: mudar status)
   * Endpoint: PUT /inscricoes/{id}
   */
  async update(id: number, data: Partial<InscricaoCampeonatoResponse>): Promise<InscricaoCampeonatoResponse> {
    const response = await api.put<InscricaoCampeonatoResponse>(
      `/inscricoes/${id}`, data
    );
    return response.data;
  },

  /**
   * Aprova uma inscrição (admin only)
   * Usa: PUT /inscricoes/{id} com status APROVADA
   */
  async approve(id: number): Promise<InscricaoCampeonatoResponse> {
    const response = await api.put<InscricaoCampeonatoResponse>(
      `/inscricoes/${id}`, { status: 'APROVADA' }
    );
    return response.data;
  },

  /**
   * Rejeita uma inscrição (admin only)
   * Usa: PUT /inscricoes/{id} com status REJEITADA
   */
  async reject(id: number): Promise<InscricaoCampeonatoResponse> {
    const response = await api.put<InscricaoCampeonatoResponse>(
      `/inscricoes/${id}`, { status: 'REJEITADA' }
    );
    return response.data;
  },

  /**
   * Deleta uma inscrição
   * Endpoint: DELETE /inscricoes/{id}
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/inscricoes/${id}`);
  },
};

export default inscricoesService;
