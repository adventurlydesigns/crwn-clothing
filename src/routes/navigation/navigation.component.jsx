import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { signOutUser } from './../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from './../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    { currentUser ? (
                        <span onClick={signOutHandler} className="nav-link">SIGN OUT</span>
                    ) : (
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navigation;
