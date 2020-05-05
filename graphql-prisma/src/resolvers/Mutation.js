import uuidv4 from 'uuid/v4'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const emailTaken = await prisma.exists.User({ email: args.data.email })

        if (emailTaken) {
            throw new Error('Email taken')
        }

        return prisma.mutation.createUser({ data: args.data }, info)
    },
    async deleteUser(parent, args, { prisma }, info) {
        const userExists = await prisma.exists.User({ id: args.id })

        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateUser(parent, args, { prisma }, info) {
        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async createRecipe(parent, args, { prisma }, info) {
        return await prisma.mutation.createRecipe({
            data: {
                title: args.data.title,
                description: args.data.description,
                ingredients: { set: args.data.ingredients },
                prep: args.data.prep,
                cook: args.data.cook,
                author: { connect: { id: args.data.author } }
            }
        }, info)
    },
    //mutation {
    //   createRecipe(data: {title: "bannana bread" description: "babana bread" ingredients: ["banana", "flour"] directions: ["dir"] prep: 20 cook: 10 author: "ck9twqyob02ho0814gt4iv4tl"}) {
    //     title
    //   }
    // }
    async deleteRecipe(parent, args, { prisma }, info) {
        return await prisma.mutation.deleteRecipe({ where: { id: args.id } }, info);
    },
    //mutation {
    //   deleteRecipe(id: "ck9tz1e0802i10814r0pctce2"){
    //     title
    //   }

    async updateRecipe(parent, args, { prisma }, info) {
        return await prisma.mutation.updateRecipe({
            where: { id: args.data.id },
            data: {
                title: args.data.title,
                description: args.data.description,
                ingredients: { set: args.data.ingredients },
                prep: args.data.prep,
                cook: args.data.cook,
            }
        }, info);
    },
    //mutation {
    //   updateRecipe(data: {id: "ck9toxros024a08141qbmuaaj" title: "soup" description: "tomato soup" ingredients: ["tomato", "onion"] directions: ["cook"] prep: 20 cook: 10 }){
    //     title
    //   }}

    async createComment(parent, args, { prisma }, info) {
        return await prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                recipe: {
                    connect: {
                        id: args.data.recipe
                    }
                }
            }
        }, info)
    },
    //mutation {
    //   createComment(data: {text: "delicious" author: "ck9twqyob02ho0814gt4iv4tl" recipe: "ck9tpxw4q02g30814kz9i0ksm" }){
    //     text
    //   }
    // }
    async deleteComment(parent, args, { prisma }, info) {
        return await prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },

    //mutation {
    // deleteComment(id: "ck9u136hb02k80814837p43oy") {
    //     text
    // }
    // }
}

export { Mutation as default }