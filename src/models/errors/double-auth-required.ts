export class DoubleAuthRequired extends Error {
  constructor () {
    super("Double authentication required");
  }
}
