import { Link } from "react-router-dom";
import { Trophy, Shield, Medal } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { LoadingPage } from "@/components/ui/loading";
import { ErrorPage } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRanking } from "@/hooks/useRanking";

const positionStyle = (pos: number) => {
  if (pos === 1) return "bg-primary text-primary-foreground";
  if (pos === 2) return "bg-muted text-foreground";
  if (pos === 3) return "bg-accent text-accent-foreground";
  return "bg-muted/40 text-muted-foreground";
};

const Ranking = () => {
  const { data, isLoading, error, refetch } = useRanking();

  if (isLoading) return <LoadingPage message="Carregando ranking..." />;
  if (error)
    return <ErrorPage title="Erro" message="Tente novamente." onRetry={refetch} />;

  const ordered = [...(data ?? [])].sort(
    (a, b) => b.pontos - a.pontos || b.vitorias - a.vitorias
  );

  return (
    <PageLayout>
      <div className="container px-4 py-12">
        <header className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Trophy className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Classificação geral
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Ranking de times</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Pontuação acumulada das equipes filiadas, considerando o desempenho em
            todos os campeonatos disputados na FEMEE.
          </p>
        </header>

        {!ordered.length ? (
          <EmptyState
            icon={Trophy}
            title="Sem pontuações ainda"
            description="O ranking será exibido assim que os campeonatos registrarem resultados."
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-center">Camp.</TableHead>
                  <TableHead className="text-center">V</TableHead>
                  <TableHead className="text-center">E</TableHead>
                  <TableHead className="text-center">D</TableHead>
                  <TableHead className="text-right">Pontos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordered.map((row, idx) => {
                  const pos = idx + 1;
                  return (
                    <TableRow key={row.time_id} className="border-border">
                      <TableCell className="text-center">
                        <span
                          className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                            positionStyle(pos)
                          )}
                        >
                          {pos <= 3 ? <Medal className="h-4 w-4" /> : pos}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/times/${row.slug}`}
                          className="group flex items-center gap-3"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                            {row.logo ? (
                              <img
                                src={row.logo}
                                alt={row.nome}
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Shield className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                                {row.nome}
                              </span>
                              {row.sigla && (
                                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                                  {row.sigla}
                                </span>
                              )}
                            </div>
                            {row.cidade && (
                              <span className="text-xs text-muted-foreground">
                                {row.cidade}
                              </span>
                            )}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {row.campeonatos_disputados}
                      </TableCell>
                      <TableCell className="text-center text-sm text-foreground">
                        {row.vitorias}
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {row.empates}
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {row.derrotas}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-lg font-bold text-primary">
                          {row.pontos}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          Sistema de pontuação: 3 pontos por vitória, 1 por empate, 0 por derrota.
          Critérios de desempate: número de vitórias.
        </p>
      </div>
    </PageLayout>
  );
};

export default Ranking;
