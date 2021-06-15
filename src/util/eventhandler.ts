import { PubSub } from './pubsub';
import store from './store';

export const eventhandler = new PubSub();

class HandlingStateChange {
  private state;

  constructor() {
    this.state = { ...store.state };

    store.events.subscribe('stateChange', (newState, key) => {
      if (this.state[key] !== newState[key] && JSON.stringify(this.state[key]) !== JSON.stringify(newState[key])) {
        eventhandler.publish(key, newState[key], newState);

        this.state = { ...newState };
      }
    });
  }
}

new HandlingStateChange();
