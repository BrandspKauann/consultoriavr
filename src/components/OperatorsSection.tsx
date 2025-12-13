import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle2, Building2, TrendingUp, Zap } from "lucide-react";
// Logos das operadoras
const aleloLogo = "/alelo.jpg";
const vrLogo = "/vr.jpg";
const cajuLogo = "/caju.jpg";
import AnimatedSection from "./AnimatedSection";

const OperatorsSection = () => {
  const whatsappLink = "https://wa.link/3gwhbl";
  
  const operators = [
    {
      icon: aleloLogo,
      iconComponent: <Building2 className="h-8 w-8 text-secondary" />,
      title: "Alelo Benefícios",
      description: "Uma das maiores operadoras do Brasil, nascida da parceria com o Bradesco. Oferece soluções completas, seguras e flexíveis para empresas de todos os portes.",
      features: [
        "Ampla rede credenciada",
        "Tradição e solidez no mercado",
        "Ideal para empresas que buscam estabilidade"
      ],
      cta: "Saiba mais",
      variant: "premium" as const
    },
    {
      icon: vrLogo,
      iconComponent: <TrendingUp className="h-8 w-8 text-secondary" />,
      title: "VR Benefícios",
      description: "Mais de 40 anos de história no mercado de benefícios corporativos. Somos parceiros da VR há mais de 7 anos, entregando soluções confiáveis para RHs que precisam de controle e previsibilidade.",
      features: [
        "Rede fechada",
        "TotalPass* incluso",
        "Foco em controle, economia e cashback"
      ],
      cta: "Saiba mais",
      variant: "trust" as const
    },
    {
      icon: cajuLogo,
      iconComponent: <Zap className="h-8 w-8 text-secondary" />,
      title: "Caju Benefícios",
      description: "Uma startup inovadora que mudou a forma de usar benefícios corporativos. Cartão bandeirado VISA, saldo único e liberdade total para o colaborador.",
      features: [
        "Tecnologia e flexibilidade",
        "Wellhub* integrado",
        "Experiência moderna para o time"
      ],
      cta: "Saiba mais",
      variant: "secondary" as const
    }
  ];

  return (
    <section id="operadoras" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="text-center mb-16 sm:mb-20 md:mb-24 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 sm:mb-8">
              Trabalhamos com as melhores marcas do mercado
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {operators.map((operator, index) => (
            <AnimatedSection 
              key={index}
              animationType="scale" 
              delay={index * 75}
            >
              <Card className="bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0 h-full flex flex-col group hover:-translate-y-2">
                <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="relative inline-block mb-4 sm:mb-6">
                      <img 
                        src={operator.icon} 
                        alt={`${operator.title} logo`}
                        className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-xl object-contain border-2 border-border group-hover:border-secondary transition-colors shadow-md group-hover:shadow-lg bg-white p-2"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                      {operator.title}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                      {operator.description}
                    </p>
                  </div>

                  <div className="flex-grow mb-6 sm:mb-8">
                    <ul className="space-y-3">
                      {operator.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm sm:text-base text-foreground/80">
                          <CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant={operator.variant} 
                    className="w-full shadow-md hover:shadow-lg transition-shadow group/btn"
                    onClick={() => window.open(whatsappLink, '_blank')}
                  >
                    {operator.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperatorsSection;

