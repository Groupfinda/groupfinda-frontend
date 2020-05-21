import React from 'react';
import { ScrollView, View, YellowBox } from 'react-native';
import {
    Avatar,
    Button,
    StyleService,
    Text,
    useStyleSheet,
    IconElement,
    useTheme,
    Icon,
    Layout
} from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { ProfileSocial } from './extra/profile-social.component';
import { DrawerGroupUser } from './extra/drawer.component';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested inside plain ScrollViews']);

const PinIcon = (): IconElement => {
    const theme = useTheme();
    return (
        <Icon
            width={16}
            height={16}
            fill={theme['text-control-color']}
            name='pin'/>
    )
}

const SettingsIcon = (): IconElement => {
    return (
        <Icon
            width={16}
            height={16}
            fill="white"
            name='edit-2'/>
    )
}



export default (): React.ReactElement => {

  const styles = useStyleSheet(themedStyle);
  return (
    <ScrollView style={styles.container}>
      <ImageOverlay
        style={styles.header}
        source={require('./temp/image-background.jpg')}>
        <Layout style={styles.layoutContainer}>
            <Layout style={styles.layout} level='1'/>
            <Layout style={styles.layout} level='2'/>
            <Layout style={styles.layout} level='3'>
                <Button status='control' appearance='ghost' accessoryLeft={SettingsIcon}>
                    Edit Profile
                </Button>
            </Layout>
        </Layout>
        <Avatar
            style={{"width":148, "height": 148, "marginBottom": 16}}
            source={require('./temp/gab.jpg')}/>
        <Text
          style={styles.profileName}
          category='h5'
          status='control'>
          Gabriel Loye
        </Text>
        <View style={styles.locationContainer}>
          <PinIcon/>
          <Text
            style={styles.location}
            status='control'>
            University Town
          </Text>
        </View>
        {/* <View style={styles.profileButtonsContainer}>
          <Button
            style={styles.profileButton}>
            FOLLOW
          </Button>
          <Button
            style={styles.profileButton}
            status='control'>
            MESSAGE
          </Button>
        </View> */}
        <View style={styles.socialsContainer}>
          <ProfileSocial
            style={styles.profileSocial}
            hint='Events'
            value="7"/>
          <ProfileSocial
            style={styles.profileSocial}
            hint='Groups'
            value="6"/>
          <ProfileSocial
            style={styles.profileSocial}
            hint='Interests'
            value="13"/>
        </View>
      </ImageOverlay>
      <DrawerGroupUser />
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
    layoutContainer :{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    header: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    profileName: {
        zIndex: 1,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        marginVertical: 8,
    },
    profileButtonsContainer: {
        flexDirection: 'row',
        marginVertical: 32,
        marginHorizontal: 20,
    },
    profileButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    socialsContainer: {
        flexDirection: 'row',
        width: '75%',
        marginVertical: 8,
    },
    profileSocial: {
        flex: 1,
    },
});