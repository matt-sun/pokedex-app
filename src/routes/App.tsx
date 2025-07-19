import Header from "@/Header";
import Footer from "@/Footer";
import PokemonGrid from "@/PokemonGrid";

function App() {
  return (
    <div className="font-pokemon flex min-h-screen flex-col  bg-gray-200">
      <Header />
      <PokemonGrid />
      <Footer />
    </div>
  );
}

export default App;
