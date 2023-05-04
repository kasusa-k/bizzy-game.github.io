import { Button as BabylonButton } from "@babylonjs/gui";
import { Border } from "../utils/Border";
import { Component } from "../utils/Component";
import { Padding } from "../utils/Padding";

type ButtonProps = {
  name: string;
  text: string;
  width?: number;
  height?: number;
  color?: string;
  background?: string;
  padding?: Padding;
  border?: Border;
  onClick?: () => void;
};

export class Button extends Component<BabylonButton> {
  constructor(props: ButtonProps) {
    const { name, text, width, height, padding, border, onClick } = props;
    super(BabylonButton.CreateSimpleButton(name, text));
    this._component.widthInPixels = width || 100;
    this._component.heightInPixels = height || 50;
    this._component.color = props.color || "white";
    this._component.background = props.background || "green";
    this._component.fontFamily = "adigiana2";
    this._component.fontSizeInPixels = 32;
    this._component.hoverCursor = "pointer";

    if (onClick) {
      this._component.onPointerClickObservable.add(onClick);
    }

    if (padding) {
      this._component.paddingTopInPixels = padding.top;
      this._component.paddingRightInPixels = padding.right;
      this._component.paddingBottomInPixels = padding.bottom;
      this._component.paddingLeftInPixels = padding.left;
    }

    if (border) {
      this._component.cornerRadius = border.radius;
      this._component.thickness = border.width;
    }
  }
}
