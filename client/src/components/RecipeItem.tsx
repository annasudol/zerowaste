import * as React from 'react';
import { Image, DialogDeleteRecipe } from '../components';
import { useLazyQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

const GET_RECIPE_DETAILS = gql`
  query GetRecipeDetails($id: ID!) {
    recipe(id: $id) {
        title
        servings
        image
        readyInMinutes
        detailedIngredients
        author
        sourceUrl
        instructions
        user{
            name
        }
    }
  }
`;


export interface RecipeItemProps {
    id: string
    title: string
    image: string
    ingredients: string[]
    deleteEditBtn?: boolean
}

export const RecipeItem: React.FunctionComponent<RecipeItemProps> = ({ id, title, image, ingredients, deleteEditBtn = false }): React.ReactElement => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [getRecipeData, { data }] = useLazyQuery(GET_RECIPE_DETAILS);
    const editRecipe = () => getRecipeData({ variables: { id } })


    if (data) {
        const { servings, instructions, readyInMinutes, detailedIngredients, sourceUrl } = data.recipe
        return <Redirect to={{ pathname: `/editRecipe/${id}`, state: { title, image, servings, instructions, ingredients, readyInMinutes, detailedIngredients, sourceUrl } }} />
    }

    if (open) {
        return <DialogDeleteRecipe open={open} toggleOpen={(value): void => setOpen(value)} recipeId={id} />
    }
    return (
        <div className='flex bg-milk bo mb-4 mr-4 max-w-sm lg:max-w-xl mb-3 list--item relative' key={id}>
            <div className='w-42'><Image src={image} className='rounded-m m-4' size='small' alt={title} /></div>
            <div className='mt-4 mb-4'>
                <h3 className='font-bebas text-lightGreen mb-1'>{title}</h3>
                <span className='font-roboto uppercase text-xs font-semibold text-darkGray'>ingredients: </span>
                <span className='font-roboto text-xs'>{ingredients.join(', ')}</span>
                <br></br>
                {deleteEditBtn ? <Link className='coral-link'
                    to={{ pathname: `/recipe/${id}`, state: { backPath: '/user' } }}
                >see more
                </Link> : <Link to={`/recipe/${id}`} className='coral-link'>see more</Link>}
                {deleteEditBtn && (<div className=''>
                    <Button danger onClick={(): void => setOpen(true)} className='mr-2'>Delete Recipe</Button>
                    <Button type='primary' onClick={editRecipe}>Edit Recipe</Button>
                </div>)}
            </div>
        </div>
    );
};
