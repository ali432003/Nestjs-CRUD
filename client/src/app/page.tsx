import Footer from "@/components/Footer";
import LandingPage from "@/components/Main";
import Navbar from "@/components/Navbar";




function Home() {

  return (
    <div>
      <Navbar />
      <div className="grid place-items-center min-h-screen"><LandingPage /></div>
      <Footer />
    </div>
  );
}

export default Home
