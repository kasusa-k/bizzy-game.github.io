import cn from "classnames";
import styles from "./style.module.scss";

type ButtonType = {
  text: string;
  variant: "l" | "m";
  color: "white" | "yellow" | "green" | "red";
};

export const Button: React.FC<ButtonType> = ({ color, text, variant }) => {
  return (
    <button
      className={cn("text-xxl rounded-[30px] text-black", {
        "bg-green-500": color === "green",
        "bg-white": color === "white",
        "bg-yellow-400": color === "yellow",
        "bg-red-500": color === "red",
        [styles.bigButton]: variant === "l",
        [styles.mediumButton]: variant === "m",
      })}
    >
      {text}
    </button>
  );
};
