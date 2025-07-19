import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TypeBadge from "./TypeBadge";
import FavoriteButton from "./FavoriteButton";

function PokemonCard() {
  return (
    <div>
      <Card className="w-auto">
        <CardHeader>
          <CardTitle>Charizard</CardTitle>
          <CardDescription>#0006</CardDescription>
          <CardAction>
            <FavoriteButton />
          </CardAction>
        </CardHeader>
        <CardContent>
          <img
            src="/src/assets/006.png"
            alt="Charizard"
            className="w-full h-auto"
          />
        </CardContent>
        <CardFooter className="flex w-full flex-wrap gap-2">
          <TypeBadge />
          <TypeBadge />
        </CardFooter>
      </Card>
    </div>
  );
}

export default PokemonCard;
