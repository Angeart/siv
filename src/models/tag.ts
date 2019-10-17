import { stringToEnum } from "@/utils/stringToEnum";

export const TagModelKeys = stringToEnum(["id", "label", "color"]);
type TagModelKeys = typeof TagModelKeys;

export interface TagModel {
  [TagModelKeys.id]: number;
  [TagModelKeys.label]: string;
  [TagModelKeys.color]: string;
}
