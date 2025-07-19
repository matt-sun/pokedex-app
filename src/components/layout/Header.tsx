import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

function Header() {
  return (
    <header className="bg-pokemon-red m-4 p-4 rounded-2xl ">
      <nav className=" grid grid-cols-3 center">
        <div className="flex items-center gap-3 justify-self-start">
          <Logo />
          <h1>
            <a href="/">Pokedex App</a>
          </h1>
        </div>

        <div className="items-center">
          <SearchBar />
        </div>
        <div className="items-center justify-self-end">
          <Button variant="link">
            <a href="/favorites">Favorites</a>
          </Button>
          <Button variant="link">
            <a href="/about">About</a>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;
