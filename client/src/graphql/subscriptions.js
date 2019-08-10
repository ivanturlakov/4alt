import gql from "graphql-tag";

export const ITEM_ADDED_SUBSCRIPTION = gql`
    subscription {
        itemAdded {
            _id
            createdAt
            title
            image
            description
            category
            author {
                _id
                name
                email
                picture
            }
            comments {
                text
                createdAt
                author {
                    name
                    picture
                }
            }
        }
    }
`;

export const ITEM_UPDATED_SUBSCRIPTION = gql`
    subscription {
        itemUpdated {
            _id
            createdAt
            title
            description
            category
            image
            author {
                _id
                name
            }
            comments {
                text
                createdAt
                author {
                    name
                    picture
                }
            }
        }
    }
`;

export const ITEM_DELETED_SUBSCRIPTION = gql`
    subscription {
        itemDeleted {
            _id
        }
    }
`;