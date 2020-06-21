import { Input, Select } from "@ui-kitten/components";

export type ReferencesType = {
  [key: string]: Input | Select | null;
};

export type QuestionType = {
  order: number,
  content: string,
  value: number
};

export type BasicEventType = {
  id: string,
  title: string,
  dateOfEvent: number
}