import { ArrowRight } from "lucide-react";

const cards = [
  {
    id: "flash",
    name: "Flash",
    logo: "/flash-logo-card.png",
    bg: "#fe2b8f",
    logoClass: "h-12 w-full object-contain",
  },
  {
    id: "vr",
    name: "VR Multi",
    logo: "/vr-beneficios.png",
    bg: "#00be28",
    logoClass: "h-12 w-auto object-contain",
  },
  {
    id: "caju",
    name: "Caju",
    logo: "/caju-logo-card.png",
    bg: "#db021f",
    logoClass: "h-12 w-full object-contain",
  },
  {
    id: "ifood",
    name: "iFood",
    logo: "/ifood.svg",
    bg: "#ffffff",
    border: "#ea1d2c",
    text: "#ea1d2c",
    logoClass: "h-10 w-full object-contain",
  },
];

const BenefitCardsStrip = () => {
  const scrollToCard = (cardId: string) => {
    const target = document.getElementById(`cartao-${cardId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#cartao-${cardId}`);
    }
  };

  return (
    <section className="bg-[#f7f2fb] py-8 sm:py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => scrollToCard(card.id)}
              className="group relative aspect-[1.586/1] overflow-hidden rounded-2xl border p-4 text-left shadow-[0_18px_45px_rgba(36,19,56,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(36,19,56,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c1aa3]"
              style={{
                backgroundColor: card.bg,
                borderColor: card.border ?? "rgba(255,255,255,0.18)",
              }}
              aria-label={`Ver detalhes do ${card.name}`}
            >
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-16px_42px_rgba(0,0,0,0.12)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span
                    className="text-xs font-bold uppercase tracking-[0.18em]"
                    style={{ color: card.text ?? "rgba(255,255,255,0.7)" }}
                  >
                    Benefícios
                  </span>
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    style={{ color: card.text ?? "rgba(255,255,255,0.75)" }}
                  />
                </div>

                <div>
                  <div className="mb-4 flex h-16 max-w-36 items-center justify-start overflow-hidden rounded-xl">
                    <img src={card.logo} alt={`${card.name} logo`} className={card.logoClass} />
                  </div>
                  <p
                    className="text-lg font-extrabold leading-tight"
                    style={{ color: card.text ?? "#ffffff" }}
                  >
                    {card.name}
                  </p>
                  <p
                    className="mt-1 text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{ color: card.text ?? "rgba(255,255,255,0.65)" }}
                  >
                    Cartão corporativo
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitCardsStrip;
