import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { useParams, Link } from "react-router-dom";
import { Trophy, Users, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamDetail = () => {
  const { teamId } = useParams();

  // Mock data - em produção viria de uma API
  const teamName = teamId?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || "Time";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link to="/times" className="text-primary hover:underline mb-4 inline-block">
          ← Voltar para Times
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <Trophy className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{teamName}</h1>
                  <p className="text-muted-foreground">Time Profissional de eSports</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Vitórias</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-3xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Derrotas</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">80%</p>
                  <p className="text-sm text-muted-foreground">Taxa</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-3xl font-bold text-gold">2</p>
                  <p className="text-sm text-muted-foreground">Títulos</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Elenco
              </h2>
              <div className="space-y-3">
                {['Capitão', 'Jogador 2', 'Jogador 3', 'Jogador 4', 'Reserva'].map((player, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {player.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{player}</p>
                      <p className="text-sm text-muted-foreground">Função: {i === 0 ? 'IGL' : i === 4 ? 'Sub' : 'Player'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-gold" />
                Conquistas
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-gold/10 rounded-lg border border-gold/20">
                  <p className="font-semibold text-foreground">🏆 Campeão 2024</p>
                  <p className="text-sm text-muted-foreground">Campeonato Regional</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="font-semibold text-foreground">🥈 Vice 2023</p>
                  <p className="text-sm text-muted-foreground">Campeonato Estadual</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Próximas Partidas
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="font-semibold text-foreground">vs Phoenix Squad</p>
                  <p className="text-sm text-muted-foreground">15/12/2024 - 20:00</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="font-semibold text-foreground">vs Cyber Warriors</p>
                  <p className="text-sm text-muted-foreground">22/12/2024 - 18:00</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamDetail;
