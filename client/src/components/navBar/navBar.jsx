// eslint-disable-next-line jsx-a11y/img-redundant-alt
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./navBar.module.css";
import img from "../../Images/06.png";
import { getDogsByName } from "../../redux/actions/index";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm === "") {
      dispatch(getDogsByName([]));
    } else {
      dispatch(getDogsByName(searchTerm));
    }
  };

  return (
    <div className={styles.containerNav}>
      <div className={styles.containerTitle}>
        <img className={styles.image} src={img} alt="Imagen" />
        <h1 className={styles.title}>Dogs Web</h1>
      </div>
      <div className={styles.containerSearch}>
        <input
          type="text"
          className={styles.searchBar}
          onChange={handleInputChange}
          placeholder="Find dog breeds"
        />
        <NavLink to={'/FormPage'}>
          <button className={styles.createDog}>Create Dog</button>
        </NavLink>
        <NavLink to="/">
          <button className={styles.exitPage}></button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
