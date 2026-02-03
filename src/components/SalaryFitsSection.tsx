import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Download, 
  MessageCircle, 
  CheckCircle2, 
  Building2, 
  Users, 
  Smartphone, 
  DollarSign,
  Shield,
  GraduationCap,
  Heart,
  FileText,
  ArrowRight,
  TrendingUp,
  Zap,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

const SalaryFitsSection = () => {
  const whatsappLink = "https://wa.link/3gwhbl";
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const possibleFiles = [
        '/pdfs/salaryfits-informacoes.pdf',
        '/pdfs/salaryfits.pdf',
        '/pdfs/informacoes-salaryfits.pdf',
        '/salaryfits-informacoes.pdf',
        '/salaryfits.pdf'
      ];
      
      let fileFound = false;
      for (const filePath of possibleFiles) {
        try {
          const response = await fetch(filePath, { method: 'HEAD' });
          if (response.ok) {
            const link = document.createElement('a');
            link.href = filePath;
            link.download = filePath.split('/').pop() || 'salaryfits-informacoes.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            fileFound = true;
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (!fileFound) {
        alert('Arquivo PDF não encontrado. Por favor, verifique se o arquivo está na pasta public/pdfs/ com o nome "salaryfits-informacoes.pdf"');
      }
    } catch (error) {
      console.error('Erro ao fazer download do PDF:', error);
      alert('Erro ao fazer download do PDF. Por favor, tente novamente.');
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    }
  };


  const beneficios = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Adiantamento de Salário",
      description: "Sem burocracia, acesso rápido quando você precisa"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Cartão Multibenefícios",
      description: "Um único cartão para múltiplos benefícios"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Descontos Exclusivos",
      description: "Acesso a descontos em diversas categorias"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Terapias Online",
      description: "Cuidado com a saúde mental acessível"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Educação e Pós-Graduação",
      description: "Cursos com condições especiais"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Assistência e Seguros",
      description: "Proteção completa para você e sua família"
    }
  ];

  return (
    <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden" style={{ backgroundColor: '#2d1b4e' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: '#4c1aa3' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ backgroundColor: '#6d28d9' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Connection with Main Theme */}
        <AnimatedSection animationType="fade">
          <div className="text-center mb-8 md:mb-12">
            <Card className="border-2 shadow-xl inline-block" style={{ borderColor: '#7c3aed', backgroundColor: '#3d1f6d' }}>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>
                  Tire o RH do operacional e leve para o estratégico
                </h3>
                <p className="text-sm md:text-base" style={{ color: '#e9d5ff' }}>
                  A SalaryFits reduz o trabalho operacional do seu RH, permitindo que você foque no que realmente importa: 
                  estratégia e desenvolvimento de pessoas.
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Hero Section */}
        <AnimatedSection animationType="fade" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/salaryfits.png" 
                  alt="SalaryFits Logo" 
                  className="h-32 w-32 md:h-40 md:w-40 object-contain rounded-2xl shadow-2xl bg-white p-4"
                  style={{ border: '4px solid #4c1aa3' }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (img.src.includes('.png')) {
                      img.src = '/salaryfits.jpg';
                    } else {
                      img.src = '/logo.jpg';
                    }
                  }}
                />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 animate-pulse" style={{ color: '#fbbf24' }} />
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span style={{ color: '#fbbf24' }}>Salary</span>
              <span style={{ color: '#ffffff' }}>Fits</span>
            </h2>
            <p className="text-xl md:text-2xl mb-2 font-semibold" style={{ color: '#e9d5ff' }}>
              Bem-estar financeiro e benefícios para funcionários
            </p>
            <p className="text-base md:text-lg max-w-3xl mx-auto" style={{ color: '#ddd6fe' }}>
              Plataforma tecnológica (fintech + HRTech) que integra empresas, colaboradores e instituições financeiras em um único ecossistema digital
            </p>
          </div>
        </AnimatedSection>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Left Column - O que é */}
          <AnimatedSection animationType="slide-right" delay={100}>
            <Card className="h-full border-2 shadow-xl" style={{ borderColor: '#7c3aed', backgroundColor: '#3d1f6d' }}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#4c1aa3' }}>
                    <Building2 className="h-8 w-8" style={{ color: '#ffffff' }} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>
                    O que é e como funciona
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: '#4c1aa3' }}>
                      <Smartphone className="h-5 w-5" style={{ color: '#ffffff' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2" style={{ color: '#ffffff' }}>Plataforma Digital Completa</h4>
                      <p style={{ color: '#e9d5ff' }}>
                        Tudo acessado por meio de app e portal digital. O colaborador escolhe os produtos que quer usar 
                        e o pagamento é integrado com a folha de pagamento.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: '#4c1aa3' }}>
                      <Users className="h-5 w-5" style={{ color: '#ffffff' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2" style={{ color: '#ffffff' }}>Benefícios Financeiros Inteligentes</h4>
                      <p style={{ color: '#e9d5ff' }}>
                        Produtos e serviços focados em melhorar a gestão financeira do colaborador, 
                        evitando apertos de caixa sem recorrer a crédito caro.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: '#4c1aa3' }}>
                      <Zap className="h-5 w-5" style={{ color: '#ffffff' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2" style={{ color: '#ffffff' }}>Sem Custo para a Empresa</h4>
                      <p style={{ color: '#e9d5ff' }}>
                        Plataforma gratuita para empresas. A SalaryFits gera receita através de parcerias 
                        com instituições financeiras e fornecedores.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Right Column - Benefícios */}
          <AnimatedSection animationType="slide-left" delay={200}>
            <Card className="h-full border-2 shadow-xl" style={{ borderColor: '#7c3aed', backgroundColor: '#3d1f6d' }}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#4c1aa3' }}>
                    <Sparkles className="h-8 w-8" style={{ color: '#ffffff' }} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>
                    Benefícios Disponíveis
                  </h3>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:shadow-md" style={{ backgroundColor: '#4c1aa3' }}>
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#6d28d9' }}>
                        <div style={{ color: '#ffffff' }}>
                          {beneficio.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1" style={{ color: '#ffffff' }}>{beneficio.title}</h4>
                        <p className="text-xs" style={{ color: '#e9d5ff' }}>{beneficio.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Para quem é */}
        <AnimatedSection animationType="fade" delay={300}>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <Card className="border-2 shadow-lg" style={{ borderColor: '#7c3aed', backgroundColor: '#3d1f6d' }}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8" style={{ color: '#ffffff' }} />
                  <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Para Empresas e RH</h3>
                </div>
                <p className="mb-4" style={{ color: '#e9d5ff' }}>
                  Ajuda departamentos de Recursos Humanos a atrair, reter e engajar talentos, 
                  oferecendo benefícios financeiros modernos e flexíveis.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm" style={{ color: '#e9d5ff' }}>Atração de talentos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm" style={{ color: '#e9d5ff' }}>Retenção de colaboradores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm" style={{ color: '#e9d5ff' }}>Engajamento da equipe</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm" style={{ color: '#e9d5ff' }}>Sem custos adicionais na folha</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg" style={{ borderColor: '#7c3aed', backgroundColor: '#3d1f6d' }}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8" style={{ color: '#ffffff' }} />
                  <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Para Colaboradores</h3>
                </div>
                <p className="mb-4" style={{ color: '#e9d5ff' }}>
                  Acesso a serviços que ajudam no planejamento financeiro, evitando apertos de caixa 
                  sem recorrer a crédito caro no mercado tradicional.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm" style={{ color: '#e9d5ff' }}>Planejamento financeiro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm" style={{ color: '#e9d5ff' }}>Acesso rápido ao dinheiro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm" style={{ color: '#e9d5ff' }}>Evita crédito caro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-sm" style={{ color: '#e9d5ff' }}>Múltiplos benefícios em um só lugar</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection animationType="fade" delay={400}>
          <Card className="border-2 shadow-2xl" style={{ borderColor: '#7c3aed', backgroundColor: '#3d1f6d' }}>
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
                Transforme o bem-estar financeiro da sua equipe
              </h3>
              <p className="text-lg mb-4 max-w-2xl mx-auto" style={{ color: '#e9d5ff' }}>
                Solução moderna que combina tecnologia, benefícios financeiros e integração com empresas 
                para entregar mais controle, economia e bem-estar financeiro aos colaboradores.
              </p>
              <p className="text-base mb-8 max-w-2xl mx-auto font-semibold" style={{ color: '#fbbf24' }}>
                ⭐ Gratuito para empresas com mais de 500 vidas
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="bg-white hover:bg-gray-100 text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all font-semibold"
                  style={{ color: '#4c1aa3' }}
                >
                  {isDownloading ? (
                    <>
                      <Download className="mr-2 h-5 w-5 animate-spin" />
                      Baixando...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Baixar Informações (PDF)
                    </>
                  )}
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.open(whatsappLink, '_blank')}
                  className="border-2 text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all font-semibold"
                  style={{ borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#4c1aa3';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar com Consultor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SalaryFitsSection;
