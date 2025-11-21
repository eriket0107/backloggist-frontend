import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsString, useQueryState } from "nuqs";
import { z } from "zod";
import { useItemCreate } from "./useItemCreate";
import { useItemDelete } from "./useItemDelete";
import { useItemGet } from "./useItemGet";
import { useDeferredValue, useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";

const itemSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  type: z.enum(["game", "book", "serie", "movie", "course", "locations"]),
  description: z.string().optional(),
  imgUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  file: z
    .any()
    .refine((files) => {
      if (files?.length === 0) return true; // optional
      return files?.[0]?.size <= 5 * 1024 * 1024; // 5MB
    }, "O arquivo deve ter no máximo 5MB")
    .refine((files) => {
      if (files?.length === 0) return true; // optional
      return ["image/jpeg", "image/png", "image/gif"].includes(files?.[0]?.type);
    }, "Formato de arquivo inválido. Apenas JPEG, PNG e GIF são permitidos.").optional(),
});

export type ItemFormValues = z.infer<typeof itemSchema>;

export const useItemDialogForm = () => {

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      type: "game",
      description: "",
      imgUrl: "",
      file: undefined,
    },
  });

  const { watch, setValue, reset, } = form;

  const { mutateAsync: mutateCreateAsync } = useItemCreate();
  const [itemId, setItemId] = useQueryState("itemId", parseAsString);
  const isToAdd = 'add-item' === itemId;
  const isOpen = Boolean(itemId);

  const { mutateAsync: mutateDeleteAsync } = useItemDelete({
    onSuccess: () => {
      handleClose();
    }
  })

  const { data: item, isLoading, isSuccess, isFetching, isError } = useItemGet(itemId || "", {
    queryKey: ['item', itemId],
    enabled: !!itemId && !isToAdd,
  });

  const isFetchingItem = (isFetching) && !item;

  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgUrl = watch("imgUrl");
  const deferredImgUrl = useDeferredValue(imgUrl);

  const handleDelete = async () => {
    if (itemId) {
      await mutateDeleteAsync(itemId);
    }
  }


  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setValue("imgUrl", url, { shouldValidate: true });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onSubmit = (data: ItemFormValues) => {
    mutateCreateAsync({ ...data, file: data.file?.[0] });
    setItemId('');
    reset({}, { keepDirty: false, keepDefaultValues: false })
  };

  const handleClose = useCallback(() => {
    setItemId('');
    reset({}, { keepDirty: false, keepDefaultValues: false })
  }, [setItemId, reset]);


  useEffect(() => {
    if (item && !isToAdd) {
      reset({
        title: item.title,
        type: item.type,
        description: item.description || "",
        imgUrl: item.imgUrl || "",
        file: undefined,
      }, { keepDirty: false, keepDefaultValues: false });
    }

    if (isToAdd && isOpen) {
      reset({
        title: "",
        type: "game",
        description: "",
        imgUrl: "",
        file: undefined,
      }, { keepDirty: false, keepDefaultValues: false });
    }

    if (isError) {
      handleClose();
    }
  }, [item, reset, isToAdd, isOpen, isError, handleClose]);


  return {
    form,
    isOpen,
    isLoading,
    deferredImgUrl,
    dragActive,
    inputRef,
    handleDelete,
    handleDrop,
    handleDrag,
    handleInputChange,
    onSubmit,
    handleClose,
    isSuccess,
    item,
    itemId,
    isFetchingItem,
    isToAdd,
  }
}