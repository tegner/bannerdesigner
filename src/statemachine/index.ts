export class StateMachine {
  private state;

  constructor(initialState) {
    this.state = initialState;
  }

  public get(part?: string) {
    return this.state[part] ?? this.state;
  }

  public change(part?: string) {
    this.state[part] ?? this.state;
  }
}
