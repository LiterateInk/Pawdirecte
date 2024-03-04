import type { EdUserType } from "~/constants/UserType";
import type { EDApiModule } from "~/ecoledirecte/modules";
import type { BooleanAsNumber } from "~/utils/boolean";

export interface EdApiAccount {
  /** NOTE: Not sure which ID this one is. */
  idLogin: number

  /**
   * Account ID, the one showing in URL when navigating to EcoleDirecte.
   * For example `https://www.ecoledirecte.com/Eleves/12101` when `id` is `12101`.
   */
  id: number

  /** NOTE: Another ID ? Why ? */
  uid: string

  /** Username used to login. */
  identifiant: string

  typeCompte: keyof typeof EdUserType

  /**
   * ID referring to the school's OGEC code.
   * OGEC means "Organisme de Gestion de l'Enseignement Catholique".
   */
  codeOgec: string

  /** NOTE: Need more information on this value. */
  main: boolean

  /**
   * Date of the last connection to EcoleDirecte on this account.
   * @example "2024-02-12 07:49"
   */
  lastConnexion: string

  /**
   * TODO: See what could be the possible values for this field.
   * Can be an empty string.
   */
  civilite: "Mme" | string

  /** First name of the student. */
  prenom: string

  /**
   * TODO: See what could be the possible values for this field.
   * Can be an empty string.
   */
  particule: string

  /** Last name of the student. */
  nom: string

  /** Private email of the student. */
  email: string

  /** School's name. */
  nomEtablissement: string

  /**
   * URL of FTP path to access the student's school's logo.
   * When it's an FTP, we need to build another URL to read the file.
   */
  logoEtablissement: string

  /**
   * HEX color of the school's agenda.
   */
  couleurAgendaEtablissement: string

  /** NOTE: Not sure what this adds. */
  dicoEnLigneLeRobert: boolean

  /** TODO: Investigate ? */
  accessToken: string

  /**
   * A token that is probably used nowhere ?
   * TODO: Investigate more about this one...
   */
  socketToken: string

  /**
   * All the modules available for this account.
   */
  modules: Array<EDApiModule>

  /**
   * Settings that are set by the user itself.
   * NOTE: Needs more accuracy, not sure what the values inside this object means.
   */
  parametresIndividuels: {
    lsuPoilDansLaMainBorne1: string
    lsuPoilDansLaMainBorne2: string
    lsuPoilDansLaMainBorne3: string
    modeCalculLSU: string
    isQrcode: boolean
    accessibiliteVisuelle: boolean
    checkAuthentificationSecure: boolean
    typeSaisieNotesDefaut: string
    nbJoursMaxRenduDevoirCDT: string
    typeViewCDTDefaut: string
    blocPMAccueil: boolean
    blocActuAccueil: boolean
  }

  profile: {
    sexe?: "M" | "F" | null

    /**
     * NOTE: Not sure what this is, I got an empty string...
     */
    infoEDT: string

    /** School's name. */
    nomEtablissement: string

    /**
     * ID of the school (depending on what ?)
     */
    idEtablissement: string

    /**
     * French RNE - some ID to identify schools - of the school.
     */
    rneEtablissement: string

    /**
     * Student's phone number in the following format :
     * `99-99-99-99-99`
     */
    telPortable: string

    /**
     * Another ID of the school but this time it's the for real ID ?
     */
    idReelEtab: string

    /**
     * URL of the student's profile picture.
     * Might start with `//example.com`, without the protocol.
     */
    photo: string

    /** Student's class information. */
    classe: {
      id: number
      /** Short name of the class. */
      code: string
      /** Full name of the class. */
      libelle: string
      estNote: BooleanAsNumber
    }
  }
}
