import React, { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [expression, setExpression] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleButtonClick = (value) => {
    if (isResult) {
      if (value === "=") {
        return;
      }
      setDisplayValue(value);
      setExpression(value);
      setIsResult(false);
    } else {
      setExpression(expression + value);
      setDisplayValue(displayValue + value);
    }
  };

  const calculateResult = () => {
    try {
      const calculatedResult = eval(expression);
      setExpression(calculatedResult.toString());
      setDisplayValue(calculatedResult.toString());
      setIsResult(true);
    } catch (error) {
      setExpression("");
      setDisplayValue("Ошибка");
      setIsResult(true);
    }
  };

  const clearDisplay = () => {
    setExpression("");
    setDisplayValue("");
    setIsResult(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        {isResult ? (
          <span className={styles.result}>{displayValue}</span>
        ) : (
          displayValue
        )}
      </div>
      <div className={styles.buttons}>
        {[1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "=", 0, "C"].map((item) => (
          <div
            key={item}
            className={styles.button}
            onClick={() => {
              if (Number.isInteger(item)) {
                handleButtonClick(item.toString());
              } else if (item === "+") {
                handleButtonClick("+");
              } else if (item === "-") {
                handleButtonClick("-");
              } else if (item === "=") {
                calculateResult();
              } else if (item === "C") {
                clearDisplay();
              }
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
