import { Badge } from "@/components/ui/badge";
import { getPokemonTypeColor } from "@/lib/utils";

interface Props {
  type?: string;
}

function TypeBadge(props: Props) {
  const typeColor = getPokemonTypeColor(props.type);

  return (
    <div className="xs:flex-1 xs:text-center">
      {props.type ? (
        <Badge
          variant="default"
          className={`bg-${typeColor} text-gray-200 dark:bg-${typeColor} min-w-22 xs:min-w-23
           w-full max-w-26 capitalize text-[0.65rem] xs:text-xs shadow-md`}
        >
          {props.type}
        </Badge>
      ) : null}
    </div>
  );
}

export default TypeBadge;
