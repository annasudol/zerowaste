import * as React from "react";
import { SearchRecipes, RecipesList, RecipeItem } from "../components";
import { AppRoutes } from '../../routes';
import { Route, Switch, Redirect } from 'react-router-dom';


export const App: React.FunctionComponent = () => {

    return (<div className="bg-intenseOrang w-screen h-screen overflow-x-hidden">
        <div className="container">
            <Switch>
                <Route path={AppRoutes.Search} component={SearchRecipes} exact />
                <Route path={AppRoutes.RecipesList} component={RecipesList} />
                <Route path={AppRoutes.Recipe} component={RecipeItem} />
            </Switch>
        </div>
    </div>)
}

