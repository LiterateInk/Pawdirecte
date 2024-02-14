import type { EdApiAccount } from "~/ecoledirecte/account";
import { defaultEDFetcher } from "~/utils/fetcher";

// API callers
import { callApiStudentTimeline } from "~/api/student/timeline";
import { callApiEdforms } from "~/api/edforms";
import { callApiStudentVisios } from "~/api/student/visios";

// Response Parsers
import TimelineItem from "~/parsers/TimelineItem";

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
    account: EdApiAccount,
    public fetcher = defaultEDFetcher
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

  public async getTimeline (): Promise<TimelineItem[]> {
    const response = await callApiStudentTimeline(this.fetcher, {
      token: this.token,
      studentID: this.id
    });

    this.token = response.token;
    return response.data.map((item) => new TimelineItem(item));
  }

  public async getEdforms () {
    const response = await callApiEdforms(this.fetcher, {
      token: this.token,
      id: this.id
    });

    this.token = response.token;
    return response.data;
  }

  public async getVisios () {
    const response = await callApiStudentVisios(this.fetcher, {
      token: this.token,
      studentID: this.id
    });

    this.token = response.token;
    return response.data;
  }
}

export default EDStudent;
