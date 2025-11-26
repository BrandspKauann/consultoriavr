import { Button } from "./ui/button";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const Footer = () => {
  const whatsappLink = "https://wa.link/d3f6ih";

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
        {/* Main Footer Content */}
        <AnimatedSection animationType="fade">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary-foreground">
                  Hirayama Administradora e Corretora de Seguros LTDA
                </h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  CNPJ: 18.166.550/0001-40
                </p>
              </div>
              <p className="text-primary-foreground/90 mb-6 sm:mb-8 leading-relaxed max-w-md text-sm sm:text-base">
                Parceria oficial Coface – líder mundial em seguro de crédito e inteligência de riscos. 
                Protegemos o fluxo de caixa de empresas que vendem a prazo.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <a 
                    href="mailto:ewerton@hirayamacorretora.com.br" 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    ewerton@hirayamacorretora.com.br
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <a 
                    href="tel:+5511972896857" 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    (11) 97289-6857
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <span className="text-primary-foreground/80 text-sm sm:text-base">São Paulo, SP</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">Links Rápidos</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <button 
                    onClick={() => scrollToSection("#o-que-e")} 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    O que é Seguro de Crédito
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("#beneficios")} 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    Quem pode contratar
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("#casos")} 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    Cases de sucesso
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("#servicos")} 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    Serviços Coface
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("#diagnostico")} 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    Diagnóstico online
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">Serviços</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li><span className="text-primary-foreground/80 text-sm sm:text-base">Seguro de Crédito</span></li>
                <li><span className="text-primary-foreground/80 text-sm sm:text-base">Business Information</span></li>
                <li><span className="text-primary-foreground/80 text-sm sm:text-base">Debt Collection</span></li>
                <li><span className="text-primary-foreground/80 text-sm sm:text-base">Análise de Risco</span></li>
                <li><span className="text-primary-foreground/80 text-sm sm:text-base">Consultoria Especializada</span></li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection animationType="scale" delay={100}>
          <div className="bg-primary-hover rounded-3xl p-8 sm:p-10 md:p-12 mb-12 sm:mb-16 text-center shadow-xl border border-primary-foreground/10">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Pronto para blindar seu fluxo de caixa?
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Agende uma sessão estratégica gratuita com nossos especialistas e 
                descubra como proteger sua empresa contra inadimplência.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => window.open(whatsappLink, '_blank')}
                  className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Falar no WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/90 text-white hover:bg-white/10 backdrop-blur-sm bg-white/5 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  onClick={() => window.open(whatsappLink, '_blank')}
                >
                  Falar com Especialista
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Copyright Section */}
        <AnimatedSection animationType="fade" delay={200}>
          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-primary-foreground/70 text-sm sm:text-base mb-2">
              © {new Date().getFullYear()} Hirayama Administradora e Corretora de Seguros LTDA. Todos os direitos reservados.
            </p>
            <p className="text-primary-foreground/60 text-xs sm:text-sm">
              CNPJ: 18.166.550/0001-40
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
};

export default Footer;
