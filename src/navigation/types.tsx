import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  LogIn: undefined;
  Main: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
  ProfileSettings: undefined;
  ChangePassword: undefined;
  Questions: undefined;
  CreateEvent: undefined;
  JoinEvent: undefined;
};

export type SignUpScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "SignUp"
>;

export type LogInScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "LogIn"
>;

export type ForgetPasswordScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "ForgetPassword"
>;

export type ProfileSettingsScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "ProfileSettings"
>;

export type QuestionsScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "Questions"
>;

export type CreateEventScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "CreateEvent"
>;

export type JoinEventScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "JoinEvent"
>;
