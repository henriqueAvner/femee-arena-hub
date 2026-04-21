import { Link } from "react-router-dom";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Campeonato } from "@/lib/types";
import { STATUS_LABEL } from "@/lib/types";

const statusVariant: Record<Campeonato["status"], string> = {
  em_andamento: "bg-primary/20 text-primary border-primary/30",
  futuro: "bg-accent/20 text-accent border-accent/30",
  encerrado: "bg-muted text-muted-foreground border-border",
};

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : null;

const CampeonatoCard = ({ campeonato }: { campeonato: Campeonato }) => {
  const inicio = formatDate(campeonato.data_inicio);
  const fim = formatDate(campeonato.data_fim);

  return (
    <Link to={`/campeonatos/${campeonato.slug}`} className="group block h-full">
      <Card className="card-hover flex h-full flex-col overflow-hidden border-border bg-card">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {campeonato.imagem ? (
            <img
              src={campeonato.imagem}
              alt={campeonato.nome}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Trophy className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          <Badge
            variant="outline"
            className={`absolute left-3 top-3 ${statusVariant[campeonato.status]}`}
          >
            {STATUS_LABEL[campeonato.status]}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {campeonato.nome}
          </h3>
          {campeonato.descricao && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{campeonato.descricao}</p>
          )}
          <div className="mt-auto space-y-1.5 pt-2 text-xs text-muted-foreground">
            {inicio && (
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>
                  {inicio}
                  {fim && ` — ${fim}`}
                </span>
              </div>
            )}
            {campeonato.local && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{campeonato.local}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CampeonatoCard;
