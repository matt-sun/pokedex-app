import { Badge } from "@/components/ui/badge";

function TypeBadge() {
  return (
    <div>
      <Badge
        variant="default"
        className="bg-orange-500 text-white dark:bg-orange-500 w-16"
      >
        Fire
      </Badge>
    </div>
  );
}

export default TypeBadge;
