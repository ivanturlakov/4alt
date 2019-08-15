const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        _id: ID
        name: String
        email: String
        picture: String
    }

    type Item {
        _id: ID
        createdAt: String
        title: String
        description: String
        category: String
        price: String
        image: String
        author: User
        comments: [Comment]
    }

    type Comment {
        text: String
        createdAt: String
        author: User
    }

    input CreateItemInput {
        title: String
        image: String
        description: String
        category: String
        price: String
    }

    type Query {
        me: User
        getItems: [Item!]
    }

    type Mutation {
        createItem(input: CreateItemInput!): Item
        deleteItem(itemId: ID!): Item
        createComment(itemId: ID!, text: String!): Item
    }

    type Subscription {
        itemAdded: Item
        itemDeleted: Item
        itemUpdated: Item
    }

`