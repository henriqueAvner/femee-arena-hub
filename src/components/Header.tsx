import { Trophy } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary">FEMEE</h1>
            <p className="text-xs text-muted-foreground">Federação Mineira de Esportes Eletrônicos</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#noticias" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Notícias
          </a>
          <a href="#campeonatos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Campeonatos
          </a>
          <a href="#times" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Times
          </a>
          <a href="#loja" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Loja
          </a>
          <Button size="sm" className="esports-glow">
            Inscrever-se
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
