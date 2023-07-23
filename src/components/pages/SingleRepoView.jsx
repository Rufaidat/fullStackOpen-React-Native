import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../../graphql/queries";
import { useParams } from "react-router-native";
import RepositoryItem from "../molecules/RepositoryItem";
import { FlatList } from "react-native";
import ReviewItem from "../molecules/ReviewItem";

const SingleRepoView = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { first: 1, repositoryId: id },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: id,
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  return (
    <>
      {!loading && (
        <FlatList
          data={data?.repository.reviews.edges}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => (
            <RepositoryItem repository={data.repository} toGithub />
          )}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      )}
    </>
  );
};
export default SingleRepoView;
