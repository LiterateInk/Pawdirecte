import type { EdApiAccount } from "~/ecoledirecte/account";
import type { EDFetcher } from "~/utils/fetcher";

class EDStudent {
  public id: string;
  public firstName: string;
  public lastName: string;
  public schoolName: string;
  public schoolRNE: string;
  public profilePictureURL: string;

  /**
   * - M for Male
   * - F for Female
   *
   * Not sure if there's any other gender defined here.
   */
  public gender: "M" | "F";

  constructor (
    public token: string,
    private account: EdApiAccount,
    public fetcher: EDFetcher
  ) {
    this.id = account.id.toString();
    this.firstName = account.prenom;
    this.lastName = account.nom;
    this.schoolName = account.nomEtablissement;
    this.schoolRNE = account.profile.rneEtablissement;
    this.profilePictureURL = "https:" + account.profile.photo;

    // Use the `civilite` to define the gender otherwise.
    this.gender = (typeof account.profile.sexe !== "undefined" && account.profile.sexe !== null)
      ? account.profile.sexe
      : account.civilite === "Mme" ? "F" : "M";
  }
}

export default EDStudent;
