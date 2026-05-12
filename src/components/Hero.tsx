import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const heroBackground = "/hero-reuniao-empresarial.jpg";

const benefitCards = [
  {
    id: "flash",
    name: "Flash",
    logo: "/flash-logo-card.png",
    bg: "#fe2b8f",
    number: "5842 1907 8831 0426",
    holder: "FLASH BENEFICIOS",
    valid: "08/30",
    logoClass: "h-9 w-full object-contain",
  },
  {
    id: "vr",
    name: "VR Multi",
    logo: "/vr-beneficios.png",
    bg: "#00a651",
    number: "4117 6500 8294 0132",
    holder: "VR MULTI",
    valid: "11/30",
    logoClass: "h-9 w-auto object-contain",
  },
  {
    id: "caju",
    name: "Caju",
    logo: "/caju-logo-card.png",
    bg: "#ff7227",
    logoBg: "#db021f",
    number: "5279 3341 7608 2250",
    holder: "CAJU BENEFICIOS",
    valid: "10/30",
    logoClass: "h-9 w-full object-contain",
  },
  {
    id: "ifood",
    name: "iFood",
    logo: "/ifood.svg",
    bg: "#ea1d2c",
    logoBg: "#ffffff",
    number: "4930 2814 7562 1098",
    holder: "IFOOD BENEFICIOS",
    valid: "12/30",
    logoClass: "h-8 w-full object-contain",
  },
];

