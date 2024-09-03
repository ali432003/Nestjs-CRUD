import Footer from "@/components/Footer";
import LandingPage from "@/components/Main";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers"

function Home() {
  const cookie = cookies()
  const token = cookie.get("token")
  return (
    <div>
      <Navbar token={token} />
      <div className="grid place-items-center min-h-screen"><LandingPage /></div>
      <Footer />
    </div>
  );
}

export default Home
