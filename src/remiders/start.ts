import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { Bubble } from "../controls/Bubble";
import { Button } from "../controls/Button";
import { Text } from "../controls/Text";
import { Border } from "../utils/Border";
import { Padding } from "../utils/Padding";

export class Start {
  private GUI: AdvancedDynamicTexture;
  constructor(GUI: AdvancedDynamicTexture) {
    this.GUI = GUI;
    const styles = this.GUI.createStyle();
    styles.fontFamily = "adigiana2";
    this.firstStep();
  }

  firstStep() {
    const button = new Button({
      name: "goButton",
      text: "Вперед!",
      width: 285,
      height: 80,
      color: "#000",
      background: "#9ADEE3",
      border: new Border({ radius: 15, width: 1 }),
    });

    const text = new Text({
      name: "goText",
      text: "Нужно дойти до мостика. Выбирай подходящие блоки и направляй робота.",
      fontSize: 35,
    });

    const title = new Text({
      name: "title",
      text: "Задание:",
      fontSize: 45,
    });

    const bubble = new Bubble({
      name: "bubble",
      padding: new Padding([50, 100]),
      children: [title, text, button],
      width: 740,
      height: 470,
    });

    button.getComponent().onPointerClickObservable.add(() => {
      this.GUI.removeControl(bubble.getComponent());
      this.secondStep();
    });

    this.GUI.addControl(bubble.getComponent());
  }

  secondStep() {
    const button = new Button({
      name: "gotit",
      text: "Понятно",
      width: 285,
      height: 80,
      color: "#000",
      background: "#9ADEE3",
      border: new Border({ radius: 15, width: 1 }),
    });

    const text = new Text({
      name: "welcome",
      text: "Конечная точка будет обозначена красной стрелкой в начале уровня.",
      fontSize: 35,
    });

    const bubble = new Bubble({
      name: "bubble",
      padding: new Padding([50, 100]),
      children: [text, button],
      width: 740,
      height: 286,
    });

    button.getComponent().onPointerClickObservable.add(() => {
      this.GUI.removeControl(bubble.getComponent());
    });

    this.GUI.addControl(bubble.getComponent());
  }
}
