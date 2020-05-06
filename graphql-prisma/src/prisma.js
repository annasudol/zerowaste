import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index'
const prisma = new Prisma({
    typeDefs: 'src/generated/schema.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'supersecrettext',
    // fragmentReplacements
});

export { prisma as default }

// const userExists = prisma.$exists.users({
//     id: 'ck9u66puc00sj0838dgnq1rwu',
// });
// prisma.exists.Recipe({
//     id: "ck9va2iew000v0738fkhmyfbp",
//     author: {
//         id: "ck9u8s20r00ze0838sqj0z8fh"
//     }
// }).then(res => console.log(res, "res"))