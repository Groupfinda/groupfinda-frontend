import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, useStyleSheet, StyleService, TabBar, Tab, TabView } from "@ui-kitten/components";
import { QuestionField } from "./extra/question-field.component"
import { QuestionType } from "../types";

type Props = {
    questions: QuestionType[],
    setCompletedQuestions: any
}

export default (props: Props): React.ReactElement => {
    const styles = useStyleSheet(themedStyle);
    let { questions, setCompletedQuestions } = props

    return (
        <ScrollView style={styles.scrollContainer}>
            <Layout style={styles.layoutContainer}>
                {questions.map((question)=>{
                    return <QuestionField
                        setCompletedQuestions={setCompletedQuestions}
                        key={question.order}
                        order={question.order}
                        answer={question.value-1}
                        style={styles.questionField}
                        question={question.content}/>
                })}
            </Layout>
        </ScrollView>
    )
}

const themedStyle = StyleService.create({
    scrollContainer: {
        paddingBottom: 100,
        backgroundColor: 'background-basic-color-3'
    },
    layoutContainer: {
        padding: 10,
        paddingBottom: 230,
        backgroundColor: 'background-basic-color-3',
    },
    questionField: {
        paddingVertical: 16,
        paddingHorizontal: 10
    }
})