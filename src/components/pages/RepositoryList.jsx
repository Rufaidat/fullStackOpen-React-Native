import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "../molecules/RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import SearchBar from "../atoms/Searchbar";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 13,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  searchQuery,
  setSearchQuery,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      }
      renderItem={({ item, index }) => (
        <RepositoryItem key={index} repository={item} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("");
  const { repositories, loading, orderByFormatter, refetch, fetchMore } =
    useRepositories({ first: 3, orderBy });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue] = useDebounce(searchQuery, 500);

  const formattedOrderBy = orderByFormatter(orderBy);
  useEffect(() => {
    refetch({ ...formattedOrderBy });
  }, [orderBy]);
  useEffect(() => {
    refetch({ ...formattedOrderBy, searchKeyword: searchValue });
  }, [searchValue]);

  const onEndReach = () => {
    fetchMore();
  };
  return (
    <>
      {loading ? (
        ""
      ) : (
        <View>
          <View style={{ marginHorizontal: 20 }}>
            <Picker
              selectedValue={orderBy}
              onValueChange={(itemValue) => {
                setOrderBy(itemValue);
              }}
            >
              <Picker.Item value="" label="Select an item..." />
              <Picker.Item label="Latest repositories" value="default" />
              <Picker.Item label="Highest rated repositories" value="highest" />
              <Picker.Item label="Lowest rated repositories" value="lowest" />
            </Picker>
          </View>
          <RepositoryListContainer
            repositories={repositories}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onEndReach={onEndReach}
          />
        </View>
      )}
    </>
  );
};

export default RepositoryList;
