import type { UserResponse } from "@/types/api.types";

export type AdminUser = UserResponse & {
  role: "Admin" | "Capitao" | "Membro";
  status: "Ativo" | "Pendente" | "Inativo";
  dataRegistro: string;
};

export const usersMock: AdminUser[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(31) 99999-0001",
    tipoUsuario: 2,
    dataCriacao: "2024-01-15",
    role: "Capitao",
    status: "Pendente",
    dataRegistro: "2024-01-15",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(31) 99999-0002",
    tipoUsuario: 3,
    dataCriacao: "2024-01-14",
    role: "Membro",
    status: "Pendente",
    dataRegistro: "2024-01-14",
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro@email.com",
    telefone: "(31) 99999-0003",
    tipoUsuario: 3,
    dataCriacao: "2024-01-14",
    role: "Membro",
    status: "Pendente",
    dataRegistro: "2024-01-14",
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@email.com",
    telefone: "(31) 99999-0004",
    tipoUsuario: 2,
    dataCriacao: "2024-01-13",
    role: "Capitao",
    status: "Pendente",
    dataRegistro: "2024-01-13",
  },
  {
    id: 5,
    nome: "Carlos Lima",
    email: "carlos@email.com",
    telefone: "(31) 99999-0005",
    tipoUsuario: 3,
    dataCriacao: "2024-01-12",
    role: "Membro",
    status: "Pendente",
    dataRegistro: "2024-01-12",
  },
];
