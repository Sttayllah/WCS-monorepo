import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    // uri: "http://backend:5000/",
    // FOR TESTING SCRIPT integration-test
    uri: "http://localhost:5000/",
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
const randomEmail =
  "user" + Math.floor(Math.random() * 100).toString() + "@mail.com";

describe("User resolver", () => {
  it("create user", async () => {
    const res = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        email: randomEmail,
        password: "test",
        pseudo: "pseudo",
        avatar: "sdfhkqjloqsl",
        description: "jkfdhqsjklfhqlkfh",
      },
    });

    expect(res.data?.createUser).toEqual({
      __typename: "User",
      email: randomEmail,
      pseudo: "pseudo",
      avatar: "sdfhkqjloqsl",
      description: "jkfdhqsjklfhqlkfh",
    });
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
        email: randomEmail,
        password: "test",
        pseudo: "pseudo",
        avatar: "sdfhkqjloqsl",
        description: "jkfdhqsjklfhqlkfh",
      },
      fetchPolicy: "no-cache",
    });
    expect(JSON.parse(res.data?.getToken).token).toMatch(
      /^[\w-]*\.[\w-]*\.[\w-]*$/
    );
    // expect(res.data?.getToken).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
    token = res.data?.getToken;
  });
  //
  it("query user with the token", async () => {
    const res = await client.query({
      query: gql`
        query Query($email: String!) {
          getOneUser(email: $email) {
            email
            pseudo
            description
            avatar
          }
        }
      `,
      variables: { email: randomEmail },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          authorization: "Bearer " + token,
        },
      },
    });
    expect(res.data?.getOneUser).toEqual({
      __typename: "User",
      email: randomEmail,
      pseudo: "pseudo",
      avatar: "sdfhkqjloqsl",
      description: "jkfdhqsjklfhqlkfh",
    });
  });
});
