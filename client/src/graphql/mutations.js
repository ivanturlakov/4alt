export const CREATE_ITEM_MUTATION = `
    mutation(
        $title: String!,
        $image: String!,
        $description: String!,
        $category: String!
    ) {
        createItem(input: {
            title: $title,
            image: $image,
            description: $description,
            category: $category
        }) {
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
        }
    }
`;

export const DELETE_ITEM_MUTATION = `
    mutation($itemId: ID!) {
        deleteItem(itemId: $itemId) {
            _id
        }
    }
`;

export const CREATE_COMMENT_MUTATION = `
    mutation($itemId: ID!, $text: String!) {
        createComment(itemId: $itemId, text: $text) {
            _id
            createdAt
            title
            description
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
`