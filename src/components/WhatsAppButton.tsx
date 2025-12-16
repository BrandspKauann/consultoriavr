import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.link/3gwhbl";

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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 group"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
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

