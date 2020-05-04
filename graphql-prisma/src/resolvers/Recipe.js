const Recipe = {
    author(parent, args, { db }, info) {
        return db.users.find((user) => {
            return user.id === parent.author
        })
    },
    comments(parent, args, { db }, info) {
        return db.comments.filter((comment) => {
            return comment.recipe === parent.id
        })
    }
}

export { Recipe as default }