import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
query{
    repositories {
        edges {
          node {
            description
            forksCount
            stargazersCount
            reviewCount
            ratingAverage
            fullName
            ownerAvatarUrl
            language
          }
        }
      }
}
`;

export const GET_REPOSITORY=gql`
query($repositoryId: ID!){
    repository(id: $repositoryId){
      fullName
      forksCount
      ratingAverage
      reviewCount
      description
      ownerAvatarUrl
      language
      stargazersCount
    }
}
`
export const ME=gql`
query {
  me {
    id
    username
  }
}`


