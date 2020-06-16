import * as React from 'react';
import { LoadingBar, ErrorMessage, RecipeItem } from '../components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Recipes } from '../components/Recipes';

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



export const UserInfo: React.FC = (): React.ReactElement | any => {

    const { data, loading, error, subscribeToMore } = useQuery(GET_USER_INFO);
    if (loading) return <LoadingBar />
    if (error) return <ErrorMessage message={`ERROR: ${error.message}`} />;

    return (
        <div className='overflow-hidden'>
            <div className='mt-2 text-left'>
                <h1 className='form-header font-bebas uppercase text-darkGray pb-0 m-0'>{`Hello ${data.user.name}`}</h1>
                <p className='font-bebas text-darkGray inline'>Email: </p>
                <p className='font-bebas text-lightGreen mb-1 inline'>{data.user.email}</p>
            </div>
            <div className='flex-row mt-4 mb-4'>
                <Recipes recipes={data.user.recipes} subscribeToMore={subscribeToMore} />
            </div>
        </div>
    )

    // {data.user.recipes.length === 0 ? <p>Don't have recipes yet</p> : data.user.recipes.map(recipe => <RecipeItem key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} ingredients={recipe.ingredients} deleteEditBtn={true} />)}


}


