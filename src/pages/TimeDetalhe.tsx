import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Shield, Trophy, Users } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading";
import { ErrorPage } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import CampeonatoCard from "@/components/cards/CampeonatoCard";
import { useTimeBySlug } from "@/hooks/useTimes";

const TimeDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, refetch } = useTimeBySlug(slug ?? "");

  if (isLoading) return <LoadingPage message="Carregando time..." />;
  if (error) return <ErrorPage title="Erro" message="Tente novamente." onRetry={refetch} />;

  if (!data)
    return (
      <PageLayout>
        <div className="container px-4 py-12">
          <EmptyState
            icon={Users}
            title="Time não encontrado"
            description="Este time não existe ou foi removido."
            action={{ label: "Ver todos os times", href: "/times" }}
          />
        </div>
      </PageLayout>
    );

  return (
    <PageLayout>
      <div className="container px-4 py-10">
        <Link to="/times" className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Voltar para times
        </Link>

        <Card className="mb-8 border-border bg-card p-6 md:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              {data.logo ? (
                <img src={data.logo} alt={data.nome} className="h-full w-full object-cover" />
              ) : (
                <Shield className="h-12 w-12 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground md:text-4xl">{data.nome}</h1>
                {data.sigla && (
                  <span className="rounded bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                    {data.sigla}
                  </span>
                )}
              </div>
              {data.cidade && (
                <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{data.cidade}</span>
                </div>
              )}
              {data.descricao && <p className="mt-4 text-muted-foreground">{data.descricao}</p>}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
              <Users className="h-6 w-6 text-primary" />
              Elenco
            </h2>
            {data.jogadores.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum jogador cadastrado.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {data.jogadores.map((j) => (
                  <Card key={j.id} className="flex items-center gap-3 border-border bg-card p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15 text-primary font-bold">
                      {j.foto ? (
                        <img src={j.foto} alt={j.nickname} className="h-full w-full object-cover" />
                      ) : (
                        j.nickname.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">{j.nickname}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {j.nome}
                        {j.posicao && ` · ${j.posicao}`}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
              <Trophy className="h-6 w-6 text-primary" />
              Campeonatos
            </h2>
            {data.campeonatos.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum campeonato vinculado.</p>
            ) : (
              <div className="space-y-4">
                {data.campeonatos.map((c) => (
                  <CampeonatoCard key={c.id} campeonato={c} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default TimeDetalhe;
