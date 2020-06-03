import { Input } from "@ui-kitten/components";

export type ReferencesType = {
  [key: string]: Input | null;
};

export type QuestionType = {
  order: number,
  content: string,
  value: number
};