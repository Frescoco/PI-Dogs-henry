/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./dogCard.module.css";

const DogCard = ({ id, name, image, temperament, weight }) => {
  return (
    <NavLink to={`/deatilDogs/${id}`} className={styles.linkCard}>
      <div className={styles.containerCard}>
        <h2 className={styles.name}>Name: {name}</h2>
        {image.url ? (
          <img src={image.url} className={styles.image} alt="Dog Image"></img>
        ) : (
          <img src={image} className={styles.image} alt="Dog Image"></img>
        )}
        <h2 className={styles.temperament}>Temperament: {temperament}</h2>
        {weight.metric ? (
          <h2 className={styles.weight}>
            Weight: {weight.metric} kg
          </h2>
        ) : (
          <h2 className={styles.weight}>Weight: {weight}</h2>
        )}
      </div>
    </NavLink>
  );
};

export default DogCard;
