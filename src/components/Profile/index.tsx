import React from 'react';
import { ScrollView, View } from 'react-native';
import {
    Avatar,
    Button,
    StyleService,
    Text,
    useStyleSheet,
    IconElement,
    useTheme,
    Icon
} from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { ProfileSocial } from './extra/profile-social.component';

const Pinicon = (): IconElement => {
    const theme = useTheme();
    return (
        <Icon
            width={16}
            height={16}
            fill={theme['text-control-color']}
            name='pin'/>
    )
}

export default (): React.ReactElement => {

  const styles = useStyleSheet(themedStyle);
    console.log("Reloaded")
  return (
    <ScrollView style={styles.container}>
      <ImageOverlay
        style={styles.header}
        source={require('./temp/image-background.jpg')}>
        <Avatar
          style={{"width":124, "height": 124, "marginVertical": 16}}
          source={require('./temp/gab.jpg')}/>
        <Text
          style={styles.profileName}
          category='h5'
          status='control'>
          Gabriel Loye
        </Text>
        <View style={styles.locationContainer}>
          <Pinicon/>
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
            value="10"/>
          <ProfileSocial
            style={styles.profileSocial}
            hint='Groups'
            value="10"/>
          <ProfileSocial
            style={styles.profileSocial}
            hint='Posts'
            value="10"/>
        </View>
      </ImageOverlay>
      <Text
        style={styles.sectionLabel}
        category='s1'>
        About
      </Text>
      <Text
        style={styles.profileDescription}
        appearance='hint'>
        I am me
      </Text>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
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
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  profileDescription: {
    marginHorizontal: 16,
  },
  friendsList: {
    marginHorizontal: 8,
  },
  friendItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  friendName: {
    marginTop: 8,
  },
  postItem: {
    flex: 1,
    aspectRatio: 1.0,
  },
});