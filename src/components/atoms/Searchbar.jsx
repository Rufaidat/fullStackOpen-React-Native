import { Pressable, TextInput } from "react-native";
import { StyleSheet, View } from "react-native";
import { Iconify } from "react-native-iconify";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 5,
    flexGrow: 1,
  },
});

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <Iconify icon="heroicons:magnifying-glass-20-solid" size={24} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={(e) => setSearchQuery(e)}
        value={searchQuery}
      />
      <Pressable onPress={() => setSearchQuery("")}>
        <Iconify icon="heroicons:x-mark" size={24} />
      </Pressable>
    </View>
  );
};

export default SearchBar;
