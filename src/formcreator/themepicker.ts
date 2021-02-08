function themeList(themes): string {
  const themeOption = [];
  for (const key in themes) {
    if (themes[key]) {
      console.log('KEY!', key);
      themeOption.push(`<option value="${key}">${key}</option>`);
    }
  }

  return themeOption.join('');
}

export const themePicker = (themes) => `
  <div class="form-element padding-s--b">
    <label class="form-label">Tema</label>
    <div class="form-input form-input--select">
      <select>
        ${themeList(themes)}
      </select>
    </div>
  </div>
`;
