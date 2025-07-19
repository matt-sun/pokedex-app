import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

function FavoriteButton() {
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="text-pokemon-blue bg-pokemon-yellow hover:bg-pokemon-gold"
      >
        <Heart strokeWidth={3} />
      </Button>
    </div>
  );
}

export default FavoriteButton;
