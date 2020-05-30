import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { upcomingEvents } from "../graphql/queries"
import { SearchEvents } from "../components/Events"
import { Loading } from "../components/common";

type Props = {};

const SearchScreen: React.FC<Props> = (props) => {

    return (
      <SearchEvents/>
    )

  
};

const styles = StyleSheet.create({});

export default SearchScreen;
