import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TypeBadge from "@/components/pokemon/TypeBadge";
import FavoriteButton from "@/components/pokemon/FavoriteButton";
import type { Pokemon } from "@/lib/types";

interface Props {
  id: number;
  name: string;
  spriteF?: string;
  spriteS?: string;
  type1?: string;
  type2?: string;
}

function PokemonCard(props: Props) {
  const pokemonData: Pokemon = {
    id: props.id,
    name: props.name,
    sprites: {
      front: props.spriteF || "",
      shiny: props.spriteS || "",
    },
    types: {
      1: props.type1 || "",
      2: props.type2 || "",
    },
  };

  return (
    <div className="flex-1">
      <Card className="w-auto h-full flex flex-col flex-1 ">
        <CardHeader>
          <CardTitle className="capitalize">{props.name}</CardTitle>
          <CardDescription>
            #{props.id.toString().padStart(5, "0")}
          </CardDescription>
          <CardAction>
            <FavoriteButton
              pokemonId={props.id.toString()}
              pokemon={pokemonData}
            />
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1 flex items-center">
          <img src={props.spriteF} alt={props.name} className="w-full h-auto" />
        </CardContent>
        <CardFooter className="flex flex-1 w-full flex-wrap items-center gap-2">
          <TypeBadge type={props.type1} />
          <TypeBadge type={props.type2} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default PokemonCard;
