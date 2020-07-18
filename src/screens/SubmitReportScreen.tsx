import React, { useState } from 'react';
import { Layout, Text, Input, Select, SelectItem, IndexPath, Button } from '@ui-kitten/components';
import { KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import { SubmitReportNavigationProp } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransparentBackHeader } from '../components/common';

type Props = SubmitReportNavigationProp;

const ReportCategories = [
    "Feedback",
    "Report Issues"
]

const SubmitReportScreen: React.FC<Props> = ({ navigation }) => {
    
    const [reportTitle, setReportTitle] = useState<string>("");
    const [reportCategory, setReportCategory] = useState<number | undefined>();
    const [reportDescription, setReportDescription] = useState<string>("");

    const setCategory = (value: IndexPath | IndexPath[]) => {
        if (value instanceof IndexPath) {
            setReportCategory(value.row)
        }
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
                                Submitting Report
                            </Text>
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
                                        caption="e.g. App crashes when swiping" />
                                    <Select
                                        style={styles.inputMargins}
                                        label="Report Category"
                                        placeholder="Select Category"
                                        selectedIndex={reportCategory || reportCategory===0?new IndexPath(reportCategory):undefined}
                                        value={reportCategory || reportCategory===0?ReportCategories[reportCategory]:undefined}
                                        onSelect={setCategory}>
                                        {ReportCategories.map((category: string, index) => (
                                            <SelectItem key={index} title={category} />
                                        ))}
                                    </Select>
                                    <Input
                                        value={reportDescription}
                                        onChangeText={value=>setReportDescription(value)}
                                        style={styles.inputMargins}
                                        label="Description"
                                        placeholder="Describe the issue you faced or any feedback in detail here."
                                        multiline={true}
                                        textStyle={{ minHeight: 100 }}/>
                                </Layout>
                                <Button>
                                    Submit
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
        marginTop: 55,
        flex: 1
    },
    headerText: {
        alignSelf: "center"
    },
    inputMargins: {
        marginVertical: 15
    }
})

export default SubmitReportScreen