type PaddingProps =
  | [number, number, number, number]
  | [number, number, number]
  | [number, number]
  | [number];

export class Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
  constructor(props: PaddingProps) {
    switch (props.length) {
      case 4:
        this.top = props[0];
        this.right = props[1];
        this.bottom = props[2];
        this.left = props[3];
        break;
      case 3:
        this.top = props[0];
        this.right = this.left = props[1];
        this.bottom = props[2];
        break;

      case 2:
        this.top = this.bottom = props[0];
        this.right = this.left = props[1];
        break;
      case 1:
        this.top = this.bottom = this.right = this.left = props[0];
        break;
      default:
        throw new Error('Invalid padding');
    }
  }
}
