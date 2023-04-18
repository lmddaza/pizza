import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Calculator() {
  const [equals, setEquals] = useState(0);
  const [num1, setNum1] = useState();
  const [operation, setOperation] = useState();
  const [num2, setNum2] = useState();

  const getNum1 = (event) => {
    const value = event.target.value;
    console.log(value);
    setNum1(value);
  };
  const getOperationValue = (event) => {
    const operationValue = event.target.value;
    setOperation(operationValue);
    console.log(operationValue);
  };
  const getNum2 = (event) => {
    const value2 = event.target.value;
    console.log(value2);
    setNum2(value2);
  };

  const reset = () => {
    setNum1();
    setOperation();
    setNum2();
    setEquals(0);
  };

  const calculate = () => {
    if (operation == "+") {
      return setEquals(parseFloat(num1) + parseFloat(num2));
    } else if (operation == "-") {
      return setEquals(parseFloat(num1) - parseFloat(num2));
    } else if (operation == "*") {
      return setEquals(parseFloat(num1) * parseFloat(num2));
    } else if (operation == "/") {
      return setEquals(parseFloat(num1) / parseFloat(num2));
    } else {
      return "Invalid";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator_number}>
        <div className={styles.results}>
          <p> {num1} </p>
          <p> {operation} </p>
          <p> {num2} </p>
          <p>{equals}</p>
        </div>

        <div className={styles.buttons_container}>
          <div className={styles.buttons_row}>
            <button
              className={styles.buttons}
              value={1}
              onClick={num1 ? getNum2 : getNum1}
            >
              1
            </button>

            <button
              className={styles.buttons}
              value={2}
              onClick={num1 ? getNum2 : getNum1}
            >
              2
            </button>

            <button
              className={styles.buttons}
              value={3}
              onClick={num1 ? getNum2 : getNum1}
            >
              3
            </button>

            <button
              className={styles.buttons}
              value={"/"}
              onClick={getOperationValue}
            >
              /
            </button>
          </div>
          <div className={styles.buttons_row}>
            <button
              className={styles.buttons}
              value={4}
              onClick={num1 ? getNum2 : getNum1}
            >
              4
            </button>

            <button
              className={styles.buttons}
              value={5}
              onClick={num1 ? getNum2 : getNum1}
            >
              {" "}
              5
            </button>

            <button
              className={styles.buttons}
              value={6}
              onClick={num1 ? getNum2 : getNum1}
            >
              6
            </button>

            <button
              className={styles.buttons}
              value={"*"}
              onClick={getOperationValue}
            >
              x
            </button>
          </div>
          <div className={styles.buttons_row}>
            <button
              className={styles.buttons}
              value={7}
              onClick={num1 ? getNum2 : getNum1}
            >
              7
            </button>

            <button
              className={styles.buttons}
              value={8}
              onClick={num1 ? getNum2 : getNum1}
            >
              8
            </button>
            <button
              className={styles.buttons}
              value={9}
              onClick={num1 ? getNum2 : getNum1}
            >
              9
            </button>
            <button
              className={styles.buttons}
              value={"-"}
              onClick={getOperationValue}
            >
              -
            </button>
          </div>
          <div className={styles.buttons_row}>
            <button className={styles.buttons} onClick={reset}>
              c
            </button>
            <button className={styles.buttons} value={0} onClick={getNum1}>
              0
            </button>
            <button
              className={styles.buttons}
              value={"+"}
              onClick={getOperationValue}
            >
              +
            </button>

            <button className={styles.buttons} 
            value={"="} onClick={calculate}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
