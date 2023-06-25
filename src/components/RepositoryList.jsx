import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 13,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading } = useRepositories();
  return (
    <>
      {loading ? (
        ""
      ) : (
        <FlatList
          data={data.repositories.edges}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item, index }) => (
            <RepositoryItem key={index} repository={item.node} />
          )}
        />
      )}
    </>
  );
};

export default RepositoryList;
