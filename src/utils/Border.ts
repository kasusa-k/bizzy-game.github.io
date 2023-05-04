export class Border {
  radius: number;
  width: number;
  constructor(props: { radius: number; width: number }) {
    this.radius = props.radius || 15;
    this.width = props.width || 2;
  }
}
