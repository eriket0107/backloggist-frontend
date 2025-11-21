import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image } from "@/components/Image";
import { cn } from "@/utils/cn";
import { CloudUploadIcon, } from "lucide-react";
import { getImageUrl } from "@/utils/get-url-img";
import { ItemDialogSkeleton } from "./skeleton";
import { useItemDialogForm, type ItemFormValues } from "@/hooks/useItemDialogForm";


export const EditItemDialog = () => {
  const { form,
    deferredImgUrl,
    dragActive,
    handleClose,
    handleDelete,
    handleDrag,
    handleDrop,
    handleInputChange,
    inputRef,
    isOpen,
    itemId,
    isFetchingItem,
    onSubmit,
    isToAdd
  } = useItemDialogForm()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = form;


  return (
    <Dialog open={isOpen && !isToAdd} onOpenChange={handleClose} key={itemId}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Item</DialogTitle>
        </DialogHeader>
        {isFetchingItem ? <ItemDialogSkeleton /> : <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input {...register("title")} placeholder="Título do item" />
            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              {...register("type")}
              onValueChange={value => setValue("type", value as ItemFormValues["type"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="game">Jogo</SelectItem>
                <SelectItem value="book">Livro</SelectItem>
                <SelectItem value="serie">Série</SelectItem>
                <SelectItem value="movie">Filme</SelectItem>
                <SelectItem value="course">Curso</SelectItem>
                <SelectItem value="locations">Localização</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea {...register("description")} placeholder="Descrição (opcional)" />
            <p className={cn("text-red-500 text-xs min-h-3")}>{errors?.description?.message || ''}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imgUrl">Imagem</Label>

            {/* Drag and Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              role='img'
              aria-label="Upload image"
              className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 transition-colors cursor-pointer",
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              )}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
            >
              {!isFetchingItem && deferredImgUrl ? (
                <div className="flex flex-col items-center gap-2 h-48 ">
                  <Image
                    src={getImageUrl(deferredImgUrl)}
                    alt="Preview"
                    className="min-h-48 max-w-full rounded-md shadow-md object-contain"
                  />
                  <span className="text-xs text-gray-500">Clique ou arraste para trocar</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-center min-h-48">
                  <CloudUploadIcon size={48} className="text-gray-400" />
                  <div>
                    <span className="text-gray-600 font-medium">Arraste uma imagem aqui</span>
                    <p className="text-gray-500 text-sm">ou clique para selecionar</p>
                  </div>
                </div>
              )}
              <input
                {...register("file")}
                type="file"
                accept="image/*"
                ref={inputRef}
                className="hidden"
                onChange={handleInputChange}
              />
            </div>
            <p className="text-red-500 text-xs min-h-3">{errors?.imgUrl?.message || ''}</p>
          </div>

          <DialogFooter>
            {<Button variant="destructive" className="mr-auto" disabled={isFetchingItem} onClick={handleDelete}>
              Apagar Item
            </Button>}
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>Criar</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>}
      </DialogContent>
    </Dialog >
  );
}