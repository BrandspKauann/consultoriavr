import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";

  const menuItems = [
    { label: "Início", href: "/", type: "route" as const },
    { label: "O que é", href: "#o-que-e", type: "anchor" as const },
    { label: "Serviços", href: "#servicos", type: "anchor" as const },
    { label: "Conteúdo", href: "/conteudo", type: "route" as const },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (item: typeof menuItems[number]) => {
    if (item.type === "route") {
      if (item.href === "/") {
        window.location.href = "/";
      } else {
        navigate(item.href);
      }
      setIsMenuOpen(false);
      return;
    }

    // Para links de âncora, se não estiver na home, navegar para home primeiro
    if (item.type === "anchor") {
      if (location.pathname !== "/") {
        // Navegar para home com o hash para fazer scroll automático
        window.location.href = item.href;
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`w-full bg-background/98 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? "shadow-lg shadow-primary/5" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Name */}
          <div className="flex items-center gap-6">
            <a href="/" className="text-lg sm:text-xl font-bold text-primary hover:text-trust-blue transition-colors">
              Hirayama Seguros de Crédito
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className="px-4 py-2.5 text-sm lg:text-base text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg transition-all duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => window.open(whatsappLink, '_blank')}
              className="hidden sm:flex shadow-md hover:shadow-lg transition-shadow"
            >
              Falar no WhatsApp
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-left text-xl">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item)}
                      className="text-left px-4 py-3 text-base text-corporate-gray hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.open(whatsappLink, '_blank');
                    }}
                    className="mt-4 w-full"
                  >
                    Falar no WhatsApp
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
