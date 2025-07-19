import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-pokemon-red m-4 p-4 rounded-2xl ">
      <nav className=" grid grid-cols-3 center">
        <div className="flex items-center gap-3 justify-self-start">
          <Logo />
          <h1>
            <Link to={``}>Pokedex App</Link>
          </h1>
        </div>

        <div className="items-center">
          <SearchBar />
        </div>
        <div className="items-center justify-self-end">
          <Button variant="link">
            <Link to={`favorites`}>Favorites</Link>
          </Button>
          <Button variant="link">
            <Link to={`about`}>About</Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;
