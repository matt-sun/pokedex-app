import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

function Header() {
  return (
    <header className="bg-pokemon-red m-4 p-4 rounded-2xl ">
      <nav className=" flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <h1>
            <a href="/">Pokedex App</a>
          </h1>
        </div>

        <div>
          <SearchBar />
        </div>
        <div>
          <Button variant="link">
            <a>Favorites</a>
          </Button>
          <Button variant="link">
            <a>About</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
