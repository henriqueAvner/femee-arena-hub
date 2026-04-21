import { Link } from "react-router-dom";
import { Newspaper, Trophy, Users } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Sobre = () => (
  <PageLayout>
    <div className="container max-w-4xl px-4 py-12">
      <header className="mb-10">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <Trophy className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Institucional</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Sobre a FEMEE</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Federação Mineira de Esportes Eletrônicos
        </p>
      </header>

      <div className="prose prose-invert max-w-none space-y-6 text-foreground">
        <p className="text-lg leading-relaxed text-muted-foreground">
          A FEMEE é a entidade responsável por organizar, promover e desenvolver o cenário
          competitivo de esportes eletrônicos em Minas Gerais. Nosso compromisso é oferecer
          competições justas, transparentes e profissionais, valorizando atletas, times e a
          comunidade gamer mineira.
        </p>

        <h2 className="text-2xl font-bold">Nossa missão</h2>
        <p className="text-muted-foreground">
          Estruturar o ecossistema de esports em Minas Gerais, criando oportunidades para
          jogadores, equipes e profissionais por meio de campeonatos oficiais, parcerias e
          desenvolvimento de talentos.
        </p>

        <h2 className="text-2xl font-bold">O que fazemos</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Organização de campeonatos estaduais oficiais.</li>
          <li>Apoio ao desenvolvimento de equipes e atletas mineiros.</li>
          <li>Comunicação e divulgação do cenário competitivo regional.</li>
          <li>Articulação com instituições, patrocinadores e parceiros.</li>
        </ul>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card p-5">
          <Newspaper className="mb-2 h-6 w-6 text-primary" />
          <h3 className="font-semibold text-foreground">Notícias</h3>
          <p className="mt-1 text-xs text-muted-foreground">Atualizações do cenário</p>
          <Button asChild variant="link" className="mt-1 h-auto p-0 text-primary">
            <Link to="/noticias">Ver notícias</Link>
          </Button>
        </Card>
        <Card className="border-border bg-card p-5">
          <Trophy className="mb-2 h-6 w-6 text-primary" />
          <h3 className="font-semibold text-foreground">Campeonatos</h3>
          <p className="mt-1 text-xs text-muted-foreground">Competições oficiais</p>
          <Button asChild variant="link" className="mt-1 h-auto p-0 text-primary">
            <Link to="/campeonatos">Ver campeonatos</Link>
          </Button>
        </Card>
        <Card className="border-border bg-card p-5">
          <Users className="mb-2 h-6 w-6 text-primary" />
          <h3 className="font-semibold text-foreground">Times</h3>
          <p className="mt-1 text-xs text-muted-foreground">Equipes filiadas</p>
          <Button asChild variant="link" className="mt-1 h-auto p-0 text-primary">
            <Link to="/times">Ver times</Link>
          </Button>
        </Card>
      </div>
    </div>
  </PageLayout>
);

export default Sobre;
