import React from "react";
import { StyleSheet } from "react-native";
import { ProfilePage } from '../components/Profile'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { ADD_EXPO_TOKEN, AddExpoTokenData, AddExpoTokenVariables } from '../graphql/mutations'
import { ME, MeData } from '../graphql/queries'
import { registerForPushNotificationsAsync } from '../../utils/notification'

const ProfileScreen: React.FC = () => {

  const [addExpoToken] = useMutation<AddExpoTokenData, AddExpoTokenVariables>(ADD_EXPO_TOKEN, {
    onError: () => { }
  })
  const { data } = useQuery<MeData, void>(ME)

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token && data) {
        if (data.me && data.me.expoToken) {
          console.log("Token already exists")
        } else {
          return addExpoToken({ variables: { token } })
        }
      }
    }).then(data => console.log("Got data ", data))
  }, [data])

  return (
    <SafeAreaView style={styles.container}>
      <ProfilePage />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ProfileScreen;