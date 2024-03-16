// import { Label } from "@/components/ui/Label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"
// import { useDispatch } from "react-redux";
// import { actions } from "../sliceForSearch";
// interface Props {
//   sizes: string[];
// }

// const SizeToggle: React.FC<Props> = ({
//   sizes
// }) => {
//   const dispatch = useDispatch();
//   return (
//     // <ToggleGroup type="single" variant="outline">
//     //   {sizes.map((size) => (
//     //     <ToggleGroupItem value={size} aria-label="Toggle bold" onClick={handleClick}>
//     //       <p>{size}</p>
//     //     </ToggleGroupItem>
//     //   ))}
//     // </ToggleGroup>
//     <RadioGroup defaultValue="comfortable" onValueChange={(e) => dispatch(actions.setSize(e))}>
//       {sizes.map((size, index) => (
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value={size} id={index.toString()} />
//           <Label htmlFor={index.toString()}>{size}</Label>
//         </div>
//       ))}
//       {/* <div className="flex items-center space-x-2">
//         <RadioGroupItem value="comfortable" id="r2" />
//         <Label htmlFor="r2">Comfortable</Label>
//       </div>
//       <div className="flex items-center space-x-2">
//         <RadioGroupItem value="compact" id="r3" />
//         <Label htmlFor="r3">Compact</Label>
//       </div> */}
//     </RadioGroup>
//   )
// }

// export default SizeToggle