import { useEffect, useMemo, useState } from "react";
import { 
  Users, 
  Trophy, 
  Shield, 
  Settings, 
  BarChart3, 
  Activity,
  UserPlus,
  Calendar,
  AlertTriangle,
  Clock,
  Hourglass,
  TrendingUp,
  Gamepad2,
  Eye,
  XCircle,
  CheckCircle2,
  Check,
  Play,
  Tv
} from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { AdminUser, usersMock } from "@/mock/users.mock";

// Mock data
const dashboardStats = {
  totalUsuarios: 1250,
  usuariosAtivos: 890,
  totalTimes: 156,
  campeonatosAtivos: 8,
  crescimentoMensal: 15.3,
};

const initialUsers: AdminUser[] = usersMock;

const initialPendingTeams = [
  { id: 1, nome: "Dragon Slayers", jogo: "League of Legends", capitao: "João Silva", dataSubmissao: "2024-01-15" },
  { id: 2, nome: "Phoenix Rising", jogo: "Valorant", capitao: "Maria Santos", dataSubmissao: "2024-01-14" },
  { id: 3, nome: "Thunder Squad", jogo: "CS2", capitao: "Pedro Costa", dataSubmissao: "2024-01-13" },
];

type ChampionshipStatus = "Inscrições Abertas" | "Em Andamento" | "Finalizado" | "Cancelado";

type ChampionshipTeam = {
  id: number;
  nome: string;
  status: "Participando" | "Classificado" | "Eliminado";
};

type ChampionshipMatch = {
  id: number;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  phase: string;
  date: string;
};

type Championship = {
  id: number;
  nome: string;
  jogo: string;
  fase: string;
  participantes: number;
  status: ChampionshipStatus;
  liveUrl?: string;
  teams: ChampionshipTeam[];
  matches: ChampionshipMatch[];
};

const initialChampionships: Championship[] = [
  {
    id: 1,
    nome: "Copa FEMEE 2024",
    jogo: "League of Legends",
    fase: "Quartas de Final",
    participantes: 32,
    status: "Em Andamento",
    liveUrl: "https://twitch.tv/femee_copa2024",
    teams: [
      { id: 1, nome: "Dragons E-Sports", status: "Classificado" },
      { id: 2, nome: "Midnight Wolves", status: "Participando" },
      { id: 3, nome: "Neon Ninjas", status: "Eliminado" },
      { id: 4, nome: "Shadow Legion", status: "Classificado" },
    ],
    matches: [
      { id: 1, teamA: "Dragons E-Sports", teamB: "Midnight Wolves", scoreA: 2, scoreB: 1, phase: "Quartas de Final", date: "2024-07-20" },
      { id: 2, teamA: "Neon Ninjas", teamB: "Shadow Legion", scoreA: 0, scoreB: 2, phase: "Quartas de Final", date: "2024-07-20" },
    ],
  },
  {
    id: 2,
    nome: "Valorant Masters",
    jogo: "Valorant",
    fase: "Grupos",
    participantes: 16,
    status: "Em Andamento",
    liveUrl: "https://twitch.tv/femee_valorant",
    teams: [
      { id: 5, nome: "Phoenix Rising", status: "Participando" },
      { id: 6, nome: "Cyber Squad", status: "Participando" },
      { id: 7, nome: "Laser Force", status: "Participando" },
      { id: 8, nome: "Bullet Storm", status: "Participando" },
    ],
    matches: [
      { id: 3, teamA: "Phoenix Rising", teamB: "Cyber Squad", scoreA: 13, scoreB: 9, phase: "Grupos", date: "2024-07-18" },
      { id: 4, teamA: "Laser Force", teamB: "Bullet Storm", scoreA: 10, scoreB: 13, phase: "Grupos", date: "2024-07-18" },
    ],
  },
  {
    id: 3,
    nome: "CS2 Pro League",
    jogo: "CS2",
    fase: "Inscrições",
    participantes: 24,
    status: "Inscrições Abertas",
    teams: [],
    matches: [],
  },
];

