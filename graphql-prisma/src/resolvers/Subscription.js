const Subscription = {
    comment: {
        subscribe(parent, { recipeId }, { db, pubsub }, info) {
            const recipe = db.recipes.find((recipe) => recipe.id === recipeId)

            if (!recipe) {
                throw new Error('Recipe not found')
            }

            return pubsub.asyncIterator(`comment ${recipeId}`)
        }
    }
}

export { Subscription as default }