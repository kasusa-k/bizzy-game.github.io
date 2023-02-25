import { useState } from "react";
import bizzyImg from "../../assets/bizzy.png";
import { Button } from "../Button/Button";
import arrow from "./icons/arrow.svg";

const Commands = () => {
  return (
    <div className="flex gap-5 items-center">
      <Button text="Bizzy" variant="l" color="white" />
      <Button text="Идти" variant="m" color="white" />
    </div>
  );
};

const SelectedCommand: React.FC<{ commands: any[] }> = ({ commands }) => {
  console.log(arrow);
  return (
    <div className="flex flex-col items-center">
      {commands?.map((elm, index) => (
        <div key={elm.text + index} className="flex flex-col items-center">
          <Button text={elm.text} variant={elm.variant} color={elm.color} />
          {index < commands.length - 1 && <img src={arrow} />}
        </div>
      ))}
    </div>
  );
};

export const CommandSide: React.FC = () => {
  const [selectedCommand, setSelectedCommand] = useState([
    {
      text: "Биззи",
      color: "yellow",
      variant: "l",
    },
    {
      text: "Идти",
      color: "green",
      variant: "m",
    },
  ]);
  return (
    <div className="w-1/2 h-full bg-[#9ADEE3] flex flex-row">
      <div className="bg-[#53C7CF] h-full w-1/12" />
      <div className="flex flex-col pt-11 w-11/12 px-16 justify-between pb-28">
        <div className="flex flex-col gap-7">
          <div className="w-52 h-52 mx-auto">
            <img src={bizzyImg} />
          </div>
          <SelectedCommand commands={selectedCommand} />
        </div>
        <Commands />
      </div>
    </div>
  );
};
