import { NoticiaResponse, UserResponse } from '@/types/api.types';

const autorMock: UserResponse = {
  id: 1,
  nome: 'Ana Souza',
  email: 'ana@email.com',
  tipoUsuario: 3,
  dataCriacao: '2024-01-01',
};

export const noticiasMock: NoticiaResponse[] = [
  {
    id: 1,
    titulo: 'Arena Hub recebe novo campeonato',
    slug: 'arena-hub-novo-campeonato',
    resumo: 'O Arena Hub será palco de um novo torneio nacional de eSports. Este evento contará com dezenas de equipes de todo o Brasil, premiação recorde e cobertura ao vivo. Prepare-se para acompanhar partidas emocionantes, entrevistas exclusivas e uma experiência única para fãs e atletas. O campeonato promete movimentar a cena nacional e atrair olhares internacionais para o cenário brasileiro de eSports.',
    conteudo: 'O Arena Hub, referência em inovação esportiva, receberá em março o maior campeonato nacional de eSports já realizado no país. O evento terá duração de duas semanas, com etapas classificatórias, semifinais e uma grande final transmitida em diversos canais. Além das partidas, o público poderá participar de workshops, painéis com especialistas, meet & greet com jogadores profissionais e sorteios de brindes. A organização espera mais de 10 mil visitantes presenciais e uma audiência online superior a 1 milhão de espectadores. O objetivo é consolidar o Brasil como um dos principais polos de eSports do mundo, incentivando novos talentos e promovendo a inclusão digital por meio do esporte eletrônico. Não perca essa oportunidade de fazer parte da história dos eSports nacionais! Para mais informações, acesse o site oficial do evento e siga as redes sociais do Arena Hub.',
    categoria: 'eSports',
    imagemUrl: '/assets/noticia-arena-hub.jpg',
    dataPublicacao: '2026-03-10',
    visualizacoes: 120,
    autor: autorMock,
    comments: [
      {
        id: 1,
        autor: autorMock,
        data: '2026-03-11',
        texto: 'Evento imperdível! Mal posso esperar para assistir as partidas ao vivo.',
        likes: 5,
        aprovado: true,
        replies: [
          {
            id: 11,
            autor: { ...autorMock, nome: 'Maria Pereira', id: 4, email: 'maria@email.com' },
            data: '2026-03-11',
            texto: 'Também vou! Já garanti meu ingresso.',
            likes: 2,
            aprovado: true,
          },
        ],
      },
      {
        id: 2,
        autor: { ...autorMock, nome: 'Carlos Lima', id: 2, email: 'carlos@email.com' },
        data: '2026-03-12',
        texto: 'Parabéns à organização! O cenário brasileiro merece esse destaque.',
        likes: 3,
        aprovado: true,
      }
    ]
  },
  {
    id: 2,
    titulo: 'Equipe universitária conquista título inédito',
    slug: 'equipe-universitaria-titulo-inedito',
    resumo: 'Time da UFMG vence campeonato de Counter-Strike 2. A trajetória da equipe foi marcada por superação, estratégia e trabalho em equipe. Desde a fase de grupos até a grande final, os jogadores demonstraram habilidade e foco, conquistando a torcida e o respeito dos adversários. O título representa um marco para o cenário universitário de eSports em Minas Gerais.',
    conteudo: 'A equipe universitária da UFMG surpreendeu e conquistou o título inédito no Torneio Primavera 2026. O campeonato reuniu as melhores equipes universitárias do país, proporcionando confrontos de alto nível técnico. Na final, a UFMG enfrentou a equipe da USP em uma série melhor de cinco partidas, vencendo por 3 a 2 em jogos emocionantes. O capitão do time destacou a importância do apoio institucional e do comprometimento dos atletas para o sucesso alcançado. A conquista abre portas para novos investimentos no esporte universitário e inspira jovens jogadores a buscarem seus sonhos no universo dos eSports. Parabéns à equipe campeã!',
    categoria: 'Universitário',
    imagemUrl: '/assets/noticia-ufmg.jpg',
    dataPublicacao: '2026-03-12',
    visualizacoes: 85,
    autor: autorMock,
    comments: [
      {
        id: 1,
        autor: { ...autorMock, nome: 'Lucas Silva', id: 3, email: 'lucas@email.com' },
        data: '2026-03-13',
        texto: 'Incrível! A UFMG está de parabéns pelo desempenho.',
        likes: 1,
      }
    ]
  },
  {
    id: 3,
    titulo: 'Novas regras para inscrições em campeonatos',
    slug: 'novas-regras-inscricoes',
    resumo: 'Federação anuncia mudanças importantes para inscrições em 2026. As novas regras buscam facilitar o acesso de novos times, garantir a regularidade dos participantes e aumentar a competitividade dos torneios. Entre as principais novidades estão a digitalização do processo de inscrição, exigência de documentação atualizada e critérios mais claros para classificação das equipes.',
    conteudo: 'A Federação Esportiva divulgou novas regras para inscrições em campeonatos, visando maior transparência e competitividade. Agora, todas as inscrições deverão ser feitas exclusivamente pela plataforma online, com envio de documentos digitalizados e confirmação automática por e-mail. As equipes deverão apresentar comprovante de regularidade, ficha de jogadores e termo de responsabilidade assinado. O objetivo é evitar fraudes, agilizar o processo e garantir igualdade de condições para todos os participantes. As mudanças foram bem recebidas pela comunidade, que espera campeonatos mais organizados e disputados em 2026. Fique atento ao calendário oficial e prepare sua equipe para os próximos desafios!',
    categoria: 'Regulamento',
    imagemUrl: '/assets/noticia-regras.jpg',
    dataPublicacao: '2026-03-14',
    visualizacoes: 60,
    autor: autorMock,
    comments: []
  },
];
