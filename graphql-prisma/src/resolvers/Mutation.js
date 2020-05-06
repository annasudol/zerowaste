import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
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

        const userExists = await prisma.exists.User({
            id: userId
        });
        if (!userExists) {
            throw new Error('Unable to delete user')
        }

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        const userExists = await prisma.exists.User({
            id: userId
        });
        if (!userExists) {
            throw new Error('Unable to update user')
        }
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
    async deleteRecipe(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const recipeExists = await prisma.exists.Recipe({
            id: args.id,
            author: {
                id: userId
            }
        });
        if (!recipeExists) {
            throw new Error('Unable to delete recipe')
        }

        return await prisma.mutation.deleteRecipe({ where: { id: args.id } }, info);
    },
    async updateRecipe(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const recipeExists = await prisma.exists.Recipe({
            id: args.data.id,
            author: {
                id: userId
            }
        });
        if (!recipeExists) {
            throw new Error('Unable to update recipe')
        }
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
    async createComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return await prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: userId
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
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });
        if (!commentExists) {
            throw new Error('Unable to delete comment')
        }
        return await prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },
}

export { Mutation as default }