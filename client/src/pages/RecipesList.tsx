import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { RecipeItem, Button } from '../components';
import { ErrorMessage, LoadingBar, SearchRecipesForm } from '../components';
import { useSelector } from 'react-redux';
import { getProducts } from '../state/products/selectors';

const GET_RECIPES = gql`
  query GetRecipes($ingredients: [String!]! $cursor: String) {
    recipes(ingredients: $ingredients cursor: $cursor) {
     recipes {
        id
        title
        image
        ingredients
     }
     nextPageCursor
    }
  }
`;


export const RecipesList: React.FunctionComponent = () => {

  const ingredients = useSelector(getProducts);
  const { data, loading, error, fetchMore } = useQuery(
    GET_RECIPES,
    { variables: { ingredients } }
  );

  if (loading) return <LoadingBar />
  if (error) return <ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>;
  if (!data) return <ErrorMessage message="Not found"></ErrorMessage>;
  return (<div className="main">
    <div className="ml-2  search-form">
      <SearchRecipesForm btnText='Update Results' />
    </div>
    <div className="flex-col list">
      {data.recipes.recipes.map(recipe => <RecipeItem id={recipe.id} title={recipe.title} image={recipe.image} ingredients={recipe.ingredients} />)}
      {data.recipes.nextPageCursor !== null && (
        <Button
          color="coral"
          className="mb-4"
          onClick={() =>
            fetchMore({
              variables: {
                after: data.recipes.nextPageCursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  recipes: {
                    ...fetchMoreResult.recipes,
                    recipes: [
                      ...prev.recipes.recipes,
                      ...fetchMoreResult.recipes.recipes,
                    ],
                  },
                };
              },
            })
          }
        >
          Load More
        </Button>
      )}
    </div>
  </div>)

}