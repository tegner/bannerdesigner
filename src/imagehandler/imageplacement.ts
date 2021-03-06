import { RATIOTYPES } from '../canvascreator/canvascreator';
import store from '../util/store';
import { IMAGECHANGEACTIONS, STOREACTIONS } from '../util/store/actions';

function placementList(placements, currentplacement): string {
  const placementOption = [];
  for (const key in placements) {
    if (placements[key]) {
      placementOption.push(
        `<div data-value="${key}" data-selected="${
          key === currentplacement ? 'true' : 'false'
        }" class="placement placement--${key}" title="${placements[key]}"></div>`
      );
    }
  }

  return placementOption.join('');
}

export const placementPicker = (placements, currentplacement) => `
  <div class="form-element">
    <label class="form-label">Billed placering</label>
    <div class="placements-container">
      <div class="placements">
        ${placementList(placements, currentplacement)}
      </div>
    </div>
  </div>
`;

export enum PLACEMENTNAMES {
  bottom = 'bottom',
  bottomleft = 'bottomleft',
  bottomright = 'bottomright',
  center = 'center',
  left = 'left',
  right = 'right',
  top = 'top',
  topleft = 'topleft',
  topright = 'topright',
}

export type TPlacementNames =
  | 'bottom'
  | 'bottomleft'
  | 'bottomright'
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'topleft'
  | 'topright';

export class ImagePlacementPicker {
  private currentSelected: HTMLDivElement;
  private elements;
  private placements = {
    bottom: 'Bottom',
    bottomleft: 'Bottom Left',
    bottomright: 'Bottom Right',
    center: 'Center',
    left: 'Left',
    right: 'Right',
    top: 'Top',
    topleft: 'Top Left',
    topright: 'Top Right',
  };
  private type: RATIOTYPES;

  constructor(callType) {
    this.placements;
    this.type = callType;
    console.log('ImagePlacementPicker callType', callType);
  }

  public render() {
    console.log('ImagePlacementPicker render', this.type);
    const placementPickerDiv = document.createElement('div');
    placementPickerDiv.className = 'form-element';
    placementPickerDiv.innerHTML = placementPicker(this.placements, 'topleft');

    this.elements = placementPickerDiv.querySelectorAll('.placement');
    Array.from(this.elements).forEach((el: HTMLDivElement) => {
      if (el.dataset.selected === 'true') this.currentSelected = el;

      el.addEventListener('click', (_ev: MouseEvent) => {
        this.currentSelected.dataset.selected = 'false';
        el.dataset.selected = 'true';

        store.dispatch(STOREACTIONS.setImagePosition, { type: this.type, val: el.dataset.value });
        store.dispatch(STOREACTIONS.imageChange, {
          action: IMAGECHANGEACTIONS.POSITION,
          type: this.type,
          val: el.dataset.value,
        });
        this.currentSelected = el;
      });
    });
    return placementPickerDiv;
  }
}
