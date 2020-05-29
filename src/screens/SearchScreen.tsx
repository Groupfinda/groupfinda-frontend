import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { upcomingEvents } from "../graphql/queries"
import { SearchEvents } from "../components/Events"

type Props = {};

const SearchScreen: React.FC<Props> = (props) => {

  const [events, setEvents] = React.useState([]);

  const { loading, data, error } = useQuery(upcomingEvents, {
    onCompleted: (events) => {
      setEvents(events['searchEvent'])
    }
  })

  if (loading || !data || events.length===0) {
    return (
      <Layout>
        <Text category="h1">This should be SearchScreen</Text>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <SearchEvents events={events}/>
      </Layout>
    )
  }

  
};

const styles = StyleSheet.create({});

export default SearchScreen;
