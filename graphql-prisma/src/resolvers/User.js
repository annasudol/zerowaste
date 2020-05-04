const User = {
    recipes(parent, args, { db }, info) {
        return db.recipes.filter((recipe) => {
            return recipe.author === parent.id
        })
    },
    comments(parent, args, { db }, info) {
        return db.comments.filter((comment) => {
            return comment.author === parent.id
        })
    }
}

export { User as default }