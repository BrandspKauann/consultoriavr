import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OperatorsSection from "@/components/OperatorsSection";
import SalaryFitsSection from "@/components/SalaryFitsSection";
import PartnershipSection from "@/components/PartnershipSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 md:pt-20">
        <Hero />
        <OperatorsSection />
        <SalaryFitsSection />
        <PartnershipSection />
        <BlogSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
