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
import FavoriteButton from "@/components/layout/FavoriteButton";

interface Props {
  id: number;
  name: string;
  spriteF: string;
  spriteS?: string;
  type1: string;
  type2?: string;
}

function PokemonCard(props: Props) {
  return (
    <div>
      <Card className="w-auto">
        <CardHeader>
          <CardTitle className="capitalize">{props.name}</CardTitle>
          <CardDescription># {props.id}</CardDescription>
          <CardAction>
            <FavoriteButton />
          </CardAction>
        </CardHeader>
        <CardContent>
          <img src={props.spriteF} alt={props.name} className="w-full h-auto" />
        </CardContent>
        <CardFooter className="flex w-full flex-wrap gap-2 items-center">
          <TypeBadge type={props.type1} />
          <TypeBadge type={props.type2} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default PokemonCard;
