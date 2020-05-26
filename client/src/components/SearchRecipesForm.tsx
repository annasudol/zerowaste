import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '../components';
import products = require("../assets/data/products.json");
import { AppRoutes } from "../../routes";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProductsList } from '../state/products/actions'
import cx from 'classnames';
import { getProducts } from "../state/products/selectors";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '500',
        '& > * + *': {
            marginTop: theme.spacing(3),
        }
    },
}));


export interface ListType {
    title: string
    id: number
}

export const SearchRecipesForm: React.FunctionComponent<{ btnText?: string }> = ({ btnText = 'Search Recipes' }) => {
    const ingredients = useSelector(getProducts);
    const [selectedProducts, setSelectedProducts] = React.useState<string[]>(ingredients);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const changeProductList = (event: object, value: ListType[], reason: string) => {
        const selectedProductsTitles = value.reduce((accumulator: any, currentValue: ListType) => {
            return [...accumulator, currentValue.title]
        }, []);
        setSelectedProducts(selectedProductsTitles);
    }
    const selectedProductsInDB = ingredients.map((item) => {
        const index = products.findIndex(product => product.title === item);
        return products[index]
    });

    const searchRecipes = (): void => {
        dispatch(createProductsList(selectedProducts))
        return history.push({ pathname: AppRoutes.RecipesList });
    }


    return (<>
        <div className={cx(classes.root, 'mb-3', 'z-0')}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={products}
                getOptionLabel={option => option.title}
                defaultValue={selectedProductsInDB}
                filterSelectedOptions
                onChange={(event, value, reason): void => changeProductList(event, value, reason)}
                includeInputInList={true}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="..."
                    />
                )}
            />
        </div>
        {selectedProducts.length === 0 ? <p>Add at least one product</p> : <Button onClick={searchRecipes}>{btnText}</Button>}

    </>
    )
}