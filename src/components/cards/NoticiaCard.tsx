import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Noticia } from "@/lib/types";

interface Props {
  noticia: Noticia;
  variant?: "default" | "featured";
}

const NoticiaCard = ({ noticia, variant = "default" }: Props) => {
  const date = new Date(noticia.publicado_em).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (variant === "featured") {
    return (
      <Link to={`/noticias/${noticia.slug}`} className="group block">
        <Card className="card-hover overflow-hidden border-border bg-card">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-video md:aspect-auto md:h-full overflow-hidden bg-muted">
              {noticia.imagem_capa ? (
                <img
                  src={noticia.imagem_capa}
                  alt={noticia.titulo}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}
            </div>
            <div className="flex flex-col justify-center gap-3 p-6">
              <span className="w-fit rounded bg-primary/15 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Destaque
              </span>
              <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                {noticia.titulo}
              </h3>
              {noticia.resumo && (
                <p className="text-sm text-muted-foreground line-clamp-3">{noticia.resumo}</p>
              )}
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{date}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/noticias/${noticia.slug}`} className="group block h-full">
      <Card className="card-hover flex h-full flex-col overflow-hidden border-border bg-card">
        <div className="aspect-video overflow-hidden bg-muted">
          {noticia.imagem_capa ? (
            <img
              src={noticia.imagem_capa}
              alt={noticia.titulo}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {noticia.titulo}
          </h3>
          {noticia.resumo && (
            <p className="line-clamp-3 text-sm text-muted-foreground">{noticia.resumo}</p>
          )}
          <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default NoticiaCard;
