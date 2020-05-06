import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer')
        }
        const password = await bcrypt.hash(args.data.password, 10);
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        });
        return {
            user,
            token: jwt.sign({ userId: user.id }, 'thisIsSecret')
        }
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            user,
            token: jwt.sign({ userId: user.id }, 'thisIsSecret')
        }
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    async createRecipe(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return await prisma.mutation.createRecipe({
            data: {
                title: args.data.title,
                description: args.data.description,
                ingredients: { set: args.data.ingredients },
                prep: args.data.prep,
                cook: args.data.cook,
                author: { connect: { id: userId } }
            }
        }, info)
    },

    async deleteRecipe(parent, args, { prisma }, info) {
        return await prisma.mutation.deleteRecipe({ where: { id: args.id } }, info);
    },

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

    async createComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        console.log(userId, "userId")
        return await prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: "ck9u8s20r00ze0838sqj0z8fh"
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