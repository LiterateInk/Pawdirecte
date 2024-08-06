import { Account } from "~/models/account";
import { decodeAccountKind } from "~/decoders/account-kind";

export function decodeAccount (account: any): Account {
  const gender = (typeof account.profile.sexe !== "undefined" && account.profile.sexe !== null)
    ? account.profile.sexe
    : account.civilite === "Mme" ? "F" : "M";

  return new Account(
    account.idLogin,
    account.id,
    account.uid,
    account.identifiant,
    decodeAccountKind(account.typeCompte),
    account.codeOgec,
    account.main,
    account.lastConnexion,
    account.prenom,
    account.nom,
    account.email,
    account.profile.telPortable,
    account.nomEtablissement,
    account.profile.rneEtablissement,
    account.logoEtablissement,
    account.couleurAgendaEtablissement,
    account.accessToken,
    account.socketToken,
    gender,
    "https:" + account.profile.photo,
    account.modules
  );
}
