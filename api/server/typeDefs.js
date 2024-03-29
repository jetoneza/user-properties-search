import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    properties: [Property]
  }

  type Property {
    id: ID
    street: String
    city: String
    state: String
    zip: String
    rent: Float
    user: User
  }

  type Search {
    results: [Property]
    pagination: Pagination
  }

  type Pagination {
    rowCount: Int,
    pageCount: Int,
    page: Int,
    pageSize: Int,
  }

  type AutoCompleteSearch {
    users: [User]
    properties: [Property]
  }

  type Query {
    search(query: String, page: Int, pageSize: Int): Search
    autoCompleteSearch(query: String, limit: Int): AutoCompleteSearch
  }
`;

export default typeDefs;
