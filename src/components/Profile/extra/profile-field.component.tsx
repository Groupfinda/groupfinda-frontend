import React from 'react';
import { StyleSheet, ViewProps, TouchableOpacity } from 'react-native';
import { Divider, Layout, Text, Input, IconElement, Icon } from '@ui-kitten/components';

export interface ProfileFieldProps extends ViewProps {
    hint: string;
    editUser: any;
    userKey: string;
    user: any;
    editable: boolean
}


export const ProfileField = (props: ProfileFieldProps): React.ReactElement => {

    const { style, hint, editUser, userKey, user, editable, ...layoutProps } = props;

    const handleChange = (newValue: string) => {
        editUser({
            ...user,
            [userKey]: newValue
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
                    style={{"width": 150}}
                    textStyle={{"textAlign": "right"}}
                    onChangeText={handleChange}>
                    {user[userKey]}
                </Input>
                :<Text category='s1'>
                    {userKey==='birthday'?
                        formattedDate(new Date(user['birthday']))
                        :user[userKey]}
                </Text>}
            </Layout>
            <Divider/>
        </React.Fragment>
    );
};

function formattedDate(d = new Date) {
    return [d.getDate(), d.getMonth()+1, d.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});