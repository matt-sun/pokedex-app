import type { PokemonMoves } from "@/lib/types";
import type { ColumnDef, Column } from "@tanstack/react-table";
import TypeBadge from "./TypeBadge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

interface MovesTableMeta {
  expandedRows: Set<string>;
  toggleRow: (rowId: string) => void;
}

const columns: ColumnDef<PokemonMoves>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return tableSorting(column);
    },
    cell: ({ row }) => {
      return (
        <div className="text-wrap text-left capitalize">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return tableSorting(column);
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return <TypeBadge type={type} />;
    },
  },
  {
    accessorKey: "damageClass",
    header: ({ column }) => {
      return tableSorting(column);
    },
    cell: ({ row }) => {
      const damageClass = row.getValue("damageClass") as string;
      const imageMap = {
        physical: {
          src: "https://img.pokemondb.net/images/icons/move-physical.png",
          alt: "Physical",
          title: "Physical",
        },
        special: {
          src: "https://img.pokemondb.net/images/icons/move-special.png",
          alt: "Special",
          title: "Special",
        },
        status: {
          src: "https://img.pokemondb.net/images/icons/move-status.png",
          alt: "Status",
          title: "Status",
        },
      };

      const imageInfo =
        imageMap[damageClass as keyof typeof imageMap] || imageMap.status;

      return (
        <div className="flex justify-center">
          <img
            className="img-fixed"
            src={imageInfo.src}
            width="30"
            height="20"
            alt={imageInfo.alt}
            title={imageInfo.title}
            loading="lazy"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "power",
    header: ({ column }) => {
      return tableSorting(column);
    },
  },
  {
    accessorKey: "accuracy",
    header: ({ column }) => {
      return tableSorting(column);
    },
  },
  {
    accessorKey: "pp",
    header: "PP",
  },
  {
    accessorKey: "effectChance",
    header: "Eff %",
  },
  {
    accessorKey: "description",
    header: "Desc.",
    cell: ({ row, table }) => {
      const meta = table.options.meta as MovesTableMeta;
      const isExpanded = meta.expandedRows.has(row.id) || false;

      return (
        <div className="text-center">
          <Button
            variant="secondary"
            size="icon"
            className="size-8 cursor-pointer"
            key={row.id}
          >
            <ChevronDown
              className={`transition-transform duration-200 ${
                isExpanded ? "rotate-0" : "-rotate-90"
              }`}
            />
          </Button>
        </div>
      );
    },
  },
];

function tableSorting(column: Column<PokemonMoves>) {
  const columnId = () => {
    switch (column.id) {
      case "name":
        return "Name";
      case "type":
        return "Type";
      case "damageClass":
        return "Cat.";
      case "power":
        return "Pwr";
      case "accuracy":
        return "Acc";
      default:
        return "Oops";
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="capitalize cursor-pointer p-0 gap-0 w-full text-xs sm:text-sm"
    >
      {columnId()}
      <ChevronsUpDown className="h-4 w-4" />
    </Button>
  );
}

export { columns };
