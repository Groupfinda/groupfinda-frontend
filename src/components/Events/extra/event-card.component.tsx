import React, { ReactElement } from 'react';
import { Card, Layout, Text, useStyleSheet, StyleService, Button, List, ListItem, Icon, IconElement, Divider } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import styles from '../../common/Carousel/styles';

interface EventCardProps {
    event: {
        id: string,
        title: string,
        description: string,
        dateOfEvent: number,
        dateLastRegister: number,
        images: string[],
        private: boolean,
        groupSize: number,
        locationOn: boolean
    }
}

export const EventCard = (props: EventCardProps): ReactElement => {

    const styles = useStyleSheet(themedStyle)
    const { event } = props;

    return (
        <Card 
            status='primary'
            style={styles.card}
            header={()=>(
                <View>
                    <Image
                        style={{height: 200, width: "100%"}}
                        source={{uri:event['images'][0]}}/> 
                </View>
            )}
            footer={()=>(
                <Button>Details</Button>
            )}>
            <Layout style={styles.contentContainer}>
                <Layout level='1' style={styles.dateContainer}>
                    <Icon
                        width={16}
                        height={16}
                        fill='black'
                        name="calendar-outline"/>
                    <Text>{(new Date(event.dateOfEvent)).getDate()}</Text>
                    <Text>{months[(new Date(event.dateOfEvent)).getMonth()]}</Text>
                    <Text>{padZero((new Date(event.dateOfEvent)).getHours())}:{padZero((new Date(event.dateOfEvent)).getMinutes())}</Text>
                </Layout>
                <Divider />
                <Layout level='2' style={styles.descriptionContainer}>
                    <Text status='primary' category='h5'>{event.title}</Text>
                    <Text category='s1'>{event.description}</Text>
                    <Layout style={styles.footerText}>
                            <Icon
                                width={16}
                                height={16}
                                fill='black'
                                name="people-outline"/>
                            <Text> Group Size: </Text>
                            <Text status='primary'>{event.groupSize}</Text>
                        </Layout>
                        <Layout style={styles.footerText}>
                            <Icon
                                width={16}
                                height={16}
                                fill='black'
                                name="clock-outline"/>
                            <Text> Sign-ups Close: </Text>
                            <Text status='warning'>{(new Date(event.dateLastRegister)).getDate()} {months[(new Date(event.dateLastRegister)).getMonth()]} {(new Date(event.dateLastRegister)).getFullYear()}</Text> 
                        </Layout>
                </Layout>
            </Layout>
        </Card>
    )
}

const themedStyle = StyleService.create({
    card: {
        marginVertical: 10,
    },
    contentContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    footerText: {
        flexDirection:"row",
        alignItems: "center"
    },
    dateContainer: {
        paddingRight: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRightColor: "black",
        borderRightWidth: 1
    },
    descriptionContainer: {
        paddingHorizontal: 13,
        backgroundColor: "transparent",
        width: "85%"
    }
})

const padZero = (number: number) => {
    if (number.toString().length<2) {
        return "0" + number.toString()
    } else {
        return number.toString()
    }
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];