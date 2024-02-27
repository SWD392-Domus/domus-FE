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
                    <Button variant="outline">Hover</Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-96">
                    <p>{props.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