const Admin = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Usuários (mock) / TODO: substituir por requisição à API
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userFilter, setUserFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [userForm, setUserForm] = useState<AdminUser | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const pageSize = 5;

  const [pendingTeams, setPendingTeams] = useState(initialPendingTeams);
  const [teams, setTeams] = useState<typeof initialPendingTeams>([]);
  const inscricoesPendentes = pendingTeams.length;

  // Campeonatos (mock) - pronto para trocar por API
  const [championships, setChampionships] = useState<Championship[]>(initialChampionships);
  const [selectedChampionship, setSelectedChampionship] = useState<Championship | null>(null);
  const [championshipMode, setChampionshipMode] = useState<"view" | "edit">("view");
  const [championshipDialogOpen, setChampionshipDialogOpen] = useState(false);
  const [championshipForm, setChampionshipForm] = useState<Championship | null>(null);

  useEffect(() => {
    // Simula carregamento inicial de dados (mock)
    setUsers(initialUsers);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!userFilter.trim()) return users;
    const q = userFilter.toLowerCase();
    return users.filter((u) => u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [userFilter, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [currentPage, filteredUsers, pageSize]);

  const openUserDialog = (user?: AdminUser) => {
    const newUser: AdminUser = user
      ? user
      : {
          id: Math.max(0, ...users.map((u) => u.id)) + 1,
          nome: "",
          email: "",
          telefone: "",
          tipoUsuario: 4,
          dataCriacao: new Date().toISOString(),
          role: "Membro",
          status: "Pendente",
          dataRegistro: new Date().toISOString(),
        };

    setSelectedUser(user ?? null);
    setUserForm(newUser);
    setIsUserDialogOpen(true);
  };

  const closeUserDialog = () => {
    setSelectedUser(null);
    setUserForm(null);
    setIsUserDialogOpen(false);
  };

  const saveUser = (updatedUser: AdminUser) => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === updatedUser.id);
      if (exists) {
        return prev.map((u) => (u.id === updatedUser.id ? updatedUser : u));
      }
      return [updatedUser, ...prev];
    });
    toast({ title: "Usuário salvo", description: "As alterações foram aplicadas." });
    closeUserDialog();
  };

  const deleteUser = (userId: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmed) return;
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (selectedUser?.id === userId) {
      closeUserDialog();
    }
    toast({ title: "Usuário excluído", description: "O usuário foi removido da lista." });
  };

  const acceptUser = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              status: "Ativo",
            }
          : u,
      ),
    );
    toast({ title: "Usuário aceito", description: "O usuário agora está ativo." });
  };

  const rejectUser = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              status: "Inativo",
            }
          : u,
      ),
    );
    toast({ title: "Usuário rejeitado", description: "O usuário foi marcado como inativo." });
  };

  const openChampionshipDialog = (championship: Championship, mode: "view" | "edit") => {
    setSelectedChampionship(championship);
    setChampionshipMode(mode);
    setChampionshipForm(championship);
    setChampionshipDialogOpen(true);
  };

  const closeChampionshipDialog = () => {
    setSelectedChampionship(null);
    setChampionshipForm(null);
    setChampionshipDialogOpen(false);
  };

  const saveChampionship = (updated: Championship) => {
    setChampionships((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    toast({ title: "Campeonato atualizado", description: "As alterações foram salvas." });
    closeChampionshipDialog();
  };


  const approveTeam = async (teamId: number) => {
    // TODO: substituir por chamada real ao backend (por exemplo: /teams/{id}/approve)

    const team = pendingTeams.find((t) => t.id === teamId);
    if (!team) return;

    setPendingTeams((prev) => prev.filter((t) => t.id !== teamId));

    // Cria record no formato de 'time cadastrado' (dados zerados/iniciais)
    const approvedTeam = {
      ...team,
      status: "Aprovado",
      createdAt: new Date().toISOString(),
    };

    setTeams((prev) => [approvedTeam, ...prev]);

    toast({
      title: "Time aprovado",
      description: "O time foi aprovado e adicionado à lista de times.",
    });
  };

  const rejectTeam = async (teamId: number) => {
    // TODO: substituir por chamada real ao backend (por exemplo: /teams/{id}/reject)

    setPendingTeams((prev) => prev.filter((t) => t.id !== teamId));

    toast({
      title: "Time recusado",
      description: "O time foi recusado e removido da fila.",
    });
  };

  // Check authentication and admin status
  if (!isAuthenticated || !isAdmin) {
    navigate("/");
    return null;
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    description, 
    trend 
  }: { 
    title: string; 
    value: string | number; 
    icon: React.ElementType; 
    description?: string;
    trend?: { value: number; positive: boolean };
  }) => (
    <Card className="bg-card/50 backdrop-blur-sm border-femee-purple/20">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {trend && (
              <div className={`flex items-center gap-1 mt-1 text-xs ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
                <TrendingUp className={`h-3 w-3 ${!trend.positive && 'rotate-180'}`} />
                <span>{trend.positive ? '+' : ''}{trend.value}%</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-full bg-femee-purple/10">
            <Icon className="h-5 w-5 text-femee-purple" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge variant="destructive">Admin</Badge>;
      case "Capitao":
        return <Badge variant="default">Capitão</Badge>;
      default:
        return <Badge variant="secondary">Membro</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Ativo</Badge>;
      case "Pendente":
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Pendente</Badge>;
      case "Inativo":
        return <Badge variant="secondary">Inativo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-femee-darker via-background to-femee-darker">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">
              Bem-vindo, {user?.nome}. Gerencie a plataforma FEMEE.
            </p>
          </div>
          <Badge variant="destructive" className="text-sm">
            <Shield className="h-4 w-4 mr-1" />
            Admin
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="usuarios" className="gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="times" className="gap-2">
              <Gamepad2 className="h-4 w-4" />
              Times
            </TabsTrigger>
            <TabsTrigger value="campeonatos" className="gap-2">
              <Trophy className="h-4 w-4" />
              Campeonatos
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total de Usuários"
                value={dashboardStats.totalUsuarios}
                icon={Users}
                trend={{ value: dashboardStats.crescimentoMensal, positive: true }}
              />
              <StatCard
                title="Usuários Ativos"
                value={dashboardStats.usuariosAtivos}
                icon={Activity}
                description="Últimos 30 dias"
              />
              <StatCard
                title="Times Cadastrados"
                value={dashboardStats.totalTimes}
                icon={Gamepad2}
              />
              <StatCard
                title="Campeonatos Ativos"
                value={dashboardStats.campeonatosAtivos}
                icon={Trophy}
              />
            </div>

            {/* Alerts */}
            {inscricoesPendentes > 0 && (
              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Atenção: {inscricoesPendentes} inscrições pendentes</p>
                      <p className="text-sm text-muted-foreground">
                        Existem times aguardando aprovação para campeonatos.
                      </p>
                    </div>
                    <Button size="sm" className="ml-auto" onClick={() => {
                      setActiveTab('times');
                      document.getElementById('pending-teams')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                      Revisar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card/50 backdrop-blur-sm border-femee-purple/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Últimos Registros
                  </CardTitle>
                  <CardDescription>Usuários registrados recentemente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{user.nome}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        {getStatusBadge(user.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card id="pending-teams" className="bg-card/50 backdrop-blur-sm border-femee-purple/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Times Pendentes
                  </CardTitle>
                  <CardDescription>Aguardando aprovação</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingTeams.map((team) => (
                      <div key={team.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{team.nome}</p>
                          <p className="text-sm text-muted-foreground">{team.jogo}</p>
                        </div>
                        <Badge className="h-7 inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                          <Hourglass className="h-4 w-4" />
                          Pendente
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="usuarios">
            <Card className="bg-card/50 backdrop-blur-sm border-femee-purple/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gerenciamento de Usuários</CardTitle>
                    <CardDescription>
                      Visualize e gerencie todos os usuários da plataforma
                    </CardDescription>
                  </div>
                  <Button
                    className="bg-femee-purple hover:bg-femee-purple/90"
                    onClick={() => openUserDialog()}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Usuário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      placeholder="Pesquisar usuário por nome ou email"
                      value={userFilter}
                      onChange={(event) => {
                        setUserFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="max-w-sm"
                    />

                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mostrando {paginatedUsers.length} de {filteredUsers.length} usuários
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data de Registro</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          Nenhum usuário encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.nome}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{new Date(user.dataRegistro).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openUserDialog(user)}
                                title="Visualizar/Editar"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>

                              {user.status === "Pendente" ? (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-500 hover:bg-green-500/10"
                                    onClick={() => acceptUser(user.id)}
                                    title="Aceitar usuário"
                                  >
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:bg-red-500/10"
                                    onClick={() => rejectUser(user.id)}
                                    title="Recusar usuário"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:bg-red-500/10"
                                  onClick={() => deleteUser(user.id)}
                                  title="Excluir usuário"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <div className="mt-4 flex items-center justify-end gap-2 text-sm text-muted-foreground">
                  <span>Página {currentPage} de {totalPages}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    >
                      Anterior
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <Dialog open={isUserDialogOpen} onOpenChange={(open) => !open && closeUserDialog()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedUser ? "Editar Usuário" : "Adicionar Usuário"}</DialogTitle>
                <DialogDescription>
                  Preencha as informações do usuário. Isso será persistido apenas em memória (mock).
                </DialogDescription>
              </DialogHeader>
              {userForm && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user-name">Nome</Label>
                    <Input
                      id="user-name"
                      value={userForm.nome}
                      onChange={(event) => setUserForm((prev) => prev ? { ...prev, nome: event.target.value } : prev)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-email">E-mail</Label>
                    <Input
                      id="user-email"
                      value={userForm.email}
                      onChange={(event) => setUserForm((prev) => prev ? { ...prev, email: event.target.value } : prev)}
                    />
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="user-role">Função</Label>
                      <Select
                        value={userForm.role}
                        onValueChange={(value) =>
                          setUserForm((prev) => (prev ? { ...prev, role: value as AdminUser["role"] } : prev))
                        }
                      >
                        <SelectTrigger id="user-role">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Capitao">Capitão</SelectItem>
                          <SelectItem value="Membro">Membro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="user-status">Status</Label>
                      <Select
                        value={userForm.status}
                        onValueChange={(value) =>
                          setUserForm((prev) => (prev ? { ...prev, status: value as AdminUser["status"] } : prev))
                        }
                      >
                        <SelectTrigger id="user-status">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="ghost" onClick={closeUserDialog}>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    if (userForm) {
                      saveUser(userForm);
                    }
                  }}
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Teams Tab */}
          <TabsContent value="times" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-femee-purple/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Times Pendentes</CardTitle>
                    <CardDescription>
                      Aprove ou recuse os times que aguardam aprovação
                    </CardDescription>
                  </div>
                  <Button className="bg-femee-purple hover:bg-femee-purple/90">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Criar Time
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Time</TableHead>
                      <TableHead>Jogo</TableHead>
                      <TableHead>Capitão</TableHead>
                      <TableHead>Data de Submissão</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTeams.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                          Nenhum time pendente no momento.
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingTeams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{team.nome}</TableCell>
                          <TableCell>{team.jogo}</TableCell>
                          <TableCell>{team.capitao}</TableCell>
                          <TableCell>{new Date(team.dataSubmissao).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500 hover:text-green-600"
                              onClick={() => approveTeam(team.id)}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Aprovar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => rejectTeam(team.id)}
                            >
                              Recusar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-femee-purple/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Times Cadastrados</CardTitle>
                    <CardDescription>
                      Times aprovados foram listados aqui
                    </CardDescription>
                  </div>
                  <Button className="bg-femee-purple hover:bg-femee-purple/90">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Criar Time
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Time</TableHead>
                      <TableHead>Jogo</TableHead>
                      <TableHead>Capitão</TableHead>
                      <TableHead>Data de Submissão</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teams.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                          Nenhum time cadastrado ainda. Aprove times pendentes para começar.
                        </TableCell>
                      </TableRow>
                    ) : (
                      teams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{team.nome}</TableCell>
                          <TableCell>{team.jogo}</TableCell>
                          <TableCell>{team.capitao}</TableCell>
                          <TableCell>{new Date(team.dataSubmissao).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">Aprovado</Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Championships Tab */}
          <TabsContent value="campeonatos">
            <Card className="bg-card/50 backdrop-blur-sm border-femee-purple/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gerenciamento de Campeonatos</CardTitle>
                    <CardDescription>
                      Visualize e gerencie todos os campeonatos
                    </CardDescription>
                  </div>
                  <Button className="bg-femee-purple hover:bg-femee-purple/90">
                    <Trophy className="h-4 w-4 mr-2" />
                    Criar Campeonato
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Jogo</TableHead>
                      <TableHead>Fase</TableHead>
                      <TableHead>Participantes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {championships.map((championship) => (
                      <TableRow key={championship.id}>
                        <TableCell className="font-medium">{championship.nome}</TableCell>
                        <TableCell>{championship.jogo}</TableCell>
                        <TableCell>{championship.fase}</TableCell>
                        <TableCell>{championship.participantes}</TableCell>
                        <TableCell>
                          <Badge variant={championship.status === "Em Andamento" ? "default" : "secondary"}>
                            {championship.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openChampionshipDialog(championship, "view")}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openChampionshipDialog(championship, "edit")}
                            >
                              <Settings className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campeonato detail / edit dialog */}
          <Dialog open={championshipDialogOpen} onOpenChange={(open) => !open && closeChampionshipDialog()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {championshipMode === "view" ? "Detalhes do Campeonato" : "Editar Campeonato"}
                </DialogTitle>
                <DialogDescription>
                  {championshipMode === "view"
                    ? "Visualize dados do campeonato, equipes e partidas."
                    : "Atualize os dados do campeonato ou os placares das partidas."}
                </DialogDescription>
              </DialogHeader>

              {championshipForm && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Nome</p>
                      <p className="text-foreground">{championshipForm.nome}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Jogo</p>
                      <p className="text-foreground">{championshipForm.jogo}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Status</p>
                      {championshipMode === "view" ? (
                        <Badge variant={championshipForm.status === "Em Andamento" ? "default" : "secondary"}>
                          {championshipForm.status}
                        </Badge>
                      ) : (
                        <Select
                          value={championshipForm.status}
                          onValueChange={(value) =>
                            setChampionshipForm((prev) => (prev ? { ...prev, status: value as ChampionshipStatus } : prev))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inscrições Abertas">Inscrições Abertas</SelectItem>
                            <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                            <SelectItem value="Finalizado">Finalizado</SelectItem>
                            <SelectItem value="Cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Fase</p>
                      {championshipMode === "view" ? (
                        <p className="text-foreground">{championshipForm.fase}</p>
                      ) : (
                        <Input
                          value={championshipForm.fase}
                          onChange={(event) =>
                            setChampionshipForm((prev) => (prev ? { ...prev, fase: event.target.value } : prev))
                          }
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Live</p>
                      {championshipMode === "view" ? (
                        championshipForm.liveUrl ? (
                          <a
                            href={championshipForm.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary underline"
                          >
                            Assistir ao vivo
                          </a>
                        ) : (
                          <p className="text-muted-foreground">Nenhuma transmissão</p>
                        )
                      ) : (
                        <Input
                          placeholder="URL da transmissão"
                          value={championshipForm.liveUrl ?? ""}
                          onChange={(event) =>
                            setChampionshipForm((prev) => (prev ? { ...prev, liveUrl: event.target.value } : prev))
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Times Participantes</p>
                      <div className="grid gap-1">
                        {championshipForm.teams.map((team) => (
                          <div
                            key={team.id}
                            className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2"
                          >
                            <span>{team.nome}</span>
                            <span className="text-xs font-semibold">
                              {team.status === "Participando" ? "Em disputa" : team.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Partidas</p>
                      <div className="space-y-2">
                        {championshipForm.matches.map((match) => (
                          <div
                            key={match.id}
                            className="rounded-md bg-muted/30 p-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{match.phase}</span>
                              <span className="text-xs text-muted-foreground">{new Date(match.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{match.teamA}</span>
                                {championshipMode === "edit" ? (
                                  <Input
                                    type="number"
                                    value={match.scoreA}
                                    onChange={(event) => {
                                      const score = Number(event.target.value);
                                      setChampionshipForm((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              matches: prev.matches.map((m) =>
                                                m.id === match.id ? { ...m, scoreA: score } : m,
                                              ),
                                            }
                                          : prev,
                                      );
                                    }}
                                    className="w-16"
                                  />
                                ) : (
                                  <span className="font-semibold">{match.scoreA}</span>
                                )}
                              </div>
                              <span className="text-muted-foreground">x</span>
                              <div className="flex items-center gap-2">
                                {championshipMode === "edit" ? (
                                  <Input
                                    type="number"
                                    value={match.scoreB}
                                    onChange={(event) => {
                                      const score = Number(event.target.value);
                                      setChampionshipForm((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              matches: prev.matches.map((m) =>
                                                m.id === match.id ? { ...m, scoreB: score } : m,
                                              ),
                                            }
                                          : prev,
                                      );
                                    }}
                                    className="w-16"
                                  />
                                ) : (
                                  <span className="font-semibold">{match.scoreB}</span>
                                )}
                                <span className="text-sm text-muted-foreground">{match.teamB}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="ghost" onClick={closeChampionshipDialog}>
                  Fechar
                </Button>
                {championshipMode === "edit" && championshipForm && (
                  <Button
                    onClick={() => {
                      saveChampionship(championshipForm);
                    }}
                  >
                    Salvar alterações
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
