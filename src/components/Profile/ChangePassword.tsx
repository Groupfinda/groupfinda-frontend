import React, {useState} from 'react';
import { Spinner, Text, Layout, Input, StyleService, useStyleSheet, Button, Icon, Card } from '@ui-kitten/components';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RESET_PASSWORD } from '../../graphql/mutations'
import { useMutation } from '@apollo/react-hooks';
import { useError } from '../../hooks';
import { TransparentBackHeader } from '../common';

type Props = {};

type resetPasswordType = {
    originalPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const LoadingIndicator = (props: any) => (
    <View style={[props.style, {
        justifyContent: 'center',
        alignItems: 'center'
    }]}>
      <Spinner size='small' status='basic'/>
    </View>
  );

const ChangePassword: React.FC<Props> = () => {

    const [ originalPassword, setOriginalPassword ] = useState<string>("");
    const [ currentSecure, setCurrentSecure ] = useState<boolean>(true);
    const [ newPassword, setNewPassword ] = useState<string>("");
    const [ newSecure, setNewSecure ] = useState<boolean>(true);
    const [ confirmNewPassword, setConfirmNewPassword ] = useState<string>("");
    const [ confirmSecure, setConfirmSecure ] = useState<boolean>(true);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false)

    const {
        Error,
        setGraphQLError,
        inputError,
        resetInputError,
        clearError,
      } = useError();

    const [ resetPassword ] = useMutation<{ resetPassword: boolean}, resetPasswordType>(
        RESET_PASSWORD,
        {
            onError: (err) => {
                setGraphQLError(err),
                setLoading(false);
            },
            onCompleted: async (data) => {
                setLoading(false)
                if (data['resetPassword']) {
                    setSuccess(true)
                }
            }
        }
    )

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

    const handleChangePassword = async(): Promise<void> => {
        setLoading(true);
        setSuccess(false);
        const variables: resetPasswordType = {
            originalPassword,
            newPassword,
            confirmNewPassword
        }
        await resetPassword({ variables });
    }

    return (
        <ScrollView
            style={styles.container}>
            <TransparentBackHeader />
            <Layout
                style={styles.formContainer}
                level='1'>
                <Input
                    status={inputError.originalPassword ? "danger" : "info"}
                    onChange={() => {resetInputError("originalPassword");clearError()}}
                    autoCapitalize='none'
                    secureTextEntry={currentSecure}
                    placeholder="Current Password"
                    accessoryRight={renderCurrentIcon}
                    value={originalPassword}
                    onChangeText={setOriginalPassword}/>
                <Input
                    status={inputError.newPassword ? "danger" : "info"}
                    onChange={() => {resetInputError("newPassword");clearError()}}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholder="New Password"
                    accessoryRight={renderNewIcon}
                    value={newPassword}
                    onChangeText={setNewPassword}/>
                <Input
                    status={inputError.confirmNewPassword ? "danger" : "info"}
                    onChange={() => {resetInputError("confirmNewPassword");clearError()}}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholder="Confirm New Password"
                    accessoryRight={renderConfirmIcon}
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}/>
                <Error />
                <Button
                    style={{marginVertical: 12}}
                    status='info'
                    onPress={handleChangePassword}
                    accessoryLeft={loading?LoadingIndicator:undefined}
                    disabled={originalPassword.length===0 || newPassword.length===0 || confirmNewPassword.length===0}>
                    {loading?"":"Save Changes"}
                </Button>
                <Button
                    status='basic'
                    appearance='outline'
                    onPress={()=>navigation.goBack()}>
                    Cancel
                </Button>
                {success?<Card status='success'>
                    <Text>You have successfully changed your password!</Text>
                </Card>:null}
            </Layout>
        </ScrollView>
    )

}

export default ChangePassword

const themedStyles = StyleService.create({
    container: {
        paddingTop: 12,
        backgroundColor: 'background-basic-color-1',
    },
    formContainer: {
        flex: 1,
        marginVertical: 78,
        marginHorizontal: 24,
        borderRadius: 8
    }
})