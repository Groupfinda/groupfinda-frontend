import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import {
  Button,
  StyleService,
  useStyleSheet,
  Icon,
  IconElement,
  Text,
  Layout,
  useTheme,
  Select,
  SelectItem,
  IndexPath,
  Datepicker,
  Divider,
} from "@ui-kitten/components";
import { EditAvatar } from "./extra/edit-avatar.component";
import { ProfileField } from "./extra/profile-field.component";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FULLUSER } from "../../graphql/queries";
import { TransparentBackHeader, Loading } from "../common";
import { genders, faculties, interests } from "../../../utils/constants"

import {
  PersonIcon,
  PeopleIcon,
  InterestsIcon,
  LockIcon,
  ForwardIcon,
  CameraIcon,
} from "./extra/icons";
import { UPDATE_USER, UPDATE_PROFILE } from "../../graphql/mutations";

const dummyUser = {
  avatar: "",
  firstName: "",
  gender: "",
  lastName: "", 
  birthday: 1,
  userOriginalBasic: {
    firstName: "",
    gender: "",
    lastName: "", 
    birthday: 1,
  },
  username: "",
  email: "",
  location: "",
  preferences: {
    lowerAge: 0,
    maxDistance: 100,
    upperAge: 0
  },
  profile: {
    userFaculty: "",
    userHobbies: ["game"],
    userYearOfStudy: 0
  },
  lowerAge: 0,
  maxDistance: 100,
  upperAge: 0,
  userFaculty: "",
  userHobbies: ["game"],
  userYearOfStudy: 0
};

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const theme = useTheme();

  const navigation = useNavigation();

  const [user, editUser] = React.useState(dummyUser);
  const [editBasic, editBasicToggle] = React.useState(false);
  const [editPreferences, editPreferencesToggle] = React.useState(false);
  const [editProfile, editProfileToggle] = React.useState(false);

  const { loading, error, data } = useQuery(FULLUSER, {
    onCompleted: (userData) => {
      const fetchedUser = {
        ...user,
        ...userData.me,
        ...userData.me.preferences,
        ...userData.me.profile,
        userOriginalBasic: {
          firstName: userData.me.firstName,
          lastName: userData.me.lastName, 
          birthday: userData.me.birthday,
          gender: userData.me.gender,
        }
      }
      editUser(fetchedUser);
    },
    fetchPolicy: "cache-and-network"
  });

  const [ updateUserBasic ] = useMutation(
    UPDATE_USER,
    {
      onCompleted: async (data: boolean) => {
        if (data) {
          editUser({
            ...user,
            userOriginalBasic: {
              firstName: user.firstName,
              lastName: user.lastName,
              birthday: user.birthday,
              gender: user.gender
            }
          })
        } else {
          editUser({
            ...user,
            firstName: user.userOriginalBasic.firstName,
            lastName: user.userOriginalBasic.lastName,
            birthday: user.userOriginalBasic.birthday,
            gender: user.userOriginalBasic.gender
          })
        }
        editBasicToggle(!editBasic);
      },
      onError: (err) => {
        console.log(err)
        editUser({
          ...user,
          firstName: user.userOriginalBasic.firstName,
          lastName: user.userOriginalBasic.lastName,
          birthday: user.userOriginalBasic.birthday,
          gender: user.userOriginalBasic.gender
        })
        editBasicToggle(!editBasic)
      }
    }
  )

  const [ updateUserPreferences ] = useMutation(
    UPDATE_USER,
    {
      onCompleted: async(data: boolean) => {
        if (data) {
          editUser({
            ...user,
            preferences: {
              lowerAge: user.lowerAge,
              upperAge: user.upperAge,
              maxDistance: user.maxDistance
            }
          })
        } else {
          editUser({
            ...user,
            lowerAge: user.preferences.lowerAge,
            upperAge: user.preferences.upperAge,
            maxDistance: user.preferences.maxDistance,
          })
        }
        editPreferencesToggle(!editPreferences)
      },
      onError: (err) => {
        console.log(err);
        editUser({
          ...user,
          lowerAge: user.preferences.lowerAge,
          upperAge: user.preferences.upperAge,
          maxDistance: user.preferences.maxDistance,
        })
        editPreferencesToggle(!editPreferences)
      }
    }
  )

  const [ updateUserProfile ] = useMutation(
    UPDATE_PROFILE,
    {
      onCompleted: async(data: boolean) => {
        if (data) {
          editUser({
            ...user,
            profile: {
              userFaculty: user.userFaculty,
              userHobbies: user.userHobbies,
              userYearOfStudy: user.userYearOfStudy
            }
          })
        } else {
          editUser({
            ...user,
            userHobbies: user.profile.userHobbies,
            userFaculty: user.profile.userFaculty,
            userYearOfStudy: user.profile.userYearOfStudy
          })
        }
        editProfileToggle(!editProfile)
      },
      onError: (err) => {
        console.log(err)
        editUser({
          ...user,
          userHobbies: user.profile.userHobbies,
          userFaculty: user.profile.userFaculty,
          userYearOfStudy: user.profile.userYearOfStudy
        })
        editProfileToggle(!editProfile)
      }
    }
  )

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryLeft={CameraIcon}
    />
  );

  const EditIcon = (): IconElement => {
    return (
      <Icon
        width={16}
        height={16}
        fill={theme['color-info-default']}
        name='edit-2'/>
    )
  }
  const SaveIcon = (props: any): IconElement => {
    return (
      <Icon
        width={16}
        height={16}
        fill={props.disabled?theme['color-basic-600']:theme['color-success-default']}
        name='save'/>
    )
  }

  const submitBasicChanges = () => {
    if (!editBasic) {
      editBasicToggle(!editBasic);
    } else {
      let variables = {}
      if (user.firstName !== user.userOriginalBasic.firstName) {
        variables = {firstName: user.firstName}
      }
      if (user.lastName !== user.userOriginalBasic.lastName) {
        variables = {...variables, lastName: user.lastName}
      }
      if (user.birthday !== user.userOriginalBasic.birthday) {
        variables = {...variables, birthday: user.birthday}
      }
      if (user.gender !== user.userOriginalBasic.gender) {
        variables = {...variables, gender: user.gender}
      }
      if (Object.keys(variables).length !== 0) {
        updateUserBasic({ variables })
      } else {
        editBasicToggle(!editBasic);
      }
    }
  }

  const submitProfileChanges = () => {
    if (!editProfile) {
      editProfileToggle(!editProfile);
    } else {
      let variables = {}
      if (user.userYearOfStudy !== user.profile.userYearOfStudy) {
        variables = {userYearOfStudy: user.userYearOfStudy}
      }
      if (user.userFaculty !== user.profile.userFaculty) {
        variables = {...variables, userFaculty: user.userFaculty}
      }
      if (user.userHobbies !== user.profile.userHobbies) {
        variables = {...variables, userHobbies: user.userHobbies}
      }
      if (Object.keys(variables).length !== 0) {
        updateUserProfile({variables})
      } else {
        editProfileToggle(!editProfile);
      }
    }
  }

  const submitPreferenceChanges = () => {
    if (!editPreferences) {
      editPreferencesToggle(!editPreferences);
    } else {
      let variables = {}
      if (user.lowerAge !== user.preferences.lowerAge) {
        variables = {lowerAge: user.lowerAge}
      }
      if (user.upperAge !== user.preferences.upperAge) {
        variables = {...variables, upperAge: user.upperAge}
      }
      if (user.maxDistance !== user.preferences.maxDistance) {
        variables = {...variables, maxDistance: user.maxDistance}
      }
      if (Object.keys(variables).length !== 0) {
        updateUserPreferences({ variables })
      } else {
        editPreferencesToggle(!editPreferences);
      }
    }
  }

  const setGender = (value: IndexPath | IndexPath[]) => {
    if (value instanceof IndexPath) {
      editUser({...user, gender: genders[value.row]})
    }
  }

  const setFaculty = (value: IndexPath | IndexPath[]) => {
    if (value instanceof IndexPath) {
      editUser({...user, userFaculty: faculties[value.row]})
    }
  }

  const setHobbies = (value: IndexPath | IndexPath[]) => {
    if (value instanceof IndexPath) {
    } else {
      editUser({...user, userHobbies:value.map((index: IndexPath)=>interests[index.row])})
    }
  }
  if (error) {
    return <ScrollView style={styles.container}>
      <TransparentBackHeader />
      <Layout style={{paddingTop: 30}}>
        <Text category='h1'>Error Loading this Page</Text>
      </Layout>
    </ScrollView>
  }
  else if (loading || !data) {
    return <Loading visible={loading} />;
  } else {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TransparentBackHeader />
        <React.Fragment>
          <EditAvatar
            style={{
              marginBottom: 24,
              aspectRatio: 1.0,
              height: 124,
              alignSelf: "center",
            }}
            source={require("./temp/gab.jpg")}
            editButton={renderPhotoButton}
          />

          <Layout style={styles.sectionHeader} level="1">
            <Layout style={styles.sectionHeaderText}>
              <PersonIcon />
              <Text category="h6">Basic Information</Text>
            </Layout>
            <TouchableOpacity
              testID="toggle-edit-basic"
              disabled={user.firstName.length===0 || user.lastName.length===0}
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={submitBasicChanges}
            >
              {!editBasic ? <EditIcon/>
              :<SaveIcon disabled={user.firstName.length===0 || user.lastName.length===0}/>}
              {!editBasic ? (
                <Text status="info">Edit</Text>
              ) : (
                <Text status="success" style={(user.firstName.length===0 || user.lastName.length===0)?{color:theme['color-basic-600']}:{}}>Update</Text>
              )}
            </TouchableOpacity>
          </Layout>
          <ProfileField
            numericInput={false}
            style={[styles.profileSetting]}
            hint="Username"
            userKey="username"
            user={user}
            editable={false}
            editUser={editUser}
          />
          <ProfileField
            numericInput={false}
            style={[styles.profileSetting]}
            hint="Email"
            userKey="email"
            user={user}
            editable={false}
            editUser={editUser}
          />
          <ProfileField
            numericInput={false}
            style={[styles.profileSetting]}
            hint="First Name"
            userKey="firstName"
            user={user}
            editable={editBasic}
            editUser={editUser}
          />
          <ProfileField
            numericInput={false}
            style={[styles.profileSetting]}
            hint="Last Name"
            userKey="lastName"
            user={user}
            editable={editBasic}
            editUser={editUser}
          />
          <Layout
            level='1'
            style={[styles.profileSetting, {flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
            <Text
              appearance='hint'
              style={{paddingVertical:13}}
              category='s1'>
              Birthday
            </Text>
            {editBasic?
            <Datepicker
              accessoryRight={(props)=>(<Icon {...props} name='calendar-outline'/>)}
              style={{width: 150}}
              min={new Date(new Date().setFullYear(1920))}
              max={new Date()}
              date={new Date(user['birthday'])}
              onSelect={(date)=>editUser({...user, birthday: date.getTime()})}/>
            :<Text category='s1'>
              {formattedDate(new Date(user['birthday']))}
            </Text>}
          </Layout>
          <Divider />
          <Layout
            level='1'
            style={[styles.profileSetting, {flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
            <Text
              appearance='hint'
              style={{paddingVertical:13}}
              category='s1'>
              Gender
            </Text>
            {editBasic?<Select
              value={user.gender}
              selectedIndex={new IndexPath(genders.indexOf(user.gender))}
              onSelect={setGender}
              style={{width:130}}>
              {genders.map((value: string) => (
                <SelectItem key={value} title={value} />
              ))}
            </Select>
            :<Text category='s1'>
              {user.gender}
            </Text>}
          </Layout>
          <Divider/>
          <ProfileField
            numericInput={false}
            style={[styles.profileSetting]}
            hint="Location"
            userKey="location"
            user={user}
            editable={false}
            editUser={editUser}
          />
          

          <Layout style={styles.sectionHeader} level="1">
            <Layout style={styles.sectionHeaderText}>
              <LockIcon />
              <Text category="h6">Security</Text>
            </Layout>
          </Layout>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
          >
            <Layout level="1" style={[styles.resetPassword]}>
              <Text
                appearance="hint"
                style={{ paddingVertical: 13 }}
                category="s1"
              >
                Change Password
              </Text>
              <ForwardIcon />
            </Layout>
          </TouchableOpacity>

          <Layout style={styles.sectionHeader} level="1">
            <Layout style={styles.sectionHeaderText}>
              <InterestsIcon />
              <Text category="h6">Profile</Text>
            </Layout>
            <TouchableOpacity
              testID="toggle-edit-profile"
              disabled={user.userYearOfStudy.toString().length===0}
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={submitProfileChanges}
            >
              {!editProfile ? <EditIcon/>
              : <SaveIcon disabled={user.userYearOfStudy.toString().length===0}/>}
              {!editProfile ? (
                <Text status="info">Edit</Text>
              ) : (
                <Text status="success" style={user.userYearOfStudy.toString().length===0?{color:theme['color-basic-600']}:{}}>Update</Text>
              )}
            </TouchableOpacity>
          </Layout>
          <ProfileField 
            numericInput={true}
            style={[styles.profileSetting]}
            hint="Year of Study"
            userKey="userYearOfStudy"
            user={user}
            editable={editProfile}
            editUser={editUser}
          />
          <Layout
            level='1'
            style={[styles.profileSetting, {flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
            <Text
              appearance='hint'
              style={{paddingVertical:13}}
              category='s1'>
              Faculty
            </Text>
            {editProfile?<Select
              value={user.userFaculty}
              selectedIndex={new IndexPath(faculties.indexOf(user.userFaculty))}
              onSelect={setFaculty}
              style={{width:200}}>
              {faculties.map((value: string) => (
                <SelectItem key={value} title={value} />
              ))}
            </Select>
            :<Text category='s1'>
              {user.userFaculty}
            </Text>}
          </Layout>
          <Divider/>
          <Layout
            level='1'
            style={[styles.profileSetting, {flexDirection:"column"}]}>
            <Text
              appearance='hint'
              style={{paddingVertical:13}}
              category='s1'>
              Interests
            </Text>
            <Select
              disabled={!editProfile}
              value={(props)=><Text {...props}>{user.userHobbies.join(", ")}</Text>}
              multiSelect={true}
              selectedIndex={user.userHobbies.map((value:string) => (
                new IndexPath(interests.indexOf(value))
              ))}
              onSelect={setHobbies}>
              {interests.map((value: string) => (
                <SelectItem key={value} title={value} />
              ))}
            </Select>
          </Layout>
          <Divider/>
          

          <Layout style={styles.sectionHeader} level="1">
            <Layout style={styles.sectionHeaderText}>
              <PeopleIcon />
              <Text category="h6">Group Preferences</Text>
            </Layout>
            <TouchableOpacity
              testID="toggle-edit-preferences"
              disabled={user.lowerAge.toString().length===0||user.upperAge.toString().length===0||user.maxDistance.toString().length===0}
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={submitPreferenceChanges}>
              {!editPreferences ? <EditIcon/>
              :<SaveIcon disabled={user.lowerAge.toString().length===0||user.upperAge.toString().length===0||user.maxDistance.toString().length===0}/>}
              {!editPreferences ? (
                <Text status="info">Edit</Text>
              ) : (
                <Text status="success" style={(user.lowerAge.toString().length===0||user.upperAge.toString().length===0||user.maxDistance.toString().length===0)?{color:theme['color-basic-600']}:{}}>Update</Text>
              )}
            </TouchableOpacity>
          </Layout>
          <ProfileField
            numericInput={true}
            style={[styles.profileSetting]}
            hint="Min. Age"
            userKey="lowerAge"
            user={user}
            editable={editPreferences}
            editUser={editUser}
          />
          <ProfileField
            numericInput={true}
            style={[styles.profileSetting]}
            hint="Max. Age"
            userKey="upperAge"
            user={user}
            editable={editPreferences}
            editUser={editUser}
          />
          <ProfileField
            numericInput={true}
            style={[styles.profileSetting]}
            hint="Max. Distance (km)"
            userKey="maxDistance"
            user={user}
            editable={editPreferences}
            editUser={editUser}
          />

          <Button
            style={styles.doneButton}
            onPress={() => {
              console.log(user);
              navigation.navigate("Profile");
            }}>
            Back
          </Button>
        </React.Fragment>
      </ScrollView>
    );
  }
};

function formattedDate(d = new Date) {
  return [d.getDate(), d.getMonth()+1, d.getFullYear()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
}

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
    paddingTop: 16
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
    backgroundColor: "background-basic-color-4",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderText: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileSetting: {
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  resetPassword: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});
