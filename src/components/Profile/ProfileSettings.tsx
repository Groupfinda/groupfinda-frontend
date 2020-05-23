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
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { USER, FULLUSER } from '../../graphql/queries';

const EditIcon = (): IconElement => {
    return (
        <Icon
            width={16}
            height={16}
            fill="#078BF7"
            name='edit-2'/>
    )
}

const ForwardIcon = (): IconElement => {
    return (
        <Icon
            width={24}
            height={24}
            fill="grey"
            name='arrow-ios-forward-outline'/>
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
const CameraIcon = (): IconElement => {
    return <Icon style={{
        "height": 20,
        "marginHorizontal": 10,
        "tintColor": "#222B45",
        "width": 20
    }} name='camera'/>
};

const dummyUser = {
    "firstName": "Gabriel",
    "lastName": "Loye",
    "username": "gabrielloye",
    "gender": "Male",
    "location": "University Town",
    "prefMinAge": 18,
    "prefMaxAge": 26,
}

export default (): React.ReactElement => {

    const styles = useStyleSheet(themedStyle);

    const navigation = useNavigation();

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

    const {loading, error, data} = useQuery(FULLUSER, {
        onCompleted: (userData)=>{
            editUser({...user, ...userData.me})
        }
    });

    if ( loading || !data ) {
        return (
        <Layout>
            <Text>Loading</Text>
        </Layout>)
    } else {
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <React.Fragment>
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
                        {!editBasic?
                            <EditIcon></EditIcon>:
                            <SaveIcon></SaveIcon>}
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
                    hint='Birthday'
                    userKey='birthday'
                    user={user}
                    editable={false}
                    editUser={editUser}/>
                <ProfileField
                    style={[styles.profileSetting]}
                    hint='Location'
                    userKey='location'
                    user={user}
                    editable={false}
                    editUser={editUser}/>
                
                <Layout
                    style={styles.sectionHeader}
                    level='1'>
                    <Text category='h6'>
                        Security
                    </Text>
                </Layout>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate("ChangePassword")}}>
                <Layout
                    level='1'
                    style={[styles.resetPassword]}>
                    <Text
                        appearance='hint'
                        style={{paddingVertical: 13}}
                        category='s1'>
                        Change Password
                    </Text>
                    <ForwardIcon />
                </Layout>
                </TouchableOpacity>

                <Layout
                    style={styles.sectionHeader}
                    level='1'>
                    <Text category='h6'>
                        Group Preferences
                    </Text>
                    <TouchableOpacity
                        style={{"flexDirection": "row", "alignItems": "center"}}
                        onPress={()=>{editPreferencesToggle(!editPreferences)}}>
                        {!editPreferences?
                            <EditIcon></EditIcon>:
                            <SaveIcon></SaveIcon>}
                        {!editPreferences?
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
                        {!editInterests?
                            <EditIcon></EditIcon>:
                            <SaveIcon></SaveIcon>}
                        {!editInterests?
                            <Text status='info'>
                                Edit
                            </Text>:
                            (<Text status='success'>
                                Update
                            </Text>)}
                    </TouchableOpacity>
                </Layout>

                <Button
                    style={styles.doneButton}
                    onPress={()=>{console.log(user);navigation.navigate("Profile")}}>
                    Back
                </Button>
                </React.Fragment>
            </ScrollView>
        )
    }
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
    resetPassword: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    doneButton: {
      marginHorizontal: 24,
      marginTop: 24,
    },
  });