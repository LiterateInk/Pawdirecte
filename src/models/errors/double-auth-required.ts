export class DoubleAuthRequired extends Error {
  public constructor () {
    super("Double authentication required");
    this.name = "DoubleAuthRequired";
  }
}
