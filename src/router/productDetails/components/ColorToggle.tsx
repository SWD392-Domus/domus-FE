import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"


interface Props {
  colors: string[];
}

const ColorToggle: React.FC<Props> = ({
  colors
}) => {
  return (
    <ToggleGroup type="single" variant="outline">
      {colors.map((color) => (
        <ToggleGroupItem value={color} aria-label="Toggle bold">
        <div className={color === 'black'? `bg-black w-5 h-5 ring-1 ring-slate-200`:
        `bg-${color}-600 w-5 h-5 ring-1 ring-slate-200`
      }/>
      </ToggleGroupItem>
      ))}
  
      {/* <ToggleGroupItem value="italic" aria-label="Toggle italic">
        
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        
      </ToggleGroupItem> */}
    </ToggleGroup>
  )
}

export default ColorToggle