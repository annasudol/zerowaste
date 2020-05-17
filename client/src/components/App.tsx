import * as React from "react";
import { SearchRecipes, RecipesList, RecipeDetails, Navigation, LoginSignUp } from "../components";
import { AppRoutes } from '../../routes';
import { Route, Switch } from 'react-router-dom';


export const App: React.FunctionComponent = () => {

    return (
        <>
            <Navigation />
            <Switch>
                <Route path={AppRoutes.Home} component={SearchRecipes} exact />
                <Route path={AppRoutes.RecipesList} component={RecipesList} />
                <Route path={AppRoutes.Recipe} component={RecipeDetails} />
                <Route path={AppRoutes.LoginSignUp} component={LoginSignUp} />

            </Switch>

        </>
    )
}

