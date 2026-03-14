import api from './api';
import { inscricoesMock } from '@/mock/inscricoes.mock';
import type {
  InscricaoCampeonatoResponse,
  CreateInscricaoCampeonatoRequest,
} from '@/types/api.types';
import { StatusInscricao } from '@/types/api.types';

const USE_MOCK = false;

export const inscricoesService = {
  /**
   * Cria uma nova inscrição em campeonato
   * Endpoint: POST /inscricoes-campeonato
   */
  async create(data: CreateInscricaoCampeonatoRequest): Promise<InscricaoCampeonatoResponse> {
    if (USE_MOCK) {
      const newItem: InscricaoCampeonatoResponse = {
        id: inscricoesMock.length + 1,
        campeonatoId: data.campeonatoId,
        timeId: data.timeId,
        status: StatusInscricao.Pendente,
        dataInscricao: new Date().toISOString(),
        campeonatoTitulo: undefined,
        timeNome: undefined,
      };
      inscricoesMock.push(newItem);
      return newItem;
    }

    const response = await api.post<InscricaoCampeonatoResponse>('/inscricoes-campeonato', data);
    return response.data;
  },

  /**
   * Obtém inscrição pelo ID
   * Endpoint: GET /inscricoes-campeonato/{id}
   */
  async getById(id: number): Promise<InscricaoCampeonatoResponse> {
    if (USE_MOCK) return inscricoesMock.find((i) => i.id === id)!;
    try {
      const response = await api.get<InscricaoCampeonatoResponse>(`/inscricoes-campeonato/${id}`);
      return response.data;
    } catch (e) {
      return inscricoesMock.find((i) => i.id === id)!;
    }
  },

  /**
   * Obtém inscrições de um campeonato
   * Endpoint: GET /inscricoes-campeonato/{campeonatoId}
   */
  async getByCampeonato(campeonatoId: number): Promise<InscricaoCampeonatoResponse[]> {
    if (USE_MOCK) return inscricoesMock.filter((i) => i.campeonatoId === campeonatoId);
    try {
      const response = await api.get<InscricaoCampeonatoResponse[]>(
        `/inscricoes-campeonato/${campeonatoId}`
      );
      return response.data;
    } catch (e) {
      return inscricoesMock.filter((i) => i.campeonatoId === campeonatoId);
    }
  },

  /**
   * Obtém inscrições de um time
   * Endpoint: GET /inscricoes-time/{timeId}
   */
  async getByTime(timeId: number): Promise<InscricaoCampeonatoResponse[]> {
    if (USE_MOCK) return inscricoesMock.filter((i) => i.timeId === timeId);
    try {
      const response = await api.get<InscricaoCampeonatoResponse[]>(
        `/inscricoes-time/${timeId}`
      );
      return response.data;
    } catch (e) {
      return inscricoesMock.filter((i) => i.timeId === timeId);
    }
  },

  /**
   * Atualiza uma inscrição (ex: mudar status)
   * Endpoint: PUT /inscricoes/{id}
   */
  async update(id: number, data: Partial<InscricaoCampeonatoResponse>): Promise<InscricaoCampeonatoResponse> {
    if (USE_MOCK) {
      const updated = Object.assign(
        inscricoesMock.find((i) => i.id === id)!,
        data
      );
      return updated;
    }
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
    if (USE_MOCK) {
      const inscricao = inscricoesMock.find((i) => i.id === id)!;
      inscricao.status = StatusInscricao.Aprovada;
      inscricao.dataAprovacao = new Date().toISOString();
      return inscricao;
    }
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
    if (USE_MOCK) {
      const inscricao = inscricoesMock.find((i) => i.id === id)!;
      inscricao.status = StatusInscricao.Rejeitada;
      inscricao.dataAprovacao = new Date().toISOString();
      return inscricao;
    }
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
    if (USE_MOCK) {
      const index = inscricoesMock.findIndex((i) => i.id === id);
      if (index >= 0) inscricoesMock.splice(index, 1);
      return;
    }
    await api.delete(`/inscricoes/${id}`);
  },
};

export default inscricoesService;
