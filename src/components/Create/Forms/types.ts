export type FormProps = {
  variables: FormVariablesType;
  modifyVariable: (key: string) => (value: string | Date | number) => void;
};

export type FormVariablesType = {
  title: string;
  description: string;
  dateOfEvent: Date;
  recurringMode: boolean;
  dateLastRegister: Date;
  images: string[];
  private: boolean;
  groupSize: number;
  category: string[];
  locationOn: boolean;
};
