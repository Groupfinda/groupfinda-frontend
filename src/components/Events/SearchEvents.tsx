import React, { useState } from "react";
import { ScrollView, Keyboard } from "react-native";
import {
  Layout,
  Input,
  IconElement,
  Icon,
  StyleService,
  useStyleSheet,
  Button,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { EventCard } from "./extra/event-card.component";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { searchEventByTerm, upcomingEvents, searchEventType } from "../../graphql/queries";
import { Loading } from "../common";
import { TouchableOpacity } from "react-native-gesture-handler";
import { eventCategories } from "../../../utils/constants";

const searchIcon = (): IconElement => {
  return <Icon width={20} height={20} fill="grey" name="search" />;
};

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [events, setEvents] = useState([]);
  const [noResult, setNoResult] = useState<boolean>(false);

  const { loading, data, error } = useQuery(upcomingEvents, {
    onCompleted: (response) => {
      if (response['searchEvent'].length === 0) {
        setNoResult(true);
      } else{
        setNoResult(false);
      }
      setSearchResults(response['searchEvent']);
      setEvents(response["searchEvent"]);
    },
  });

  const [executeSearch, { called }] = useLazyQuery(searchEventByTerm, {
    onCompleted: (response) => {
      if (response["searchEvent"].length>0) {
        setSearchResults(response['searchEvent'])
        setEvents(response["searchEvent"].filter((event: searchEventType) => {
          if (activeFilters.length>0) {
            return event.category.filter(value => activeFilters.includes(value)).length>0
          }
          return true
        }));
      } else {
        setNoResult(true);
      }
    },
  });

  const handleFilter = (filter: string) => {
    setEvents([]);
    setNoResult(false);
    let currentFilters = activeFilters
    if (activeFilters.includes(filter)) {
      currentFilters = activeFilters.filter((x) => x !== filter)
    } else {
      currentFilters = [filter, ...activeFilters];
    }
    let currentEvents = searchResults
    if (currentFilters.length>0) {
      currentEvents = searchResults.filter((event: searchEventType) => {
        return event.category.filter(value => currentFilters.includes(value)).length>0
      })
    }
    if (currentEvents.length === 0) {
      setNoResult(true);
    }
    setEvents(currentEvents);
    setActiveFilters(currentFilters);
  };

  const handleSearch = () => {
    setEvents([]);
    setNoResult(false);
    executeSearch({ variables: { searchTerm: searchValue } });
    Keyboard.dismiss();
  };

  const clearSearchIcon = () => (
    <TouchableOpacity
      onPress={()=>{setSearchValue("")}}>
      <Icon width={23} height={23} fill="grey" name='close-outline'/>
    </TouchableOpacity>
  );

  const renderLoading = () => {
    if (noResult) {
      return (
      <ScrollView style={styles.cardScrollContainer}>
        <Layout style={styles.spinnerContainer}>
          <Text>
            No results found
          </Text>
        </Layout>  
      </ScrollView>)
    }
    return (
      <ScrollView style={styles.cardScrollContainer}>
        <Layout style={styles.spinnerContainer}>
          <Spinner size="large" />
        </Layout>
      </ScrollView>
    )
  }

  if (loading) {
    return (
      <Layout>
        <Loading visible />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Layout style={styles.layoutContainer}>
          <Layout style={styles.searchContainer}>
            <Input
              style={{ width: "77%" }}
              status="primary"
              value={searchValue}
              onChangeText={(value) => setSearchValue(value)}
              accessoryLeft={searchIcon}
              accessoryRight={clearSearchIcon}
              placeholder="Search Events"/>
            <Button
              appearance="ghost"
              style={{ paddingTop: 5 }}
              onPress={handleSearch}>
              Search
            </Button>
          </Layout>

          <Layout style={styles.filterContainer}>
            <Icon width={20} height={20} fill="grey" name="options-2" />
            <ScrollView
              horizontal={true}
              style={styles.filterScroll}
              showsHorizontalScrollIndicator={false}>
              <Button
                style={styles.buttonStyle}
                status={activeFilters.length === 0 ? "primary" : "basic"}
                appearance={activeFilters.length === 0 ? "filled" : "outline"}
                onPress={() => {setActiveFilters([]); if(events.length !== searchResults.length){setEvents(searchResults)}}}>
                All
              </Button>
              {eventCategories.map((filter) => (
                <Button
                  style={styles.buttonStyle}
                  key={filter}
                  status={activeFilters.includes(filter) ? "primary" : "basic"}
                  appearance={
                    activeFilters.includes(filter) ? "filled" : "outline"
                  }
                  onPress={() => handleFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </ScrollView>
          </Layout>
        </Layout>
        <Layout>
          {events.length > 0 ? (
            <ScrollView style={styles.cardScrollContainer}>
              <Layout style={styles.cardsContainer}>
                {events.map((event) => (
                  <EventCard key={event["id"]} event={event} />
                ))}
              </Layout>
            </ScrollView>
          ) : renderLoading()}
        </Layout>
      </Layout>
    );
  }
};

const themedStyle = StyleService.create({
  layoutContainer: {
    backgroundColor: "background-basic-color-3",
    paddingTop: 35,
  },
  searchContainer: {
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "background-basic-color-3",
  },
  filterScroll: {
    marginLeft: 9,
  },
  buttonStyle: {
    borderRadius: 100,
    marginRight: 5,
  },
  cardScrollContainer: {
    backgroundColor: "background-basic-color-3",
    marginBottom: 300,
  },
  cardsContainer: {
    padding: 15,
    backgroundColor: "background-basic-color-2",
    borderRadius: 30,
    paddingBottom: 80,
  },
  spinnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 120,
  },
});
