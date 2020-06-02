import React from "react";
import { QuestionsScreenNavigationProp } from "../navigation/types";
import { ActiveQuestions, CompletedQuestions } from "../components/Questions"
import { Layout, Text, useStyleSheet, StyleService, TabView, Tab, Icon, Modal, Card, Button, Divider } from "@ui-kitten/components";
import { Loading } from "../components/common";
import { getUserQuestions } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { QuestionType } from "../components/types"

type Props = QuestionsScreenNavigationProp;

const QuestionsScreen: React.FC<Props> = ({ navigation }) => {
  
  const styles = useStyleSheet(themedStyle);
  const [ selectedIndex, setSelectedIndex] = React.useState(0);
  const [ modalVisible, setModal ] = React.useState(false);
  const [ completedQuestions, setCompletedQuestions ] = React.useState<QuestionType[]>([]);
  const [ activeQuestions, setActiveQuestions ] = React.useState<QuestionType[]>([]);
  const [ loadingQuestions, setLoadingQuestion ] = React.useState<boolean>(true);

  const { loading, data, error } = useQuery(getUserQuestions, {
    onCompleted: (response) => {
      const answers = response['getUserProfile']['rangeQuestions']
      let newQuestions: QuestionType[] = []
      let oldQuestions: QuestionType[] = []
      for (let question of response['getAllRangeQuestions']) {
        const order = question['order']
        if (answers[order] === 0) {
          newQuestions.push({value: answers[order], ...question})
        } else {
          oldQuestions.push({value: answers[order], ...question})
        }
      }
      setActiveQuestions(newQuestions)
      setCompletedQuestions(oldQuestions)
      setLoadingQuestion(false)
    },
    onError: (err) => {
      console.log(err)
    },
    fetchPolicy: "no-cache"
  })

  if (loading) {
    return <Loading visible />;
  }

  return (
    <React.Fragment>
      <Layout style={styles.layoutHeader}>
        <Layout level='1'
          style={styles.headerItem}>
          <Icon height={30} width={30} fill='white' name="arrow-back"
          onPress={()=>navigation.pop()}/>
        </Layout>
        <Layout level='2'
          style={styles.headerItem}>
            <Text category='h5' style={{"textAlign": "center"}} status='control'>Questionnaire</Text>
        </Layout>
        <Layout level='3'
          style={styles.headerItem}>
            <Icon height={30} width={30} fill='white' name="info-outline"
            onPress={()=>setModal(!modalVisible)}/>
        </Layout>
      </Layout>
      <Layout>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title='Active'>
          {loadingQuestions?
          <Loading visible/>:
          <ActiveQuestions questions={activeQuestions} completedQuestions={completedQuestions} setCompletedQuestions={setCompletedQuestions}/>}
        </Tab>
        <Tab title='Completed'>
          {loadingQuestions?
          <Loading visible/>:
          <CompletedQuestions questions={completedQuestions} setCompletedQuestions={setCompletedQuestions}/>}
        </Tab>
      </TabView>
      <Modal
        visible={modalVisible}
        backdropStyle={styles.modalBackdrop}
        onBackdropPress={()=>setModal(false)}>
        <Card disabled={true}>
          <Text style={{"textAlign": "center"}}>
            Answering these questions help us gain a better understanding of you,
            and will greatly improve the results of our matching algorithm! You'll be
            able to be matched with complementing personalities and more meaningful interactions!
          </Text>
          <Divider style={{marginVertical: 10}} />
          <Button
            onPress={()=>setModal(false)}>Got it!</Button>
        </Card>
      </Modal>
      </Layout>
    </React.Fragment>
  );
};

const themedStyle = StyleService.create({
  layoutHeader: {
    paddingTop: 35,
    paddingBottom: 18,
    backgroundColor: "color-primary-600",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerItem: {
    backgroundColor: "transparent",
    paddingHorizontal: 10
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
})

export default QuestionsScreen;