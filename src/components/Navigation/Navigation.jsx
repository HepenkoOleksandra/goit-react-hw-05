import clsx from 'clsx';
import { NavLink } from "react-router-dom";
import css from './Navigation.module.css';

const navLinkClassActive = ({ isActive }) =>
  // clsx(css.navLink, { [css.active]: isActive });
clsx(css.navLink, isActive && css.active);


const Navigation = () => {
  return (
    <>
        <header className={css.header}>
            <nav className={css.nav}>
                <NavLink className={navLinkClassActive} to="/">Home</NavLink>
                <NavLink className={navLinkClassActive} to="/movies">Movies</NavLink>
            </nav>
        </header>
    </>
  )
}

export default Navigation