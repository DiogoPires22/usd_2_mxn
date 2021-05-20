export default class Rate {
  constructor(provider: string, value: number, date: Date) {
    this.provider = provider;
    this.value = value;
    this.lastUpdated = date;
  }
  provider: string;
  value: number;
  lastUpdated: Date;
}
