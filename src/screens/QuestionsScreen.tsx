import React from "react";
import { QuestionsScreenNavigationProp } from "../navigation/types";
import { ActiveQuestions, CompletedQuestions } from "../components/Questions"
import { Layout, Text, useStyleSheet, StyleService, TabView, Tab, IconProps, Icon, Modal, Card, Button, Divider } from "@ui-kitten/components";
import { TransparentBackHeader } from "../components/common";
import { ScrollView } from "react-native-gesture-handler";

type Props = QuestionsScreenNavigationProp;

const QuestionsScreen: React.FC<Props> = ({ navigation }) => {
  
  const styles = useStyleSheet(themedStyle);
  const [ selectedIndex, setSelectedIndex] = React.useState(0);
  const [ modalVisible, setModal ] = React.useState(false);

  return (
    <React.Fragment>
      <Layout style={styles.layoutHeader}>
        <Layout level='1'
          style={styles.headerItem}>
          <Icon height={30} width={30} fill='white' name="arrow-back"
          onPress={()=>navigation.goBack()}/>
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
          <ActiveQuestions/>
        </Tab>
        <Tab title='Completed'>
          <CompletedQuestions/>
        </Tab>
      </TabView>
      <Modal
        visible={modalVisible}
        backdropStyle={styles.modalBackdrop}
        onBackdropPress={()=>setModal(false)}>
        <Card disabled={true}>
          <Text style={{"textAlign": "justify"}}>
            Answering these questions help us gain a better understanding of you,
            and will greatly improve the results of our matching algorithm! You'll be
            able to be matched with complementing personalities and more meaningful interactions!
          </Text>
          <Divider />
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