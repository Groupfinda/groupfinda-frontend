import React from 'react';
import { Drawer, DrawerGroup, DrawerItem, IndexPath } from '@ui-kitten/components';

export const DrawerGroupUser = () => {

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>();

    return (
        <Drawer
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <DrawerGroup title='Upcoming Events'>
                <DrawerItem title='Event 1'/>
                <DrawerItem title='Event 2'/>
            </DrawerGroup>
            <DrawerGroup title='Liked Events'>
                <DrawerItem title='Event 1'/>
                <DrawerItem title='Event 2'/>
            </DrawerGroup>
            <DrawerGroup title='Past Events'>
                <DrawerItem title='Event 1'/>
                <DrawerItem title='Event 2'/>
            </DrawerGroup>
        </Drawer>
    )
}