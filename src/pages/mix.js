import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function App() {
  const [calc, setCalc] = useState("");
  const [equal, setEqual] = useState("");

  const ops = ["/", "*", "-", "+", "."];

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        //add elenets to the array
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }

    return digits;
  };

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setEqual(eval(calc + value).toString());
    }
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc == "") {
    }
    const value = calc.slice(0, -1);

    setCalc(value);
  };

  return (
    <div className={styles.buttons}>
      <div className={styles.calculator}>
        <div className={styles.display}>
          <span>{equal ? "(" + equal + ")" : ""}</span> {calc || 0}
        </div>

        <div className={styles.operators}>
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>x</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => updateCalc("+")}>+</button>

          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className={styles.digits}>
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}
