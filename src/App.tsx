import { Button } from "./components/Button/Button";
import help from "./assets/help.png";

import { CommandSide } from "./components/CommandSide/CommandSide";

function App() {
  return (
    <div className="App">
      <div className="flex items-center h-screen">
        <div className="w-1/2 h-full bg-[#01709B] py-24 flex flex-col">
          <div className="flex gap-6 justify-center items-center">
            <img src={help} className="w-14 h-14" />
            <span className="text-white text-2xl">
              Помоги Биззи пройти весь путь. <br />
              Выбирай подходящие кнопки и направляй робота.
            </span>
          </div>
          <div className="mt-auto flex flex-row gap-3 justify-center items-center w-full">
            <Button text="КТО" variant="l" color="yellow" />
            <Button text="ЧТО" variant="l" color="green" />
            <Button text="КАК" variant="l" color="red" />
          </div>
        </div>
        <CommandSide />
      </div>
    </div>
  );
}

export default App;
