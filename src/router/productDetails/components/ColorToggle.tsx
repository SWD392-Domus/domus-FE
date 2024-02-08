import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"


interface Props {}

const ColorToggle: React.FC<Props> = () => {
  return (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="2" aria-label="Toggle bold">
        <div className="bg-black w-5 h-5 ring-1 ring-slate-200"/>
      </ToggleGroupItem>
      <ToggleGroupItem value="1" aria-label="Toggle bold">
      <div className="bg-white w-5 h-5 ring-1 ring-slate-200"/>
      </ToggleGroupItem>
      {/* <ToggleGroupItem value="italic" aria-label="Toggle italic">
        
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        
      </ToggleGroupItem> */}
    </ToggleGroup>
  )
}

export default ColorToggle