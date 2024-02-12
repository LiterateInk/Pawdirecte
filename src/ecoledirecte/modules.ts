import { StringBooleanAsNumber } from "~/utils/boolean";

export enum EdApiModuleCode {
  CANTINE_BARCODE = "CANTINE_BARCODE",
  VIE_SCOLAIRE = "VIE_SCOLAIRE",
  VIE_DE_LA_CLASSE = "VIE_DE_LA_CLASSE",
  JOURNAL_DE_CLASSE = "JOURNAL_DE_CLASSE",
  NOTES = "NOTES",
  CLOUD = "CLOUD",
  MESSAGERIE = "MESSAGERIE",
  EDT = "EDT",
  DOCUMENTS_ELEVE = "DOCUMENTS_ELEVE",
  CAHIER_DE_TEXTES = "CAHIER_DE_TEXTES",
  MANUELS_SCOLAIRES = "MANUELS_SCOLAIRES",
  QCM = "QCM",
  EDFORMS = "EDFORMS",
  RESERVATIONS = "RESERVATIONS",
  COMMANDE_PASSAGE = "COMMANDE_PASSAGE",
  CARNET_CORRESPONDANCE = "CARNET_CORRESPONDANCE",
  ESIDOC = "ESIDOC",
  EDUNAO = "EDUNAO",
  CATER = "CATER",
  ARD = "ARD",
  PEARLTREES = "PEARLTREES",
  EDUMALIN = "EDUMALIN",
  SUIVI_STAGE = "SUIVI_STAGE",
  CLICKNPLAY = "CLICKNPLAY",
  VOLTAIRE = "VOLTAIRE",
  ONISEPSERVICES = "ONISEPSERVICES",
  AVENRIA = "AVENRIA",
  SACOCHE = "SACOCHE",
  ETUDIANT = "ETUDIANT",
  IJBOX = "IJBOX",
  FUTURNESS = "FUTURNESS",
  IMPALA = "IMPALA",
  POPLAB = "POPLAB",
  EDUMEDIA = "EDUMEDIA",
  SITUATION_FINANCIERE = "SITUATION_FINANCIERE",
  EDIALOG = "EDIALOG",
  RDVPP = "RDVPP"
}

interface EdApiModuleBase {
  code: EdApiModuleCode
  enable: boolean
  ordre: number
  badge: number
  params: unknown
}

export interface EdApiModuleCantineBarcode extends EdApiModuleBase {
  code: EdApiModuleCode.CANTINE_BARCODE
  params: {
    numeroBadge: string
  }
}

export interface EdApiModuleVieScolaire extends EdApiModuleBase {
  code: EdApiModuleCode.VIE_SCOLAIRE
  params: {}
}

export interface EdApiModuleVieDeLaClasse extends EdApiModuleBase {
  code: EdApiModuleCode.VIE_DE_LA_CLASSE
  params: {}
}

export interface EdApiModuleJournalDeClasse extends EdApiModuleBase {
  code: EdApiModuleCode.JOURNAL_DE_CLASSE
  params: {}
}

export interface EdApiModuleNotes extends EdApiModuleBase {
  code: EdApiModuleCode.NOTES
  params: {}
}

export interface EdApiModuleCloud extends EdApiModuleBase {
  code: EdApiModuleCode.CLOUD
  params: {}
}

export interface EdApiModuleMessagerie extends EdApiModuleBase {
  code: EdApiModuleCode.MESSAGERIE
  params: {
    isActif: StringBooleanAsNumber
    canParentsLireMessagesEnfants: StringBooleanAsNumber
    destAdmin: StringBooleanAsNumber
    destEleve: StringBooleanAsNumber
    destFamille: StringBooleanAsNumber
    destProf: StringBooleanAsNumber
    destEspTravail: StringBooleanAsNumber
    disabledNotification: StringBooleanAsNumber
    notificationEmailEtablissement: StringBooleanAsNumber
    choixMailNotification: StringBooleanAsNumber
    autreMailNotification: string
    /** Professional email. */
    mailPro: string
    /** Personal email. */
    mailPerso: string
    messagerieApiVersion: "v3"
    blackListProfActive: StringBooleanAsNumber
    estEnBlackList: StringBooleanAsNumber
    afficherToutesLesClasses: StringBooleanAsNumber
  }
}

export interface EdApiModuleEDT extends EdApiModuleBase {
  code: EdApiModuleCode.EDT
  params: {}
}

export interface EdApiModuleDocumentsEleve extends EdApiModuleBase {
  code: EdApiModuleCode.DOCUMENTS_ELEVE
  params: {
    DocumentsNotesActif: StringBooleanAsNumber
    DocumentsVSActif: StringBooleanAsNumber
    DocumentsAdministratifActif: StringBooleanAsNumber
    DocumentsEntrepriseActif: StringBooleanAsNumber
  }
}

export interface EdApiModuleCahierDeTextes extends EdApiModuleBase {
  code: EdApiModuleCode.CAHIER_DE_TEXTES
  params: {
    compteRenduSeance: StringBooleanAsNumber
    compteRenduSeancePrevisionnel: StringBooleanAsNumber
    isCDTPrimaire: StringBooleanAsNumber
  }
}

export interface EdApiModuleManuelsScolaires extends EdApiModuleBase {
  code: EdApiModuleCode.MANUELS_SCOLAIRES
  params: {}
}

export interface EdApiModuleQCM extends EdApiModuleBase {
  code: EdApiModuleCode.QCM
  params: {}
}

export interface EdApiModuleEDFORMS extends EdApiModuleBase {
  code: EdApiModuleCode.EDFORMS
  params: {}
}

