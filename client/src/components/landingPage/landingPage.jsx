import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./landingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.containenLandingPage}>
      <h1 className={styles.title}>Welcome to the Individual Proyect!</h1>
      <NavLink to="/HomePage">
        <button className={styles.buttonAccess}>Home</button>
      </NavLink>
    </div>
  );
};

export default LandingPage;
