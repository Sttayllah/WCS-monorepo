import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://backend:5000/",
    fetch,
  }),
  cache: new InMemoryCache(),
});

const CREATE_USER = gql`
  mutation Mutation(
    $password: String!
    $email: String!
    $pseudo: String!
    $avatar: String!
    $description: String!
  ) {
    createUser(
      pseudo: $pseudo
      password: $password
      email: $email
      avatar: $avatar
      description: $description
    ) {
      email
      pseudo
      description
      avatar
    }
  }
`;

describe("User resolver", () => {
  it("create user", async () => {
    const res = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        email: "test",
        password: "test",
        pseudo: "pseudo",
        avatar: "sdfhkqjloqsl",
        description: "jkfdhqsjklfhqlkfh",
      },
    });

    expect(res.data?.createUser).toEqual({ __typename: "User", email: "test" });
  });

  let token: string;

  it("gets token if user is valid", async () => {
    const res = await client.query({
      query: gql`
        query Query($password: String!, $email: String!) {
          getToken(password: $password, email: $email)
        }
      `,
      variables: {
        email: "test",
        password: "test",
        pseudo: "pseudo",
        avatar: "sdfhkqjloqsl",
        description: "jkfdhqsjklfhqlkfh",
      },
      fetchPolicy: "no-cache",
    });
    expect(res.data?.getToken).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);

    token = res.data?.getToken;
  });

  it("query wilder with the token", async () => {
    const res = await client.query({
      query: gql`
        query Query($email: String!) {
          getOne(email: $email) {
            email
            pseudo
            description
            avatar
          }
        }
      `,
      variables: { password: "test", email: "test" },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          authorization: "Bearer " + token,
        },
      },
    });
    expect(res.data?.getOne).toEqual([]);
  });
});
