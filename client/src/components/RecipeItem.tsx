import * as React from "react";
import { Image, Button, ErrorMessage } from '../components';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';


const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
        id
        title
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
    const [deleteRecipe, { data, error, loading }] = useMutation(DELETE_RECIPE);
    const handleDeleteRecipe = () => deleteRecipe({ variables: { id } })


    const editRecipe = () => { };
    React.useEffect(() => {
        if (data) window.location.reload(false)
    }, [data]);

    if (error) {
        return (<ErrorMessage message={error.message} />)
    }
    return (
        <div className="flex bg-milk bo mb-4 mr-4 max-w-sm lg:max-w-xl mb-3 list--item relative" key={id}>
            <div className="w-42"><Image src={image} className="rounded-m m-4" size="small" alt={title} /></div>
            <div className="mt-4 mb-4">
                <h3 className="font-bebas text-lightGreen mb-1">{title}</h3>
                <span className="font-roboto uppercase text-xs font-semibold text-darkGray">ingredients: </span>
                <span className='font-roboto text-xs'>{ingredients.join(', ')}</span>
                <Button to={`/recipe/${id}`}>see more</Button>
                {deleteEditBtn && (<div className="">
                    <Button color="coral" onClick={handleDeleteRecipe}>Delete Recipe</Button>
                    <Button onClick={editRecipe}>Edit Recipe</Button>

                </div>)}
            </div>
        </div>
    );
};
