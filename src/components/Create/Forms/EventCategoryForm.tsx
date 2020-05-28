import React, { useState } from "react";
import {
  Layout,
  Text,
  Icon,
  IconProps,
  Select,
  SelectItem,
  IndexPath,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { FormProps } from "./types";
import Pill from "../../common/Pill";

const PeopleIcon = (props: IconProps) => <Icon {...props} name="people" />;

const sizes = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const defaultCategories = ["Fun", "Tech", "Sports", "DIY", "Games"];
defaultCategories.sort();

const EventCategoryForm: React.FC<FormProps> = (props) => {
  const { variables, modifyVariable, nextPage, prevPage } = props;
  const { groupSize, category } = variables;
  const setGroupSize = modifyVariable("groupSize");
  const setCategory = modifyVariable("category");

  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(sizes.indexOf(groupSize))
  );

  const [autocomplete, setAutocomplete] = useState<string>("");

  const filteredCategories = defaultCategories.filter(
    (cat) => !category.includes(cat)
  );
  const finalCategories = filteredCategories.filter((cat) =>
    cat.includes(autocomplete)
  );

  const onSelectChange = (index: IndexPath | IndexPath[]) => {
    setSelectedIndex(index);
    setGroupSize(sizes[(index as IndexPath).row]);
  };

  const onSelectAutoComplete = (option: number) => {
    const newCategory = [...category, finalCategories[option]];
    setCategory(newCategory);
    setAutocomplete("");
  };

  const deleteCategory = (text: string) => () => {
    const newCategory = category.filter((cat) => cat !== text);
    setCategory(newCategory);
  };
  const renderAutocompleteOption = (item: string, index: number) => (
    <AutocompleteItem key={index} title={item} />
  );
  return (
    <Layout style={styles.container}>
      <Layout style={styles.section}>
        <Text style={styles.subheading} appearance="hint" category="h5">
          List out some categories that describe your event!
        </Text>
        <Autocomplete
          placeholder="Write some categories"
          value={autocomplete}
          onChangeText={setAutocomplete}
          onSelect={onSelectAutoComplete}
        >
          {finalCategories.map(renderAutocompleteOption)}
        </Autocomplete>
        <Layout style={styles.pills}>
          {category.map((text) => (
            <Pill onPress={deleteCategory(text)} key={text} text={text} />
          ))}
        </Layout>
      </Layout>
      <Layout style={styles.section}>
        <Text style={styles.subheading} appearance="hint" category="h5">
          What size should groups be?
        </Text>
        <Select
          label="Group size"
          selectedIndex={selectedIndex}
          onSelect={onSelectChange}
          value={groupSize}
          accessoryRight={PeopleIcon}
        >
          {sizes.map((size) => (
            <SelectItem key={size} title={size} />
          ))}
        </Select>
      </Layout>
      <Layout style={styles.pageNav}>
        <Button onPress={prevPage}>Prev</Button>
        <Layout style={styles.spacer} />
        <Button onPress={nextPage}>Next</Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  subheading: {
    marginBottom: 20,
  },
  titleStyle: {
    marginBottom: 35,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  section: {
    marginVertical: 15,
  },

  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pageNav: {
    flexDirection: "row",
    marginTop: 20,
  },
  spacer: {
    flex: 1,
  },
});
export default EventCategoryForm;
