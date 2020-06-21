import React from 'react';
import { Drawer, DrawerGroup, DrawerItem, IndexPath, Icon, Text, Divider, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import { BasicEventType } from '../../types';
import styles from '../../common/Carousel/styles';
import { useNavigation } from '@react-navigation/native';

interface Props {
    eventsRegistered: BasicEventType[];
    eventsLiked: BasicEventType[];
}

export const DrawerGroupUser = (props: Props) => {
    const styles = useStyleSheet(themedStyle);
    const theme = useTheme();
    const navigation = useNavigation();

    let { eventsLiked, eventsRegistered } = props;
    eventsLiked.sort((eventA: BasicEventType, eventB: BasicEventType) => eventA.dateOfEvent - eventB.dateOfEvent)
    eventsLiked.sort((eventA: BasicEventType, eventB: BasicEventType) => eventB.dateOfEvent - eventA.dateOfEvent)

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>();
    
    return (
        <Drawer
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <DrawerGroup
                accessoryLeft={(props)=><Icon
                    {...props}
                    fill={theme["color-primary-default"]}
                    name='calendar-outline'/>}
                title='Upcoming Registered Events'>
                {eventsRegistered.map((event:BasicEventType)=>{
                    const dateOfEvent = new Date(event.dateOfEvent)
                    return (
                        <DrawerItem
                            onPress={()=>navigation.navigate("EventPage", { id: event.id})}
                            style={styles.drawerItem}
                            title={(props)=>(<Text {...props}>
                                {event.title} - <Text category='c1' appearance='hint'>
                                    {dateOfEvent.getDate()+"/"+dateOfEvent.getMonth()+"/"+dateOfEvent.getFullYear()}
                                </Text>
                            </Text>)}
                            key={event.id}
                            accessoryRight={(props)=><Icon
                                {...props}
                                fill={theme["color-primary-700"]}
                                name='expand' />}/>
                    )
                })}
            </DrawerGroup>
            <DrawerGroup
                accessoryLeft={(props)=><Icon {...props} fill='red' name='heart-outline'/>}
                title='Liked Events'>
                {eventsLiked.map((event:BasicEventType)=>{
                    const dateOfEvent = new Date(event.dateOfEvent);
                    return (
                        <DrawerItem
                            onPress={()=>navigation.navigate("EventPage", { id: event.id})}
                            style={styles.drawerItem}    
                            title={(props)=><Text {...props}>
                            {event.title} - <Text category='c1' appearance='hint'>
                                {dateOfEvent.getDate()+"/"+dateOfEvent.getMonth()+"/"+dateOfEvent.getFullYear()}
                            </Text>
                        </Text>}
                        key={event.id}
                        accessoryRight={(props)=><Icon
                            {...props}
                            fill={theme["color-primary-700"]}
                            name='search' />}/>
                    )
                })}
            </DrawerGroup>
        </Drawer>
    )
}

const themedStyle = StyleService.create({
    drawerItem: {
        borderTopWidth: 0.5,
        borderColor: "rgba(0,0,0,0.1)"
    }
})