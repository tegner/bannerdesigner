export class EventBus<DetailType = any> {
  private eventTarget: EventTarget;
  constructor(description = '') {
    this.eventTarget = document.appendChild(document.createComment(description));
  }
  on(type: string, listener: (event: CustomEvent<DetailType>) => void) {
    this.eventTarget.addEventListener(type, listener);
  }
  once(type: string, listener: (event: CustomEvent<DetailType>) => void) {
    this.eventTarget.addEventListener(type, listener, { once: true });
  }
  off(type: string, listener: (event: CustomEvent<DetailType>) => void) {
    this.eventTarget.removeEventListener(type, listener);
  }
  emit(type: string, detail?: DetailType) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}

// // Usage
// const myEventBus = new EventBus<string>('my-event-bus');
// myEventBus.on('event-name', ({ detail }) => {
//   console.log(detail);
// });

// myEventBus.once('event-name', ({ detail }) => {
//   console.log(detail);
// });

// myEventBus.emit('event-name', 'Hello'); // => Hello Hello
// myEventBus.emit('event-name', 'World'); // => World
