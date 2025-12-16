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
  const whatsappLink = "https://wa.link/3gwhbl";
  const calendlyLink = "https://calendly.com/ewertonhirayama/consultoria-em-cartoes-de-vale-refeicao-e-alimentacao";

  const menuItems: Array<{ label: string; href: string; type: "route" | "anchor" }> = [
    { label: "Início", href: "/", type: "route" },
    { label: "Operadoras", href: "#operadoras", type: "anchor" },
    { label: "Parceria", href: "#parceria", type: "anchor" },
    { label: "Blog", href: "/conteudo", type: "route" },
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
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Brand Name */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <a href="/" className="text-base sm:text-lg md:text-xl font-bold text-primary hover:text-secondary transition-colors">
              Consultoria VR
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className="px-3 lg:px-4 py-2 lg:py-2.5 text-xs lg:text-sm xl:text-base text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg transition-all duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.open(calendlyLink, '_blank')}
              className="hidden md:flex text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Agendar reunião
            </Button>
            
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => window.open(whatsappLink, '_blank')}
              className="hidden md:flex text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-2.5 shadow-md hover:shadow-lg transition-shadow border-2 border-white"
            >
              Falar com um consultor
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="text-left text-lg sm:text-xl">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6 sm:mt-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item)}
                      className="text-left px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground/80 hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.open(calendlyLink, '_blank');
                    }}
                    className="mt-4 w-full text-sm sm:text-base px-4 py-2.5 sm:py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Agendar reunião
                  </Button>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.open(whatsappLink, '_blank');
                    }}
                    className="mt-2 w-full text-sm sm:text-base px-4 py-2.5 sm:py-3 border-2 border-white"
                  >
                    Falar com um consultor
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
