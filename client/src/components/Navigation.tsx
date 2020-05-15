import * as React from "react";
import './Navigation.css'
import MenuIcon from '@material-ui/icons/Menu';
import cx from 'classnames';
import CancelIcon from '@material-ui/icons/Cancel';
import { ButtonUI } from '../components';
import { AppRoutes } from '../../routes';

export const Navigation: React.FunctionComponent = (): React.ReactElement => {
    const [open, toggleOpen] = React.useState(false);

    return (
        <div>
            {!open && <button onClick={(): any => toggleOpen(true)} className="w-12 h-12 rounded-full border-0 bg-green md:hidden nav-btn"><MenuIcon style={{ color: '#fff' }} /></button>}
            <div className={cx(open ? 'opened-nav' : 'closed-nav')}>
                <nav className="nav">
                    <button onClick={(): any => toggleOpen(false)} className="outline-none border-none bg-transparent m-0 p-0 border-0 md:hidden"><CancelIcon style={{ color: '#fff' }} /></button>
                    <ul>
                        <li><ButtonUI to={AppRoutes.Home}>Home</ButtonUI></li>
                        <li><ButtonUI to={AppRoutes.RecipesList}>Recipes</ButtonUI></li>
                        <li><ButtonUI to={AppRoutes.Login}>Login</ButtonUI></li>
                        <li><ButtonUI to={AppRoutes.Register}>Register</ButtonUI></li>
                    </ul>
                </nav>
            </div>

        </div >
    );
}
