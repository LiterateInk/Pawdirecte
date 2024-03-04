import type { EdApiAccount } from "~/ecoledirecte/account";
import { defaultEDFetcher } from "~/utils/fetcher";

// API callers
import { callApiStudentTimeline } from "~/api/student/timeline";
import { callApiEdforms } from "~/api/edforms";
import { callApiStudentVisios } from "~/api/student/visios";
import { callApiStudentTimetable } from "~/api/student/timetable";

// Response Parsers
import TimelineItem from "~/parsers/TimelineItem";
import TimetableItem from "~/parsers/TimetableItem";
import { EdUserType } from "~/constants/UserType";
import { callApiLogin } from "~/api/login";

class EDStudent {
  #uuid: string;
  #token: () => string;
  #setToken: (newToken: string) => void;
  #accessToken: string;

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

  public accountType: keyof typeof EdUserType;
  public username: string;

  constructor (
    uuid: string,
    [token, setToken]: readonly [() => string, (newToken: string) => void],
    account: EdApiAccount,
    public fetcher = defaultEDFetcher
  ) {
    this.#uuid = uuid;
    this.#token = token;
    this.#setToken = setToken;

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

    this.accountType = account.typeCompte;
    this.username = account.identifiant;
    this.#accessToken = account.accessToken;
  }

  public get token (): string {
    return this.#token();
  }

  public async getTimeline (): Promise<TimelineItem[]> {
    const response = await callApiStudentTimeline(this.fetcher, {
      token: this.token,
      studentID: this.id
    });

    this.#setToken(response.token);
    return response.data.map((item) => new TimelineItem(item));
  }

  public async getEdforms () {
    const response = await callApiEdforms(this.fetcher, {
      token: this.token,
      id: this.id
    });

    this.#setToken(response.token);
    return response.data;
  }

  public async getVisios () {
    const response = await callApiStudentVisios(this.fetcher, {
      token: this.token,
      studentID: this.id
    });

    this.#setToken(response.token);
    return response.data;
  }

  /**
   * @param from Timetable starting from this date.
   * @param to When not defined, it's the same as `from` so it displays the timetable for the day.
   */
  public async getTimetable (from: Date, to = from): Promise<TimetableItem[]> {
    const response = await callApiStudentTimetable(this.fetcher, {
      startDate: from,
      endDate: to,
      studentID: this.id,
      token: this.token
    });

    this.#setToken(response.token);
    return response.data.map((item) => new TimetableItem(item));
  }

  public async renewToken (): Promise<void> {
    const session = await callApiLogin(this.fetcher, {
      recovery: true,
      accountType: this.accountType,
      username: this.username,
      deviceUUID: this.#uuid,
      managerToken: this.token,
      accessToken: this.#accessToken
    });

    // TODO: Update manager data.
    this.#setToken(session.token);
  }
}

export default EDStudent;
