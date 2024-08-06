// API callers
import { callApiStudentVisios } from "~/api/student/visios";
import { callApiStudentTimetable } from "~/api/student/timetable";

// Response Parsers
import TimelineItem from "~/parsers/TimelineItem";
import TimetableItem from "~/parsers/TimetableItem";

class EDStudent {
  #uuid: string;

  #token: () => string;
  #setToken: (newToken: string) => void;
  #account: () => EdApiAccount;
  #setAccounts: (newAccounts: EdApiAccount[]) => void;

  constructor (
    uuid: string,
    signals: EDClientsManagerSignals,
    public fetcher = defaultEDFetcher
  ) {
    this.#uuid = uuid;

    this.#token = signals.token[0];
    this.#setToken = signals.token[1];

    this.#account = signals.accounts[0];
    this.#setAccounts = signals.accounts[1];
  }

  public get id (): number {
    return this.#account().id;
  }

  public get firstName (): string {
    return this.#account().prenom;
  }

  public get lastName (): string {
    return this.#account().nom;
  }

  public get schoolName (): string {
    return this.#account().nomEtablissement;
  }

  public get schoolRNE (): string {
    return this.#account().profile.rneEtablissement;
  }

  public get profilePictureURL (): string {
    return "https:" + this.#account().profile.photo;
  }

  public get gender (): "M" | "F" {
    const account = this.#account();

    return (typeof account.profile.sexe !== "undefined" && account.profile.sexe !== null)
      ? account.profile.sexe
      : account.civilite === "Mme" ? "F" : "M";
  }

  public get accountType (): keyof typeof EdUserType {
    return this.#account().typeCompte;
  }

  public get username (): string {
    return this.#account().identifiant;
  }

  /**
   * @param from Timetable starting from this date.
   * @param to When not defined, it's the same as `from` so it displays the timetable for the day.
   */
  public async getTimetable (from: Date, to = from): Promise<TimetableItem[]> {
    const response = await callApiStudentTimetable(this.fetcher, {
      startDate: from,
      endDate: to,
      studentID: this.id.toString(),
      token: this.#token()
    });

    this.#setToken(response.token);
    return response.data.map((item) => new TimetableItem(item));
  }
}

export default EDStudent;
