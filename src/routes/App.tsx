import Header from "@/Header";
import Footer from "@/Footer";
import PokemonCard from "@/PokemonCard";

function App() {
  return (
    <div className="font-pokemon flex min-h-screen flex-col  bg-gray-200">
      <Header />
      <div className="flex grow mx-4 rounded-2xl gap-6 justify-center">
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </div>
      <Footer />
    </div>
  );
}

export default App;
