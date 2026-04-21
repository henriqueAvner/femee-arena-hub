import { Users } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import TimeCard from "@/components/cards/TimeCard";
import { LoadingPage } from "@/components/ui/loading";
import { ErrorPage } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { useTimes } from "@/hooks/useTimes";

const Times = () => {
  const { data, isLoading, error, refetch } = useTimes();

  if (isLoading) return <LoadingPage message="Carregando times..." />;
  if (error) return <ErrorPage title="Erro" message="Tente novamente." onRetry={refetch} />;

  return (
    <PageLayout>
      <div className="container px-4 py-12">
        <header className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Equipes filiadas</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Times</h1>
          <p className="mt-2 text-muted-foreground">
            Conheça as equipes que disputam as competições da FEMEE.
          </p>
        </header>

        {!data || data.length === 0 ? (
          <EmptyState icon={Users} title="Nenhum time" description="Lista em breve." />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((t) => (
              <TimeCard key={t.id} time={t} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Times;
