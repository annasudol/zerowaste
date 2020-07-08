import React, { FC, ReactElement } from 'react';

import { LoadingBar, ErrorMessage, RecipeItem } from '../../components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useUserRecipes, useSubscriptionDeleteRecipe } from '../../hooks';

const GET_USER_INFO = gql`
query user {
    user {
        name
        email
        recipes {
            id
            title
            image
            ingredients
        }
    }
}
`;



export const UserInfo: FC= (): ReactElement => {

    const { data, loading, error, subscribeToMore, refetch } = useQuery(GET_USER_INFO);
    useUserRecipes(subscribeToMore, refetch);
    const {updatedRecipes} = useSubscriptionDeleteRecipe();
    React.useEffect(() => {
        refetch()
    }, [refetch, updatedRecipes]);


    if (loading) return <LoadingBar />
    if (error) return <ErrorMessage message={`ERROR: ${error.message}`} />;
    return (
        <div className='overflow-hidden p-2'>
            <div className='mt-2 text-left'>
                <h1 className='form-header font-bebas uppercase text-darkGray pb-0 m-0'>{`Hello ${data.user.name}`}</h1>
                <p className='font-bebas text-darkGray inline'>Email: </p>
                <p className='font-bebas text-lightGreen mb-1 inline'>{data.user.email}</p>
            </div>
            <div className='flex-row mt-4 mb-4'>
                {data?.user.recipes.length === 0 ? (
                    <p>Don't have recipes yet</p>
                ) : data?.user.recipes.map((recipe: { id: string; title: string; image: string; ingredients: string[]; }) => (
                    <RecipeItem key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} ingredients={recipe.ingredients} deleteEditBtn />
                ))}
            </div>
        </div>
    )



}


