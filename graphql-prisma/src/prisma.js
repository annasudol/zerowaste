import { Prisma } from 'prisma-binding';
const prisma = new Prisma({
    typeDefs: 'src/generated/schema.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'my-super-secret-secret'
})

// // Retrieve `name` of a specific user
// prisma.query.user(null, '{id name email recipes { id }}').then(data => console.log(data, "data"))

// // Retrieve `id` and `name` of all users
// prisma.query.users(null, '{ id name }')

// // Create new user called `Sarah` and retrieve the `id`
// prisma.mutation.createUser({ data: { name: 'Sarah' } }, '{ id }')

// // Update name of a specific user and retrieve the `id`
// prisma.mutation.updateUser({ where: { id: 'abc' }, data: { name: 'Sarah' } }, '{ id }')

// // Delete a specific user and retrieve the `id`
// prisma.mutation.deleteUser({ where: { id: 'abc' } }, '{ id }')