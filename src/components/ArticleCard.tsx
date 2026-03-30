import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  onOpen: () => void;
  className?: string;
}

function readTimeLabel(readTime?: string | null) {
  if (!readTime?.trim()) return "";
  return readTime.trim().toUpperCase().replace(/\./g, "");
}

/**
 * Card no estilo editorial: sem imagem, categoria em caixa alta, rodapé com tempo + “Ler artigo”.
 */
export function ArticleCard({ article, onOpen, className }: ArticleCardProps) {
  const timeLabel = readTimeLabel(article.read_time);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border/70 bg-card p-6 sm:p-7",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]",
        "transition-[box-shadow,border-color,transform] duration-200",
        "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.08)]",
        "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
        className
      )}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary sm:text-xs">
        {article.category}
      </p>

      <h3 className="mb-3 line-clamp-3 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
        {article.title}
      </h3>

      <p
        className="mb-0 line-clamp-4 flex-grow text-sm leading-relaxed text-muted-foreground sm:text-[15px] [&_b]:font-semibold [&_b]:text-foreground/85 [&_strong]:font-semibold [&_strong]:text-foreground/85"
        dangerouslySetInnerHTML={{ __html: article.description }}
      />

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/50 pt-5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
          {timeLabel || "—"}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
          Ler artigo
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </article>
  );
}
