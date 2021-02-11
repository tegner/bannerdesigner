// <label class="margin-xl--r">
//         <input class="button-textpos-radio" data-dir="left" type="radio" name="textpos" hidden />
//         <img class="button-textpos" src="left.svg" />
//       </label>
//       <label class="margin-xl--l">
//         <input class="button-textpos-radio" data-dir="right" type="radio" name="textpos" hidden />
//         <img class="button-textpos button-textpos--right" src="left.svg" />
//       </label>

import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';

export class TextPosition {
  private buttonContainer = document.createElement('div');
  private container = document.createElement('div');
  private curDir = 'left';

  constructor() {}

  public render() {
    this.container.className = 'form-element';
    this.container.innerHTML = `<label class="form-label margin-s--b">Textposition</label>`;
    this.container.appendChild(this.buttonContainer);

    this.update();
    return this.container;
  }

  private posButton(dir: string, checked: boolean) {
    const el = document.createElement('label');
    el.className = 'margin-xl--r';

    const inputEl = document.createElement('input');
    inputEl.checked = checked;
    inputEl.dataset.dir = dir;
    inputEl.name = 'textpos';
    inputEl.type = 'radio';
    inputEl.style.display = 'none';
    inputEl.addEventListener('change', (ev) => {
      const dir = (ev.target as HTMLInputElement).dataset.dir ?? 'left';
      this.curDir = dir;
      this.update();
      store.dispatch(STOREACTIONS.setTextpos, dir);
    });

    el.appendChild(inputEl);

    // add graphic
    const img = document.createElement('img');
    img.src = checked ? `left_neg.svg` : `left.svg`;
    img.className = `button-textpos button-textpos--${dir}`;

    el.appendChild(img);

    return el;
  }

  private update() {
    while (this.buttonContainer.firstChild) {
      this.buttonContainer.firstChild.remove();
    }

    ['left', 'right'].forEach((dir) => {
      const checked = dir === this.curDir;

      this.buttonContainer.appendChild(this.posButton(dir, checked));
    });
  }
}
