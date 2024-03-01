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
                    <h1>{props.description.slice(0, 15)}...</h1>
                </TooltipTrigger>
                <TooltipContent className="max-w-96">
                    <p>{props.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
