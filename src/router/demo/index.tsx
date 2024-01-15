import React, { useState } from "react";
import styles from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { counterSelector } from "./slice/selector";
import { addAmount, decrease, increase } from "./slice";

interface Props {
    // define your props here
}

const Demo: React.FC<Props> = () => {
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
        </div>
    );
};

export default Demo;
