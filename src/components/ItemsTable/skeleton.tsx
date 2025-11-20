import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useId } from "react";

export const ItemsTableSkeleton = () => {
  const bodyKeyId = useId();
  const cardKeyId = useId();
  const generateKey = (prefix: string, index: number) => `${prefix}-${bodyKeyId}-${cardKeyId}-${index}`;
  return (
    <div className="w-full space-y-4">
      {/* Mobile View */}
      <div className="block md:hidden space-y-3 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={generateKey(cardKeyId, index)} className="p-4">
            <div className="flex gap-3">
              <div className="shrink-0">
                <Skeleton className="h-14 w-24 rounded-md" />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Card className="p-x-6! p-4">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[120px]">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[100px]">Tipo</TableHead>
                <TableHead className="hidden lg:table-cell">Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={generateKey(bodyKeyId, index)} className="border-b">
                  <TableCell className="py-4">
                    <Skeleton className="h-14 w-24 rounded-md" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-4 text-sm text-gray-600  w-full max-w-sm">
                    <Skeleton className="h-4 w-full max-w-sm" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Pagination Skeleton */}
      {/* <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-10 w-[100px]  rounded-md" />
        <Skeleton className="h-10 w-[100px]  rounded-md" />
      </div> */}
    </div>
  );
};