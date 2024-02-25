// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"
import { Label } from "@/components/ui/Label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { useDispatch } from "react-redux";
import { actions } from "../sliceForSearch";

interface Props {
  colors: string[];
}

const ColorToggle: React.FC<Props> = ({
  colors
}) => {
  const dispatch = useDispatch();
  return (
    <RadioGroup defaultValue="comfortable" onValueChange={(e) => dispatch(actions.setColor(e))}>
      {colors.map((color, index) => (
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={color} id={index.toString()} />
          <Label htmlFor={index.toString()}>
            <div className={color === 'black' ? `bg-black w-5 h-5 ring-1 ring-slate-200` :
              `bg-${color}-600 w-5 h-5 ring-1 ring-slate-200`
            } />
          </Label>
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
    // <ToggleGroup type="single" variant="outline">
    //   {colors.map((color) => (
    //     <ToggleGroupItem value={color} aria-label="Toggle bold">
    //       <div className={color === 'black' ? `bg-black w-5 h-5 ring-1 ring-slate-200` :
    //         `bg-${color}-600 w-5 h-5 ring-1 ring-slate-200`
    //       } />
    //     </ToggleGroupItem>
    //   ))}
    // </ToggleGroup>
  )
}

export default ColorToggle