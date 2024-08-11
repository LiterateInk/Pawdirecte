export class UnknownEnumValue extends Error {
  public constructor (label: string, value: string) {
    super(`Expected a value from the enum '${label}', but got '${value}'`);
    this.name = "UnknownEnumValue";
  }
}
