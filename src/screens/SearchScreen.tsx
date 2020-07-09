import React from "react";

import { SearchEvents } from "../components/Events"
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {};

const SearchScreen: React.FC<Props> = (props) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchEvents />
    </SafeAreaView>

  )


};

export default SearchScreen;
