import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ButtonUI, Recipes, Image } from '../components';
import './List.css'
import products = require("../assets/data/products.json");
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Modal from 'react-modal';

const fridge = require("./../assets/images/svg/fridge.svg");

const GET_RECIPES = gql`
  query GetRecipes($id: String) {
    recipeDetails(id: $id) {
      title
    }
  }
`;
const useStyles = makeStyles((theme) => ({
    root: {
        width: '500',
        '& > * + *': {
            marginTop: theme.spacing(3),
        }
    },
}));

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


export interface ListType {
    title: string
    id: number
}

export const List: React.FunctionComponent = () => {
    const [selectedProducts, setSelectedProducts] = React.useState<ListType[]>([{ title: "apple", id: 9003 }, { title: "sugar", id: 19335 }, { title: "flour", id: 20081 }]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const classes = useStyles();
    const changeProductList = (event: object, value: ListType[], reason: string) => {
        setSelectedProducts(value);
    }
    const searchRecipes = (): void => {
        // tslint:disable-next-line: no-shadowed-variable

    }
    const selectedProductsTitles = selectedProducts?.reduce((accumulator: any, currentValue: ListType) => {
        return [...accumulator, currentValue.title]
    }, []);


    return (<div className="w-full h-screen min-h-64">
        <div className="flex flex-col items-center mb-8">
            <h1 className="font-gotham text-center font-bold">your spare food</h1>
        </div>

        <div className="fridge">
            <div className="fridge_inside">
                {selectedProductsTitles.map(product => <p className="text-milk font-bold m-1">{product} </p>)}
                <ButtonUI onClick={searchRecipes}>Add Ingridients</ButtonUI>


            </div>
        </div>
    </div>)
}

// <Recipes recipesList={selectedProducts} />
// <Image src={fridge.default} size="full" alt="large" />
// /            <div className={classes.root}>
// <Autocomplete
//     multiple
//     id="tags-outlined"
//     options={products}
//     getOptionLabel={option => option.title}
//     defaultValue={[products[17], products[870], products[341]]}
//     filterSelectedOptions
//     onChange={(event, value, reason): void => changeProductList(event, value, reason)}
//     includeInputInList={true}
//     renderInput={params => (
//         <TextField
//             {...params}
//             variant="outlined"
//             label="Select grocery products"
//             placeholder="..."
//         />
//     )}
// />
// </div>