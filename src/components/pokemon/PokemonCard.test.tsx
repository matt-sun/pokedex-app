import PokemonCard from "@/components/pokemon/PokemonCard";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("@/lib/cache", () => ({
  getFavoritePokemon: jest.fn().mockRejectedValue(new Error("Not found")),
  addFavoritePokemon: jest.fn().mockResolvedValue(undefined),
  removeFavoritePokemon: jest.fn().mockResolvedValue(undefined),
}));

describe("PokemonCard", () => {
  it("renders the PokemonCard component with given props", async () => {
    render(
      <PokemonCard
        id={1}
        name="Bulbasaur"
        spriteF="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        spriteS="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png"
        type1="Grass"
        type2="Poison"
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    });

    expect(screen.getByAltText("Bulbasaur")).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    );
    expect(screen.getByText("Grass")).toBeInTheDocument();
    expect(screen.getByText("Poison")).toBeInTheDocument();
  });
});
