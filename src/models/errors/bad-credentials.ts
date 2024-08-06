export class BadCredentials extends Error {
  public constructor () {
    super("Bad credentials, no token found in response");
    this.name = "BadCredentials";
  }
}
