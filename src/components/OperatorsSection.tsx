import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Smartphone, Utensils, WalletCards } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { LeadFormModal } from "./LeadFormModal";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const operators = [
  {
    logo: "/flash.png",
    title: "Flash Benefícios",
    eyebrow: "Cartão multibenefícios moderno",
    description:
      "A Flash combina benefícios, despesas corporativas e gestão digital em uma experiência prática para RH e colaboradores.",
    highlights: [
      "Categorias como alimentação, refeição, saúde, mobilidade, educação, home office, cultura e vale-transporte.",
      "Cartão Visa com uso conforme saldo e categoria configurados pela empresa.",
      "App com saldo, extrato e vantagens para o colaborador acompanhar tudo em tempo real.",
    ],
    metrics: ["Visa", "Categorias flexíveis", "App integrado"],
    fit: "Boa escolha para empresas que querem uma experiência digital, flexível e fácil de administrar.",
    accent: "#fbbf24",
    bg: "#2d1b4e",
    panel: "#3d1f6d",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    logo: "/vr.jpg",
    title: "VR Benefícios",
    eyebrow: "Tradição, rede e segurança jurídica",
    description:
      "A VR oferece soluções de alimentação, refeição e Multi para empresas que valorizam rede credenciada, gestão centralizada e previsibilidade.",
    highlights: [
      "VR Multi reúne saldos como Alimentação, Refeição, Mobilidade, Home Office, Premiação e Auxílio VR+VA.",
      "Saldos de alimentação e refeição podem ficar separados conforme regras do PAT.",
      "SuperPortal e SuperApp ajudam empresa e trabalhador a acompanhar pedidos, saldos e uso.",
    ],
    metrics: ["VR Multi", "PAT", "SuperPortal"],
    fit: "Faz sentido para RHs que precisam de controle, ampla aceitação e um parceiro consolidado.",
    accent: "#fbbf24",
    bg: "#f8fafc",
    panel: "#ffffff",
    darkText: true,
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    logo: "/caju.jpg",
    title: "Caju Benefícios",
    eyebrow: "Flexibilidade com gestão simples",
    description:
      "A Caju posiciona o cartão multibenefícios como uma solução para dar liberdade ao time sem tirar visibilidade e controle do RH.",
    highlights: [
      "Cartão Visa aceito em milhões de estabelecimentos e disponível nas principais carteiras digitais.",
      "Até 9 categorias de saldo em um único cartão, incluindo alimentação e refeição.",
      "Plataforma digital para pedidos, gestão de saldos, relatórios e rotina operacional do RH.",
    ],
    metrics: ["Visa", "Até 9 categorias", "Carteiras digitais"],
    fit: "Ideal para empresas que querem modernizar benefícios sem criar complexidade operacional.",
    accent: "#f97316",
    bg: "#2d1b4e",
    panel: "#3d1f6d",
    icon: <WalletCards className="h-5 w-5" />,
  },
  {
    logo: "/ifood.svg",
    title: "iFood Benefícios",
    eyebrow: "Alimentação, refeição e saldos extras",
    description:
      "O iFood Benefícios leva a familiaridade do ecossistema iFood para o pacote de benefícios, com cartão e app voltados ao uso diário.",
    highlights: [
      "Cartão multibenefícios com 8 saldos disponíveis para a empresa configurar.",
      "Bandeira Elo, pagamento por QR Code e suporte a carteiras digitais Apple Pay e Google Pay.",
      "Saldos Alimentação e Refeição segregados para empresas que buscam aderência ao PAT.",
    ],
    metrics: ["Elo", "8 saldos", "App iFood Benefícios"],
    fit: "Ótimo para empresas que querem uma marca conhecida e uma experiência simples para alimentação e refeição.",
    accent: "#ea1d2c",
    bg: "#fff7f7",
    panel: "#ffffff",
    darkText: true,
    icon: <Utensils className="h-5 w-5" />,
  },
];

