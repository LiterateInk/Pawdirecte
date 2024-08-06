export class BadDoubleAuth extends Error {
  public constructor () {
    super("Bad double auth response");
    this.name = "BadDoubleAuth";
  }
}
