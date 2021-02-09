import { PubSub } from './pubsub';
import store from './store';

export const eventhandler = new PubSub();

class HandlingStateChange {
  private state;

  constructor() {
    this.state = { ...store.state };

    store.events.subscribe('stateChange', (newState, key) => {
      if (this.state[key] !== newState[key]) {
        eventhandler.publish(key, newState);
        this.state = { ...newState };
      }
    });
  }
}

new HandlingStateChange();
