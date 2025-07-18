import Header from "@/Header";
import Footer from "@/Footer";

function App() {
  return (
    <div className="font-pokemon flex min-h-screen flex-col  bg-gray-200">
      <Header />
      <div className="grow mx-4 px-4 rounded-2xl">
        <p>Hello world!</p>
      </div>

      <Footer />
    </div>
  );
}

export default App;
