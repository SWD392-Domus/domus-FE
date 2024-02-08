import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"


interface Props {}

const SizeToggle: React.FC<Props> = () => {
  return (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="2" aria-label="Toggle bold">
        <p>118"</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="1" aria-label="Toggle bold">
      <p>157.5"</p>
      </ToggleGroupItem>
      {/* <ToggleGroupItem value="italic" aria-label="Toggle italic">
        
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        
      </ToggleGroupItem> */}
    </ToggleGroup>
  )
}

export default SizeToggle