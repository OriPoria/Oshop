export class MyOrderValue {
  constructor(private name: string, private date: Date) { }
  get Name() {
    return this.name;
  }
  get Date() {
    return this.date
  }
}