document.addEventListener('DOMContentLoaded', function () {
  var w = document.getElementById('w');
  var o = document.getElementById('o');
  var s = document.getElementById('s');
  var pv = document.getElementById('pv');
  var readout = document.getElementById('readout');
  if (!w || !o || !s || !pv || !readout) return;

  function update() {
    pv.style.fontVariationSettings = '"wght" ' + w.value;
    pv.style.fontOpticalSizing = 'auto';
    pv.style.fontSize = s.value + 'px';
    readout.textContent =
      'wght ' + w.value + ', opsz ' + o.value + ', size ' + s.value;
  }

  w.addEventListener('input', update);
  o.addEventListener('input', update);
  s.addEventListener('input', update);
  update();
});