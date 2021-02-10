import { PubSub } from './pubsub';
import store from './store';

export const eventhandler = new PubSub();

class HandlingStateChange {
  private state;

  constructor() {
    this.state = { ...store.state };

    store.events.subscribe('stateChange', (newState, key) => {
      // console.log('newState[key]', newState[key]);
      if (this.state[key] !== newState[key] && JSON.stringify(this.state[key]) !== JSON.stringify(newState[key])) {
        // console.log('newState[key] ... slipped in here', key, newState);
        eventhandler.publish(key, { ...newState });
        this.state = { ...newState };
      }
    });
  }
}

new HandlingStateChange();
