import { ImageSourcePropType } from "react-native";

export type EventType = {
  id: string;
  title: string;
  date: Date;
  image: ImageSourcePropType;
};

export const events: EventType[] = [
  {
    id: "1",
    title: "Hackathon",
    date: new Date(),
    image: require("../../../assets/sampleimage1.jpg"),
  },
  {
    id: "2",
    title: "Two",
    date: new Date(),
    image: require("../../../assets/sampleimage2.jpg"),
  },
  {
    id: "3",
    title: "Three",
    date: new Date(),
    image: require("../../../assets/sampleimage3.jpg"),
  },
  {
    id: "4",
    title: "Four",
    date: new Date(),
    image: require("../../../assets/fun.png"),
  },
];
