import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ButtonUI, Image } from '../components';
import products = require("../assets/data/products.json");
import { AppRoutes } from "../../routes";
import { useHistory } from 'react-router-dom';
const fridge = require("./../assets/images/svg/technology.svg");
import cx from 'classnames';

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
        history.push({ pathname: AppRoutes.RecipesList, state: { ingredients: selectedProducts } });
    }


    return (<div className="content overflow-hidden">
        <div className="flex flex-col justify-center items-center md:flex-row-reverse items-center h-screen">
            <div className="mb-8 text-center md:text-left min-h-32">
                <h1 className="font-bebas uppercase text-darkGray">your spare food</h1>
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
                                label="Select grocery products"
                                placeholder="..."
                            />
                        )}
                    />
                </div>
                <ButtonUI onClick={searchRecipes}>Search</ButtonUI>
            </div>
            <Image src={fridge.default} alt="fridge" size="medium" />
        </div>
    </div>)
}