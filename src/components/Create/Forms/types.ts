export type FormProps = {
  variables: FormVariablesType;
  modifyVariable: (
    key: string
  ) => (value: string | Date | number | string[] | boolean) => void;
  prevPage?: () => void;
  nextPage?: () => void;
};

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
};
