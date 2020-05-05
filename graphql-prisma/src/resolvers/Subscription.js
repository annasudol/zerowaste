const Subscription = {
    comment: {
        subscribe(parent, { recipeId }, { prisma }, info) {
            return prisma.subscription.comment(null, info)
            // const recipe = db.recipes.find((recipe) => recipe.id === recipeId)

            // if (!recipe) {
            //     throw new Error('Recipe not found')
            // }

            // return pubsub.asyncIterator(`comment ${recipeId}`)
        }
    }
}

export { Subscription as default }