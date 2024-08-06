/**
 * A response from the EcoleDirecte API.
 */
export class EDResponse {
  public constructor (
    public status: number,
    public token: string | null,
    public message: string | null,
    public data: any
  ) {}
}
