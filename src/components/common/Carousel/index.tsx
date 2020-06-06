import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageSourcePropType } from "react-native";
import { Card } from "@ui-kitten/components";

import { styles } from "./styles";
import ImageCard from "./ImageCard";

type Props = {
  items: ImageSourcePropType[];
  imageHeight: number;
};
export const Carousel = (props: any) => {
  const { items, imageHeight } = props;

  const itemsPerInterval = 1;

  const [interval, setInterval] = React.useState<number | undefined>(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width: number) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset: any) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1,
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * items.length}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items.map((item: string, index: number) => {
          return (
            <ImageCard
              height={imageHeight}
              key={item + index.toString()}
              imageLink={item}
            />
          );
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

export default Carousel;
