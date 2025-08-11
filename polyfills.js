if (typeof global.MessageChannel === 'undefined') {
  class MessageChannel {
    constructor() {
      this.port1 = { onmessage: null };
      this.port2 = { onmessage: null };
    }
  }
  global.MessageChannel = MessageChannel;
}