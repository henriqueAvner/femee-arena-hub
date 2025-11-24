import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, MapPin } from "lucide-react";
import { useState } from "react";
import RegistrationDialog from "@/components/forms/RegistrationDialog";

interface Championship {
  id: number;
  title: string;
  game: string;
  date: string;
  location: string;
  teams: number;
  prize: string;
  status: "open" | "upcoming" | "closed";
}

const championships: Championship[] = [
  {
    id: 1,
    title: "Campeonato Regional 2025",
    game: "CS:GO",
    date: "15/01/2025",
    location: "Belo Horizonte - MG",
    teams: 16,
    prize: "R$ 10.000",
    status: "open"
  },
  {
    id: 2,
    title: "Copa FEMEE de Inverno",
    game: "League of Legends",
    date: "20/02/2025",
    location: "Contagem - MG",
    teams: 8,
    prize: "R$ 5.000",
    status: "open"
  },
  {
    id: 3,
    title: "Torneio Estadual",
    game: "Valorant",
    date: "10/03/2025",
    location: "Uberlândia - MG",
    teams: 12,
    prize: "R$ 8.000",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Championship Finals 2025",
    game: "Rainbow Six",
    date: "25/04/2025",
    location: "Belo Horizonte - MG",
    teams: 8,
    prize: "R$ 15.000",
    status: "upcoming"
  },
];

const Campeonatos = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: Championship["status"]) => {
    switch (status) {
      case "open":
        return <span className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded">Inscrições Abertas</span>;
      case "upcoming":
        return <span className="px-2 py-1 text-xs font-semibold bg-accent/20 text-accent rounded">Em Breve</span>;
      case "closed":
        return <span className="px-2 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded">Encerrado</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Campeonatos</h1>
          <p className="text-muted-foreground">Próximos torneios e competições da FEMEE</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {championships.map((championship) => (
            <Card key={championship.id} className="p-6 hover:bg-secondary/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{championship.title}</h3>
                  <p className="text-sm text-muted-foreground">{championship.game}</p>
                </div>
                {getStatusBadge(championship.status)}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{championship.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{championship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{championship.teams} times</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-gold" />
                  <span className="text-foreground font-semibold">{championship.prize}</span>
                </div>
              </div>

              {championship.status === "open" && (
                <Button 
                  className="w-full esports-glow"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Inscrever-se
                </Button>
              )}
              {championship.status === "upcoming" && (
                <Button variant="secondary" className="w-full" disabled>
                  Em Breve
                </Button>
              )}
            </Card>
          ))}
        </div>
      </main>
      <RegistrationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default Campeonatos;
