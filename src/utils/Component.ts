export class Component<T> {
  _component: T;
  constructor(component: T) {
    this._component = component;
  }

  public getComponent() {
    return this._component;
  }
}
