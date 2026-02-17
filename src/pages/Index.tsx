import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import OperatorsSection from "@/components/OperatorsSection";
import SalaryFitsSection from "@/components/SalaryFitsSection";
import SolidesSection from "@/components/SolidesSection";
import PartnershipSection from "@/components/PartnershipSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 md:pt-20">
        <Hero />
        <AboutSection />
        <OperatorsSection />
        <SalaryFitsSection />
        <SolidesSection />
        <PartnershipSection />
        <BlogSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
