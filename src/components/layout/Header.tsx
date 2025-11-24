import { Trophy } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import RegistrationDialog from "../forms/RegistrationDialog";

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary">FEMEE</h1>
            <p className="text-xs text-muted-foreground">Federação Mineira de Esportes Eletrônicos</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Notícias
          </Link>
          <Link to="/campeonatos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Campeonatos
          </Link>
          <Link to="/times" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Times
          </Link>
          <Link to="/ranking" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Ranking
          </Link>
          <Button size="sm" className="esports-glow" onClick={() => setIsDialogOpen(true)}>
            Inscrever-se
          </Button>
        </nav>
      </div>
      <RegistrationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </header>
  );
};

export default Header;
