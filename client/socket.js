function socketConnect(eventID) {
  return io(window.location.origin, {
    query: 'eventRoom=' + eventID
  });
}
