import { Badge } from "@/components/ui/badge";

interface Props {
  type?: string;
}

function TypeBadge(props: Props) {
  let typeColor: string;

  switch (props.type) {
    case "normal":
      typeColor = "bg-pokemon-normal";
      break;

    case "fire":
      typeColor = "bg-pokemon-fire";
      break;

    case "water":
      typeColor = "bg-pokemon-water";
      break;

    case "electric":
      typeColor = "bg-pokemon-electric";
      break;

    case "grass":
      typeColor = "bg-pokemon-grass";
      break;

    case "ice":
      typeColor = "bg-pokemon-ice";
      break;

    case "fighting":
      typeColor = "bg-pokemon-fighting";
      break;

    case "poison":
      typeColor = "bg-pokemon-poison";
      break;

    case "ground":
      typeColor = "bg-pokemon-ground";
      break;

    case "flying":
      typeColor = "bg-pokemon-flying";
      break;

    case "psychic":
      typeColor = "bg-pokemon-psychic";
      break;

    case "bug":
      typeColor = "bg-pokemon-bug";
      break;

    case "rock":
      typeColor = "bg-pokemon-rock";
      break;

    case "ghost":
      typeColor = "bg-pokemon-ghost";
      break;

    case "dragon":
      typeColor = "bg-pokemon-dragon";
      break;

    case "dark":
      typeColor = "bg-pokemon-dark";
      break;

    case "steel":
      typeColor = "bg-pokemon-steel";
      break;

    case "fairy":
      typeColor = "bg-pokemon-fairy";
      break;

    default:
      typeColor = "bg-pokemon-normal";
      break;
  }

  return (
    <div>
      {props.type ? (
        <Badge
          variant="default"
          className={`${typeColor} text-white dark:${typeColor} min-w-23 capitalize text-xs`}
        >
          {props.type}
        </Badge>
      ) : null}
    </div>
  );
}

export default TypeBadge;
