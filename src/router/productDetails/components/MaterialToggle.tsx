import { Label } from "@/components/ui/Label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"
import { useDispatch } from "react-redux";
import { actions } from "../sliceForSearch";
interface Props {
  materials: string[];
}

const MaterialToggle: React.FC<Props> = ({
  materials
}) => {
  const dispatch = useDispatch();

  return (
    // <ToggleGroup type="single" variant="outline">
    //   {materials.map((material) => (
    //     <ToggleGroupItem value={material} aria-label="Toggle bold" onClick={handleClick}>
    //       <p>{material}</p>
    //     </ToggleGroupItem>
    //   ))}
    // </ToggleGroup>
    <RadioGroup defaultValue="comfortable" onValueChange={(e) => dispatch(actions.setMaterial(e))}>
      {materials.map((material, index) => (
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={material} id={index.toString()} />
          <Label htmlFor={index.toString()}>{material}</Label>
        </div>
      ))}
      {/* <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div> */}
    </RadioGroup>
  )
}

export default MaterialToggle