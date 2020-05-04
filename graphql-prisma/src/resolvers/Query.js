const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    recipes(parent, args, { db }, info) {
        if (!args.query) {
            return db.recipes
        }

        return db.recipes.filter((recipe) => {
            const isTitleMatch = recipe.title.toLowerCase().includes(args.query.toLowerCase())
            const isIngredientsMatch = recipe.ingredients.includes(args.query.toLowerCase())
            return isTitleMatch || isIngredientsMatch
        })
    },
    comments(parent, args, { db }, info) {
        return db.comments
    }
}

export { Query as default }