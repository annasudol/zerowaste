import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ButtonUI, Recipes } from '../components';

import products = require("../assets/data/products.json");
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_RECIPES = gql`
  query GetRecipes($id: String) {
    recipeDetails(id: $id) {
      title
    }
  }
`;
const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        }
    },
}));

export interface ListType {
    title: string
    id: number
}

export const List: React.FunctionComponent = () => {
    const [selectedProducts, setSelectedProducts] = React.useState<ListType[]>([{ title: "apple", id: 9003 }, { title: "sugar", id: 19335 }, { title: "flour", id: 20081 }]);
    const classes = useStyles();
    const changeProductList = (event: object, value: ListType[], reason: string) => {
        setSelectedProducts(value);
    }
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-shadowed-variable
    // const { loading, error, data } = useQuery(GET_RECIPES, {
    //     variables: { id: "591006" }
    // });
    // tslint:disable-next-line: no-console
    // console.log(data)


    // const { loading, error, data } = useQuery(GET_RECIPES, {
    //     variables: { id: "591006" }
    // });
    // tslint:disable-next-line: no-empty
    const searchRecipes = (): void => {
        // tslint:disable-next-line: no-shadowed-variable

    }


    return (<div>
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={products}
                getOptionLabel={option => option.title}
                defaultValue={[products[17], products[870], products[341]]}
                filterSelectedOptions
                onChange={(event, value, reason): void => changeProductList(event, value, reason)}
                includeInputInList={true}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Select grocery products"
                        placeholder="..."
                    />
                )}
            />
        </div>
        <ButtonUI size="medium" outlined={true} color="secondary" onClick={searchRecipes}>submit</ButtonUI>
        <Recipes recipesList={selectedProducts} />
    </div>)
}