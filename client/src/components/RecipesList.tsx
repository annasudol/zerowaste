import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ErrorMessage, RecipeItem, LoadingBar } from '../components';
import { useLocation } from 'react-router';
import { LocationTypes } from '../utils/types';

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
  const location: LocationTypes = useLocation();
  const ingredients: string[] = location?.state.ingredients;

  const { data, loading, error } = useQuery(
    GET_RECIPES,
    { variables: { ingredients } }
  );

  if (loading) return <LoadingBar />
  if (error) return <ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>;
  if (!data) return <ErrorMessage message="Not found"></ErrorMessage>;;
  return (<div className="flex-col w-full h-full list">
    {data.recipes.map(recipe => <RecipeItem id={recipe.id} title={recipe.title} image={recipe.image} ingredients={recipe.ingredients} />)}
  </div>)

}