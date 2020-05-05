import { Prisma } from 'prisma-binding';
const prisma = new Prisma({
    typeDefs: 'src/generated/schema.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'supersecrettext'
});

export { prisma as default }


const createRecipeForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if (!userExists) {
        throw new Error('User not found')
    }

    const recipe = await prisma.mutation.createRecipe({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email recipes { id title description } } }')

    return recipe
}
// createRecipeForUser("ck9sgen4y008c078218f6n1h4", {
//     title: "cheese",
//     description: "apple pie",
//     ingredients: { set: ['apple', 'baking powder', 'sugar'] },
//     prep: 10,
//     cook: 10

// }).then((user) => {
//     console.log(JSON.stringify(user))
// }).catch(err => console.warn(err, "err"))
// Retrieve `name` of a specific user
// prisma.query.users(null, '{id name email recipes { id }}').then(data => console.log(data, "data")).catch(err => console.warn(err, "err"))

// // // Retrieve `id` and `name` of all users
// prisma.query.recipes(null, '{id title description }').then(data => console.log(data, "data")).catch(err => console.warn(err, "err"))


// // Create new user called `Sarah` and retrieve the `id`
// prisma.mutation.createUser({ data: { name: 'Sarah' } }, '{ id }')

// // Update name of a specific user and retrieve the `id`
// prisma.mutation.updateUser({ where: { id: 'abc' }, data: { name: 'Sarah' } }, '{ id }')

// // Delete a specific user and retrieve the `id`
// prisma.mutation.deleteUser({ where: { id: 'abc' } }, '{ id }')