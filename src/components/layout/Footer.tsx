import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-20 border-t border-border bg-card">
    <div className="container px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-primary">FEMEE</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Federação Mineira de Esportes Eletrônicos. Promovendo o cenário competitivo de
            esports em Minas Gerais.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-foreground">Conteúdo</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/noticias" className="hover:text-primary transition-colors">Notícias</Link></li>
            <li><Link to="/campeonatos" className="hover:text-primary transition-colors">Campeonatos</Link></li>
            <li><Link to="/times" className="hover:text-primary transition-colors">Times</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-foreground">Institucional</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre a FEMEE</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-foreground">Contato</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Belo Horizonte, MG</li>
            <li>contato@femee.org.br</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FEMEE — Federação Mineira de Esportes Eletrônicos.
      </div>
    </div>
  </footer>
);

export default Footer;
