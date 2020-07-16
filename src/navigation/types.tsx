import { StackScreenProps } from "@react-navigation/stack";
import { GetMyGroupsData } from "../graphql/queries";

export type RootStackParamList = {
  LogIn: undefined;
  Main: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
  ProfileSettings: undefined;
  ChangePassword: undefined;
  Questions: undefined;
  CreateEvent: { id?: string };
  JoinEvent: undefined;
  EventPage: { id: string };
  MessageRoom: { group: GetMyGroupsData["me"]["groups"][0] };
  NewUser: undefined;
  NewEvent: { id: string };
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

export type EventScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "EventPage"
>;

export type MessageRoomNavigationProp = StackScreenProps<
  RootStackParamList,
  "MessageRoom"
>;

export type NewUsersNavigationProp = StackScreenProps<
  RootStackParamList,
  "NewUser"
>;

export type NewEventNavigationProp = StackScreenProps<
  RootStackParamList,
  "NewEvent"
>;
