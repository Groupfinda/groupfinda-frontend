import { ImageSourcePropType } from "react-native";

export type EventType = {
  id: string;
  title: string;
  date: Date;
  image: string;
};

export const events: EventType[] = [
  {
    id: "1",
    title: "One",
    date: new Date(),
    image:
      "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2",
  },
  {
    id: "2",
    title: "Two",
    date: new Date(),
    image: "https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697",
  },
  {
    id: "3",
    title: "Three",
    date: new Date(),
    image:
      "https://postmediatorontosun.files.wordpress.com/2019/12/cat-e1575303121192.jpg",
  },
  {
    id: "4",
    title: "Four",
    date: new Date(),
    image: "https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg",
  },
];
