import React from 'react';
import { OthersProfileNavigationProp } from '../navigation/types';
import { Layout, Text, StyleService, useStyleSheet, Avatar, Divider, ListItem, Icon, useTheme } from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks';
import { OTHERUSER } from '../graphql/queries';
import { Loading } from '../components/common';
import { ScrollView, View } from 'react-native';
import { ImageOverlay } from '../components/Profile/extra/image-overlay.component';
import { PinIcon } from '../components/Profile/extra/icons';
import { ProfileSocial } from '../components/Profile/extra/profile-social.component';

type Props = OthersProfileNavigationProp;

const OthersProfileScreen: React.FC<Props> = (props) => {
    const { route, navigation } = props;
    const styles = useStyleSheet(themedStyle);
    const theme = useTheme();
    
    const {loading, error, data} = useQuery(OTHERUSER, {
        variables: {
            id: route.params.userId
        },
        onCompleted: (userData) => {
            console.log(userData)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    if (loading || !data) {
        return <Loading visible={true} />
    } else {
        const user = data.fetchUser
        return (
            <Layout style={styles.container}>
                <ScrollView
                    style={styles.container}>
                    <React.Fragment>
                        <ImageOverlay
                            style={styles.header}
                            source={require("../components/Profile/temp/image-background2.jpg")}>
                            <Layout style={styles.headerLayout}>
                                <Layout level="1" style={{backgroundColor: "transparent"}}>
                                    <Icon
                                        height={30}
                                        width={30}
                                        fill="white"
                                        name="close-outline"
                                        onPress={() => navigation.goBack()}/>
                                    </Layout>
                                </Layout>
                            <Avatar
                                style={{ width: 148, height: 148, marginVertical: 16 }}
                                source={{ uri: user.avatar }} />
                            <Text style={styles.profileName} category='h5' status='control'>
                                {user.firstName} {user.lastName}
                            </Text>
                            <View style={styles.locationContainer}>
                                <PinIcon />
                                <Text style={styles.location} status="control">
                                    {user.location}
                                </Text>
                            </View>
                            <View style={styles.socialsContainer}>
                                <ProfileSocial
                                    style={styles.profileSocial}
                                    hint="Events"
                                    value={user.profile.eventsRegistered.length} />
                                <ProfileSocial
                                    style={styles.profileSocial}
                                    hint="Likes/Dislikes"
                                    value={
                                        user.profile.eventsLiked.length + user.profile.eventsDisliked.length
                                    } />
                                <ProfileSocial
                                    style={styles.profileSocial}
                                    hint="Interests"
                                    value={user.profile.userHobbies.length} />
                            </View>
                        </ImageOverlay>
                        <Divider />
                        <Layout style={{ padding: 12 }}>
                            <Text style={{fontWeight: "bold"}}
                                category='h6'>
                                Profile Overview
                            </Text>
                            <ListItem
                                disabled
                                title="Hobbies/Interests"
                                description={user.profile.userHobbies.join(",")}
                                accessoryLeft={() => (
                                    <Icon
                                      width={20}
                                      height={20}
                                      fill={theme["color-primary-default"]}
                                      name="brush-outline"/>
                                )}/>
                            <ListItem
                                disabled
                                title="Faculty"
                                description={user.profile.userFaculty}
                                accessoryLeft={() => (
                                    <Icon
                                        width={20}
                                        height={20}
                                        fill={theme["color-primary-default"]}
                                        name="book-outline"/>
                                )}/>
                            <ListItem
                                disabled
                                title="Year of Study"
                                description={user.profile.userYearOfStudy}
                                accessoryLeft={() => (
                                <Icon
                                    width={20}
                                    height={20}
                                    fill={theme["color-primary-default"]}
                                    name="clock-outline"/>
                                )}/>
                        </Layout>
                    </React.Fragment>
                </ScrollView>
            </Layout>
        )
    }
}

const themedStyle = StyleService.create({
    errorContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
      alignContent: "center",
      paddingHorizontal: 12,
    },
    container: {
      flex: 1,
      backgroundColor: "background-basic-color-2",
    },
    headerLayout: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "flex-end",
        position: "absolute",
        paddingHorizontal: 12,
        paddingTop: 20,
        zIndex: 100,
        backgroundColor: "transparent",
    },
    header: {
      paddingVertical: 24,
      alignItems: "center",
    },
    profileName: {
      zIndex: 1,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    location: {
      marginVertical: 8,
    },
    profileButtonsContainer: {
      flexDirection: "row",
      marginVertical: 32,
      marginHorizontal: 20,
    },
    profileButton: {
      flex: 1,
      marginHorizontal: 4,
    },
    socialsContainer: {
      flexDirection: "row",
      width: "75%",
      marginVertical: 8,
    },
    profileSocial: {
      flex: 1,
    },
});

export default OthersProfileScreen;