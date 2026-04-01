import * as React from "react"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cn } from "@/utils/index"

// Context to manage Select state
interface SelectContextType {
  value: string | undefined
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined)

// Root Select Component
interface SelectProps<T extends string = string> {
  children: React.ReactNode
  value?: T
  defaultValue?: T
  onValueChange?: (value: T) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Select: React.FC<SelectProps> = ({
  children,
  value,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  // Ensure we have a value to work with if uncontrolled
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")

  const isControlled = value !== undefined
  const isOpenControlled = controlledOpen !== undefined

  const currentValue = isControlled ? value : internalValue
  const isOpen = isOpenControlled ? controlledOpen : internalOpen

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open: !!isOpen,
        setOpen: handleOpenChange,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

// Select Trigger (Button)
interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  asChild?: boolean
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectTrigger must be used within Select")

    const { open, setOpen } = context

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          setOpen(!open)
          onClick?.(e)
        }}
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

// Select Value (Display)
interface SelectValueProps {
  placeholder?: string
  children?: React.ReactNode
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder, children }) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectValue must be used within Select")

  const { value } = context

  // We need to find the label corresponding to the value. 
  // Since we don't have direct access to children's props easily here without recursion,
  // typically this is solved by passing children to SelectValue or looking up a map.
  // HOWEVER, for a simple custom implementation without complex context registration,
  // we might need a workaround or assume the user passes the display value or we render children if value is empty.
  // 
  // Standard Radix behavior: renders text content of the selected item.
  // Simplified custom behavior: 
  // If `value` is present, we need to show the label. 
  // But strictly speaking, `value` here is the unique key. 
  // To keep it simple and library-free: We can use a ref or state registry, OR 
  // we can rely on `Select` being wrapped around `SelectContent` and `SelectItem`s.
  //
  // A common pattern for custom selects is to just display the `value` if no label map is available,
  // but that's ugly (e.g. "game" vs "Jogo").
  //
  // FIX: Let's create a label registry in the context!

  return <SelectValueDisplay placeholder={placeholder} />
}

// Helper component to consume context and render
const SelectValueDisplay = ({ placeholder }: { placeholder?: string }) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectValue must be used within Select")

  // This is the tricky part without a library: Getting the textual label for the value.
  // For now, we will render the `value` directly if no better option, 
  // BUT we can improve this by using a registry in the future.
  // 
  // HACK for compatibility: Shadcn/Radix often renders the text of the selected item.
  // We can try to rely on the parent updating this, but `SelectValue` usually handles it.
  //
  // Let's implement a simple registry for labels.

  return (
    <span className="pointer-events-none">
      {/* 
                Since we can't easily know the label from the value without traversing children
                (which is what libraries do), we will rely on a new global store or 
                pass the label map.
                
                Actually, a simpler way for this specific codebase:
                The `SelectItem` can register itself.
             */}
      <ValueRenderer placeholder={placeholder} />
    </span>
  )
}

// Registry Context
interface SelectRegistryContextType {
  register: (value: string, label: React.ReactNode) => void
  unregister: (value: string) => void
  getLabel: (value: string) => React.ReactNode
}
const SelectRegistryContext = React.createContext<SelectRegistryContextType | undefined>(undefined)

const ValueRenderer = ({ placeholder }: { placeholder?: string }) => {
  const context = React.useContext(SelectContext)
  const registry = React.useContext(SelectRegistryContext)
  const [_, forceUpdate] = React.useState(0) // Trigger re-render when registry updates

  // Subscribe to registry updates? 
  // Simplified: Just re-render when context value changes.
  // We rely on SelectItem effects to populate the registry.

  // We need state to trigger re-renders when labels are registered
  const [labels, setLabels] = React.useState<Record<string, React.ReactNode>>({})

  // We can move the registry logic to the main Select component
  // But verify if we can access it here.
  // Wait, let's refactor Select to include the Registry Provider.

  return (
    <span className="text-sm">
      {context?.value && labels[context.value] ? labels[context.value] : (context?.value || placeholder)}
    </span>
  )
}


