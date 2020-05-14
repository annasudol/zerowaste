import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ErrorMessage, RecipeItem } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
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
export interface RecipeListProps { ingredients?: string[] }

export const RecipesList: React.FunctionComponent<RecipeListProps> = ({ ingredients = ['apple', 'sugar'] }) => {
  const { data, loading, error } = useQuery(
    GET_RECIPES,
    { variables: { ingredients } }
  );
  const classes = useStyles();

  if (loading) return <div className={classes.root}><CircularProgress color="secondary" /></div>;
  if (error) return <ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>;
  if (!data) return <p>Not found</p>;
  return (<div className="">
    {data.recipes.map(recipe => <RecipeItem id={recipe.id} title={recipe.title} image={recipe.image} ingredients={recipe.ingredients} />)}
  </div>)

}