import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Smartphone, Utensils, WalletCards } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { LeadFormModal } from "./LeadFormModal";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const operators = [
  {
    logo: "/flash-logo-card.png",
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
    cardTitle: "Benefícios e despesas no mesmo ecossistema",
    cardSubtitle: "Para times que precisam de flexibilidade com governança.",
    categories: ["Alimentação", "Refeição", "Mobilidade", "Saúde", "Educação", "Home office"],
    proof: "Saldos por categoria, app para colaborador e gestão digital para o RH.",
    fit: "Boa escolha para empresas que querem uma experiência digital, flexível e fácil de administrar.",
    accent: "#fe2b8f",
    cardBg: "#fe2b8f",
    logoPanelBg: "#fe2b8f",
    logoClass: "h-full max-h-36 w-full object-contain",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    logo: "/vr-beneficios.png",
    title: "VR Multi",
    eyebrow: "Tradição, rede e segurança jurídica",
    description:
      "A VR oferece soluções de alimentação, refeição e Multi para empresas que valorizam rede credenciada, gestão centralizada e previsibilidade.",
    highlights: [
      "VR Multi reúne saldos como Alimentação, Refeição, Mobilidade, Home Office, Premiação e Auxílio VR+VA.",
      "Saldos de alimentação e refeição podem ficar separados conforme regras do PAT.",
      "SuperPortal e SuperApp ajudam empresa e trabalhador a acompanhar pedidos, saldos e uso.",
    ],
    metrics: ["VR Multi", "PAT", "SuperPortal"],
    cardTitle: "Multi saldos com segurança jurídica",
    cardSubtitle: "Para empresas que priorizam controle e rede consolidada.",
    categories: ["Alimentação", "Refeição", "Mobilidade", "Home Office", "Premiação", "Auxílio VR+VA"],
    proof: "Saldos separados, SuperPortal para gestão e SuperApp para o trabalhador.",
    fit: "Faz sentido para RHs que precisam de controle, ampla aceitação e um parceiro consolidado.",
    accent: "#00a651",
    cardBg: "#00a651",
    logoPanelBg: "#00a651",
    logoClass: "max-h-32 w-auto object-contain",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    logo: "/caju-logo-card.png",
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
    cardTitle: "Liberdade para o time, visibilidade para o RH",
    cardSubtitle: "Para modernizar benefícios sem aumentar a operação.",
    categories: ["Alimentação", "Refeição", "Saúde", "Mobilidade", "Cultura", "Saldo flexível"],
    proof: "Cartão Visa, carteiras digitais e plataforma para pedidos e relatórios.",
    fit: "Ideal para empresas que querem modernizar benefícios sem criar complexidade operacional.",
    accent: "#e80537",
    cardBg: "#e80537",
    logoPanelBg: "#e80537",
    logoClass: "h-full max-h-36 w-full object-contain",
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
    cardTitle: "Uma marca conhecida no benefício diário",
    cardSubtitle: "Para alimentação e refeição com experiência simples no app.",
    categories: ["Alimentação", "Refeição", "Mobilidade", "Cultura", "Educação", "Saúde"],
    proof: "Cartão Elo, QR Code, Apple Pay, Google Pay e saldos segregados para PAT.",
    fit: "Ótimo para empresas que querem uma marca conhecida e uma experiência simples para alimentação e refeição.",
    accent: "#ea1d2c",
    cardBg: "#ea1d2c",
    logoPanelBg: "#ffffff",
    logoClass: "max-h-24 w-full max-w-xs object-contain",
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
        const textColor = "#ffffff";
        const mutedColor = "rgba(255,255,255,0.86)";
        const reverse = index % 2 === 1;

        return (
          <article
            key={operator.title}
            className="min-h-screen py-16 sm:py-20 md:py-24 lg:py-28"
            style={{ backgroundColor: operator.cardBg }}
          >
            <div className="container mx-auto flex min-h-[78vh] items-center px-4">
              <div className={`grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <AnimatedSection animationType={reverse ? "slide-left" : "slide-right"}>
                  <div className="max-w-2xl">
                    <div
                      className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
                      style={{
                        borderColor: "rgba(255,255,255,0.42)",
                        color: "#ffffff",
                        backgroundColor: "rgba(255,255,255,0.12)",
                      }}
                    >
                      {operator.icon}
                      {operator.eyebrow}
                    </div>

                    <h3 className="mb-5 text-4xl font-bold sm:text-5xl md:text-6xl" style={{ color: textColor }}>
                      {operator.title}
                    </h3>
                    <p className="mb-7 text-base leading-relaxed sm:text-lg" style={{ color: mutedColor }}>
                      {operator.description}
                    </p>

                    <div className="mb-7 grid gap-3">
                      {operator.highlights.map((highlight) => (
                        <div key={highlight} className="flex gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-white" />
                          <p className="text-sm leading-relaxed sm:text-base" style={{ color: mutedColor }}>
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-7 flex flex-wrap gap-3">
                      {operator.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full px-4 py-2 text-sm font-semibold"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.16)",
                            color: "#ffffff",
                            border: "1px solid rgba(255,255,255,0.22)",
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
                          backgroundColor: "#ffffff",
                          color: operator.cardBg,
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
                          borderColor: "rgba(255,255,255,0.72)",
                          color: "#ffffff",
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
                    className="mx-auto w-full max-w-xl overflow-hidden border border-white/30 bg-white/95 shadow-premium backdrop-blur"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                    }}
                  >
                    <CardContent className="p-0">
                      <div className="min-h-[560px] p-6 text-[#241338] sm:p-8 md:p-10">
                        <div
                          className="mb-8 flex min-h-40 items-center justify-center overflow-hidden rounded-lg p-4 shadow-sm"
                          style={{ backgroundColor: operator.logoPanelBg }}
                        >
                          <img
                            src={operator.logo}
                            alt={`${operator.title} logo`}
                            className={operator.logoClass}
                          />
                        </div>

                        <div className="mb-6">
                          <p
                            className="mb-2 text-sm font-semibold uppercase tracking-[0.18em]"
                            style={{ color: operator.cardBg }}
                          >
                            Cartão em destaque
                          </p>
                          <h4 className="text-2xl font-bold leading-tight sm:text-3xl">
                            {operator.cardTitle}
                          </h4>
                          <p className="mt-3 text-sm leading-relaxed text-[#4b3b63] sm:text-base">
                            {operator.cardSubtitle}
                          </p>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {operator.categories.map((category) => (
                            <span
                              key={category}
                              className="rounded-lg px-3 py-2 text-center text-xs font-bold"
                              style={{
                                backgroundColor: `${operator.cardBg}14`,
                                color: operator.cardBg,
                                border: `1px solid ${operator.cardBg}26`,
                              }}
                            >
                              {category}
                            </span>
                          ))}
                        </div>

                        <div className="grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
                          <div>
                            <div className="mb-3 flex items-center gap-2">
                              <Smartphone className="h-5 w-5" style={{ color: operator.cardBg }} />
                              <h5 className="font-bold">Para o RH</h5>
                            </div>
                            <p className="text-sm leading-relaxed text-[#4b3b63]">
                              {operator.proof}
                            </p>
                          </div>

                          <div className="border-t border-slate-200 pt-5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                            <div className="mb-3 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" style={{ color: operator.cardBg }} />
                              <h5 className="font-bold">Quando indicar</h5>
                            </div>
                            <p className="text-sm leading-relaxed text-[#4b3b63]">
                              {operator.fit}
                            </p>
                          </div>
                        </div>
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
