import { Skill } from "~/models";

export const decodeSkill = (item: any): Skill => {
  return {
    id: item.idCompetence,
    name: item.libelleCompetence,
    description: item.descriptif,
    value: Number(item.valeur)
  };
};
