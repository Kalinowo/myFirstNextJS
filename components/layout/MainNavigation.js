import Link from "next/link";
import classes from "./MainNavigation.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function MainNavigation() {
  const [hamburger, setHamburger] = React.useState(false);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Vzone</div>
      <nav className={classes.burger}>
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setHamburger(!hamburger)}
        />
      </nav>
      <nav className={classes.nav} data-switch={hamburger}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Vtuber</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
