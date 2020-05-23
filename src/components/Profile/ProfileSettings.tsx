import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
    Button,
    StyleService,
    useStyleSheet,
    Icon,
    IconElement,
    Text,
    Layout
} from '@ui-kitten/components';
import { EditAvatar } from './extra/edit-avatar.component'
import { ProfileField } from './extra/profile-field.component'
import { useNavigation } from "@react-navigation/native";

const EditIcon = (): IconElement => {
    return (
        <Icon
            width={16}
            height={16}
            fill="#078BF7"
            name='edit-2'/>
    )
}

const SaveIcon = (): IconElement => {
    return (
        <Icon
        width={16}
        height={16}
        fill='green'
        name='save'/>
    )
}

const dummyUser = {
    "firstName": "Gabriel",
    "lastName": "Loye",
    "username": "gabrielloye",
    "gender": "Male",
    "age": 22,
    "location": "University Town",
    "prefMinAge": 18,
    "prefMaxAge": 26,
}

export default (): React.ReactElement => {

    const styles = useStyleSheet(themedStyle);

    const navigation = useNavigation();

    const CameraIcon = (): IconElement => {
        return <Icon style={{"height": 20, "marginHorizontal": 10, "tintColor": "#222B45", "width": 20}} name='camera'/>
    };

    const renderPhotoButton = (): React.ReactElement => (
        <Button
          style={styles.editAvatarButton}
          status='basic'
          accessoryLeft={CameraIcon}/>
    );
    
    const [ user, editUser ] = React.useState(dummyUser)
    const [ editBasic, editBasicToggle ] = React.useState(false)
    const [ editPreferences, editPreferencesToggle ] = React.useState(false)
    const [ editInterests, editInterestsToggle ] = React.useState(false)

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <EditAvatar
                style={{"marginBottom": 24, "aspectRatio": 1.0, "height": 124, "alignSelf": "center"}}
                source={require('./temp/gab.jpg')}
                editButton={renderPhotoButton}/>
            
            <Layout
                style={styles.sectionHeader}
                level='1'>
                <Text category='h6'>
                    Basic Information
                </Text>
                <TouchableOpacity
                    style={{"flexDirection": "row", "alignItems": "center"}}
                    onPress={()=>{editBasicToggle(!editBasic)}}>
                    {!editBasic?<EditIcon></EditIcon>:<SaveIcon></SaveIcon>}
                    {!editBasic?
                    <Text status='info'>
                        Edit
                    </Text>:
                    (<Text status='success'>
                        Update
                    </Text>)}
                </TouchableOpacity>
            </Layout>
            <ProfileField
                style={[styles.profileSetting]}
                hint='First Name'
                userKey='firstName'
                user={user}
                editable={editBasic}
                editUser={editUser}/>
            <ProfileField
                style={[styles.profileSetting]}
                hint='Last Name'
                userKey='lastName'
                user={user}
                editable={editBasic}
                editUser={editUser}/>
            <ProfileField
                style={[styles.profileSetting]}
                hint='Username'
                userKey='username'
                user={user}
                editable={editBasic}
                editUser={editUser}/>
            <ProfileField
                style={[styles.profileSetting]}
                hint='Gender'
                userKey='gender'
                user={user}
                editable={editBasic}
                editUser={editUser}/>
            <ProfileField
                style={[styles.profileSetting]}
                hint='Age'
                userKey='age'
                user={user}
                editable={editBasic}
                editUser={editUser}/>
            <ProfileField
                style={[styles.profileSetting]}
                hint='Location'
                userKey='location'
                user={user}
                editable={editBasic}
                editUser={editUser}/>

            <Layout
                style={styles.sectionHeader}
                level='1'>
                <Text category='h6'>
                    Group Preferences
                </Text>
                <TouchableOpacity
                    style={{"flexDirection": "row", "alignItems": "center"}}
                    onPress={()=>{editPreferencesToggle(!editPreferences)}}>
                    <EditIcon></EditIcon>
                    <Text status='info'>
                        Edit
                    </Text>
                </TouchableOpacity>
            </Layout>
            <ProfileField
                style={[styles.profileSetting]}
                hint='Min. Age'
                userKey='prefMinAge'
                user={user}
                editable={editPreferences}
                editUser={editUser}/>
            <ProfileField
                style={[styles.profileSetting]}
                hint='Max. Age'
                userKey='prefMaxAge'
                user={user}
                editable={editPreferences}
                editUser={editUser}/>
            
            <Layout
                style={styles.sectionHeader}
                level='1'>
                <Text category='h6'>
                    Interests/Hobbies
                </Text>
                <TouchableOpacity
                    style={{"flexDirection": "row", "alignItems": "center"}}
                    onPress={()=>{editInterestsToggle(!editInterests)}}>
                    <EditIcon></EditIcon>
                    <Text status='info'>
                        Edit
                    </Text>
                </TouchableOpacity>
            </Layout>

            <Button
                style={styles.doneButton}
                onPress={()=>{console.log(user);navigation.navigate("Profile")}}>
                Back
            </Button>
        </ScrollView>
    )

}

const themedStyle = StyleService.create({
    container: {
      flex: 1,
      backgroundColor: 'background-basic-color-2',
    },
    contentContainer: {
      paddingVertical: 24,
    },
    editAvatarButton: {
      aspectRatio: 1.0,
      height: 48,
      borderRadius: 24,
    },
    sectionHeader: {
        marginTop: 0,
        backgroundColor: 'background-basic-color-4',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    profileSetting: {
      paddingVertical: 5,
      paddingHorizontal: 16
    },
    doneButton: {
      marginHorizontal: 24,
      marginTop: 24,
    },
  });