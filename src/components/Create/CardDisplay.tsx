import React from "react";
import { Layout, Text, Card, Icon, useTheme } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type Props = {
  title: string;
  icon: string;
};

export const CardDisplay: React.FC<Props> = (props) => {
  const { title, icon } = props;
  const theme = useTheme();
  return (
    <Card status="primary" style={styles.card} appearance="outline">
      <Text category="h1" appearance="hint">
        {title}
      </Text>
      <Layout style={styles.center}>
        <Icon
          style={styles.icon}
          fill={theme["color-primary-500"]}
          name={icon}
        />
      </Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  icon: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
});
