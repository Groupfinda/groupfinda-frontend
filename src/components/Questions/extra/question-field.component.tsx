import React, { ReactElement, useState } from 'react';
import { StyleSheet, ViewProps, View } from 'react-native'
import { Layout, Text, Radio, RadioGroup, Card, StyleService, useStyleSheet, Spinner } from '@ui-kitten/components';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_ANSWER } from '../../../graphql/mutations';

export interface QuestionFieldProps extends ViewProps {
    question: string,
    order: number,
    answer: number,
    setCompletedQuestions: any,
}

type submitQuestionType = {
    order: number,
    value: number
}

export const QuestionField = (props: QuestionFieldProps): ReactElement => {

    const styles = useStyleSheet(themedStyle)

    const { style, question, order, answer, setCompletedQuestions, ...layoutProps } = props;
    const [ selectedIndex, setSelectedIndex ] = useState<number>(props.answer);
    const [ submitLoading, setSubmitLoading ] = useState<boolean>(false);

    const Header = (): ReactElement => {
        return (
            <Layout style={styles.textContainer}>
                <Text status='control' category='h6'>{order+1}. {question}</Text>
            </Layout>
        )
    }

    const [ submitValue ] = useMutation<{ submitRangeQuestion: number[] }, submitQuestionType>(
        SAVE_ANSWER,
        {
            onCompleted: async (data) => {
                setSubmitLoading(false)
            }
        }
    )

    const changeAnswer = (index: number) => {
        if (index !== selectedIndex) {
            setSelectedIndex(index)
            setSubmitLoading(true)
            const variables: submitQuestionType = {
                order: order,
                value: index+1
            }
            submitValue({ variables })  
        }
    }

    return (
        <Layout style={styles.overallContainer}>
            {submitLoading?
            <Layout style={styles.loadingOverlay}>
                <Spinner style={{opacity: 1}}/>
            </Layout>:null}
            <Card header={() => Header()}
                style={styles.cardStyle}>
                <Layout
                    level='1'
                    style={styles.container}>
                    <Text>Inaccurate</Text>
                    <Text>Neutral</Text>
                    <Text>Accurate</Text>
                </Layout>
                <RadioGroup
                    testID="radio-group"
                    style={styles.container}
                    selectedIndex={selectedIndex}
                    onChange={index => changeAnswer(index)}>
                    <Radio
                        status='primary'/>
                    <Radio
                        status='primary'/>
                    <Radio
                        status='primary'/>
                    <Radio
                        status='primary'/>
                    <Radio
                        status='primary'/>
                </RadioGroup>
            </Card>
            
        </Layout>
    )
}

const themedStyle = StyleService.create({
    overallContainer: {
        marginVertical: 10,
        backgroundColor: "background-basic-color-3"
    },
    loadingOverlay: {
        position: "absolute",
        backgroundColor: "grey",
        borderRadius: 5,
        opacity: 0.8,
        width: "100%",
        height: "100%",
        zIndex: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    container: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "background-basic-color-2"
    },
    cardStyle: {
        backgroundColor: "background-basic-color-2"
    },
    textContainer: {
        padding: 20,
        backgroundColor: "color-primary-500"
    }
  }
);