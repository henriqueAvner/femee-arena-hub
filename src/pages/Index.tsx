import Header from "@/components/layout/Header";
import NewsCard from "@/components/features/NewsCard";
import TeamRanking from "@/components/features/TeamRanking";
import MerchandiseAd from "@/components/features/MerchandiseAd";
import ChampionshipCard from "@/components/features/ChampionshipCard";
import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import { Newspaper, Trophy } from "lucide-react";

const Index = () => {
  const news = [
    {
      title: "Thunder Gaming conquista o Campeonato Mineiro de Valorant 2024",
      excerpt: "Em uma final emocionante, Thunder Gaming derrotou Phoenix Squad por 3-1 e levou o título mais importante do ano.",
      date: "15 Nov 2025",
      comments: 42,
      category: "Valorant",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
    },
    {
      title: "Abertas inscrições para o Torneio de League of Legends 2025",
      excerpt: "A FEMEE anuncia o maior torneio de LoL do estado com premiação recorde de R$ 50.000.",
      date: "14 Nov 2025",
      comments: 38,
      category: "League of Legends",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
    },
    {
      title: "Cyber Warriors anuncia novo roster para temporada 2025",
      excerpt: "Time faz mudanças estratégicas visando os principais campeonatos do próximo ano.",
      date: "13 Nov 2025",
      comments: 25,
      category: "Notícias",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
    },
    {
      title: "Recordes de audiência no último campeonato da FEMEE",
      excerpt: "Final do campeonato de CS2 alcança 50 mil espectadores simultâneos nas plataformas de streaming.",
      date: "12 Nov 2025",
      comments: 31,
      category: "Estatísticas"
    },
  ];

  const upcomingChampionships = [
    {
      title: "Copa FEMEE de League of Legends",
      game: "League of Legends",
      date: "20-22 Dez 2025",
      registrationDeadline: "10 Dez 2025",
      prize: "R$ 50.000",
      teams: 24,
      status: "registration-open" as const
    },
    {
      title: "Campeonato Mineiro de CS2",
      game: "Counter-Strike 2",
      date: "15-17 Jan 2026",
      registrationDeadline: "05 Jan 2026",
      prize: "R$ 35.000",
      teams: 16,
      status: "registration-open" as const
    },
    {
      title: "Torneio Valorant Masters MG",
      game: "Valorant",
      date: "05-07 Fev 2026",
      registrationDeadline: "25 Jan 2026",
      prize: "R$ 40.000",
      teams: 8,
      status: "upcoming" as const
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBanner}
            alt="FEMEE Championship Arena"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative container h-full flex items-end pb-12 px-4">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Esportes Eletrônicos de <span className="text-primary">Minas Gerais</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A casa dos maiores campeonatos de esports do estado
            </p>
            <div className="flex gap-3 pt-4">
              <Button size="lg" className="esports-glow">
                Ver Campeonatos
              </Button>
              <Button size="lg" variant="secondary">
                Sobre a FEMEE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Team Ranking */}
          <aside className="lg:col-span-3 space-y-6">
            <TeamRanking />
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-6 space-y-12">
            {/* Latest News Section */}
            <section id="noticias">
              <div className="flex items-center gap-2 mb-6">
                <Newspaper className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Últimas Notícias</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((item, index) => (
                  <NewsCard key={index} {...item} />
                ))}
              </div>
            </section>

            {/* Upcoming Championships Section */}
            <section id="campeonatos">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-6 w-6 text-gold" />
                <h2 className="text-3xl font-bold text-foreground">Próximos Campeonatos</h2>
              </div>
              <div className="space-y-6">
                {upcomingChampionships.map((championship, index) => (
                  <ChampionshipCard key={index} {...championship} />
                ))}
              </div>
            </section>
          </main>

          {/* Right Sidebar - Merchandise */}
          <aside className="lg:col-span-3 space-y-6">
            <MerchandiseAd />
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="container py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">FEMEE</h3>
              <p className="text-sm text-muted-foreground">
                Federação Mineira de Esportes Eletrônicos
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Campeonatos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Valorant</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">League of Legends</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">CS2</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Institucional</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Regulamento</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Redes Sociais</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 FEMEE - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
