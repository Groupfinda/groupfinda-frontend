import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { QuestionCard } from './extra/question-card.component'
import { Layout, StyleService, useStyleSheet, Button, Text, Icon, IconElement, Spinner } from "@ui-kitten/components";
import { QuestionType } from "../types"
import { useMutation } from "@apollo/react-hooks";
import { SAVE_ANSWER } from "../../graphql/mutations";

type Props = {
    questions: QuestionType[],
    completedQuestions: QuestionType[],
    setCompletedQuestions: any
}
type submitQuestionType = {
    order: number,
    value: number
}


export default (props: Props): React.ReactElement => {

    const styles = useStyleSheet(themedStyle)
    let { questions, completedQuestions, setCompletedQuestions } = props;
    const [ currentIndex, setIndex ] = useState<number>(0);
    const [ selectedValue, setSelectedValue ] = useState<number>(questions[0].value);
    const [ submitLoading, setSubmitLoading ] = useState<boolean>(false);

    const [ submitValue ] = useMutation<{ submitRangeQuestion: number[] }, submitQuestionType>(
        SAVE_ANSWER,
        {
            onCompleted: async (data) => {
                questions[currentIndex].value = selectedValue
                const currentCompletedOrders = completedQuestions.map((question: QuestionType)=>question.order)
                if (currentCompletedOrders.includes(questions[currentIndex].order)) {
                    completedQuestions = completedQuestions.filter((question: QuestionType)=>question.order!==questions[currentIndex].order)
                }
                completedQuestions.push({
                    order: questions[currentIndex].order,
                    value: selectedValue,
                    content: questions[currentIndex].content
                })
                completedQuestions.sort((a:QuestionType,b:QuestionType)=>{
                    if (a.order < b.order) return -1;
                    if (a.order > b.order) return 1;
                    return 0;
                })
                setCompletedQuestions(completedQuestions)
                setSubmitLoading(false)
                if (currentIndex + 1 < questions.length) {
                    skipQuestion()
                }
            }
        }
    )

    const handleSubmit = () => {
        const variables: submitQuestionType = {
            order: questions[currentIndex].order,
            value: selectedValue
        }
        setSubmitLoading(true)
        submitValue({ variables })
    }

    const skipQuestion = () => {
        setSelectedValue(questions[currentIndex+1].value)
        setIndex(currentIndex + 1)
    }

    const previousQuestion = () => {
        setSelectedValue(questions[currentIndex-1].value)
        setIndex(currentIndex - 1)
    }

    return (
        <ScrollView style={styles.container}>
            <Layout style={styles.cardContainer}>
               <QuestionCard
                    order={questions[currentIndex].order+1}
                    question={questions[currentIndex].content}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}/>
                <Button
                    status='success'
                    disabled={selectedValue<1||selectedValue>5||selectedValue===questions[currentIndex].value||submitLoading}
                    style={styles.buttonStyle}
                    onPress={handleSubmit}
                    accessoryLeft={(props)=>{return submitLoading?<View {...props}><Spinner/></View>:<View></View>}}>
                    {submitLoading?"":"Save Answer"}
                </Button>
            </Layout>
            <Layout style={styles.skipContainer}>
                <Layout level='1'>
                    <Button
                        style={{"width": 100}}
                        accessoryLeft={BackIcon}
                        status='primary'
                        onPress={()=>previousQuestion()}
                        disabled={currentIndex<=0}>Previous</Button>
                </Layout>
                <Layout level='2' style={styles.numberContainer}>
                    <Text appearance='alternative'
                        status='control'>{currentIndex+1}/{questions.length}</Text>
                </Layout>
                <Layout level='3'>
                    <Button
                        style={{"width": 100}}
                        accessoryRight={NextIcon}
                        status='primary'
                        onPress={()=>skipQuestion()}
                        disabled={!(currentIndex + 1 < questions.length)}>
                        Skip
                    </Button>
                </Layout>
            </Layout>
        </ScrollView>
    )
};

const BackIcon = (): IconElement => {
    return (
        <Icon
            width={18}
            height={18}
            fill='white'
            name='arrow-ios-back'/>
    )
}

const NextIcon = (): IconElement => {
    return (
        <Icon
            width={18}
            height={18}
            fill='white'
            name='arrow-ios-forward'/>
    )
}

const themedStyle = StyleService.create({
    container: {
        backgroundColor: "background-basic-color-3"
    },
    cardContainer: {
        padding: 10,
        backgroundColor: "background-basic-color-3"
    },
    buttonStyle: {
        marginTop: 15
    },
    skipContainer: {
        padding: 15,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    numberContainer: {
        padding: 10,
        backgroundColor: "color-primary-default",
        borderRadius: 8,
        textAlign: "center"
    }
})