import React, { ReactElement } from 'react';
import { Card, Layout, Text, useStyleSheet, StyleService, Button, List, ListItem, Icon, IconElement, Divider } from '@ui-kitten/components';

interface QuestionCardProps {
    order: number,
    question: string,
    selectedIndex: number,
    setSelectedIndex: any
}

export const QuestionCard = (props: QuestionCardProps): ReactElement => {
    
    const styles = useStyleSheet(themedStyle)
    const { order, question, selectedIndex, setSelectedIndex } = props;

    const handlePress = (index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(0)
        } else {
            setSelectedIndex(index)
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
                        style={selectedIndex===1?styles.listItemStyle:null}
                        onPress={()=>handlePress(1)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedIndex===1?null:styles.textStyle}
                            status={selectedIndex===1?'control':'basic'}>
                            Accurate
                        </Text>
                    </ListItem>
                    <Divider />
                    <ListItem
                        style={selectedIndex===2?styles.listItemStyle:null}
                        onPress={()=>handlePress(2)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedIndex===2?null:styles.textStyle}
                            status={selectedIndex===2?'control':'basic'}>
                            Slightly Accurate
                        </Text>
                    </ListItem>
                    <Divider />
                    <ListItem
                        style={selectedIndex===3?styles.listItemStyle:null}
                        onPress={()=>handlePress(3)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedIndex===3?null:styles.textStyle}
                            status={selectedIndex===3?'control':'basic'}>
                            Neutral
                        </Text>
                    </ListItem>
                    <Divider />
                    <ListItem
                        style={selectedIndex===4?styles.listItemStyle:null}
                        onPress={()=>handlePress(4)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedIndex===4?null:styles.textStyle}
                            status={selectedIndex===4?'control':'basic'}>
                            Slightly Inaccurate
                        </Text>
                    </ListItem>
                    <Divider />
                    <ListItem
                        style={selectedIndex===5?styles.listItemStyle:null}
                        onPress={()=>handlePress(5)}>
                        <CheckmarkIcon/>
                        <Text
                            style={selectedIndex===5?null:styles.textStyle}
                            status={selectedIndex===5?'control':'basic'}>
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