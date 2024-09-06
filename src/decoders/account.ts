import type { Account } from "~/models/account";
import { decodeAccountKind } from "~/decoders/account-kind";

export const decodeAccount = (account: any): Account => {
  const gender = (typeof account.profile.sexe !== "undefined" && account.profile.sexe !== null)
    ? account.profile.sexe
    : account.civilite === "Mme" ? "F" : "M";

  return {
    loginID: account.idLogin,
    id: account.id,
    userID: account.uid,
    username: account.identifiant,
    kind: decodeAccountKind(account.typeCompte),
    ogecID: account.codeOgec,
    main: account.main,
    lastConnection: account.lastConnexion,
    firstName: account.prenom,
    lastName: account.nom,
    email: account.email,
    phone: account.profile.telPortable,
    schoolName: account.nomEtablissement,
    schoolUAI: account.profile.rneEtablissement,
    schoolLogoPath: account.logoEtablissement,
    schoolAgendaColor: account.couleurAgendaEtablissement,
    token: account.accessToken,
    socket_token: account.socketToken,
    gender,
    profilePictureURL: account.profile.photo,
    modules: account.modules,
    currentSchoolCycle: account.anneeScolaireCourante
  };
};
