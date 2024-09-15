import { APIReceivedMessage, APIReceivedMessageType } from "./message";

export type APIReceivedMessagesList = Readonly<{
  status: number;
  token: string | null;
  data: {
    classeurs: any[];
    messages: {
      received: APIReceivedMessageType[];
      sent: any[];
      draft: any[];
      archived: any[];
    };
    parametrage: {
      isActif: boolean;
      canParentsLireMessagesEnfants: boolean;
      destAdmin: boolean;
      destEleve: boolean;
      destFamille: boolean;
      destProf: boolean;
      destEspTravail: boolean;
      disabledNotification: boolean;
      notificationEmailEtablissement: boolean;
      choixMailNotification: number;
      autreMailNotification: string;
      mailPro: string;
      mailPerso: string;
      messagerieApiVersion: string;
      blackListProfActive: boolean;
      estEnBlackList: boolean;
      afficherToutesLesClasses: boolean;
    };
    pagination: {
      messagesRecusCount: number;
      messagesEnvoyesCount: number;
      messagesArchivesCount: number;
      messagesRecusNotReadCount: number;
      messagesDraftCount: number;
    };
  }
}>;
