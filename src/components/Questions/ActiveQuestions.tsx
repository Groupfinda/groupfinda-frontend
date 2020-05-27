import React from "react";
import { ScrollView, View } from "react-native";
import { QuestionCard } from './extra/question-card.component'
import { Layout, StyleService, useStyleSheet, Button, Text, Icon, IconElement } from "@ui-kitten/components";

const questions = [
    {
        order: 15,
        question: "I am an efficient person"
    },
    {
        order: 16,
        question: "I enjoy being in the company of others"
    },
    {
        order: 17,
        question: "I love seeking out new adventures"
    }
]

export default (): React.ReactElement => {

    const styles = useStyleSheet(themedStyle)
    const [ currentIndex, setIndex ] = React.useState(0);
    const [ selectedIndex, setSelectedIndex ] = React.useState(0);

    const handleSubmit = () => {
        // post here, await response then go to next question
        // console.log(selectedIndex)
        // console.log(questions[currentIndex].order)
        if (currentIndex + 1 < questions.length) {
            setIndex(currentIndex + 1)
            setSelectedIndex(0)
        }
    }

    const skipQuestion = () => {
        setIndex(currentIndex + 1)
        setSelectedIndex(0)
    }

    const previousQuestion = () => {
        setIndex(currentIndex - 1)
        setSelectedIndex(0)
    }

    return (
        <ScrollView style={styles.container}>
            <Layout style={styles.cardContainer}>
               <QuestionCard
                    order={questions[currentIndex].order}
                    question={questions[currentIndex].question}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}/>
                <Button
                    status='success'
                    disabled={selectedIndex<1||selectedIndex>5}
                    style={styles.buttonStyle}
                    onPress={handleSubmit}>
                    Save Answer
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
                        status='control'>{questions[currentIndex].order}/50</Text>
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