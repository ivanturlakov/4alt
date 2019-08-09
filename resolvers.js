const { AuthenticationError, PubSub } = require('apollo-server');
const Item = require('./models/Item');

const pubsub = new PubSub();
const ITEM_ADDED = "ITEM_ADDED";
const ITEM_DELETED = "ITEM_DELETED";
const ITEM_UPDATED = "ITEM_UPDATED";

const authenticated = next => (root, args, ctx, info) => {
    if(!ctx.currentUser) {
        throw new AuthenticationError('You must be logged in')
    }
    return next(root, args, ctx, info)
}

module.exports = {
    Query: {
        me: authenticated((root, args, ctx) => ctx.currentUser),
        getItems: async (root, args, ctx) => {
            const items = await Item.find({}).populate('author').populate('comments.author');
            return items
        }
    },

    Mutation: {
        createItem: authenticated(async (root, args, ctx) => {
            const newItem = await new Item({
                ...args.input,
                author: ctx.currentUser._id
            }).save()
            const itemAdded = await Item.populate(newItem, 'author');
            pubsub.publish(ITEM_ADDED, { itemAdded });
            return itemAdded
        }),
        deleteItem: authenticated(async (root, args, ctx) => {
            const itemDeleted = await Item.findOneAndDelete({ _id: args.itemId  }).exec();
            pubsub.publish(ITEM_DELETED, { itemDeleted });
            return itemDeleted
        }),
        createComment: authenticated(async (root, args, ctx) => {
            const newComment = { text: args.text, author: ctx.currentUser._id };
            const itemUpdated = await Item.findOneAndUpdate(
                { _id: args.itemId },
                { $push: { comments: newComment } },
                { new: true }
            ).populate('author').populate('comments.author');
            pubsub.publish(ITEM_UPDATED, { itemUpdated });
            return itemUpdated
        })
    },
    Subscription: {
        itemAdded: {
            subscribe: () => pubsub.asyncIterator(ITEM_ADDED)
        },
        itemDeleted: {
            subscribe: () => pubsub.asyncIterator(ITEM_DELETED)
        },
        itemUpdated: {
            subscribe: () => pubsub.asyncIterator(ITEM_UPDATED)
        }
    }
}