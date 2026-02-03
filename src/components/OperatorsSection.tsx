import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle2, Building2, TrendingUp, Zap } from "lucide-react";
// Logos das operadoras
const flashLogo = "/flash.png";
const vrLogo = "/vr.jpg";
const cajuLogo = "/caju.jpg";
import AnimatedSection from "./AnimatedSection";
import { LeadFormModal } from "./LeadFormModal";
import { useState } from "react";

const OperatorsSection = () => {
  const whatsappLink = "https://wa.link/3gwhbl";
  const [showForm, setShowForm] = useState(false);
  
  const operators = [
    {
      icon: flashLogo,
      iconComponent: <Zap className="h-8 w-8 text-secondary" />,
      title: "Flash Benefícios",
      description: "Uma operadora moderna e inovadora que oferece soluções rápidas e eficientes em benefícios corporativos. Com tecnologia de ponta e atendimento ágil, o Flash é ideal para empresas que buscam praticidade e modernidade.",
      features: [
        "Tecnologia moderna e ágil",
        "Atendimento rápido e eficiente",
        "Soluções práticas para empresas"
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
          <div className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 sm:mb-8">
              Trabalhamos com as melhores marcas do mercado
            </h2>
          </div>
        </AnimatedSection>

        {/* Explicação sobre Operadoras */}
        <AnimatedSection animationType="fade" delay={100}>
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">
                  O que são Operadoras de Benefícios?
                </h3>
                <div className="space-y-4 sm:space-y-6 text-left">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground">
                      Vale Refeição (VR)
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      É um benefício corporativo que permite aos colaboradores comprarem alimentos e refeições. 
                      Pode ser oferecido através de cartões físicos ou digitais, com diferentes tipos de rede.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground">
                      Rede Aberta vs Rede Fechada
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4 mt-3">
                      <div className="p-4 bg-background rounded-lg border border-border">
                        <h5 className="font-semibold mb-2 text-primary">Rede Aberta</h5>
                        <p className="text-sm text-muted-foreground">
                          Cartão aceito em qualquer estabelecimento que aceite o tipo de cartão (VISA, Mastercard, etc.). 
                          Mais flexibilidade para o colaborador.
                        </p>
                      </div>
                      <div className="p-4 bg-background rounded-lg border border-border">
                        <h5 className="font-semibold mb-2 text-primary">Rede Fechada</h5>
                        <p className="text-sm text-muted-foreground">
                          Cartão aceito apenas em estabelecimentos credenciados pela operadora. 
                          Mais controle para a empresa e possibilidade de melhor negociação.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground">
                      Como Funciona
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      As operadoras são empresas especializadas em emitir e gerenciar esses cartões de benefícios. 
                      Elas fazem a ponte entre empresas e estabelecimentos, facilitando o processo de pagamento e 
                      oferecendo diferentes soluções conforme a necessidade de cada empresa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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

                  <div className="flex flex-col gap-2">
                    <Button 
                      variant={operator.variant} 
                      className="w-full shadow-md hover:shadow-lg transition-shadow group/btn"
                      onClick={() => {
                        // Scroll suave para seção de parceria onde tem mais informações
                        const partnershipSection = document.getElementById('parceria');
                        if (partnershipSection) {
                          partnershipSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      {operator.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setShowForm(true)}
                    >
                      Quero conversar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      <LeadFormModal
        open={showForm}
        onOpenChange={setShowForm}
        title="Saiba Mais"
        description="Preencha o formulário e entraremos em contato para fornecer mais informações."
        origem="operators_section"
      />
    </section>
  );
};

export default OperatorsSection;

