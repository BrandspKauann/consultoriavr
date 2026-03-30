import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const heroBackground = "/fundo4.png";

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
