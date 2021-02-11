export const simpleTextStyler = {
  sizes: [],
  baseSize: undefined,
  font: undefined,
  controlChars: '{}\n\t',
  spaceSize: 0,
  tabSize: 8, // in spaceSize units
  tabs: (function () {
    var t = [];
    for (var i = 0; i < 100; i += 8) {
      t.push(i);
    }
    return t;
  })(),
  getNextTab: function (x) {
    let i = 0;
    while (i < this.tabs.length) {
      if (x < this.tabs[i] * this.tabSize * this.spaceSize) {
        return this.tabs[i] * this.tabSize * this.spaceSize;
      }
      i++;
    }
    return this.tabs[i - 1] * this.tabSize * this.spaceSize;
  },

  getFontSize: function (font) {
    var numFind = /[0-9]+/;
    var number = parseInt(numFind.exec(font)[0], 10);
    if (isNaN(number)) {
      throw Error('SimpleTextStyler Cant find font size');
    }
    return Number(number);
  },
  setFont: function (context) {
    this.font = context.font;
    this.baseSize = this.getFontSize(this.font);

    for (var i = 32; i < 256; i++) {
      this.sizes[i - 32] = context.measureText(String.fromCharCode(i), 0, 0).width / this.baseSize;
    }
    this.spaceSize = this.sizes[0];
  },
  drawText: function (context, text, x, y, size) {
    var i, len, subText;
    var w, scale;
    var xx,
      // yy,
      ctx;
    var state = [];
    if (text === undefined) {
      return;
    }
    xx = x;
    // yy = y;
    if (!context.setTransform) {
      // simple test if this is a 2D context
      if (context.ctx) {
        ctx = context.ctx;
      } // may be a image with attached ctx?
      else {
        return;
      }
    } else {
      ctx = context;
    }

    function renderText(text) {
      ctx.save();
      ctx.fillStyle = colour;
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    var colour = ctx.fillStyle;
    ctx.font = this.font;

    len = text.length;
    subText = '';
    w = 0;
    i = 0;
    scale = size / this.baseSize;
    while (i < len) {
      var c = text[i];
      var cc = text.charCodeAt(i);
      if (cc < 256) {
        // only ascii
        if (this.controlChars.indexOf(c) > -1) {
          if (subText !== '') {
            scale = size / this.baseSize;
            renderText(subText);
            x += w;
            w = 0;
            subText = '';
          }
          if (c === '\n') {
            // return move to new line
            x = xx;
            y += size;
          } else if (c === '\t') {
            // tab move to next tab
            x = this.getNextTab(x - xx) + xx;
          } else if (c === '{') {
            // Text format delimiter
            state.push({
              size: size,
              colour: colour,
              x: x,
              y: y,
            });
            i += 1;
            var t = text[i];
            if (t === '+') {
              // Increase size
              size *= 1 / (3 / 4);
            } else if (t === '-') {
              // decrease size
              size *= 3 / 4;
            } else if (t === 's') {
              // sub script
              y += size * (1 / 3);
              size *= 2 / 3;
            } else if (t === 'S') {
              // super script
              y -= size * (1 / 3);
              size *= 2 / 3;
            } else if (t === '#') {
              colour = text.substr(i, 7);
              i += 6;
            }
          } else if (c === '}') {
            var s = state.pop();
            y = s.y;
            size = s.size;
            colour = s.colour;
            scale = size / this.baseSize;
          }
        } else {
          subText += c;
          w += this.sizes[cc - 32] * size;
        }
      }
      i += 1;
    }
    if (subText !== '') {
      renderText(subText);
    }
  },
};
