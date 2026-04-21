import { Link } from "react-router-dom";
import { MapPin, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Time } from "@/lib/types";

const TimeCard = ({ time }: { time: Time }) => (
  <Link to={`/times/${time.slug}`} className="group block h-full">
    <Card className="card-hover flex h-full items-center gap-4 border-border bg-card p-5">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
        {time.logo ? (
          <img src={time.logo} alt={time.nome} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <Shield className="h-8 w-8 text-primary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {time.nome}
          </h3>
          {time.sigla && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
              {time.sigla}
            </span>
          )}
        </div>
        {time.cidade && (
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{time.cidade}</span>
          </div>
        )}
      </div>
    </Card>
  </Link>
);

export default TimeCard;
