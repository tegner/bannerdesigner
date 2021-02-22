function placementList(placements, currentplacement): string {
  const placementOption = [];
  for (const key in placements) {
    if (placements[key]) {
      placementOption.push(
        `<option ${key === currentplacement ? 'selected=true' : ''} value="${key}">${placements[key]}</option>`
      );
    }
  }

  return placementOption.join('');
}

export const placementPicker = (placements, currentplacement) => `
  <div class="form-element">
    <label class="form-label">Billed placering</label>
    <div class="form-input form-input--select">
      <select data-type="placementpicker">
        ${placementList(placements, currentplacement)}
      </select>
    </div>
  </div>
`;

export class ImagePlacementPicker {
  private placements;

  constructor() {
    this.placements = {
      bottomleft: 'Bottom Left',
      bottomright: 'Bottom Right',
      topleft: 'Top Left',
      topright: 'Top Right',
    };
  }

  public render() {
    const placementPickerDiv = document.createElement('div');
    placementPickerDiv.className = 'form-element';
    placementPickerDiv.innerHTML = placementPicker(this.placements, 'topleft');

    return placementPickerDiv;
  }
}
