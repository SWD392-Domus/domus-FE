import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
interface Props {
    selectedYear: string;
    setSelectedYear: any;
}

const YearSelect: React.FC<Props> = (props) => {
    return (
        <Select
            onValueChange={(value) => props.setSelectedYear(value)}
            defaultValue={"2024"}
        >
            <SelectTrigger className="w-[180px]" value={props.selectedYear}>
                <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default YearSelect;
