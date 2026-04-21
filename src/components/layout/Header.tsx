import { Trophy, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/noticias", label: "Notícias" },
  { href: "/campeonatos", label: "Campeonatos" },
  { href: "/times", label: "Times" },
  { href: "/ranking", label: "Ranking" },
  { href: "/sobre", label: "Sobre" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  const renderLinks = (onClick?: () => void) =>
    navLinks.map((link) => (
      <NavLink
        key={link.href}
        to={link.href}
        end={link.href === "/"}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "text-foreground/80"
          )
        }
      >
        {link.label}
      </NavLink>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Trophy className="h-7 w-7 text-primary" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-primary">FEMEE</span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Federação Mineira de Esportes Eletrônicos
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">{renderLinks()}</nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="text-primary">FEMEE</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-5">
                {renderLinks(() => setOpen(false))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
