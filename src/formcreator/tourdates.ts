const createLine = (idx: number) => `
  <div class="line-item date margin-s--r">
    <input class="form-input form-input--small" data-line="${idx}" type="text" name="date-${idx}" id="bdDate-${idx}" />
  </div>
  <div class="line-item venue">
    <input class="form-input form-input--small" data-line="${idx}" type="text" name="venue-${idx}" id="bdVenue-${idx}" />
  </div>
  <input data-line="${idx}" type="radio" name="tickets-${idx}" value="reg" checked hidden />
  <label class="flex-item line-item radio">
    <input data-line="${idx}" type="radio" name="tickets-${idx}" value="few" />
  </label>
  <label class="flex-item line-item radio">
    <input data-line="${idx}" type="radio" name="tickets-${idx}" value="soldout" />
  </label>
  `;

const createHeader = () => `
  <div class="flex width-1of1">
    <div class="form-label date margin-s--r">Datoer</div>
    <div class="form-label venue">Spillested</div>
    <div class="flex-item radio fs--smaller">Få bil.</div>
    <div class="flex-item radio fs--smaller">Udsolgt</div>
  </div>
  <div class="flex-item delete-item"></div>
  `;

export class TourDates {
  private container = document.createElement('div');
  private counter = 0;
  private lineContainer = document.createElement('div');

  constructor() {}

  private addItem() {
    const lineItem = document.createElement('div');
    lineItem.className = 'flex margin-s--b';
    lineItem.id = `line-${this.counter}`;

    const lineItemInput = document.createElement('div');
    lineItemInput.className = 'flex width-1of1';
    lineItemInput.innerHTML = createLine(this.counter);
    lineItem.appendChild(lineItemInput);
    const deleteItem = document.createElement('div');
    deleteItem.className = 'flex-item line-item delete-item';
    if (this.counter !== 0) {
      deleteItem.innerHTML = '&times;';
      deleteItem.addEventListener('click', () => {
        lineItem.remove();
      });
    }
    lineItem.appendChild(deleteItem);

    this.lineContainer.appendChild(lineItem);
    this.counter++;
  }

  // private deleteItem() {}

  public render() {
    this.addItem();

    const header = document.createElement('div');
    header.className = 'flex';
    header.innerHTML = createHeader();

    const addButton = document.createElement('div');
    addButton.className = 'button-add';
    addButton.innerHTML = '+';
    addButton.addEventListener('click', () => {
      this.addItem();
    });

    this.container.className = 'form-element';
    this.container.appendChild(header);
    this.container.appendChild(this.lineContainer);
    this.container.appendChild(addButton);

    return this.container;
  }
}
