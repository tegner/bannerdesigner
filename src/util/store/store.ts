import { PubSub } from '../pubsub';

export class Store {
  private actions;
  private events;
  private mutations;
  private state;
  private status;

  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = 'resting';

    this.events = new PubSub();

    if (params['actions']) {
      this.actions = params.actions;
    }

    if (params['mutations']) {
      this.mutations = params.mutations;
    }
    this.state = new Proxy(params.state || {}, {
      set: (state, key, value) => {
        state[key] = value;

        console.log(`stateChange: ${String(key)}: ${value}`);

        this.events.publish('stateChange', this.state);

        if (this.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${String(key)}`);
        }

        this.status = 'resting';

        return true;
      },
    });
  }

  public dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    this.status = 'action';

    this.actions[actionKey](self, payload);

    console.groupEnd();

    return true;
  }

  public commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    this.status = 'mutation';

    let newState = this.mutations[mutationKey](this.state, payload);

    this.state = Object.assign(this.state, newState);

    return true;
  }
}
