import React, { useState } from 'react';
import { Layout, Text, Input, Select, SelectItem, IndexPath, Button, Icon, IconProps, Spinner, Divider } from '@ui-kitten/components';
import { KeyboardAvoidingView, StyleSheet, ScrollView, View, Image } from 'react-native';
import { SubmitReportNavigationProp } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransparentBackHeader } from '../components/common';
import { useMutation } from '@apollo/react-hooks';
import { SUBMIT_REPORT } from '../graphql/mutations';
import { ReferencesType } from '../components/types';

type Props = SubmitReportNavigationProp;

type submitReportType = {
    title: string;
    category: string;
    description: string;
}

const references: ReferencesType = {};

const AlertIcon = (props: IconProps) => (
    <Icon {...props} width={14} height={14} name='alert-circle-outline' fill='red'/>
);

const ReportCategories = [
    "Feedback",
    "Report Issues"
]

const SubmitReportScreen: React.FC<Props> = ({ navigation }) => {
    
    const [reportTitle, setReportTitle] = useState<string>("");
    const [reportCategory, setReportCategory] = useState<number | undefined>();
    const [reportDescription, setReportDescription] = useState<string>("");

    const [submitError, setSubmitError] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const [genericError, setGenericError] = useState<string | null>(null);

    const [successPage, setSuccessPage] = useState<boolean>(false);

    const [ submitReport ] = useMutation<{ submitReport: boolean }, submitReportType>(
        SUBMIT_REPORT,
        {
            onCompleted: (data) => {
                if (data.submitReport) {
                    setSubmitLoading(false);
                    setSuccessPage(true)
                } else {
                    setGenericError("There is an unknown error. Please try again later.")
                    setSubmitLoading(false);
                }
            },
            onError: (err) => {
                setGenericError(`Error, please try again later or contact a developer. ${err}`)
                setSubmitLoading(false);
            }
        }
    )

    const handleSubmitReport = () => {
        setSubmitLoading(true);
        if (reportTitle.length > 0 && reportCategory !== undefined && reportDescription.length > 0) {
            const variables: submitReportType = {
                title: reportTitle,
                category: ReportCategories[reportCategory],
                description: reportDescription,
            }
            submitReport({ variables })
        } else {
            setSubmitError(true);
            setSubmitLoading(false);
        }
    }

    const setCategory = (value: IndexPath | IndexPath[]) => {
        if (value instanceof IndexPath) {
            setReportCategory(value.row)
        }
    }

    if (successPage) {
        return (
        <SafeAreaView style={styles.container}>
            <Layout style={[styles.container, {padding: 30}]}>
                <Image
                    style={{width:"100%", height: "65%"}}
                    source={require("../../assets/reportsuccess.png")} />
                <Text style={{"alignSelf": "center", marginVertical: 10}}
                    category="h4"
                    status="primary">
                    Thank You!
                </Text>
                <Text style={{textAlign: "center"}}>
                    With every report/feedback submitted, you are helping us improve the app to serve you better!
                </Text>
                <Button style={{marginTop: 10}}
                    onPress={()=>navigation.goBack()}>
                    Back to Main
                </Button>
            </Layout>
        </SafeAreaView>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Layout style={styles.container}>
                <ScrollView>
                    <Layout style={styles.container}>
                        <TransparentBackHeader />
                        <Layout style={styles.body}>
                            <Text style={styles.headerText}
                                category="h4"
                                status="primary">
                                Create Ticket
                            </Text>
                            <Divider />
                            <KeyboardAvoidingView
                                style={styles.container}
                                keyboardVerticalOffset={40}
                                behavior="padding">
                                <Layout>
                                    <Input
                                        value={reportTitle}
                                        onChangeText={value=>setReportTitle(value)}
                                        style={styles.inputMargins}
                                        label="Title"
                                        placeholder="Report/Feedback title"
                                        onSubmitEditing={()=>references.secondInput?.focus()}
                                        status={submitError&&reportTitle.length===0?'danger':'basic'}
                                        captionIcon={submitError&&reportTitle.length===0?AlertIcon:undefined}
                                        caption={submitError&&reportTitle.length===0?
                                            ()=>(<Text category="s2"
                                                    status='danger'>
                                                Title cannot be empty
                                            </Text>)
                                            :""} />
                                    <Select
                                        ref={(ref)=>(references.secondInput=ref)}
                                        style={styles.inputMargins}
                                        label="Report Category"
                                        placeholder="Select Category"
                                        status={submitError&&reportCategory===undefined?'danger':'basic'}
                                        selectedIndex={reportCategory || reportCategory===0?new IndexPath(reportCategory):undefined}
                                        value={reportCategory || reportCategory===0?ReportCategories[reportCategory]:undefined}
                                        onSelect={(value: IndexPath | IndexPath[])=>{setCategory(value);references.thirdInput?.focus()}}
                                        caption={submitError&&reportCategory===undefined?
                                            ()=>(<Text category="s2"
                                                    status='danger'>
                                                Please select a category
                                            </Text>)
                                            :""}>
                                        {ReportCategories.map((category: string, index) => (
                                            <SelectItem key={index} title={category} />
                                        ))}
                                    </Select>
                                    <Input
                                        ref={(ref)=>(references.thirdInput=ref)}
                                        value={reportDescription}
                                        onChangeText={value=>setReportDescription(value)}
                                        style={styles.inputMargins}
                                        label="Description"
                                        placeholder="Describe the issue you faced or any feedback in detail here."
                                        multiline={true}
                                        textStyle={{ minHeight: 100 }}
                                        status={submitError&&reportDescription.length===0?'danger':'basic'}
                                        captionIcon={submitError&&reportDescription.length===0?AlertIcon:undefined}
                                        caption={submitError&&reportDescription.length===0?
                                            ()=>(<Text category="s2"
                                                    status='danger'>
                                                Description cannot be empty
                                            </Text>)
                                            :""}/>
                                </Layout>
                                {genericError?
                                <Layout style={{flexDirection: "row", marginBottom: 10}}>
                                    <Layout style={{marginTop: 4, marginRight: 2}}>
                                        <AlertIcon />
                                    </Layout>
                                    <Text status='danger'>
                                        {genericError}
                                    </Text>
                                </Layout>:null}
                                <Button
                                    accessoryLeft={(props)=>{
                                        return submitLoading?
                                        (
                                            <View {...props}>
                                                <Spinner status='control' />
                                            </View>
                                        )
                                        :<View />
                                    }}
                                    onPress={()=>handleSubmitReport()}>
                                    {submitLoading?"":"Submit"}
                                </Button>
                            </KeyboardAvoidingView>                        
                        </Layout>
                    </Layout>
                    
                </ScrollView>
            </Layout>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 20,
        marginTop: 14,
        flex: 1
    },
    headerText: {
        alignSelf: "center",
        marginBottom: 20
    },
    inputMargins: {
        marginVertical: 12
    }
})

export default SubmitReportScreen