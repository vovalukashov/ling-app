import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LearnLayoutProps {
  children: React.ReactNode;
}

const LearnLayout: React.FC<LearnLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={"flex flex-1"}>{children}</main>
      <Footer />
    </div>
  );
};

export default LearnLayout;
