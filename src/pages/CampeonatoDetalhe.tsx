import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Trophy } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading";
import { ErrorPage } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import TimeCard from "@/components/cards/TimeCard";
import { useCampeonatoBySlug } from "@/hooks/useCampeonatos";
import { STATUS_LABEL } from "@/lib/types";

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : null;

const CampeonatoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, refetch } = useCampeonatoBySlug(slug ?? "");

  if (isLoading) return <LoadingPage message="Carregando campeonato..." />;
  if (error) return <ErrorPage title="Erro" message="Tente novamente." onRetry={refetch} />;

  if (!data)
    return (
      <PageLayout>
        <div className="container px-4 py-12">
          <EmptyState
            icon={Trophy}
            title="Campeonato não encontrado"
            description="Esta competição não existe ou foi removida."
            action={{ label: "Ver todos", href: "/campeonatos" }}
          />
        </div>
      </PageLayout>
    );

  const inicio = formatDate(data.data_inicio);
  const fim = formatDate(data.data_fim);

  return (
    <PageLayout>
      <div className="container px-4 py-10">
        <Link
          to="/campeonatos"
          className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para campeonatos
        </Link>

        <Card className="mb-8 overflow-hidden border-border bg-card">
          {data.imagem && (
            <div className="aspect-[21/9] overflow-hidden bg-muted">
              <img src={data.imagem} alt={data.nome} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="p-6 md:p-8">
            <Badge variant="outline" className="mb-3">
              {STATUS_LABEL[data.status]}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">{data.nome}</h1>
            {data.descricao && (
              <p className="mt-4 max-w-3xl text-muted-foreground">{data.descricao}</p>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {inicio && (
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                  <Calendar className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Período</p>
                    <p className="text-sm font-medium text-foreground">
                      {inicio}
                      {fim && ` — ${fim}`}
                    </p>
                  </div>
                </div>
              )}
              {data.local && (
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Local</p>
                    <p className="text-sm font-medium text-foreground">{data.local}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                <Trophy className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Times participantes</p>
                  <p className="text-sm font-medium text-foreground">{data.times.length}</p>
                </div>
              </div>
            </div>

            {data.regulamento_link && (
              <Button asChild variant="outline" className="mt-6">
                <a href={data.regulamento_link} target="_blank" rel="noreferrer">
                  Ver regulamento
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </Card>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Times participantes</h2>
          {data.times.length === 0 ? (
            <EmptyState icon={Trophy} title="Sem times" description="Lista de inscritos em breve." />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.times.map((t) => (
                <TimeCard key={t.id} time={t} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
};

export default CampeonatoDetalhe;
