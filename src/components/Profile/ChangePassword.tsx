import React, {useState} from 'react';
import { Text, Layout, Input, StyleService, useStyleSheet, Button, Icon } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const ChangePassword: React.FC<Props> = () => {

    const [ currentPassword, setCurrentPassword ] = useState<string>();
    const [ currentSecure, setCurrentSecure ] = useState<boolean>(true);
    const [ newPassword, setNewPassword ] = useState<string>();
    const [ newSecure, setNewSecure ] = useState<boolean>(true);
    const [ confirmPassword, setConfirmPassword ] = useState<string>();
    const [ confirmSecure, setConfirmSecure ] = useState<boolean>(true);
    
    const styles = useStyleSheet(themedStyles);

    const navigation = useNavigation();

    const renderCurrentIcon = (props: any) => (
        <TouchableOpacity onPress={()=>{setCurrentSecure(!currentSecure)}}>
            <Icon {...props} name={currentSecure ? 'eye-off' : 'eye'}/>
        </TouchableOpacity>
    );
    const renderNewIcon = (props: any) => (
        <TouchableOpacity onPress={()=>{setNewSecure(!newSecure)}}>
            <Icon {...props} name={newSecure ? 'eye-off' : 'eye'}/>
        </TouchableOpacity>
    );
    const renderConfirmIcon = (props: any) => (
        <TouchableOpacity onPress={()=>{setConfirmSecure(!confirmSecure)}}>
            <Icon {...props} name={confirmSecure ? 'eye-off' : 'eye'}/>
        </TouchableOpacity>
    );

    const handleChangePassword = () => {
    }

    return (
        <ScrollView
            style={styles.container}>
            <Layout
                style={styles.formContainer}
                level='1'>
                <Input
                    status='info'
                    autoCapitalize='none'
                    secureTextEntry={currentSecure}
                    placeholder="Current Password"
                    accessoryRight={renderCurrentIcon}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}/>
                <Input
                    status='info'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholder="New Password"
                    accessoryRight={renderNewIcon}
                    value={newPassword}
                    onChangeText={setNewPassword}/>
                <Input
                    status='info'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholder="Confirm New Password"
                    accessoryRight={renderConfirmIcon}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}/>
                <Button
                    style={{marginVertical: 12}}
                    status='info'
                    onPress={handleChangePassword}>
                    Save Changes
                </Button>
                <Button
                    status='basic'
                    appearance='outline'
                    onPress={()=>navigation.goBack()}>
                    Cancel
                </Button>
            </Layout>
        </ScrollView>
    )

}

export default ChangePassword

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    formContainer: {
        flex: 1,
        marginVertical: 32,
        marginHorizontal: 24,
        borderRadius: 8
    }
})