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
import { useMediaQuery } from "@/lib/use-media-query";

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

  const isBreakPointSmall = useMediaQuery("(min-width: 640px)");

  return (
    <div className="flex-1">
      <Card className="w-auto h-full flex flex-col flex-1">
        <CardHeader className="text-sm px-4">
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
        <CardContent className="flex-1 flex items-center px-4">
          <img src={props.spriteF} alt={props.name} className="w-full h-auto" />
        </CardContent>
        {isBreakPointSmall ? (
          <CardFooter className="flex flex-1 w-full items-center gap-2 px-4">
            <TypeBadge type={props.type1} />
            <TypeBadge type={props.type2} />
          </CardFooter>
        ) : (
          <CardFooter className="grid grid-cols-2 grid-rows-1 w-full items-center gap-4 px-4">
            <div className="justify-self-end">
              <TypeBadge type={props.type1} />
            </div>
            <div className="justify-self-start">
              <TypeBadge type={props.type2} />
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default PokemonCard;
