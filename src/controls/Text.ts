import { TextBlock } from "@babylonjs/gui";
import { Component } from "../utils/Component";

type TextProps = {
  name: string;
  text: string;
  fontSize?: number;
};

export class Text extends Component<TextBlock> {
  constructor(props: TextProps) {
    const { name, text, fontSize } = props;
    super(new TextBlock(name, text));
    this._component.width = "100%";
    this._component.textWrapping = true;
    this._component.fontFamily = "adigiana2";
    this._component.fontSizeInPixels = fontSize || 18;
  }
}
