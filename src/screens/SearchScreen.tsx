import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { upcomingEvents } from "../graphql/queries"
import { SearchEvents } from "../components/Events"
import { Loading } from "../components/common";

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
        <Loading visible={true}/>
      </Layout>
    );
  } else {
    return (
        <SearchEvents events={events}/>
    )
  }

  
};

const styles = StyleSheet.create({});

export default SearchScreen;
