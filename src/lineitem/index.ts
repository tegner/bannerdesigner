const createLine = (idx: number) => `
  <div class="flex-item line-item date">
    <input data-line="${idx}" type="text" name="date-${idx}" id="bdDate-${idx}" />
  </div>
  <div class="flex-item line-item venue">
    <input data-line="${idx}" type="text" name="venue-${idx}" id="bdVenue-${idx}" />
  </div>
  <div class="flex-item line-item radio">
    <input data-line="${idx}" type="radio" name="tickets-${idx}" value="reg" checked hidden />
    <input data-line="${idx}" type="radio" name="tickets-${idx}" value="few" />
  </div>
  <div class="flex-item line-item radio">
    <input data-line="${idx}" type="radio" name="tickets-${idx}" value="soldout" />
  </div>
  `;

const createHeader = () => `
  <div class="flex-item delete-item"></div>
  <div class="flex-item date">Datoer</div>
  <div class="flex-item venue">Spillested</div>
  <div class="flex-item radio fs--small">Få bil.</div>
  <div class="flex-item radio fs--small">Udsolgt</div>
  `;

export class LineItems {
  private container = document.createDocumentFragment();
  private counter = 0;
  private lineContainer = document.createElement('div');

  constructor() {}

  private addItem() {
    const lineItem = document.createElement('div');
    lineItem.className = 'flex';
    lineItem.id = `line-${this.counter}`;

    const deleteItem = document.createElement('div');
    deleteItem.className = 'flex-item line-item delete-item';
    deleteItem.innerHTML = '&times;';
    deleteItem.addEventListener('click', () => {
      lineItem.remove();
    });
    lineItem.appendChild(deleteItem);

    const lineItemInput = document.createElement('div');
    lineItemInput.className = 'flex';
    lineItemInput.innerHTML = createLine(this.counter);
    lineItem.appendChild(lineItemInput);

    this.lineContainer.appendChild(lineItem);
    this.counter++;
  }

  // private deleteItem() {}

  public render() {
    this.addItem();

    const header = document.createElement('div');
    header.className = 'flex fs--small';
    header.innerHTML = createHeader();

    const addButton = document.createElement('div');
    addButton.className = 'button-add';
    addButton.innerHTML = '+';
    addButton.addEventListener('click', () => {
      this.addItem();
    });

    this.container.appendChild(header);
    this.container.appendChild(this.lineContainer);
    this.container.appendChild(addButton);

    return this.container;
  }
}
