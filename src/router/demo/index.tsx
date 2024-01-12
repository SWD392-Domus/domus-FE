import React, { useEffect, useState } from "react";
import styles from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { counterSelector } from "./slice/selector";
import { addAmount, decrease, increase } from "./slice";
import { Button, buttonVariants } from "@/components/Button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/Accordion"



interface Props {
    // define your props here
}

const Demo: React.FC<Props> = (props) => {
    const [ammount, setAmmount] = useState<number>(0);
    const { count } = useSelector(counterSelector);
    const dispatch = useDispatch();
    const handleIncrement = () => {
        dispatch(increase());
    };
    const handleDecreaseMent = () => {
        dispatch(decrease());
    };
    const handleAmmountIncreasement = () => {
        dispatch(addAmount(ammount));
    };
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <div className={styles.row}>
                        <button
                            className={styles.button}
                            aria-label="Increment value"
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                        <span className={styles.value}>{count}</span>
                        <button
                            className={styles.button}
                            onClick={handleDecreaseMent}
                        >
                            -
                        </button>
                    </div>
                    <div className={styles.row}>
                        <input
                            className={styles.textbox}
                            aria-label="Set increment amount"
                            value={ammount}
                            onChange={(e) => setAmmount(Number(e.target.value))}
                        />
                        <button
                            className={styles.button}
                            onClick={handleAmmountIncreasement}
                        >
                            Add Amount
                        </button>
                    </div>
                </div>
            </header>
            <div className="flex justify-center p-20">
                <div className="w-56">

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>A tâm đẹp trai ko?</AccordionTrigger>
                        <AccordionContent>
                            Yes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>fuck?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other
                            components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>hihihih?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It's animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            </div>
            
            <Button variant="destructive">Button</Button>



        </div>
    );
};

export default Demo;
