import React from "react";
import { NewUsersNavigationProp } from "../navigation/types";
import { ViewPager, Layout, StyleService, useStyleSheet, Text } from "@ui-kitten/components";
import { View, Image } from "react-native";

type Props = NewUsersNavigationProp;

const NewUserScreen: React.FC<Props> = ({ navigation }) => {
    const styles = useStyleSheet(themedStyle);

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [numPages, setIntervals] = React.useState(4);

    let bullets = [];
    for (let i = 0; i < numPages; i++) {
        bullets.push(
        <Text
            key={i}
            style={{
            ...styles.bullet,
            opacity: selectedIndex === i ? 0.7 : 0.1,
            }}>
            &bull;
        </Text>
        );
    }

    return (
        <React.Fragment>
            <ViewPager
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <Layout
                    style={styles.tab}>
                    <Text category='h5'>
                        Page 1
                    </Text>
                </Layout>
                <Layout
                    style={styles.tab}>
                    <Text category='h5'>
                        <Image
                            source={require('../../assets/questionsgif.gif')}/>
                    </Text>
                </Layout>
                <Layout
                    style={styles.tab}>
                    <Text category='h5'>
                        Page 3
                    </Text>
                </Layout>
                <Layout
                    style={styles.tab}>
                    <Text category='h5'>
                        Page 4
                    </Text>
                </Layout>
            </ViewPager>
            <View style={styles.bullets}>{bullets}</View>
        </React.Fragment>
    )
};

const themedStyle = StyleService.create({
    tab: {
        height: "100%",
        backgroundColor: "background-basic-color-4",
    },
    bullets: {
        position: "absolute",
        bottom: 25,
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    bullet: {
        paddingHorizontal: 5,
        fontSize: 30,
    },
})

export default NewUserScreen;