import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsString, useQueryState } from "nuqs";
import { z } from "zod";
import { useItemCreate } from "./useItemCreate";
import { useItemDelete } from "./useItemDelete";
import { useItemGetById } from "./useItemGetById";
import { useDeferredValue, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { useItemUpdate } from "./useItemUpdate";

// Esquema Zod (Mantido)
const itemSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  type: z.enum(["game", "book", "serie", "movie", "course", "locations"]),
  description: z.string().optional(),
  imgUrl: z.string().optional().or(z.literal("")),
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

const initialDefaultValues: ItemFormValues = {
  title: "",
  type: "game",
  description: "",
  imgUrl: "",
  file: undefined,
};

export const useItemDialogForm = () => {
  const [itemId, setItemId] = useQueryState("itemId", parseAsString);
  const isToAdd = 'add-item' === itemId;
  const isOpen = Boolean(itemId);

  const { data: item, isSuccess } = useItemGetById({
    id: itemId || undefined,
    options: {
      enabled: !!itemId && !isToAdd,
      queryKey: ['item', itemId],
      refetchOnMount: false,
    }
  });

  const formValues = isToAdd ? initialDefaultValues : item
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    values: formValues,
  });

  const { watch, setValue, reset, } = form;

  const { mutateAsync: mutateCreateAsync } = useItemCreate({
    onSuccess: () => {
      toast.success("Item salvo com sucesso!");
      handleClose();
    }
  });

  const { mutateAsync: mutateDeleteAsync } = useItemDelete({
    onSuccess: () => {
      handleClose();
      toast.success("Excluído com sucesso!");
    },
    onError: () => {
      toast.error("Item não encontrado.");
      handleClose();
    }
  })

  const { mutateAsync: mutateUpdateAsync } = useItemUpdate({
    onSuccess: () => {
      toast.success("Item atualizado com sucesso!");
      handleClose();
    },
    onError: () => {
      toast.error("Item não encontrado.");
    },
  })

  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgUrl = watch("imgUrl");
  const deferredImgUrl = useDeferredValue(imgUrl);

  const handleDelete = async () => {
    if (itemId) {
      await mutateDeleteAsync(itemId);
    } else {
      toast.error("Item não encontrado.");
    }
  }

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);

    setValue("imgUrl", url, { shouldValidate: true });
    setValue("file", [file], { shouldValidate: true });
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

  const onSubmit = async (data: ItemFormValues) => {
    if (item && !isToAdd) {
      await mutateUpdateAsync({ itemId: item.id, data: { ...data, file: data.file?.[0] } });
      handleClose();
      return;
    }

    await mutateCreateAsync({ ...data, file: data.file?.[0] });
    handleClose();
  };

  const handleClose = useCallback(() => {
    setItemId('');
    reset(initialDefaultValues, { keepDirty: false, keepDefaultValues: false })
  }, [setItemId, reset]);


  const isFormLoading = !isToAdd && !!itemId && !item && !isSuccess;

  return {
    form,
    isOpen,
    deferredImgUrl,
    dragActive,
    inputRef,
    handleDelete,
    handleDrop,
    handleDrag,
    handleInputChange,
    onSubmit,
    handleClose,
    item,
    itemId,
    isFetchingItem: isFormLoading,
    isToAdd,
  }
}