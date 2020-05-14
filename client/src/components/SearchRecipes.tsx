import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ButtonUI } from '../components';
import products = require("../assets/data/products.json");
import './SearchRecipes.css'
import { AppRoutes } from "../../routes";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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

export const SearchRecipes: React.FunctionComponent = () => {
    const [selectedProducts, setSelectedProducts] = React.useState<string[]>(["apple", "sugar", "flour"]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const classes = useStyles();
    const history = useHistory();

    const changeProductList = (event: object, value: ListType[], reason: string) => {
        // tslint:disable-next-line: no-shadowed-variable
        const selectedProductsTitles = value.reduce((accumulator: any, currentValue: ListType) => {
            return [...accumulator, currentValue.title]
        }, []);
        setSelectedProducts(selectedProductsTitles);
    }
    const selectedProductsInDB = selectedProducts.map(item => {
        const index = products.findIndex(product => product.title === item);
        return products[index]
    });

    const searchRecipes = (): any => {
        history.push({ pathname: AppRoutes.RecipesList, state: { ingredients: selectedProducts });
    }




    return (<div className="w-full h-screen min-h-64">
        <div className="flex flex-col items-center mb-8">
            <h1 className="font-mexcellent text-center">your spare food</h1>
        </div>

        <div className="fridge">
            <div className="fridge_inside">
                {selectedProducts.map(product => <p className="text-milk font-gotham m-1">{product} </p>)}
                <ButtonUI onClick={(): void => setIsOpen(true)}>add ingridients</ButtonUI>
                {modalIsOpen && (
                    <div className="modal-background">
                        <div className="modal-box">
                            <div className='flex w-full h-8 justify-start items-start'>
                                <ButtonUI type="cancel" onClick={(): void => setIsOpen(false)} />
                            </div>
                            <div className={classes.root}>
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
                                            label="Select grocery products"
                                            placeholder="..."
                                        />
                                    )}
                                />
                            </div>
                            <div className='flex w-full h-16 justify-end items-end'>
                                <ButtonUI full={true} onClick={searchRecipes}>Search</ButtonUI>


                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    </div>)
}
// <Link
// to={{ pathname: `${AppRoutes.RecipesList}`, state: { selectedProducts } }}
// exact={true}
// className="btn--game max-w-xl bg-transparent focus:outline-none hover:bg-orange-500 text-orange-500 font-semibold hover:text-indigo-900 py-2 border border-orange-500 hover:border-transparent rounded m-1 mt-4 pl-4 pr-4"
// >Search</Link>