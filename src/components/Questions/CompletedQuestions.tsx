import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Layout, useStyleSheet, StyleService, TabBar, Tab, TabView } from "@ui-kitten/components";
import { QuestionField } from "./extra/question-field.component"

const questions = [
    {
        "order": 1,
        "question": "I am a very proactive person",
        "answer": 4
    },
    {
        "order": 2,
        "question": "I dislike being the center of attention.",
        "answer": 2
    },
    {
        "order": 3,
        "question": "I spend alot of time thinking about my future",
        "answer": 4
    },
    {
        "order": 4,
        "question": "I daydream alot",
        "answer": 1
    },
    {
        "order": 5,
        "question": "Placeholder question",
        "answer": 3
    },
]

export default (): React.ReactElement => {
    const styles = useStyleSheet(themedStyle);

    return (
        <ScrollView>
            <Layout style={styles.layoutContainer}>
                {questions.map((question)=>{
                    return <QuestionField
                        key={question.order}
                        order = {question.order}
                        answer = {question.answer}
                        style={styles.questionField}
                        question={question.question}/>
                })}
            </Layout>
        </ScrollView>
    )
}

const themedStyle = StyleService.create({
    layoutContainer: {
        padding: 10,
        backgroundColor: 'background-basic-color-3',
    },
    questionField: {
        paddingVertical: 16,
        paddingHorizontal: 10
    }
})