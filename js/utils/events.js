const events = {
  a: false,
  s: false,
  d: false,
  w: false,
  start: function () {
    document.addEventListener('keydown', function(e) {
      events[e.key] = true;
    });
    document.addEventListener('keyup', function(e) {
      events[e.key] = false;
    });
  }
}

export default events;