import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <PageLayout>
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <Trophy className="mb-4 h-12 w-12 text-primary" />
      <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        A página que você procura não existe ou foi movida.
      </p>
      <Button asChild>
        <Link to="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  </PageLayout>
);

export default NotFound;
