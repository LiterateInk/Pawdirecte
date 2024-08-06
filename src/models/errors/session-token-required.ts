export class SessionTokenRequired extends Error {
  public constructor () {
    super("Session token is required to do this action");
    this.name = "SessionTokenRequired";
  }
}
