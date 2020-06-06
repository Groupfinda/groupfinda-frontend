import { CustomError } from "../../../hooks";
import { ImagePickerResult } from "expo-image-picker";

export type FormProps = {
  variables: FormVariablesType;
  modifyVariable: (key: string) => (value: any) => void;
  prevPage?: () => void;
  nextPage?: () => void;
};

type ValidateProps = {
  validateFieldLength: (
    key: string
  ) => (setCustomError: (err: CustomError) => void) => () => boolean;
};

export type FormPropsWithValidate = FormProps & ValidateProps;

export type FormVariablesType = {
  title: string;
  description: string;
  dateOfEvent: Date;
  recurringMode: boolean;
  dateLastRegister: Date;
  images: string[];
  privateStatus: boolean;
  groupSize: number;
  category: string[];
  locationOn: boolean;
  address: string;
  postalCode: string;
};
