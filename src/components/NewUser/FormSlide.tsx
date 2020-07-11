import React, { useState, useEffect } from 'react';
import { findNodeHandle, ScrollView, Keyboard } from 'react-native';
import { View, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { Button, useStyleSheet, StyleService, Text, Layout, Input, Select, IndexPath, SelectItem, Spinner } from '@ui-kitten/components';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_NEW_USER } from '../../graphql/mutations';
import { faculties, interests } from '../../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Loading } from '../common';
import { ReferencesType } from '../types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default (props: any): React.ReactElement => {

    const styles = useStyleSheet(themedStyle);
    const navigation = useNavigation();

    const references: ReferencesType = {};

    const [ submitLoading, setSubmitLoading ] = useState<boolean>(false);

    // Form Variables
    const [location, setLocation] = useState<string>("");
    const [lowerAge, setLowerAge] = useState<number|null>(null);
    const [upperAge, setUpperAge] = useState<number|null>(null);
    const [maxDistance, setMaxDistance] = useState<number|null>(100);

    const [userFaculty, setUserFaculty] = useState<string>("None");
    const [userHobbies, setUserHobbies] = useState<string[]>([]);
    const [userYearOfStudy, setUserYearOfStudy] = useState<number|null>(null);

    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [scroll, setScroll] = useState<any>()

    const [ updateNewUser ] = useMutation(
        UPDATE_NEW_USER,
        {
            onCompleted: async (data: any) => {
                if (data['updateProfileField'] && data['updateUserField']) {
                    setSubmitLoading(false);
                    navigation.navigate("Main");
                } else {
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
    let [fontsLoaded] = useFonts({
        Inter_900Black
    })
    
    if (!fontsLoaded) {
        return <Loading visible />
    }
    
    const _scrollToInput = (reactNode: any) => {
        scroll.props.scrollToFocusedInput(reactNode)
    }

    return (
        <View style={{flex:1}}>
            <KeyboardAwareScrollView
                style={{flex:1}}
                innerRef={ref => {
                    setScroll(ref)
                }}>
            <View style={styles.container}>
                <Text
                    style={{fontFamily: "Inter_900Black", marginVertical: 10}}
                    status="primary"
                    category='h4'>
                    Complete Your Profile
                </Text>
                <Layout>
                    <Text category='h5' style={styles.sectionTitle}>
                        Group Preferences
                    </Text>
                    <Input
                        style={styles.inputStyle}
                        status='basic'
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        placeholder="Lower Age Limit"
                        label="Minimum Age Preference"
                        onChangeText={(newValue: string) => handleNumericInput(newValue, setLowerAge)}
                        onSubmitEditing={() => references.secondInput?.focus()}
                        onFocus={(event: any) => {
                            setInputFocused(true);
                            _scrollToInput(findNodeHandle(event.target))
                        }}
                        onBlur={()=>setInputFocused(false)}>
                        {lowerAge}
                    </Input>
                    <Input
                        style={styles.inputStyle}
                        status='basic'
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        placeholder="Upper Age Limit"
                        label="Maximum Age Preference"
                        onChangeText={(newValue: string) => handleNumericInput(newValue, setUpperAge)}
                        ref={(ref)=>(references.secondInput=ref)}
                        onSubmitEditing={()=>references.thirdInput?.focus()}
                        onFocus={(event: any) => {
                            setInputFocused(true);
                            _scrollToInput(findNodeHandle(event.target))
                        }}
                        onBlur={()=>setInputFocused(false)}>
                        {upperAge}
                    </Input>

                    <Text category='h5' style={styles.sectionTitle}>
                        Profile Details
                    </Text>
                    <Input
                        style={styles.inputStyle}
                        status='basic'
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        placeholder="Set to 0 if not applicable"
                        label="Year of Study"
                        onChangeText={(newValue: string) => handleNumericInput(newValue, setUserYearOfStudy)}
                        ref={(ref)=>(references.thirdInput=ref)}
                        onSubmitEditing={()=>{references.fourthInput?.focus()}}
                        onFocus={(event: any) => {
                            setInputFocused(true);
                            _scrollToInput(findNodeHandle(event.target))
                        }}
                        onBlur={()=>setInputFocused(false)}>
                        {userYearOfStudy}
                    </Input>
                    <Select
                        style={styles.inputStyle}
                        label="Faculty of Study"
                        value={userFaculty}
                        selectedIndex={new IndexPath(faculties.indexOf(userFaculty))}
                        onSelect={(value: IndexPath | IndexPath[]) => {if(value instanceof IndexPath){setUserFaculty(faculties[value.row])};references.fifthInput?.focus()}}
                        ref={(ref)=>(references.fourthInput=ref)}>
                        {faculties.map((value: string) => (
                            <SelectItem key={value} title={value} />
                        ))}
                    </Select>
                    <Select
                        placeholder="Pick your interests/hobbies"
                        style={styles.inputStyle}
                        label="Interests"
                        value={(props)=>{return userHobbies.length>0?<Text {...props}>{userHobbies.join(", ")}</Text>:<Text appearance='hint'>Pick your hobbies/interests!</Text>}}
                        multiSelect={true}
                        selectedIndex={userHobbies.map((value:string) => (
                            new IndexPath(interests.indexOf(value))
                        ))}
                        onSelect={setHobbies}
                        ref={(ref)=>(references.fifthInput=ref)}>
                        {interests.map((value: string) => (
                            <SelectItem key={value} title={value} />
                        ))}
                    </Select>
                </Layout>
            </View>
            </KeyboardAwareScrollView>
            {inputFocused?null:<Button
                disabled={lowerAge===null || upperAge===null || maxDistance===null || userYearOfStudy===null}
                size="giant"
                style={styles.buttonStyle}
                onPress={handleSubmit}
                accessoryLeft={(props)=>{return submitLoading?<View {...props}><Spinner status='control'/></View>:<View/>}}>
                    {submitLoading?"":"Continue"}
            </Button>}
        </View>
        
    )
}

const themedStyle = StyleService.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        height: "100%"
    },
    sectionTitle: {
        fontWeight: "700",
        marginTop: 15
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