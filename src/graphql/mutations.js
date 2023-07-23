import { gql } from '@apollo/client';

export const SIGN_IN=gql`
mutation ($credentials: AuthenticateInput){
  authenticate (credentials: $credentials){
    accessToken
  }
}`

export const CREATE_REVIEW=gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    text
    createdAt
    rating
  }
}`

export const CREATE_USER=gql`
mutation($user:CreateUserInput){
  createUser(user:$user) {
    username
    id
    reviewCount
    reviews {
      edges {
        node {
          createdAt                                                            id
        }
      }
    }
    createdAt
  }
  }`
   
  export const DELETE_REVIEW=gql`
  mutation($deleteReviewId: ID!){
    deleteReview(id: $deleteReviewId)
  }`