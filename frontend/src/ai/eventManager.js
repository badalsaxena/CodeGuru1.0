import { sendMonitoringEvent } from "../services/screeningService";

class EventManager {
  constructor() {
    this.events = [];
    this.listeners = [];
    this.attemptId = null;
  }

  setAttemptId(attemptId) {
    this.attemptId = attemptId;
    console.log("🎯 Monitoring Attempt ID:", attemptId);
  }

  getAttemptId() {
    return this.attemptId;
  }

  async emit(event) {
    const eventData = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    this.events.push(eventData);

    console.log("📢 Event:", eventData);

    this.listeners.forEach((listener) => listener(eventData));

    if (!this.attemptId) {
      console.warn(
        "⚠️ Monitoring event not sent: attemptId is missing",
        eventData
      );
      return;
    }

    try {
      await sendMonitoringEvent({
        attemptId: this.attemptId,
        eventType: eventData.type,
        metadata: {
          ...eventData,
        },
      });

      console.log(
        "✅ Monitoring event sent to backend:",
        eventData.type
      );
    } catch (error) {
      console.error(
        "❌ Failed to send monitoring event:",
        eventData.type,
        error
      );
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  getEvents() {
    return this.events;
  }

  clear() {
    this.events = [];
  }

  reset() {
    this.events = [];
    this.listeners = [];
    this.attemptId = null;
  }
}

const eventManager = new EventManager();

export default eventManager;