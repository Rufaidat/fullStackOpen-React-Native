import { gql } from '@apollo/client';


export const GET_REPOSITORIES=gql`
query($orderBy: AllRepositoriesOrderBy $orderDirection: OrderDirection $searchKeyword: String, $first:Int $after:String){
  repositories(orderBy: $orderBy orderDirection: $orderDirection searchKeyword: $searchKeyword first:$first after:$after ) {
   edges {
     node {
      id
      description
      forksCount
      stargazersCount
      reviewCount
      ratingAverage
      fullName
      ownerAvatarUrl
      language
     }cursor
   }
   pageInfo {
    endCursor
    startCursor
    hasNextPage
  }
  }
}`

export const GET_REPOSITORY=gql`
query($repositoryId: ID! $first:Int $after:String){
    repository(id: $repositoryId){
      id
      fullName
      forksCount
      ratingAverage
      reviewCount
      description
      ownerAvatarUrl
      language
      stargazersCount
      url
      reviews (first:$first after:$after ){
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
    }
}
`

export const ME= gql`
query getCurrentUser($includeReviews:Boolean=false ) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
     node {
       text
       createdAt
       rating
       id
       repository {
        fullName
        id
      }
     }
      }
    }
  }
}
`;





