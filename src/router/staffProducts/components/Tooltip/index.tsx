import { Button } from "@/components/ui/Button/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

interface Props {
  description: string;
}

export const TooltipDes: React.FC<Props> = (props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {props.description ? (
            <div className="w-20 truncate">{props.description}</div>
          ) : (
            <div className="w-20 truncate">No Description</div>
          )}
        </TooltipTrigger>
        <TooltipContent className="max-w-96">
          <p>{props.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
