import { Badge } from "@/components/ui/badge";
import { getPokemonTypeColor } from "@/lib/utils";

interface Props {
  type?: string;
}

function TypeBadge(props: Props) {
  const typeColor = getPokemonTypeColor(props.type);

  return (
    <div className="flex-1">
      {props.type ? (
        <Badge
          variant="default"
          className={`bg-${typeColor} text-white dark:bg-${typeColor} min-w-22
           w-full max-w-24 capitalize text-xs shadow-md`}
        >
          {props.type}
        </Badge>
      ) : null}
    </div>
  );
}

export default TypeBadge;
