import { Button } from "./ui/button";
import { ArrowRight, Shield, TrendingUp, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-credit-insurance.jpg";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";
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
    "Proteção 360°",
    "Crescimento Seguro",
    "Parceiro Coface"
  ];

  const parallaxOffset = Math.min(scrollY * 0.3, 200);
  const contentOffset = Math.min(scrollY * 0.15, 100);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[85vh] flex items-center bg-gradient-hero overflow-hidden"
    >
      {/* Background Image with Overlay - Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          className="absolute inset-0 transition-transform duration-300 ease-out"
        >
          <img 
            src={heroImage} 
            alt="Seguro de Crédito Empresarial" 
            className="w-full h-full object-cover opacity-15 dark:opacity-5 scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-trust-blue/90 dark:from-primary/95 dark:via-primary/90 dark:to-trust-blue/95"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-trust-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div 
        className="container mx-auto px-4 py-16 sm:py-20 lg:py-24 relative z-10"
        style={{ transform: `translateY(${contentOffset}px)` }}
      >
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="flex items-center space-x-2 mb-6 sm:mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full">
              <Shield className="h-5 w-5 text-secondary" />
            </div>
            <span className="text-secondary font-semibold text-sm sm:text-base bg-secondary/10 px-4 py-2 rounded-full">
              Parceria oficial Coface
            </span>
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 sm:mb-8 leading-[1.1] tracking-tight">
            Seguro de Crédito
            <span className="block text-secondary mt-3">Empresarial</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/95 mb-5 sm:mb-6 max-w-4xl leading-relaxed font-medium">
            Blindagem do fluxo de caixa para empresas que vendem a prazo.
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-secondary/95 font-semibold mb-8 sm:mb-10 max-w-3xl leading-relaxed">
            Você protege sua fábrica, seu estoque e sua equipe. 
            <span className="block mt-2">Mas quem protege o seu contas a receber?</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10 sm:mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              Falar com Especialista
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 border-2 border-white/90 text-white hover:bg-white hover:text-primary w-full sm:w-auto backdrop-blur-sm bg-white/10 transition-all duration-300"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              Falar com Especialista
            </Button>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-3 bg-white/15 backdrop-blur-lg rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 shadow-lg">
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
