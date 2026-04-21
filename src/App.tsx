import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingPage } from "@/components/ui/loading";

const Index = lazy(() => import("./pages/Index"));
const Noticias = lazy(() => import("./pages/Noticias"));
const NoticiaDetalhe = lazy(() => import("./pages/NoticiaDetalhe"));
const Campeonatos = lazy(() => import("./pages/Campeonatos"));
const CampeonatoDetalhe = lazy(() => import("./pages/CampeonatoDetalhe"));
const Times = lazy(() => import("./pages/Times"));
const TimeDetalhe = lazy(() => import("./pages/TimeDetalhe"));
const Ranking = lazy(() => import("./pages/Ranking"));
const Sobre = lazy(() => import("./pages/Sobre"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:slug" element={<NoticiaDetalhe />} />
            <Route path="/campeonatos" element={<Campeonatos />} />
            <Route path="/campeonatos/:slug" element={<CampeonatoDetalhe />} />
            <Route path="/times" element={<Times />} />
            <Route path="/times/:slug" element={<TimeDetalhe />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
