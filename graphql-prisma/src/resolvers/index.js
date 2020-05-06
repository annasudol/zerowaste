import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import User from './User'
import Recipe from './Recipe'
import Comment from './Comment'
// import { extractFragmentReplacements } from 'prisma-binding'


const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Recipe,
    Comment
}

// const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers }