import { Account } from "~/models/account";
import { decodeAccountKind } from "./account-kind";

export function decodeAccount (api: any): Account {
  return new Account(
    api.idLogin,
    api.id,
    api.uid,
    api.identifiant,
    decodeAccountKind(api.typeCompte),
    api.codeOgec,
    api.main,
    api.lastConnexion,
    api.prenom,
    api.nom,
    api.email,
    api.nomEtablissement,
    api.logoEtablissement,
    api.couleurAgendaEtablissement,
    api.accessToken,
    api.socketToken,
    [], // TODO
    {} // TODO
  );
}
