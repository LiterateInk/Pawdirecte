import type { Account } from "~/models/account";
import { decodeAccountKind } from "~/decoders/account-kind";

export const decodeAccount = (account: any): Account => {
  const gender = (typeof account.profile.sexe !== "undefined" && account.profile.sexe !== null)
    ? account.profile.sexe
    : account.civilite === "Mme" ? "F" : "M";

  return {
    id_login: account.idLogin,
    id: account.id,
    user_id: account.uid,
    username: account.identifiant,
    kind: decodeAccountKind(account.typeCompte),
    ogec_id: account.codeOgec,
    main: account.main,
    last_connection: account.lastConnexion,
    first_name: account.prenom,
    last_name: account.nom,
    email: account.email,
    phone: account.profile.telPortable,
    school_name: account.nomEtablissement,
    school_rne: account.profile.rneEtablissement,
    school_logo_path: account.logoEtablissement,
    school_agenda_color: account.couleurAgendaEtablissement,
    token: account.accessToken,
    socket_token: account.socketToken,
    gender,
    profile_picture_url: account.profile.photo,
    modules: account.modules
  };
};
