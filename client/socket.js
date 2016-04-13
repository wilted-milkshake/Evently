export default {

  initialize(eventID) {
    return io(window.location.origin, {
      query: 'eventRoom=' + eventID
    });
  }

  configListeners(socket) {
  }
}
