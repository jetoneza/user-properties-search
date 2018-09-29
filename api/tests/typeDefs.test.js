import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} from 'graphql-tools';

import typeDefs from '../server/typeDefs';

describe('Test typeDefs', () => {
  const mockSchema = makeExecutableSchema({ typeDefs });
  const testMockServer = mockServer(mockSchema);

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      ID: () => '1',
      Float: () => 100.50,
      String: () => 'San francisco',
      Property: () => ({
        city: 'San Francisco',
        state: 'California',
        street: 'Groove Street',
        zip: '12345',
      }),
      User: () => ({
        firstName: 'John',
        lastName: 'Doe',
      })
    }
  });

  test(`query: search should return list of properties`, async () => {
    const query = `
      {
        search(query: "san") {
          id
          street
          city
          state
          zip
          rent
          user {
            id
            firstName
            lastName
          }
        }
      }
    `;

    const expected = {
      data: {
        search: [
          {
            id: "1",
            city: 'San Francisco',
            state: 'California',
            street: 'Groove Street',
            zip: '12345',
            rent: 100.5,
            user: {
              id: "1",
              firstName: 'John',
              lastName: 'Doe',
            }
          },
          {
            id: "1",
            city: 'San Francisco',
            state: 'California',
            street: 'Groove Street',
            zip: '12345',
            rent: 100.5,
            user: {
              id: "1",
              firstName: 'John',
              lastName: 'Doe',
            }
          }
        ]
      }
    };

    const result = await testMockServer.query(query);

    expect(result).toEqual(expected);
  });
});