import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Image } from "@/components/Image";
import type { Item } from "@/types/entities";
import { cn } from "@/utils";
import { getImageUrl } from "@/utils/get-url-img";
import { cropString } from "@/utils/string-crop";
import { ItemsTableSkeleton } from "./skeleton";
import { memo } from "react";
import { Button } from "../ui/button";

interface ItemsTableProps {
  items: Item[];
  isLoading?: boolean;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  onClickItem?: (item: Item) => void;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  isFetching?: boolean;
}


const getTypeColor = (type: Item["type"]) => {
  const colors = {
    game: "bg-purple-500",
    book: "bg-[#3bf4f1]",
    serie: "bg-[#8cd4b1]",
    movie: "bg-[#e6a656]",
    course: "bg-theme",
    locations: "bg-gray-700",
  };
  return colors[type] || "bg-gray-300";
};

const getType: Record<Item["type"], string> = {
  game: "Jogos",
  book: "Livros",
  serie: "Séries",
  movie: "Filmes",
  course: "Cursos",
  locations: "Lugares",
}

const paginationButtonStyles = `
w-[100px] flex p-2
  items-center rounded-md 
  border hover:bg-gray-100 
  disabled:opacity-50 disabled:cursor-not-allowed
  no-underline!
 `;

export const ItemsTable = memo(({
  items,
  isLoading,
  onNextPage,
  onPreviousPage,
  onClickItem,
  isFirstPage,
  isLastPage,
  isFetching,
}: ItemsTableProps) => {
  if (isLoading || isFetching) {
    return <ItemsTableSkeleton />;
  }

  return (
    <div className="w-full space-y-4 ">
      {/* Pagination */}
      <div className="items-center justify-between gap-2 md:hidden flex mb-0!">
        <Button
          variant="link"
          onClick={onPreviousPage}
          disabled={isFirstPage || isFetching}
          className={paginationButtonStyles}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button
          variant="link"
          onClick={onNextPage}
          disabled={isLastPage || isFetching}
          className={paginationButtonStyles}
        >
          Próxima
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => onClickItem?.(item)}>
            <div className="flex gap-3">
              <div className="shrink-0 my-auto">
                {item.imgUrl ?
                  <Image
                    src={getImageUrl(item.imgUrl)}
                    alt={item.title}
                    width={100}
                    height={56}
                    className="rounded-md object-cover aspect-video "
                  /> :
                  <span className="my-auto flex h-14 w-[100px] items-center justify-center rounded-md bg-gray-200 text-gray-500">
                    <ImageIcon className="h-6 w-6" />
                  </span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{cropString(item.title, 20)}</h3>

                {item?.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {cropString(item?.description, 100)}
                  </p>
                )}
              </div>
              <Badge className={cn('text-white font-bold h-5', getTypeColor(item.type))}>
                {getType[item.type]}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Card className="p-x-6! p-4">
          <Table >
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[120px]">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[100px]">Tipo</TableHead>
                <TableHead className="hidden lg:table-cell">Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={cn('cursor-pointer hover:bg-gray-100', index !== items.length - 1 ? 'border-b' : '')}
                  onClick={() => onClickItem?.(item)}
                >
                  <TableCell className="py-4">
                    {item.imgUrl ?
                      <Image
                        src={getImageUrl(item.imgUrl)}
                        alt={item.title}
                        width={100}
                        height={56}
                        className="rounded-md object-cover aspect-video"
                      /> :
                      <span className="flex h-14 w-[100px] items-center justify-center rounded-md bg-gray-200 text-gray-500">
                        <ImageIcon className="h-6 w-6" />
                      </span>
                    }
                  </TableCell>
                  <TableCell className="font-semibold py-4">{item.title}</TableCell>
                  <TableCell className="py-4">
                    <Badge className={cn('text-white font-bold', getTypeColor(item.type))}>
                      {getType[item.type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-4 text-sm text-gray-600  w-full max-w-sm">
                    {item?.description && cropString(item?.description, 50) || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Pagination */}
      <div className=" items-center justify-between gap-2 hidden md:flex">
        <Button
          variant="link"
          onClick={onPreviousPage}
          disabled={isFirstPage || isFetching}
          className={paginationButtonStyles}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button
          variant="link"
          onClick={onNextPage}
          disabled={isLastPage || isFetching}
          className={paginationButtonStyles}
        >
          Próxima
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});