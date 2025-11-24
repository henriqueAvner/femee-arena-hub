import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";

interface RankingTeam {
  rank: number;
  previousRank: number;
  name: string;
  wins: number;
  losses: number;
  points: number;
}

const rankingTeams: RankingTeam[] = [
  { rank: 1, previousRank: 1, name: "Thunder Gaming", wins: 12, losses: 3, points: 36 },
  { rank: 2, previousRank: 3, name: "Phoenix Squad", wins: 10, losses: 5, points: 30 },
  { rank: 3, previousRank: 2, name: "Cyber Warriors", wins: 9, losses: 6, points: 27 },
  { rank: 4, previousRank: 5, name: "Digital Knights", wins: 8, losses: 7, points: 24 },
  { rank: 5, previousRank: 4, name: "Elite Force", wins: 7, losses: 8, points: 21 },
  { rank: 6, previousRank: 6, name: "Shadow Legends", wins: 6, losses: 9, points: 18 },
  { rank: 7, previousRank: 8, name: "Victory Squad", wins: 5, losses: 10, points: 15 },
  { rank: 8, previousRank: 7, name: "Royal Gamers", wins: 4, losses: 11, points: 12 },
  { rank: 9, previousRank: 10, name: "Nova Esports", wins: 4, losses: 11, points: 12 },
  { rank: 10, previousRank: 9, name: "Alpha Team", wins: 3, losses: 12, points: 9 },
  { rank: 11, previousRank: 11, name: "Beta Squad", wins: 3, losses: 12, points: 9 },
  { rank: 12, previousRank: 13, name: "Gamma Force", wins: 2, losses: 13, points: 6 },
  { rank: 13, previousRank: 12, name: "Delta Warriors", wins: 2, losses: 13, points: 6 },
  { rank: 14, previousRank: 14, name: "Epsilon Gaming", wins: 1, losses: 14, points: 3 },
  { rank: 15, previousRank: 15, name: "Zeta Esports", wins: 1, losses: 14, points: 3 },
  { rank: 16, previousRank: 16, name: "Omega Squad", wins: 0, losses: 15, points: 0 },
  { rank: 17, previousRank: 17, name: "Sigma Team", wins: 0, losses: 15, points: 0 },
  { rank: 18, previousRank: 18, name: "Kappa Gaming", wins: 0, losses: 15, points: 0 },
  { rank: 19, previousRank: 19, name: "Lambda Force", wins: 0, losses: 15, points: 0 },
  { rank: 20, previousRank: 20, name: "Mu Warriors", wins: 0, losses: 15, points: 0 },
];

const getTrendIcon = (current: number, previous: number) => {
  if (current < previous) return <TrendingUp className="h-4 w-4 text-primary" />;
  if (current > previous) return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const Ranking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Trophy className="h-10 w-10 text-gold" />
            Ranking de Times
          </h1>
          <p className="text-muted-foreground">Classificação geral dos times da FEMEE</p>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">#</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">V</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">D</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Pontos</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Tendência</th>
                </tr>
              </thead>
              <tbody>
                {rankingTeams.map((team) => (
                  <tr 
                    key={team.rank}
                    className="border-b border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        team.rank === 1 ? 'bg-gold text-gold-foreground' :
                        team.rank === 2 ? 'bg-muted text-foreground' :
                        team.rank === 3 ? 'bg-accent/30 text-accent' :
                        'bg-muted/50 text-muted-foreground'
                      }`}>
                        {team.rank}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Link 
                        to={`/times/${team.name.toLowerCase().replace(/ /g, '-')}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {team.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-center text-primary font-semibold">{team.wins}</td>
                    <td className="px-4 py-4 text-center text-muted-foreground">{team.losses}</td>
                    <td className="px-4 py-4 text-center font-bold text-foreground">{team.points}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        {getTrendIcon(team.rank, team.previousRank)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Ranking;
