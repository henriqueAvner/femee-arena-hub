import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNoticiaBySlug } from '@/hooks/api/useNoticias';
import { LoadingSpinner } from '@/components/ui/loading';
import { ErrorDisplay } from '@/components/ui/error-display';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import React from 'react';

// Permite receber slug via prop (para uso em modal) ou via rota
export default function Noticia({ slug: propSlug, isModal }: { slug?: string, isModal?: boolean }) {
  // Se slug não vier por prop, pega da URL
  const params = useParams<{ slug: string }>();
  const slug = propSlug || params.slug || '';
  const {
    data: noticia,
    isLoading,
    error,
    refetch,
  } = useNoticiaBySlug(slug);

  const { isAdmin } = useAuth();

  // Estado local para comentários (mock, otimista)
  const [comments, setComments] = useState(noticia?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});

  const newCommentRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (newCommentRef.current) {
      newCommentRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (activeReplyId !== null) {
      const input = document.getElementById(`reply-input-${activeReplyId}`) as HTMLInputElement | null;
      input?.focus();
    }
  }, [activeReplyId]);

  useEffect(() => {
    if (noticia?.comments) {
      setComments(noticia.comments);
    }
  }, [noticia]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const formatRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ptBR,
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>;
  if (error || !noticia) return <ErrorDisplay message="Notícia não encontrada." onRetry={refetch} />;

  // Usuário simulado (mock)
  const mockUser = {
    id: 999,
    nome: "Usuário Teste",
    email: "teste@email.com",
    tipoUsuario: 3,
    dataCriacao: new Date().toISOString(),
  };

  const bannedWords = ["burro", "idiota", "palavrão"];

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = newComment.trim();
    if (!content) return;

    if (content.length < 3) {
      toast({
        title: "Comentário muito curto",
        description: "Digite pelo menos 3 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (content.length > 400) {
      toast({
        title: "Comentário muito longo",
        description: "O comentário não pode exceder 400 caracteres.",
        variant: "destructive",
      });
      return;
    }

    const lower = content.toLowerCase();
    const hasBanned = bannedWords.some((word) => lower.includes(word));
    if (hasBanned) {
      toast({
        title: "Comentário bloqueado",
        description: "Seu comentário contém palavras proibidas.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simula envio e atualização otimista (comentário pendente de aprovação)
    setTimeout(() => {
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          autor: mockUser,
          data: new Date().toISOString(),
          texto: content,
          likes: 0,
          aprovado: false,
          criadoPorUsuario: true,
        },
      ]);
      setNewComment("");
      setIsSubmitting(false);

      toast({
        title: "Comentário enviado",
        description: "Seu comentário foi enviado para moderação.",
      });
    }, 600);
  };

  const handleLike = (commentId: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, likes: (c.likes || 0) + 1 }
          : c
      )
    );
  };

  const handleApprove = (commentId: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, aprovado: true }
          : c
      )
    );
  };

  const handleReject = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const handleReply = (commentId: number) => {
    const replyText = (replyTexts[commentId] || "").trim();
    if (!replyText) return;

    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...(c.replies || []),
                {
                  id: Date.now(),
                  autor: mockUser,
                  data: new Date().toISOString(),
                  texto: replyText,
                  likes: 0,
                },
              ],
            }
          : c
      )
    );
    setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
    setActiveReplyId(null);
  };

  return (
    <main className={`max-w-2xl mx-auto py-8 px-4 ${isModal ? '' : 'bg-background'}`}>
      <h1 className="text-3xl font-bold mb-2">{noticia.titulo}</h1>
      <p className="text-gray-500 text-sm mb-4">
        Publicado em {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')} ({formatRelativeTime(noticia.dataPublicacao)}) por {noticia.autor.nome}
      </p>
      {noticia.imagemUrl && (
        <img src={noticia.imagemUrl} alt={noticia.titulo} className="w-full rounded mb-6" />
      )}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: noticia.conteudo }} />

      {/* Comentários */}
      <section className="mt-8">
        {(() => {
          const approvedCount = comments.filter((c) => c.aprovado !== false).length;
          const pendingCount = comments.filter((c) => c.aprovado === false).length;
          return (
            <h2 className="text-xl font-semibold mb-4">
              Comentários ({approvedCount}{pendingCount > 0 ? ` + ${pendingCount} em moderação` : ""})
            </h2>
          );
        })()}
        <form onSubmit={handleAddComment} className="mb-6 flex flex-col gap-2">
          <Input
            ref={newCommentRef}
            placeholder="Escreva um comentário..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            disabled={isSubmitting}
            maxLength={400}
            required
            aria-label="Campo para escrever novo comentário"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Comentar"
              )}
            </Button>
          </div>
        </form>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment) => {
              const isPending = comment.aprovado === false;
              const showForUser = !isPending || comment.criadoPorUsuario;
              if (!showForUser && !isAdmin) return null;

              return (
                <li key={comment.id} className="border rounded p-3 bg-muted">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{getInitials(comment.autor.nome)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{comment.autor.nome}</span>
                          <span className="text-xs text-muted-foreground">{formatRelativeTime(comment.data)}</span>
                          {isPending && (
                            <span className="text-xs text-amber-500">(Aguardando moderação)</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="text-xs text-primary hover:underline"
                            onClick={() => handleLike(comment.id)}
                            aria-label={`Curtir comentário de ${comment.autor.nome}`}
                          >
                            Curtir ({comment.likes || 0})
                          </button>
                          {!isPending && (
                            <button
                              type="button"
                              className="text-xs text-primary hover:underline"
                              onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                              aria-label={`Responder comentário de ${comment.autor.nome}`}
                            >
                              Responder
                            </button>
                          )}
                          {isAdmin && isPending && (
                            <>
                              <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleApprove(comment.id)}
                              aria-label="Aprovar comentário pendente"
                            >
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(comment.id)}
                              aria-label="Rejeitar comentário pendente"
                            >
                              Rejeitar
                            </Button>
                            </>
                          )}
                        </div>
                      </div>

                      {isPending && !isAdmin ? (
                        <p className="text-sm text-muted-foreground">Seu comentário está aguardando aprovação.</p>
                      ) : (
                        <>
                          <p className="text-sm text-foreground">{comment.texto}</p>

                          {activeReplyId === comment.id && (
                            <div className="mt-3">
                              <Input
                                placeholder="Escreva uma resposta..."
                                value={replyTexts[comment.id] || ""}
                                onChange={(e) => setReplyTexts((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                                maxLength={300}
                                className="mb-2"
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleReply(comment.id)}
                                  disabled={!replyTexts[comment.id]?.trim()}
                                >
                                  Enviar resposta
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setActiveReplyId(null)}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          )}

                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4 border-t border-border pt-4">
                              <h3 className="text-sm font-semibold mb-2">Respostas</h3>
                              <ul className="space-y-3">
                                {comment.replies.map((reply) => (
                                  <li key={reply.id} className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>{getInitials(reply.autor.nome)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-medium text-foreground">{reply.autor.nome}</span>
                                        <span className="text-xs text-muted-foreground">{formatRelativeTime(reply.data)}</span>
                                      </div>
                                      <p className="text-sm text-foreground">{reply.texto}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">Nenhum comentário ainda.</p>
        )}
      </section>
    </main>
  );
}
