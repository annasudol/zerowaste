import * as React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import cx from 'classnames';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button } from '../components';
import { AppRoutes } from '../../routes';
import { useHistory } from 'react-router';

export const Navigation: React.FunctionComponent<{ token: string | null }> = ({ token }): React.ReactElement => {
    const [open, toggleOpen] = React.useState(false);
    const history = useHistory();

    const logout = (): void => {
        localStorage.removeItem('token')
        history.push({ pathname: `${AppRoutes.Home}` })
        window.location.reload(false)
    }


    const loggedIn = (<>
        <ul>
            <li><Button className="text-white" to={AppRoutes.Home}>Home</Button></li>
            <li><Button className="text-white" to={AppRoutes.AddRecipe}>Add Recipe</Button></li>
            <li><Button className="text-white" to={AppRoutes.User}>Account</Button></li>
        </ul>
    </>);
    const loggedOut = (<ul>
        <li><Button className="text-white" to={AppRoutes.Home}>Home</Button></li>
        <li><Button className="text-white" to={AppRoutes.Login}>Login</Button></li>
        <li><Button className="text-white" to={AppRoutes.SignUp}>Sign up</Button></li>

    </ul>)
    const nav = React.useMemo(() => {
        return token ? loggedIn : loggedOut

    }, [token])

    return (
        <>
            {!open && <button onClick={(): any => toggleOpen(true)} className="w-12 h-12 rounded-full border-0 bg-green lg:hidden nav-btn"><MenuIcon style={{ color: '#fff' }} /></button>}
            <div className={cx(open ? 'opened-nav' : 'closed-nav')}>
                <nav className="nav">
                    <button onClick={(): any => toggleOpen(false)} className="outline-none border-none bg-transparent m-0 p-0 border-0 lg:hidden"><CancelIcon style={{ color: '#fff' }} /></button>
                    {nav}
                    {token && <Button onClick={logout} color="coral">logout</Button>}

                </nav>
            </div>
        </>
    );
}