const OperatorsSection = () => {
  const [showForm, setShowForm] = useState(false);

  const scrollToPartnership = () => {
    const partnershipSection = document.getElementById("parceria");
    if (partnershipSection) {
      partnershipSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="operadoras" className="overflow-hidden">
      <div className="py-16 sm:py-20 md:py-24" style={{ backgroundColor: "#2d1b4e" }}>
        <div className="container mx-auto px-4">
          <AnimatedSection animationType="slide-up">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "#fbbf24" }}>
                Operadoras parceiras
              </p>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: "#ffffff" }}>
                Uma solução certa para cada perfil de empresa
              </h2>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: "#e9d5ff" }}>
                Comparamos cartões, redes, categorias e modelo de gestão para indicar o pacote de benefícios que combina melhor com a rotina do seu RH.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {operators.map((operator, index) => {
        const isDark = !operator.darkText;
        const textColor = isDark ? "#ffffff" : "#241338";
        const mutedColor = isDark ? "#e9d5ff" : "#4b3b63";
        const reverse = index % 2 === 1;

        return (
          <article
            key={operator.title}
            className="min-h-[calc(100vh-5rem)] py-16 sm:py-20 md:py-24 lg:py-28"
            style={{ backgroundColor: operator.bg }}
          >
            <div className="container mx-auto flex min-h-[70vh] items-center px-4">
              <div className={`grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <AnimatedSection animationType={reverse ? "slide-left" : "slide-right"}>
                  <div className="max-w-2xl">
                    <div
                      className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
                      style={{
                        borderColor: operator.accent,
                        color: operator.accent,
                        backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.75)",
                      }}
                    >
                      {operator.icon}
                      {operator.eyebrow}
                    </div>

                    <h3 className="mb-5 text-3xl font-bold sm:text-4xl md:text-5xl" style={{ color: textColor }}>
                      {operator.title}
                    </h3>
                    <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: mutedColor }}>
                      {operator.description}
                    </p>

                    <div className="mb-8 grid gap-3">
                      {operator.highlights.map((highlight) => (
                        <div key={highlight} className="flex gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: operator.accent }} />
                          <p className="text-sm leading-relaxed sm:text-base" style={{ color: mutedColor }}>
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-8 flex flex-wrap gap-3">
                      {operator.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full px-4 py-2 text-sm font-semibold"
                          style={{
                            backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#ffffff",
                            color: isDark ? "#ffffff" : "#3d1f6d",
                            border: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgba(61,31,109,0.12)"}`,
                          }}
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        className="shadow-md transition-shadow hover:shadow-lg"
                        style={{
                          backgroundColor: operator.accent,
                          color: operator.accent === "#fbbf24" ? "#4c1aa3" : "#ffffff",
                          border: "none",
                        }}
                        onClick={scrollToPartnership}
                      >
                        Ver consultoria
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="font-semibold"
                        style={{
                          borderColor: operator.accent,
                          color: operator.accent,
                          backgroundColor: "transparent",
                        }}
                        onClick={() => setShowForm(true)}
                      >
                        Quero conversar
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animationType={reverse ? "slide-right" : "slide-left"} delay={100}>
                  <Card
                    className="mx-auto w-full max-w-xl border-2 shadow-premium"
                    style={{
                      borderColor: isDark ? "#7c3aed" : "rgba(61,31,109,0.12)",
                      backgroundColor: operator.panel,
                    }}
                  >
                    <CardContent className="p-6 sm:p-8 md:p-10">
                      <div className="mb-8 flex min-h-48 items-center justify-center rounded-2xl bg-white p-8 shadow-inner">
                        <img
                          src={operator.logo}
                          alt={`${operator.title} logo`}
                          className="max-h-32 w-full max-w-xs object-contain"
                        />
                      </div>

                      <div
                        className="rounded-2xl border p-5"
                        style={{
                          borderColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(61,31,109,0.12)",
                          backgroundColor: isDark ? "#4c1aa3" : "#f8fafc",
                        }}
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <Smartphone className="h-5 w-5" style={{ color: operator.accent }} />
                          <h4 className="text-lg font-bold" style={{ color: textColor }}>
                            Quando indicar
                          </h4>
                        </div>
                        <p className="text-sm leading-relaxed sm:text-base" style={{ color: mutedColor }}>
                          {operator.fit}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </article>
        );
      })}

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
