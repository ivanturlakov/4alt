export const ME_QUERY = `
  {
    me {
      _id
      email
      name
      picture
    }
  }
`;

export const GET_ITEMS_QUERY = `
  {
    getItems {
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
          _id
          name
          picture
        }
      }
    }
  }
`