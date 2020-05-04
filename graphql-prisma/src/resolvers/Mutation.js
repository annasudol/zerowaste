import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if (emailTaken) {
            throw new Error('Email taken')
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('User not found')
        }

        const deletedUsers = db.users.splice(userIndex, 1)

        db.recipes = db.recipes.filter((recipe) => {
            const match = recipe.author === args.id

            if (match) {
                db.comments = db.comments.filter((comment) => comment.recipe !== recipe.id)
            }

            return !match
        })
        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error('Email taken')
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },
    createRecipe(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if (!userExists) {
            throw new Error('User not found')
        }

        const recipe = {
            id: uuidv4(),
            ...args.data
        }

        db.recipes.push(recipe)

        return recipe
    },
    deleteRecipe(parent, args, { db }, info) {
        const recipesIndex = db.recipes.findIndex((recipe) => recipe.id === args.id)

        if (recipesIndex === -1) {
            throw new Error('Recipes not found')
        }

        const deletedRecipe = db.recipes.splice(recipesIndex, 1)

        db.comments = db.comments.filter((comment) => comment.recipe !== args.id)

        return deletedRecipe[0]
    },
    updateRecipe(parent, args, { db }, info) {
        const { id, data } = args
        const recipe = db.recipes.find((recipe) => recipe.id === id)

        if (!recipe) {
            throw new Error('recipe not found')
        }

        if (typeof data.title === 'string') {
            recipe.description = data.description
        }

        if (typeof data.description === 'string') {
            recipe.description = data.description
        }



        return recipe
    },
    createComment(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const recipeExists = db.recipes.some((recipe) => recipe.id === args.data.recipe && recipe.published)

        if (!userExists || !recipeExists) {
            throw new Error('Unable to find user and recipe')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.recipe}`, { comment })

        return comment
    },
    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const deletedComments = db.comments.splice(commentIndex, 1)

        return deletedComments[0]
    },
}

export { Mutation as default }