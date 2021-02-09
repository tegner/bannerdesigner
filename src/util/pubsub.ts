export class PubSub {
  private events;

  constructor() {
    this.events = {};
  }

  public publish(event, data = {}) {
    let self = this;

    if (!self.events[event]) {
      return [];
    }

    return self.events[event].map((callback) => callback(data));
  }

  public subscribe(event, callback) {
    let self = this;

    if (!self.events[event]) {
      self.events[event] = [];
    }

    return self.events[event].push(callback);
  }
}
