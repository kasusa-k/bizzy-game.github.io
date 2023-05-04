import { Nullable } from "@babylonjs/core";
import { Control, Grid, Rectangle, StackPanel } from "@babylonjs/gui";
import { Component } from "../utils/Component";
import { Padding } from "../utils/Padding";

type BubbleProps = {
  name: string;
  children: Component<Control>[];
  width: number;
  height: number;
  padding?: Padding;
};

export class Bubble extends Component<Rectangle> {
  constructor(props: BubbleProps) {
    const { name, padding, children, width, height } = props;
    super(new Rectangle("test"));

    // this._component.addRowDefinition(1);

    // const stack = new StackPanel("stack");
    // const rectangle = new Rectangle("bubble");

    this._component.cornerRadius = 106;
    this._component.widthInPixels = width;
    this._component.heightInPixels = height;
    this._component.background = "white";
    this._component.shadowColor = "#000";
    this._component.shadowBlur = 20;

    const grid = new Grid("grid");
    if (Array.isArray(children)) {
      children.forEach((child, index) => {
        grid.addRowDefinition(1);
        grid.addControl(child.getComponent(), index, 0);
      });
    }

    if (padding) {
      grid.paddingTopInPixels = padding.top;
      grid.paddingRightInPixels = padding.right;
      grid.paddingBottomInPixels = padding.bottom;
      grid.paddingLeftInPixels = padding.left;
    }

    this._component.addControl(grid);
  }
}
