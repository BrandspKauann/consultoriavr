import { cn } from "@/lib/utils";

export type ConsultoriaLogoVariant = "light" | "dark";
export type ConsultoriaLogoSize = "sm" | "md" | "lg";

interface ConsultoriaLogoProps {
  variant?: ConsultoriaLogoVariant;
  size?: ConsultoriaLogoSize;
  /** Exibe “By Hirayama” abaixo de Consultoria VR, alinhado à direita */
  showByline?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { title: "text-sm", byline: "text-[7px] sm:text-[8px]" },
  md: { title: "text-base sm:text-lg md:text-xl", byline: "text-[8px] sm:text-[9px]" },
  lg: { title: "text-lg sm:text-xl md:text-2xl", byline: "text-[9px] sm:text-[10px]" },
};

/** Marca Consultoria VR — somente wordmark + byline (sem ícone gráfico). */
export function ConsultoriaLogo({
  variant = "light",
  showByline = true,
  size = "md",
  className,
}: ConsultoriaLogoProps) {
  const s = sizeMap[size];
  const isDark = variant === "dark";

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex min-w-0 justify-center md:justify-start">
        <div className="inline-flex max-w-full flex-col items-end gap-0">
          <div
            className={cn(
              "flex flex-wrap justify-center gap-x-1.5 leading-none md:justify-start",
              s.title
            )}
          >
            <span
              className={cn(
                "shrink-0 font-semibold tracking-tight",
                isDark ? "text-primary-foreground" : "text-foreground"
              )}
            >
              Consultoria
            </span>
            <span
              className={cn(
                "shrink-0 font-extrabold tracking-tight",
                isDark ? "text-[hsl(280,48%,82%)]" : "text-primary"
              )}
            >
              VR
            </span>
          </div>
          {showByline && (
            <span
              className={cn(
                "-mt-px self-end font-medium leading-none tracking-wide",
                s.byline,
                isDark ? "text-primary-foreground/55" : "text-corporate-gray/80"
              )}
            >
              By Hirayama
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
