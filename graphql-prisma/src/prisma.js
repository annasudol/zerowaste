import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index'
const prisma = new Prisma({
    typeDefs: 'src/generated/schema.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'supersecrettext',
    // fragmentReplacements
});

export { prisma as default }
