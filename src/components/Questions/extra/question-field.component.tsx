import React, { ReactElement } from 'react';
import { StyleSheet, ViewProps, View } from 'react-native'
import { Layout, Text, Radio, RadioGroup, Card, StyleService, useStyleSheet } from '@ui-kitten/components';

export interface QuestionFieldProps extends ViewProps {
    question: string,
    order: number,
    answer: number
}

export const QuestionField = (props: QuestionFieldProps): ReactElement => {

    const styles = useStyleSheet(themedStyle)

    const { style, question, order, answer, ...layoutProps } = props;
    const [selectedIndex, setSelectedIndex] = React.useState(props.answer);

    const Header = (): ReactElement => {
        return (
            <Layout style={styles.textContainer}>
                <Text status='control' category='h6'>{order}. {question}</Text>
            </Layout>
        )
    }

    const changeAnswer = (index: number) => {
        if (index !== selectedIndex) {
            setSelectedIndex(index)
        }
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

const themedStyle = StyleService.create({
    container: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "background-basic-color-2"
    },
    cardStyle: {
        marginVertical: 10,
        backgroundColor: "background-basic-color-2"
    },
    textContainer: {
        padding: 20,
        backgroundColor: "color-primary-500"
    }
  }
);