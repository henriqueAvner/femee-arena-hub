import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { LoadingPage } from "@/components/ui/loading";
import { ErrorPage } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { useNoticiaBySlug } from "@/hooks/useNoticias";
import { Newspaper } from "lucide-react";

const NoticiaDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: noticia, isLoading, error, refetch } = useNoticiaBySlug(slug ?? "");

  if (isLoading) return <LoadingPage message="Carregando notícia..." />;
  if (error)
    return <ErrorPage title="Erro ao carregar notícia" message="Tente novamente." onRetry={refetch} />;

  if (!noticia)
    return (
      <PageLayout>
        <div className="container px-4 py-12">
          <EmptyState
            icon={Newspaper}
            title="Notícia não encontrada"
            description="A notícia que você procura não existe ou foi removida."
            action={{ label: "Ver todas as notícias", href: "/noticias" }}
          />
        </div>
      </PageLayout>
    );

  const date = new Date(noticia.publicado_em).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <PageLayout>
      <article className="container max-w-3xl px-4 py-10">
        <Link
          to="/noticias"
          className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para notícias
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {noticia.titulo}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Publicado em {date}</span>
          </div>
        </header>

        {noticia.imagem_capa && (
          <img
            src={noticia.imagem_capa}
            alt={noticia.titulo}
            className="mb-8 w-full rounded-lg object-cover"
          />
        )}

        {noticia.resumo && (
          <p className="mb-6 border-l-4 border-primary pl-4 text-lg italic text-muted-foreground">
            {noticia.resumo}
          </p>
        )}

        <div className="prose prose-invert max-w-none text-foreground">
          {noticia.conteudo.split("\n").map((p, i) => (
            <p key={i} className="mb-4 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </article>
    </PageLayout>
  );
};

export default NoticiaDetalhe;
