import { Link } from "react-router-dom";
import { ArrowRight, Newspaper, Trophy, Users } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import NoticiaCard from "@/components/cards/NoticiaCard";
import CampeonatoCard from "@/components/cards/CampeonatoCard";
import TimeCard from "@/components/cards/TimeCard";
import { LoadingSpinner } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";
import { useNoticias, useNoticiaDestaque } from "@/hooks/useNoticias";
import { useCampeonatos } from "@/hooks/useCampeonatos";
import { useTimes } from "@/hooks/useTimes";
import heroBanner from "@/assets/hero-banner.jpg";

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  to,
  ctaLabel,
}: {
  icon: typeof Trophy;
  title: string;
  subtitle?: string;
  to: string;
  ctaLabel: string;
}) => (
  <div className="mb-6 flex items-end justify-between gap-4">
    <div>
      <div className="flex items-center gap-2 text-primary">
        <Icon className="h-5 w-5" />
        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
      </div>
      {subtitle && <h2 className="mt-1 text-3xl font-bold text-foreground">{subtitle}</h2>}
    </div>
    <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
      <Link to={to}>
        {ctaLabel}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </Button>
  </div>
);

const Index = () => {
  const { data: destaque } = useNoticiaDestaque();
  const { data: noticias, isLoading: loadingNoticias } = useNoticias(4);
  const { data: campeonatosAtivos, isLoading: loadingCamp } = useCampeonatos("em_andamento");
  const { data: campeonatosFuturos } = useCampeonatos("futuro");
  const { data: times, isLoading: loadingTimes } = useTimes();

  const proximos = [...(campeonatosAtivos ?? []), ...(campeonatosFuturos ?? [])].slice(0, 3);
  const noticiasGrid = (noticias ?? []).filter((n) => n.id !== destaque?.id).slice(0, 3);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden">
        <img
          src={heroBanner}
          alt="FEMEE Arena"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="container relative flex h-full items-end px-4 pb-14">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block rounded bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Portal oficial
            </span>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Esportes eletrônicos de <span className="text-primary">Minas Gerais</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Acompanhe as notícias, competições e times oficiais da Federação Mineira de Esportes
              Eletrônicos.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="esports-glow">
                <Link to="/campeonatos">Ver campeonatos</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/noticias">Ler notícias</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Notícias */}
      <section className="container px-4 py-16">
        <SectionHeader
          icon={Newspaper}
          title="Últimas atualizações"
          subtitle="Notícias"
          to="/noticias"
          ctaLabel="Ver todas"
        />
        {loadingNoticias && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {!loadingNoticias && !destaque && noticiasGrid.length === 0 && (
          <EmptyState icon={Newspaper} title="Sem notícias" description="Volte em breve para novidades." />
        )}
        <div className="space-y-6">
          {destaque && <NoticiaCard noticia={destaque} variant="featured" />}
          {noticiasGrid.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {noticiasGrid.map((n) => (
                <NoticiaCard key={n.id} noticia={n} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Campeonatos */}
      <section className="bg-card/40 py-16">
        <div className="container px-4">
          <SectionHeader
            icon={Trophy}
            title="Em andamento e próximos"
            subtitle="Campeonatos"
            to="/campeonatos"
            ctaLabel="Ver todos"
          />
          {loadingCamp && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}
          {!loadingCamp && proximos.length === 0 && (
            <EmptyState
              icon={Trophy}
              title="Nenhum campeonato ativo"
              description="Em breve novas competições serão anunciadas."
            />
          )}
          {proximos.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {proximos.map((c) => (
                <CampeonatoCard key={c.id} campeonato={c} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Times */}
      <section className="container px-4 py-16">
        <SectionHeader
          icon={Users}
          title="Equipes filiadas"
          subtitle="Times em destaque"
          to="/times"
          ctaLabel="Ver todos"
        />
        {loadingTimes && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {times && times.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {times.slice(0, 4).map((t) => (
              <TimeCard key={t.id} time={t} />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Index;
