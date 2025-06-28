interface TemperatureObserver {
  update(temperature: number): void;
}

class WeatherStation {
  private observers: TemperatureObserver[];
  private temperature: number;

  constructor() {
    this.observers = [];
    this.temperature = 0;
  }

  addObserver(observer: TemperatureObserver): void {
    this.observers.push(observer);
  }
  removeObserver(observer: TemperatureObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature);
    }
  }
  setTemperature(temp: number): void {
    console.log(`WeatherStation: new temperature is ${temp}°C`);
    this.temperature = temp;
    this.notifyObservers();
  }
}

class PhoneDisplay implements TemperatureObserver {
  update(temperature: number): void {
    console.log(`PhoneDisplay: temperature updated to ${temperature}°C`);
  }
}

class WindowDisplay implements TemperatureObserver {
  update(temperature: number): void {
    console.log(`WindowDisplay: showing temperature ${temperature}°C`);
  }
}

const phoneDisplay = new PhoneDisplay();
const windowDisplay = new WindowDisplay();

const weatherStation = new WeatherStation();
weatherStation.addObserver(phoneDisplay);
weatherStation.addObserver(windowDisplay);

weatherStation.setTemperature(10);