const Hero = () => {
  const whatsappLink = "https://wa.link/3gwhbl";
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          setScrollY(Math.max(0, window.scrollY));
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = Math.min(scrollY * 0.3, 200);
  const contentOffset = Math.min(scrollY * 0.15, 100);

  const scrollToCard = (cardId: string) => {
    const target = document.getElementById(`cartao-${cardId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#cartao-${cardId}`);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[520px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[85vh] flex items-center overflow-hidden bg-[hsl(280,42%,14%)]"
    >
      {/* Imagem de fundo — mais visível à direita */}
      <div className="absolute inset-0 z-0">
        <div
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          className="absolute inset-0 transition-transform duration-300 ease-out"
        >
          <img
            src={heroBackground}
            alt=""
            className="w-full h-full object-cover object-center scale-105 sm:scale-100"
          />
        </div>

        {/* Blur em ~metade esquerda da tela; transição suave perto do centro */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backdropFilter: "blur(9px)",
            WebkitBackdropFilter: "blur(9px)",
            maskImage:
              "linear-gradient(90deg, #fff 0%, #fff 38%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.15) 54%, transparent 60%)",
            WebkitMaskImage:
              "linear-gradient(90deg, #fff 0%, #fff 38%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.15) 54%, transparent 60%)",
          }}
          aria-hidden
        />

        {/* Roxo dominante; direita ainda mais clara mas claramente na paleta roxa */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "linear-gradient(90deg, hsl(280 48% 16% / 0.96) 0%, hsl(280 46% 22% / 0.88) 22%, hsl(280 44% 28% / 0.72) 40%, hsl(280 42% 34% / 0.52) 52%, hsl(280 44% 40% / 0.32) 68%, hsl(280 46% 48% / 0.18) 82%, hsl(280 48% 52% / 0.11) 100%)",
          }}
        />

        {/* Camada extra: tom roxo uniforme suave sobre toda a área */}
        <div
          className="absolute inset-0 pointer-events-none z-[2] bg-[hsl(280,44%,28%,0.18)]"
          aria-hidden
        />

        {/* Vinheta roxa suave nas bordas verticais */}
        <div
          className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-b from-[hsl(280,46%,14%,0.38)] via-transparent to-[hsl(280,44%,16%,0.42)]"
          aria-hidden
        />
      </div>

      {/* Conteúdo — alinhado à esquerda em toda a largura */}
      <div
        className="relative z-10 w-full max-w-[1400px] mx-auto pl-4 pr-4 sm:pl-6 sm:pr-8 lg:pl-10 lg:pr-12 py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24"
        style={{ transform: `translateY(${contentOffset}px)` }}
      >
        <div
          className="max-w-[34rem] lg:max-w-[36rem] text-left"
          style={{
            textShadow: "0 1px 24px hsl(280 45% 8% / 0.35)",
          }}
        >
          <p className="text-sm sm:text-base font-semibold text-primary-foreground/95 mb-4 sm:mb-5 leading-snug border-l-4 border-[hsl(280,48%,72%)] pl-3 sm:pl-4">
            Benefícios corporativos com quem entende do assunto
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-primary-foreground leading-[1.12] tracking-tight mb-4 sm:mb-5">
            Consultoria em
            <span className="block mt-1 sm:mt-2 text-[hsl(280,52%,78%)] font-extrabold">
              Gestão de Pessoas e RH
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/85 mb-6 sm:mb-8 leading-relaxed">
            Ajudamos sua empresa a economizar, otimizar processos, reduzir custos e engajar
            colaboradores com tecnologia e consultoria especializada.
          </p>

          <div className="mb-5 sm:mb-7">
            <Button
              variant="hero"
              size="lg"
              className="text-base sm:text-lg px-8 md:px-10 py-6 md:py-7 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-white"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              Falar com um consultor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid max-w-[35rem] grid-cols-1 gap-3 min-[430px]:grid-cols-2">
            {benefitCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollToCard(card.id)}
                className="group relative aspect-[1.586/1] overflow-hidden rounded-[1.05rem] border border-white/25 p-4 text-left shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{
                  background: `linear-gradient(135deg, ${card.bg} 0%, ${card.logoBg ?? card.bg} 58%, rgba(18,17,24,0.92) 100%)`,
                }}
                aria-label={`Ver detalhes do ${card.name}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.26),transparent_26%),linear-gradient(115deg,rgba(255,255,255,0.24),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.2))]" />
                <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="pointer-events-none absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-black/18" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div className="mt-1 grid h-9 w-12 grid-cols-3 grid-rows-3 gap-px rounded-md border border-[#b8902f] bg-[#f4d67a] p-1 shadow-[inset_0_1px_2px_rgba(255,255,255,.75),0_2px_6px_rgba(0,0,0,.28)]">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <span
                          key={index}
                          className="rounded-[2px] bg-gradient-to-br from-[#fff0a8] to-[#b98b28]"
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-8 text-white/85">
                        <span className="absolute left-0 top-2 h-5 w-5 rounded-r-full border-r-2 border-white/85" />
                        <span className="absolute left-1.5 top-1 h-7 w-7 rounded-r-full border-r-2 border-white/65" />
                        <span className="absolute left-3 top-0 h-9 w-9 rounded-r-full border-r-2 border-white/45" />
                      </div>
                      <div className="flex h-11 w-20 items-center justify-center overflow-hidden rounded-md bg-white/95 px-2 shadow-sm">
                        <img src={card.logo} alt={`${card.name} logo`} className={card.logoClass} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 font-mono text-[1.12rem] font-black leading-none tracking-[0.14em] text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.45)] sm:text-[1.2rem]">
                      {card.number}
                    </p>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-white/55">
                          Cardholder
                        </p>
                        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
                          {card.holder}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[0.5rem] font-bold uppercase tracking-[0.16em] text-white/55">
                          Validade
                        </p>
                        <p className="font-mono text-[0.72rem] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
                          {card.valid}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/55">
                        {card.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/75 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center animate-bounce shadow-lg">
          <div className="w-1.5 h-3 bg-white rounded-full mt-2" />
        </div>
        <p className="text-white/80 text-xs sm:text-sm font-medium animate-pulse hidden sm:block">
          Role para ver mais
        </p>
        <p className="text-white/80 text-xs font-medium animate-pulse sm:hidden">↓</p>
      </div>
    </section>
  );
};

export default Hero;
