const Query = {
    users(parent, args, { prisma }, info) {
        const opArds = {}

        if (args.query) {
            opArds.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArds, info);
    },
    recipes(parent, args, { prisma }, info) {
        const opArds = {}
        if (args.query) {
            opArds.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    description_contains: args.query
                }]
            }
        }
        return prisma.query.recipes(null, info);
    },
    recipesByIngredients(parent, args, { prisma }, info) {
        if (!args.query) {
            return prisma.query.recipes(null, '{ id title description ingredients}');
        }
        return prisma.query.recipes(null, '{ id title description ingredients}')
            .then(results => results.filter(result => result.ingredients.includes(args.query)))
            .catch(err => console.warn(err));
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    },
}

export { Query as default }