export interface EdApiModuleReservations extends EdApiModuleBase {
  code: EdApiModuleCode.RESERVATIONS
  params: {
    // NOTE: Another value can be attributed here, I guess ?
    regime: "Externe libre",

    repasmidi_1: StringBooleanAsNumber
    repassoir_1: StringBooleanAsNumber
    repasmidi_2: StringBooleanAsNumber
    repassoir_2: StringBooleanAsNumber
    repasmidi_3: StringBooleanAsNumber
    repassoir_3: StringBooleanAsNumber
    repasmidi_4: StringBooleanAsNumber
    repassoir_4: StringBooleanAsNumber
    repasmidi_5: StringBooleanAsNumber
    repassoir_5: StringBooleanAsNumber
    repasmidi_6: StringBooleanAsNumber
    repassoir_6: StringBooleanAsNumber
    repasmidi_7: StringBooleanAsNumber
    repassoir_7: StringBooleanAsNumber
  }
}

export interface EdApiModuleCommandePassage extends EdApiModuleBase {
  code: EdApiModuleCode.COMMANDE_PASSAGE
  params: {
    affichageMenuSeul: StringBooleanAsNumber
  }
}

export interface EdApiModuleCarnetCorrespondance extends EdApiModuleBase {
  code: EdApiModuleCode.CARNET_CORRESPONDANCE
  params: {}
}

export interface EdApiModuleESIDOC extends EdApiModuleBase {
  code: EdApiModuleCode.ESIDOC
  params: {
    tabParams: Array<{
      /** @example "E-sidoc - ICSSA" */
      libelle: string
      /** @example "https://icssa-niort.esidoc.fr" */
      url: string
    }>
  }
}

export interface EdApiModuleEDUNAO extends EdApiModuleBase {
  code: EdApiModuleCode.EDUNAO
  params: {}
}

export interface EdApiModuleCATER extends EdApiModuleBase {
  code: EdApiModuleCode.CATER
  params: {}
}

export interface EdApiModulePearltrees extends EdApiModuleBase {
  code: EdApiModuleCode.PEARLTREES
  params: {}
}

export interface EdApiModuleEdumalin extends EdApiModuleBase {
  code: EdApiModuleCode.EDUMALIN
  params: {}
}

export interface EdApiModuleSuiviStage extends EdApiModuleBase {
  code: EdApiModuleCode.SUIVI_STAGE
  params: {}
}

export interface EdApiModuleClickNPlay extends EdApiModuleBase {
  code: EdApiModuleCode.CLICKNPLAY
  params: {}
}

export interface EdApiModuleVoltaire extends EdApiModuleBase {
  code: EdApiModuleCode.VOLTAIRE
  params: {}
}

export interface EdApiModuleOnisepServices extends EdApiModuleBase {
  code: EdApiModuleCode.ONISEPSERVICES
  params: {}
}

export interface EdApiModuleAvenria extends EdApiModuleBase {
  code: EdApiModuleCode.AVENRIA
  params: {}
}

export interface EdApiModuleSacoche extends EdApiModuleBase {
  code: EdApiModuleCode.SACOCHE
  params: {}
}

export interface EdApiModuleEtudiant extends EdApiModuleBase {
  code: EdApiModuleCode.ETUDIANT
  params: {}
}

export interface EdApiModuleIJBox extends EdApiModuleBase {
  code: EdApiModuleCode.IJBOX
  params: {}
}

export interface EdApiModuleFuturness extends EdApiModuleBase {
  code: EdApiModuleCode.FUTURNESS
  params: {}
}

export interface EdApiModuleImpala extends EdApiModuleBase {
  code: EdApiModuleCode.IMPALA
  params: {}
}

export interface EdApiModulePopLab extends EdApiModuleBase {
  code: EdApiModuleCode.POPLAB
  params: {}
}

export interface EdApiModuleEduMedia extends EdApiModuleBase {
  code: EdApiModuleCode.EDUMEDIA
  params: {}
}

export interface EdApiModuleSituationFinanciere extends EdApiModuleBase {
  code: EdApiModuleCode.SITUATION_FINANCIERE
  params: {}
}

export interface EdApiModuleEDialog extends EdApiModuleBase {
  code: EdApiModuleCode.EDIALOG
  params: {}
}

export interface EdApiModuleRDVPP extends EdApiModuleBase {
  code: EdApiModuleCode.RDVPP
  params: {}
}

export type EDApiModule = (
  | EdApiModuleCantineBarcode
  | EdApiModuleVieScolaire
  | EdApiModuleVieDeLaClasse
  | EdApiModuleJournalDeClasse
  | EdApiModuleNotes
  | EdApiModuleCloud
  | EdApiModuleMessagerie
  | EdApiModuleEDT
  | EdApiModuleDocumentsEleve
  | EdApiModuleCahierDeTextes
  | EdApiModuleManuelsScolaires
  | EdApiModuleQCM
  | EdApiModuleEDFORMS
  | EdApiModuleReservations
  | EdApiModuleCommandePassage
  | EdApiModuleCarnetCorrespondance
  | EdApiModuleESIDOC
  | EdApiModuleEDUNAO
  | EdApiModuleCATER
  | EdApiModulePearltrees
  | EdApiModuleEdumalin
  | EdApiModuleSuiviStage
  | EdApiModuleClickNPlay
  | EdApiModuleVoltaire
  | EdApiModuleOnisepServices
  | EdApiModuleAvenria
  | EdApiModuleSacoche
  | EdApiModuleEtudiant
  | EdApiModuleIJBox
  | EdApiModuleFuturness
  | EdApiModuleImpala
  | EdApiModulePopLab
  | EdApiModuleEduMedia
  | EdApiModuleSituationFinanciere
  | EdApiModuleEDialog
  | EdApiModuleRDVPP
);