// --- REFINE SELECT TO INCLUDE REGISTRY ---

const SelectWithRegistry = <T extends string = string>(props: SelectProps<T>) => {
  const [labels, setLabels] = React.useState<Record<string, React.ReactNode>>({})

  const register = React.useCallback((value: string, label: React.ReactNode) => {
    setLabels(prev => {
      if (prev[value] === label) return prev
      return { ...prev, [value]: label }
    })
  }, [])

  const unregister = React.useCallback((value: string) => {
    setLabels(prev => {
      const next = { ...prev }
      delete next[value]
      return next
    })
  }, [])

  const getLabel = React.useCallback((value: string) => labels[value], [labels])

  return (
    <SelectRegistryContext.Provider value={{ register, unregister, getLabel }}>
      <SelectCore {...props} labels={labels} />
    </SelectRegistryContext.Provider>
  )
}

const SelectCore = <T extends string = string>({
  children,
  value,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  onOpenChange,
  labels
}: SelectProps<T> & { labels: Record<string, React.ReactNode> }) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")

  const isControlled = value !== undefined
  const isOpenControlled = controlledOpen !== undefined

  const currentValue = isControlled ? value : internalValue
  const isOpen = isOpenControlled ? controlledOpen : internalOpen

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue as T)
    // Close on selection usually
    handleOpenChange(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  // Close on click outside
  const containerRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleOpenChange(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, handleOpenChange])

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open: !!isOpen,
        setOpen: handleOpenChange,
      }}
    >
      <div className="relative" ref={containerRef}>{children}</div>
    </SelectContext.Provider>
  )
}


const SelectValueFinal: React.FC<SelectValueProps> = ({ placeholder, children }) => {
  const context = React.useContext(SelectContext)
  const registry = React.useContext(SelectRegistryContext)

  if (!context) throw new Error("SelectValue must be used within Select")

  const displayLabel = context.value && registry?.getLabel(context.value)
    ? registry.getLabel(context.value)
    : (children || context.value || placeholder)

  return (
    <span className={cn("block truncate", !context.value && "text-muted-foreground")}>
      {displayLabel}
    </span>
  )
}

// Select Content (Dropdown)
interface SelectContentProps {
  children: React.ReactNode
  className?: string
  position?: "popper" | "item-aligned" // Kept for compatibility but unused
}

const SelectContent: React.FC<SelectContentProps> = ({ children, className }) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectContent must be used within Select")

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md transition-all bottom-auto",
        !context.open && "hidden",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 top-full mt-1 w-full",
        className
      )}
    >
      <div className="p-1 max-h-[var(--radix-select-content-available-height)] w-full overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

// Select Item
interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  value: string
  className?: string
  children: React.ReactNode
}

const SelectItem: React.FC<SelectItemProps> = ({ value, className, children, ...props }) => {
  const context = React.useContext(SelectContext)
  const registry = React.useContext(SelectRegistryContext)
  const register = React.useCallback((value: string, children: React.ReactNode) => {
    registry?.register(value, children)
  }, [registry])
  const unregister = React.useCallback((value: string) => {
    registry?.unregister(value)
  }, [registry])

  if (!context) throw new Error("SelectItem must be used within Select")

  // Register label
  React.useEffect(() => {
    register(value, children)
    return () => unregister(value)
  }, [value, children, register, unregister])

  const isSelected = context.value === value

  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent/50",
        className
      )}
      onClick={(e) => {
        e.stopPropagation()
        context.onValueChange(value)
      }}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <CheckIcon className="h-4 w-4" />}
      </span>
      <span className="truncate">{children}</span>
    </div>
  )
}

// Stubs for other components to maintain compatibility
const SelectGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>
const SelectLabel: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>{children}</div>
)
const SelectSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
)
const SelectScrollUpButton = () => null
const SelectScrollDownButton = () => null


export {
  SelectWithRegistry as Select,
  SelectGroup,
  SelectValueFinal as SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
