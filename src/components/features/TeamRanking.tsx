import { Trophy, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";

interface Team {
  rank: number;
  name: string;
  wins: number;
  logo?: string;
}

const teams: Team[] = [
  { rank: 1, name: "Thunder Gaming", wins: 12 },
  { rank: 2, name: "Phoenix Squad", wins: 10 },
  { rank: 3, name: "Cyber Warriors", wins: 9 },
  { rank: 4, name: "Digital Knights", wins: 8 },
  { rank: 5, name: "Elite Force", wins: 7 },
];

const TeamRanking = () => {
  return (
    <Card className="bg-card border-border p-4 space-y-4">
      <Link to="/ranking" className="flex items-center gap-2 pb-3 border-b border-border hover:opacity-80 transition-opacity">
        <Trophy className="h-5 w-5 text-gold" />
        <h2 className="text-lg font-bold text-foreground">Ranking de Times</h2>
      </Link>
      
      <div className="space-y-3">
        {teams.map((team) => (
          <Link 
            key={team.rank}
            to={`/times/${team.name.toLowerCase().replace(/ /g, '-')}`}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              team.rank === 1 ? 'bg-gold text-gold-foreground' :
              team.rank === 2 ? 'bg-muted text-foreground' :
              team.rank === 3 ? 'bg-accent/30 text-accent' :
              'bg-muted/50 text-muted-foreground'
            }`}>
              {team.rank}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">
                {team.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {team.wins} vitórias
              </p>
            </div>
            
            {team.rank <= 3 && (
              <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </Link>
        ))}
      </div>
      
      <Link to="/ranking" className="w-full block py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors text-center">
        Ver ranking completo →
      </Link>
    </Card>
  );
};

export default TeamRanking;
