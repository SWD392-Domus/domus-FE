import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"


interface Props {
  sizes: string[];
}

const SizeToggle: React.FC<Props> = ({
  sizes
}) => {
  return (
    <ToggleGroup type="single" variant="outline">
      {sizes.map((size) => (
         <ToggleGroupItem value={size} aria-label="Toggle bold">
        <p>{size}</p>
      </ToggleGroupItem>
      ))}
      {/* <ToggleGroupItem value="italic" aria-label="Toggle italic">
        
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        
      </ToggleGroupItem> */}
    </ToggleGroup>
  )
}

export default SizeToggle