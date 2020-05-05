const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const recipes = [{
    id: '10',
    title: 'Apple Strudel',
    description: "",
    ingredients: ['1 Granny Smith apple - peeled, cored and coarsely shredded', '3 Granny Smith apples - peeled, cored and sliced', '1 cup brown sugar', '1 cup golden raisins', '1 sheet frozen puff pastry, thawed', '1 egg', '¼ cup milk'],
    directions: ['Preheat oven to 400 degrees F (200 degrees C). Line a baking sheet with parchment paper.', 'Place apples in a large bowl. Stir in brown sugar and golden raisins; set aside. Place puff pastry on baking sheet. Roll lightly with a rolling pin. Arrange apple filling down the middle of the pastry lengthwise. Fold the pastry lengthwise around the mixture. Seal edges of pastry by using a bit of water on your fingers, and rubbing the pastry edges together. Whisk egg and milk together, and brush onto top of pastry.', 'Bake in preheated oven for 35 to 40 minutes, or until golden brown.'],
    time: {
        prep: 30,
        cook: 40,
    },
    author: '1'
}, {
    id: '11',
    title: 'Simple Tomato Soup',
    description: "This is my go-to tomato soup recipe. It's so easy and delicious. It's easily made vegan (if you use margarine instead of butter or 2 tablespoons of olive oil), ready in 30 minutes, and I give leftovers to my kids for lunch. If you like, you can add cream, but my family likes it the way it is. I usually serve it with rosemary bread for dunking.",
    ingredients: ["1 tablespoon unsalted butter or margarine", "1 tablespoon olive oil", "1 onion, thinly sliced", "2 large garlic cloves, peeled and crushed", "2 (28 ounce) cans whole peeled tomatoes", "1 tablespoon sugar", "1 teaspoon salt, plus more to taste", "freshly ground black pepper to taste", "1 pinch red pepper flakes"],
    directions: ['Heat butter and olive oil in a large saucepan over medium-low heat and cook onion and garlic until onion is soft and translucent, about 5 minutes. Add tomatoes, water, sugar, salt, pepper, red pepper flakes, celery seed, and oregano. Bring to a boil. Reduce heat, cover, and simmer for 15 minutes.', 'Place apples in a large bowl. Stir in brown sugar and golden raisins; set aside. Place puff pastry on baking sheet. Roll lightly with a rolling pin. Arrange apple filling down the middle of the pastry lengthwise. Fold the pastry lengthwise around the mixture. Seal edges of pastry by using a bit of water on your fingers, and rubbing the pastry edges together. Whisk egg and milk together, and brush onto top of pastry.', 'Bake in preheated oven for 35 to 40 minutes, or until golden brown.'],
    time: {
        prep: 10,
        cook: 20,
    },
    author: '1'
},
{
    id: '12',
    title: 'Cedar Planked Salmon',
    description: "This is a dish my brother prepared for me in Seattle. It is by far the best salmon I've ever eaten. I like to serve it with an Asian-inspired rice and roasted asparagus.",
    ingredients: ["3 (12 inch) untreated cedar planks", "1/3 cup vegetable oil", "1 1/2 tablespoons rice vinegar", "1 teaspoon sesame oil", "1/3 cup soy sauce", "1/4 cup chopped green onions", "1 tablespoon grated fresh ginger root"],
    directions: ["Soak the cedar planks for at least 1 hour in warm water. Soak longer if you have time.", "In a shallow dish, stir together the vegetable oil, rice vinegar, sesame oil, soy sauce, green onions, ginger, and garlic. Place the salmon fillets in the marinade and turn to coat. Cover and marinate for at least 15 minutes, or up to one hour.", "Preheat an outdoor grill for medium heat. Place the planks on the grate. The boards are ready when they start to smoke and crackle just a little.", "Place the salmon fillets onto the planks and discard the marinade. Cover, and grill for about 20 minutes. Fish is done when you can flake it with a fork. It will continue to cook after you remove it from the grill"],
    time: {
        prep: 15,
        cook: 20,
    },
    author: '1'
}

]

const comments = [{
    id: '102',
    text: "Loved this! True to it's name...EASY! Only changes: Used 3 Granny Smith apples & added a few drops of lemon juice, 1/2C of pecans (no raisins) and sugared the pastry before adding the apples. Brushed pastry after it was rolled with melted butter and then sugar. Seems like a lot of sugar but the apples I used were pretty tart and needed it. (And we aren't hugh sweet eaters.) Mine have cooked in about 12-15 min...maybe it's just my oven, but I would watch to make sure not to burn bottoms. VERY, VERY GOOD & EAS",
    author: '3',
    recipe: '10'
}, {
    id: '103',
    text: "My boyfriend said this was the best piece of fish he's ever had! I soaked the cedar for about 7 hours then oiled one side. I used a 2.5 lb piece of salmon skin side down. I heated the plank and then put the fish on for 20 minutes, then turned off the heat and kept it on the grill for about 5 more minutes before serving.",
    author: '3',
    recipe: '12'
}]

const db = {
    users,
    recipes,
    comments
}

export { db as default }