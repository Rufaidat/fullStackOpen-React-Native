import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({orderBy,searchKeyword,first}) => {
const orderByFormatter=(orderBy)=>{
  switch (orderBy) {
    case "highest":
      orderBy = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      break;
    case "lowest":
      orderBy = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      break;
    default:
      orderBy = { orderBy: "CREATED_AT", orderDirection: "DESC" };
  }
  return orderBy
}
orderByFormatter(orderBy)
const { data,loading, refetch,fetchMore, ...result} = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network',
    variables:{
      ...orderBy,
      searchKeyword,
      first,
    },
})
const handleFetchMore = () => {
  const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

  if (!canFetchMore) {
    return;
  }

 console.log( fetchMore({
  variables: {
    after: data.repositories.pageInfo.endCursor,
    ...orderBy,
    searchKeyword,
    first:3
  },
}));
};

return {
  repositories: data?.repositories,
  fetchMore: handleFetchMore,
  orderByFormatter,
  loading,
  refetch,
  ...result,
};
};

export default useRepositories;