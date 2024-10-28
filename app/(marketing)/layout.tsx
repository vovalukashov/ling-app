import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={"flex flex-1"}>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
