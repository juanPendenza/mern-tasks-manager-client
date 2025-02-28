import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="h-screen w-screen bg-[#100013]">
      <Navbar />
      <div className="hero items-start pt-44 h-[calc(100%-144px)]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white">To-Do list</h1>
            <p className="py-6 text-gray-400 text-md px-5 lg:text-lg">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link
              to={"/tasks"}
              className="btn bg-[#de4a00] hover:bg-[#de4a00]/70 text-white"
            >
              Crea tu primer tarea
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
