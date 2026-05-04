import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Smartphone, Utensils, WalletCards } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { LeadFormModal } from "./LeadFormModal";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const operators = [
  {
    logo: "/flash-beneficios.svg",
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
    accent: "#ff2f7d",
    cardBg: "#ff2f7d",
    bg: "#2d1b4e",
    panel: "#3d1f6d",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    logo: "/vr-multi.svg",
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
    bg: "#f8fafc",
    panel: "#ffffff",
    darkText: true,
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    logo: "/caju-beneficios.svg",
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
    accent: "#f97316",
    cardBg: "#f97316",
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
    cardTitle: "Uma marca conhecida no benefício diário",
    cardSubtitle: "Para alimentação e refeição com experiência simples no app.",
    categories: ["Alimentação", "Refeição", "Mobilidade", "Cultura", "Educação", "Saúde"],
    proof: "Cartão Elo, QR Code, Apple Pay, Google Pay e saldos segregados para PAT.",
    fit: "Ótimo para empresas que querem uma marca conhecida e uma experiência simples para alimentação e refeição.",
    accent: "#ea1d2c",
    cardBg: "#ea1d2c",
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

                    <h3 className="mb-5 text-4xl font-bold sm:text-5xl md:text-6xl" style={{ color: textColor }}>
                      {operator.title}
                    </h3>
                    <p className="mb-7 text-base leading-relaxed sm:text-lg" style={{ color: mutedColor }}>
                      {operator.description}
                    </p>

                    <div className="mb-7 grid gap-3">
                      {operator.highlights.map((highlight) => (
                        <div key={highlight} className="flex gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: operator.accent }} />
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
                    className="mx-auto w-full max-w-xl overflow-hidden border-0 shadow-premium"
                    style={{
                      backgroundColor: operator.cardBg,
                    }}
                  >
                    <CardContent className="p-0">
                      <div className="relative min-h-[560px] p-6 text-white sm:p-8 md:p-10">
                        <div className="absolute inset-0 opacity-15">
                          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white" />
                          <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-white" />
                        </div>

                        <div className="relative">
                          <div className="mb-8 flex min-h-36 items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
                        <img
                          src={operator.logo}
                          alt={`${operator.title} logo`}
                              className="max-h-28 w-full max-w-sm object-contain"
                        />
                      </div>

                          <div className="mb-6">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
                              Cartão em destaque
                            </p>
                            <h4 className="text-2xl font-bold leading-tight sm:text-3xl">
                              {operator.cardTitle}
                          </h4>
                            <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                              {operator.cardSubtitle}
                            </p>
                        </div>

                          <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {operator.categories.map((category) => (
                              <span
                                key={category}
                                className="rounded-xl bg-white/16 px-3 py-2 text-center text-xs font-bold text-white ring-1 ring-white/20"
                              >
                                {category}
                              </span>
                            ))}
                      </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white p-5 text-[#241338] shadow-lg">
                              <div className="mb-3 flex items-center gap-2">
                                <Smartphone className="h-5 w-5" style={{ color: operator.cardBg }} />
                                <h5 className="font-bold">Para o RH</h5>
                              </div>
                              <p className="text-sm leading-relaxed text-[#4b3b63]">
                                {operator.proof}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-black/18 p-5 ring-1 ring-white/20">
                              <div className="mb-3 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                                <h5 className="font-bold">Quando indicar</h5>
                              </div>
                              <p className="text-sm leading-relaxed text-white/85">
                                {operator.fit}
                              </p>
                            </div>
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
