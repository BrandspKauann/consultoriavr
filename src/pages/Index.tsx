import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OperatorsSection from "@/components/OperatorsSection";
import PartnershipSection from "@/components/PartnershipSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <OperatorsSection />
      <PartnershipSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
