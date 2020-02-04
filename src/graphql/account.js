import { gql } from 'apollo-server';
import { DateTimeMock, EmailAddressMock } from 'graphql-scalars';

const typeDefs = gql`
    scalar DateTimeMock
    scalar EmailAddressMock
    
    type Account {
        userId: Int!
        email: String!
        createdAt: DateTimeMock!
        updatedAt: DateTimeMock
        profile: Profile!
    }
    type Profile {
        userId: Int!
        firstName: String!
        lastName: String!
        middleName: String
        createdAt: DateTimeMock!
        updatedAt: DateTimeMock
    }
    input CreateAccountInput {
        email: EmailAddressMock!
        password: String
        firstName: String!
        lastName: String!
        middleName: String
    }
    extend type Mutation {
        addAccountWithProfile(info: CreateAccountInput!): Account!
    }
    extend type Query {
        allAccounts: [Account]!
    }
`;

const resolvers = {
    DateTimeMock,
    EmailAddressMock,
    Account: {
      async profile(account, __, { services }) {
          return services.account.findProfile(account.userId);
      },
    },
    Mutation: {
      async addAccountWithProfile(_, { info }, { services }) {
          return services.account.addAccount(info);
      },
    },
    Query: {
        async allAccounts(_, __, { services }) {
            return services.account.findAll();
        }
    },
};

export default {typeDefs, resolvers};

