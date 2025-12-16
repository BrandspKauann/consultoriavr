import { Button } from "./ui/button";
import { ArrowRight, Shield, TrendingUp, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Fundos disponíveis para o Hero
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

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    "Atendimento humano",
    "Comparativos reais",
    "Zero dor de cabeça"
  ];

  const parallaxOffset = Math.min(scrollY * 0.3, 200);
  const contentOffset = Math.min(scrollY * 0.15, 100);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[85vh] flex items-center bg-gradient-hero overflow-hidden"
    >
      {/* Background Image with Overlay - Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          className="absolute inset-0 transition-transform duration-300 ease-out"
        >
          <img 
            src={heroBackground} 
            alt="Consultoria em Vale Refeição" 
            className="w-full h-full object-cover opacity-30 dark:opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/65 via-primary/60 to-primary/55 dark:from-primary/70 dark:via-primary/65 dark:to-primary/60"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div 
        className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10"
        style={{ transform: `translateY(${contentOffset}px)` }}
      >
        <div className="max-w-5xl">
          {/* Badge - Hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-2 mb-6 sm:mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/25 rounded-full border border-secondary/30">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
            <span className="text-secondary font-semibold text-sm sm:text-base bg-secondary/15 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/20 shadow-md">
              Benefícios corporativos com quem entende do assunto
            </span>
          </div>
          
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 md:mb-8 leading-[1.2] tracking-tight">
            Consultoria especializada em
            <span className="block text-secondary mt-1 sm:mt-2 md:mt-3">Vale Refeição</span>
          </h1>
          
          {/* Description - Simplified on mobile */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground mb-3 sm:mb-4 md:mb-5 max-w-4xl leading-relaxed font-medium">
            VR, Alelo e Caju
          </p>
          
          {/* Hidden on mobile, shown on larger screens */}
          <p className="hidden sm:block text-base sm:text-lg md:text-xl text-primary-foreground font-semibold mb-3 sm:mb-4 md:mb-6 max-w-3xl leading-relaxed">
            Ajudamos sua empresa a economizar, ganhar eficiência fiscal e cuidar melhor dos colaboradores
          </p>
          
          <p className="hidden md:block text-sm sm:text-base text-primary-foreground mb-3 sm:mb-4 md:mb-6 max-w-3xl leading-relaxed">
            — do diagnóstico ao pós-venda.
          </p>
          
          <p className="hidden lg:block text-base sm:text-lg text-primary-foreground mb-6 sm:mb-8 md:mb-10 max-w-3xl leading-relaxed font-medium">
            👉 Atendimento humano, comparativos reais e zero dor de cabeça para o RH.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 sm:flex-row mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              Falar com um consultor
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 border-2 border-white/90 text-white hover:bg-white hover:text-primary w-full sm:w-auto backdrop-blur-sm bg-white/10 transition-all duration-300"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              Peça já seus cartões
            </Button>
          </div>
          
          {/* Features - Hidden on mobile, shown on larger screens */}
          <div className="hidden sm:flex flex-wrap items-center gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-3 bg-white/20 backdrop-blur-lg rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-secondary/40 shadow-lg">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                <span className="text-primary-foreground text-sm sm:text-base font-semibold">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
