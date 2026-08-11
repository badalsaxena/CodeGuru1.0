class EventManager {
  constructor() {
    this.events = [];
  }

  emit(event) {
    const eventData = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    this.events.push(eventData);

    console.log("📢 Event:", eventData);
  }

  getEvents() {
    return this.events;
  }

  clear() {
    this.events = [];
  }
}

const eventManager = new EventManager();

export default eventManager;