import { Newspaper } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import NoticiaCard from "@/components/cards/NoticiaCard";
import { LoadingPage } from "@/components/ui/loading";
import { ErrorPage } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { useNoticias } from "@/hooks/useNoticias";

const Noticias = () => {
  const { data, isLoading, error, refetch } = useNoticias();

  if (isLoading) return <LoadingPage message="Carregando notícias..." />;
  if (error)
    return (
      <ErrorPage
        title="Erro ao carregar notícias"
        message="Tente novamente em instantes."
        onRetry={refetch}
      />
    );

  return (
    <PageLayout>
      <div className="container px-4 py-12">
        <header className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Newspaper className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Conteúdo</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Notícias</h1>
          <p className="mt-2 text-muted-foreground">
            Acompanhe as novidades do cenário mineiro de esports.
          </p>
        </header>

        {!data || data.length === 0 ? (
          <EmptyState icon={Newspaper} title="Nenhuma notícia" description="Volte em breve." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((n) => (
              <NoticiaCard key={n.id} noticia={n} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Noticias;
