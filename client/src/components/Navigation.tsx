import * as React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import cx from 'classnames';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button } from '../UElements/';
import { AppRoutes } from '../../routes';

export const Navigation: React.FunctionComponent = (): React.ReactElement => {
    const [open, toggleOpen] = React.useState(false);

    return (
        <>
            {!open && <button onClick={(): any => toggleOpen(true)} className="w-12 h-12 rounded-full border-0 bg-green lg:hidden nav-btn"><MenuIcon style={{ color: '#fff' }} /></button>}
            <div className={cx(open ? 'opened-nav' : 'closed-nav')}>
                <nav className="nav">
                    <button onClick={(): any => toggleOpen(false)} className="outline-none border-none bg-transparent m-0 p-0 border-0 lg:hidden"><CancelIcon style={{ color: '#fff' }} /></button>
                    <ul>
                        <li><Button className="text-white" to={AppRoutes.Home}>Home</Button></li>
                        <li><Button className="text-white" to={AppRoutes.AddRecipe}>Add Recipe</Button></li>
                        <li><Button className="text-white" to={AppRoutes.RecipesList}>My recipes</Button></li>
                        <li><Button className="text-white" to={AppRoutes.LoginSignUp}>Login/<br></br>Sign Up</Button></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
