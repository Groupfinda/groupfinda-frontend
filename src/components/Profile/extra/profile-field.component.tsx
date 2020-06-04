import React from 'react';
import { StyleSheet, ViewProps, TouchableOpacity } from 'react-native';
import { Divider, Layout, Text, Input, IconElement, Icon } from '@ui-kitten/components';

export interface ProfileFieldProps extends ViewProps {
    hint: string;
    editUser: any;
    userKey: string;
    user: any;
    editable: boolean;
    numericInput: boolean;
}


export const ProfileField = (props: ProfileFieldProps): React.ReactElement => {

    const { style, hint, editUser, userKey, user, editable, numericInput, ...layoutProps } = props;

    const handleChange = (newValue: string) => {
        let value
        if (numericInput && newValue.length>0) {
            value = parseInt(newValue)
        } else {
            value = newValue
        }
        editUser({
            ...user,
            [userKey]: value
        })
    }

    return (
        <React.Fragment>
            <Layout
                level='1'
                {...layoutProps}
                style={[styles.container, style]}>
                <Text
                    appearance='hint'
                    style={{paddingVertical: 13}}
                    category='s1'>
                    {hint}
                </Text>
                {editable
                ?<Input
                    status={user[userKey].length===0?"danger":""}
                    keyboardType={numericInput?"number-pad":"default"}
                    style={numericInput?{width:60}:{width: 150}}
                    textStyle={{"textAlign": "right"}}
                    onChangeText={handleChange}>
                    {user[userKey]}
                </Input>
                :<Text category='s1'>
                    {user[userKey]}
                </Text>}
            </Layout>
            <Divider/>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});