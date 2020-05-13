import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ListType } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ErrorMessage } from '../components';
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


export const Recipes: React.FunctionComponent<{ recipesList: ListType[] }> = ({ recipesList }) => {
  const ingredients = recipesList?.reduce((accumulator: any, currentValue: ListType) => {
    return [...accumulator, currentValue.title]
  }, []);
  const { data, loading, error } = useQuery(
    GET_RECIPES,
    { variables: { ingredients } }
  );
  const classes = useStyles();
  console.log(data)
  if (loading) return <div className={classes.root}><CircularProgress color="secondary" /></div>;
  if (error) return <ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>;
  if (!data) return <p>Not found</p>;
  // return data.launch && <LaunchTile launch={data.launch} />;
  // recipesList.reduce((item: any, acc: any) => {
  //     return console.log(item, "items");
  // });

  return <p>recipes</p>
}

