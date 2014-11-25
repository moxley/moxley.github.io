(function () {
  CELLAUTO = {};
  var m, m2, canvas, ctx, rule, pixelWidth = 2, oldM;

  function bitsToBinary(bits) {
    var value = 0, i, shift, orValue, pValue;
    for (i = bits.length - 1; i >= 0; i--) {
      pValue = bits[i];
      shift = bits.length - 1 - i;
      orValue = pValue << shift;
      value = value | orValue;
    }
    return value;
  }
  
  function calcPixel(rule, parentsValue) {
    return (rule & (1 << parentsValue)) > 0 ? 1 : 0;
  }

  function decRule() {
    rule = rule == 0 ? 255 : rule - 1;
  }

  function incRule() {
    rule = rule == 255 ? 0 : rule + 1;
  }

  function drawRow(rowIndex, row) {
    _.each(row, function (value, i) {
      if (value > 0) {
        ctx.fillRect(i * pixelWidth, rowIndex * pixelWidth, pixelWidth, pixelWidth);
      }
    });
  }
  
  function setupRule() {
    m = Array(399);
    m2 = Array(m.length);
    _.times(m.length, function (i) {
      m[i] = null;
    });
    var middle = Math.floor(m.length / 2);
    m[middle-1] = 0;
    m[middle] = 1;
    m[middle+1] = 0;
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 800, 400);
    ctx.fillStyle = "rgb(128, 128, 128)";
  }
  
  function parentsOf(m, i) {
    var left = i > 0 ? m[i-1] : m[m.length-1],
      middle = m[i],
      right = i < m.length - 1 ? m[i+1] : 0;
    return [left, middle, right];
  }

  function drawRule () {
    setupRule();
    $('#rule').text(rule);

    _.times(200, function (rowIndex) {
      drawRow(rowIndex, m);
      _.each(m, function (value, i) {
        var parents = parentsOf(m, i),
          parentsValue = bitsToBinary(parents),
          outValue = calcPixel(rule, parentsValue);
        m2[i] = outValue;
      });
      oldM = m;
      m = m2;
      m2 = oldM;
    });
  };
  
  function nextRule() {
    if (CELLAUTO.stopped) {
      return;
    }
    incRule();
    drawRule(rule);
    setTimeout(nextRule, 1000);
  };
  
  CELLAUTO.stop = function () {
    CELLAUTO.stopped = true;
    $('#btn_stop').text('Slideshow')
  };
  
  function cont () {
    CELLAUTO.stopped = false;
    $('#btn_stop').text('Stop')
    nextRule();
  }

  CELLAUTO.init = function () {
    canvas = $('#canvas')[0];
    if (!canvas.getContext) {
      alert("Your browser is not supported");
      return;
    }
    ctx = canvas.getContext('2d');
    CELLAUTO.ctx = ctx;
    
    $('#btn_stop').click(function () {
      if (CELLAUTO.stopped) {
        cont();
      }
      else {
        CELLAUTO.stop();
      }
    });

    $('#btn_prev').click(function () {
      CELLAUTO.stop();
      decRule();
      drawRule();
    });

    $('#btn_next').click(function () {
      CELLAUTO.stop();
      incRule();
      drawRule();
    });
  };
  
  CELLAUTO.run = function () {
    rule = -1;
    cont();
  };
}());
