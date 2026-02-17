import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import { LeadFormModal } from "./LeadFormModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
      className={`w-full bg-white border-b border-border/50 fixed top-0 z-50 transition-all duration-500 ${
        isScrolled ? "shadow-lg shadow-primary/5" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 md:py-4">
        <div className="flex items-center justify-between md:justify-between relative">
          {/* Brand Name - Centralizado no mobile */}
          <div className="flex-1 flex justify-center md:justify-start md:flex-initial">
            <a href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-all">
                  Consultoria VR
                </span>
                <span className="text-[10px] sm:text-xs font-medium hidden sm:block" style={{ color: '#1a1a1a' }}>
                  Especialistas em Benefícios
                </span>
              </div>
            </a>
          </div>
            
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item)}
                className="px-3 lg:px-4 py-2 lg:py-2.5 text-xs lg:text-sm xl:text-base text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 font-medium relative group hover:scale-105 hover:shadow-md"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setShowForm(true)}
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
                  <SheetTitle className="text-left text-lg sm:text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Consultoria VR
                  </SheetTitle>
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
                      setShowForm(true);
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

      {/* Form Modal */}
      <LeadFormModal
        open={showForm}
        onOpenChange={setShowForm}
        title="Agendar Reunião"
        description="Preencha o formulário e entraremos em contato para agendar sua reunião."
        origem="header"
      />
    </header>
  );
};

export default Header;
