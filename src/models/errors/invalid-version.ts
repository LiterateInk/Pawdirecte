export class InvalidVersion extends Error {
  public constructor () {
    super("Invalid version, please open an issue at the 'LiterateInk/Pawdirecte' GitHub repository.");
    this.name = "InvalidVersion";
  }
}
