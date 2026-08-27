class MonitoringState {
  constructor() {
    this.state = {
      face: "Unknown",
      phone: false,
      talking: false,
      head: "Center",
      eye: "Center",
      integrity: 100,
      warnings: 0,
      blocked: false,
    };

    this.listeners = [];
  }

  set(update) {
    this.state = {
      ...this.state,
      ...update,
    };

    this.listeners.forEach((cb) => cb(this.state));
  }

  addWarning() {
  const currentWarnings = this.state.warnings;

  const newWarnings = Math.min(
    currentWarnings + 1,
    10
  );

  this.state = {
    ...this.state,
    warnings: newWarnings,
  };

  if (newWarnings >= 10) {
    this.state = {
      ...this.state,
      blocked: true,
    };
  }

  this.listeners.forEach((cb) => cb(this.state));
}

  reset() {
    this.state = {
      face: "Unknown",
      phone: false,
      talking: false,
      head: "Center",
      eye: "Center",
      integrity: 100,
      warnings: 0,
      blocked: false,
    };

    this.listeners.forEach((cb) => cb(this.state));
  }

  get() {
    return this.state;
  }

  subscribe(cb) {
    this.listeners.push(cb);

    return () => {
      this.listeners = this.listeners.filter((x) => x !== cb);
    };
  }
}

export default new MonitoringState();