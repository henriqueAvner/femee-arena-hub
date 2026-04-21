import { useState } from "react";
import { Trophy } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CampeonatoCard from "@/components/cards/CampeonatoCard";
import { LoadingPage } from "@/components/ui/loading";
import { ErrorPage } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCampeonatos } from "@/hooks/useCampeonatos";
import type { CampeonatoStatus } from "@/lib/types";

type Filter = "todos" | CampeonatoStatus;

const Campeonatos = () => {
  const [filter, setFilter] = useState<Filter>("todos");
  const { data, isLoading, error, refetch } = useCampeonatos();

  if (isLoading) return <LoadingPage message="Carregando campeonatos..." />;
  if (error)
    return <ErrorPage title="Erro ao carregar campeonatos" message="Tente novamente." onRetry={refetch} />;

  const filtered =
    filter === "todos" ? data ?? [] : (data ?? []).filter((c) => c.status === filter);

  return (
    <PageLayout>
      <div className="container px-4 py-12">
        <header className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Trophy className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Competições</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Campeonatos</h1>
          <p className="mt-2 text-muted-foreground">
            Conheça as competições oficiais da FEMEE.
          </p>
        </header>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="mb-8">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="em_andamento">Em andamento</TabsTrigger>
            <TabsTrigger value="futuro">Próximos</TabsTrigger>
            <TabsTrigger value="encerrado">Encerrados</TabsTrigger>
          </TabsList>
          <TabsContent value={filter} className="mt-8">
            {filtered.length === 0 ? (
              <EmptyState
                icon={Trophy}
                title="Nenhum campeonato"
                description="Não há competições nessa categoria no momento."
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c) => (
                  <CampeonatoCard key={c.id} campeonato={c} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Campeonatos;
