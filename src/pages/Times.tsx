import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

interface Team {
  id: string;
  name: string;
  wins: number;
  losses: number;
  logo?: string;
}

const allTeams: Team[] = [
  { id: "thunder-gaming", name: "Thunder Gaming", wins: 12, losses: 3 },
  { id: "phoenix-squad", name: "Phoenix Squad", wins: 10, losses: 5 },
  { id: "cyber-warriors", name: "Cyber Warriors", wins: 9, losses: 6 },
  { id: "digital-knights", name: "Digital Knights", wins: 8, losses: 7 },
  { id: "elite-force", name: "Elite Force", wins: 7, losses: 8 },
  { id: "shadow-legends", name: "Shadow Legends", wins: 6, losses: 9 },
  { id: "victory-squad", name: "Victory Squad", wins: 5, losses: 10 },
  { id: "royal-gamers", name: "Royal Gamers", wins: 4, losses: 11 },
];

const Times = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Times</h1>
          <p className="text-muted-foreground">Conheça os times participantes da FEMEE</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTeams.map((team) => (
            <Link key={team.id} to={`/times/${team.id}`}>
              <Card className="p-6 hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {team.wins}V - {team.losses}D
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Vitórias</p>
                    <p className="text-lg font-bold text-primary">{team.wins}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Derrotas</p>
                    <p className="text-lg font-bold text-foreground">{team.losses}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Taxa</p>
                    <p className="text-lg font-bold text-foreground">
                      {((team.wins / (team.wins + team.losses)) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Times;
