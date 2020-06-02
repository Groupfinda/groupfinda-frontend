import React, { ReactElement } from 'react';
import { Card, Layout, Text, useStyleSheet, StyleService, Button, List, ListItem, Icon, IconElement, Divider } from '@ui-kitten/components';

interface QuestionCardProps {
    order: number,
    question: string,
    selectedValue: number,
    setSelectedValue: any
}

export const QuestionCard = (props: QuestionCardProps): ReactElement => {
    
    const styles = useStyleSheet(themedStyle)
    const { order, question, selectedValue, setSelectedValue } = props;

    const handlePress = (index: number) => {
        if (selectedValue === index) {
            setSelectedValue(0)
        } else {
            setSelectedValue(index)
        }
    }

    return (
        <Card
            style={styles.cardHeader}
            disabled={true}
            footer={()=>(
                <Layout style={styles.answerContainer}>
                    <Divider />
                    <ListItem
                        style={selectedValue===1?styles.listItemStyle:null}
                        onPress={()=>handlePress(1)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedValue===1?null:styles.textStyle}
                            status={selectedValue===1?'control':'basic'}>
                            Accurate
                        </Text>
                    </ListItem>
                    <Divider />
                    <ListItem
                        style={selectedValue===2?styles.listItemStyle:null}
                        onPress={()=>handlePress(2)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedValue===2?null:styles.textStyle}
                            status={selectedValue===2?'control':'basic'}>
                            Slightly Accurate
                        </Text>
                    </ListItem>
                    <Divider />
                    <ListItem
                        style={selectedValue===3?styles.listItemStyle:null}
                        onPress={()=>handlePress(3)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedValue===3?null:styles.textStyle}
                            status={selectedValue===3?'control':'basic'}>
                            Neutral
                        </Text>
                    </ListItem>
                    <Divider />
                    <ListItem
                        style={selectedValue===4?styles.listItemStyle:null}
                        onPress={()=>handlePress(4)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedValue===4?null:styles.textStyle}
                            status={selectedValue===4?'control':'basic'}>
                            Slightly Inaccurate
                        </Text>
                    </ListItem>
                    <Divider />
                    <ListItem
                        style={selectedValue===5?styles.listItemStyle:null}
                        onPress={()=>handlePress(5)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedValue===5?null:styles.textStyle}
                            status={selectedValue===5?'control':'basic'}>
                            Inaccurate
                        </Text>
                    </ListItem>
                    <Divider />
                </Layout>
            )}>
            <Layout>
                <Text status='control' style={styles.cardHeader} category='h6'>
                    {order}. {question}
                </Text>
            </Layout>
        </Card>
    )
};

const CheckmarkIcon = (): IconElement => {
    return (
        <Icon
            width={20}
            height={20}
            fill='white'
            name='checkmark'/>
    )
}

const themedStyle = StyleService.create({
    cardHeader: {
        backgroundColor: 'color-primary-600'
    },
    answerContainer: {
        backgroundColor: 'color-primary-100'
    },
    listItemStyle: {
        backgroundColor: 'color-primary-400',
        color: 'white'
    },
    textStyle: {
        color: "color-primary-700"
    }
})