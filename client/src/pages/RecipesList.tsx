import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { RecipeItem } from '../components';
import { ErrorMessage, LoadingBar, SearchRecipesForm } from '../components';
import { useSelector } from 'react-redux';
import { getProducts } from '../state/products/selectors';

const GET_RECIPES = gql`
  query GetRecipes($ingredients: [String!]!) {
    recipes(ingredients: $ingredients) {
        id
        title
        image
        ingredients
    }
  }
`;


export const RecipesList: React.FunctionComponent = () => {

  const ingredients = useSelector(getProducts);
  const { data, loading, error } = useQuery(
    GET_RECIPES,
    { variables: { ingredients } }
  );

  if (loading) return <LoadingBar />
  if (error) return <ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>;
  if (!data) return <ErrorMessage message='Not found'></ErrorMessage>;
  return (<div className='main'>
    <div className='ml-2  search-form'>
      <SearchRecipesForm btnText='Update Results' />
    </div>
    <div className='flex-col list'>
      {data.recipes.map(recipe => <RecipeItem key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} ingredients={recipe.ingredients} />)}
    </div>
  </div>)

}