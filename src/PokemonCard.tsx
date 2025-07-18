import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function PokemonCard() {
  return (
    <div>
      <Card className="w-3xs">
        <CardHeader>
          <CardTitle>Charizard</CardTitle>
          <CardDescription>#0006</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src="/src/assets/006.png"
            alt="Charizard"
            className="w-full h-auto"
          />
        </CardContent>
        <CardFooter className="flex w-full flex-wrap gap-2">
          <Badge
            variant="default"
            className="bg-orange-500 text-white dark:bg-orange-500 w-16"
          >
            Fire
          </Badge>
          <Badge
            variant="default"
            className="bg-blue-200 text-white dark:bg-blue-200 w-16"
          >
            Fly
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PokemonCard;
