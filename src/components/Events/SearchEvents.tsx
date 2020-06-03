import React, { useState } from "react";
import { ScrollView, Keyboard } from "react-native";
import {
  Layout,
  Input,
  IconElement,
  Icon,
  StyleService,
  useStyleSheet,
  Card,
  Button,
} from "@ui-kitten/components";
import { EventCard } from "./extra/event-card.component";
import { useQuery, useApolloClient, useLazyQuery } from "@apollo/react-hooks";
import { searchEventByTerm, upcomingEvents } from "../../graphql/queries";
import { Loading } from "../common";

const searchIcon = (): IconElement => {
  return <Icon width={20} height={20} fill="grey" name="search" />;
};

const filters = ["Sports", "Tech", "Music", "Dining", "Art"];

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [events, setEvents] = React.useState([]);

  const { loading, data, error } = useQuery(upcomingEvents, {
    onCompleted: (response) => {
      setEvents(response["searchEvent"]);
    },
  });

  const [executeSearch, { called }] = useLazyQuery(searchEventByTerm, {
    onCompleted: (response) => {
      setEvents(response["searchEvent"]);
    },
  });

  const handleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((x) => x !== filter));
    } else {
      setActiveFilters([filter, ...activeFilters]);
    }
  };

  const handleSearch = () => {
    executeSearch({ variables: { searchTerm: searchValue } });
    Keyboard.dismiss();
  };

  if (loading || !data) {
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
              placeholder="Search Events"
            />
            <Button
              appearance="ghost"
              style={{ paddingTop: 5 }}
              onPress={handleSearch}
            >
              Search
            </Button>
          </Layout>

          <Layout style={styles.filterContainer}>
            <Icon width={20} height={20} fill="grey" name="options-2" />
            <ScrollView
              horizontal={true}
              style={styles.filterScroll}
              showsHorizontalScrollIndicator={false}
            >
              <Button
                style={styles.buttonStyle}
                status={activeFilters.length === 0 ? "primary" : "basic"}
                appearance={activeFilters.length === 0 ? "filled" : "outline"}
                onPress={() => setActiveFilters([])}
              >
                All
              </Button>
              {filters.map((filter) => (
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
          ) : null}
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
  },
});
