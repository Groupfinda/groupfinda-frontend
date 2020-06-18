import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, useStyleSheet, StyleService, Text, Layout, Input, Select, IndexPath, SelectItem, Spinner } from '@ui-kitten/components';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_NEW_USER } from '../../graphql/mutations';
import Constants from 'expo-constants'
import { faculties, interests } from '../../../utils/constants';
import { useNavigation } from '@react-navigation/native';

export default (): React.ReactElement => {
    const styles = useStyleSheet(themedStyle);
    const navigation = useNavigation();

    const [ submitLoading, setSubmitLoading ] = useState<boolean>(false);

    // Form Variables
    const [location, setLocation] = useState<string>("");
    const [lowerAge, setLowerAge] = useState<number|null>(null);
    const [upperAge, setUpperAge] = useState<number|null>(null);
    const [maxDistance, setMaxDistance] = useState<number|null>(100);

    const [userFaculty, setUserFaculty] = useState<string>("None");
    const [userHobbies, setUserHobbies] = useState<string[]>([]);
    const [userYearOfStudy, setUserYearOfStudy] = useState<number|null>(null);

    const [ updateNewUser ] = useMutation(
        UPDATE_NEW_USER,
        {
            onCompleted: async (data: any) => {
                if (data['updateProfileField'] && data['updateUserField']) {
                    setSubmitLoading(false);
                    navigation.navigate("Main");
                } else {
                    console.log(data)
                    setSubmitLoading(false);
                }
            },
            onError: (err) => {
                console.log(err)
                setSubmitLoading(false);
            }
        }
    )

    const handleSubmit = () => {
        setSubmitLoading(true);
        let variables = {
            newUser: false,
            lowerAge,
            upperAge,
            userFaculty,
            userHobbies,
            userYearOfStudy
        }
        updateNewUser({ variables })
    }

    const handleNumericInput = (newValue: string, setFunction: any) => {
        if (newValue.length>0) {
            setFunction(parseInt(newValue))
        } else {
            setFunction(null)
        };
    }

    const setHobbies = (value: IndexPath | IndexPath[]) => {
        if (value instanceof IndexPath) {}
        else {
            setUserHobbies(value.map((index: IndexPath)=>interests[index.row]))
        }
    }

    return (
        <React.Fragment>
            <View style={styles.container}>
                <Text category='h4'>
                    Complete Your Profile
                </Text>
                <Layout>
                    <Input
                        style={styles.inputStyle}
                        status='basic'
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        placeholder="Lower Age Limit"
                        label="Minimum Age Preference"
                        onChangeText={(newValue: string) => handleNumericInput(newValue, setLowerAge)}>
                        {lowerAge}
                    </Input>
                    <Input
                        style={styles.inputStyle}
                        status='basic'
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        placeholder="Upper Age Limit"
                        label="Maximum Age Preference"
                        onChangeText={(newValue: string) => handleNumericInput(newValue, setUpperAge)}>
                        {upperAge}
                    </Input>

                    <Input
                        style={styles.inputStyle}
                        status='basic'
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        placeholder="Set to 0 if not applicable"
                        label="Year of Study"
                        onChangeText={(newValue: string) => handleNumericInput(newValue, setUserYearOfStudy)}>
                        {userYearOfStudy}
                    </Input>
                    <Select
                    style={styles.inputStyle}
                        label="Faculty of Study"
                        value={userFaculty}
                        selectedIndex={new IndexPath(faculties.indexOf(userFaculty))}
                        onSelect={(value: IndexPath | IndexPath[]) => {if(value instanceof IndexPath){setUserFaculty(faculties[value.row])}}}>
                        {faculties.map((value: string) => (
                            <SelectItem key={value} title={value} />
                        ))}
                    </Select>
                    <Select
                    style={styles.inputStyle}
                        label="Interests"
                        value={(props)=><Text {...props}>{userHobbies.join(", ")}</Text>}
                        multiSelect={true}
                        selectedIndex={userHobbies.map((value:string) => (
                            new IndexPath(interests.indexOf(value))
                        ))}
                        onSelect={setHobbies}>
                        {interests.map((value: string) => (
                            <SelectItem key={value} title={value} />
                        ))}
                    </Select>
                </Layout>
            </View>
            <Button
                disabled={lowerAge===null || upperAge===null || maxDistance===null || userYearOfStudy===null}
                size="giant"
                style={styles.buttonStyle}
                onPress={handleSubmit}
                accessoryLeft={(props)=>{return submitLoading?<View {...props}><Spinner status='control'/></View>:<View/>}}>
                    {submitLoading?"":"Continue"}
            </Button>
        </React.Fragment>
        
    )
}

const themedStyle = StyleService.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20
    },
    inputStyle: {
        marginVertical: 5
    },
    buttonStyle: {
        position: "absolute",
        bottom: 0,
        width: "100%"
    }
})