import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  // Número do WhatsApp (formato: 5511999999999 - sem espaços, com código do país)
  const phoneNumber = "5511999999999"; // Altere para o número desejado
  const message = "Olá! Gostaria de saber mais sobre Seguro de Crédito Empresarial.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
            className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 group"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="h-7 w-7" />
            <span className="sr-only">Falar no WhatsApp</span>
            
            {/* Efeito de pulso */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="mb-2">
          <p>Falar no WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;

