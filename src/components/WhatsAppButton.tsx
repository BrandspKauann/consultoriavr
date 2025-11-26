import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.link/d3f6ih";

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            size="lg"
            className="fixed bottom-6 right-6 z-50 h-24 w-24 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 group"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="h-10 w-10" />
            <span className="sr-only">Falar no WhatsApp</span>
            
            {/* Efeito de pulso */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="mb-2 mr-2">
          <p>Falar no WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;

