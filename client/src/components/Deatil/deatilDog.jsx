/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogById } from "../../redux/actions";
import styles from "./deatilDog.module.css";

const DeatilDogs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const characterDog = useSelector((state) => state.characterDog);

  useEffect(() => {
    dispatch(getDogById(id));
  }, []);

  return (
    <div className={styles.containerComponent}>
      <div className={styles.containerDeatil}>
        <div className={styles.containerData}>
          <div>
            <h2>Bred For:</h2>
            {characterDog[0] ? <h3>{characterDog[0].bred_for}</h3> : null}
          </div>
          <div>
            <h2>Breed Group:</h2>
            {characterDog[0] ? <h3>{characterDog[0].breed_group}</h3> : null}
          </div>
          <div>
            <h2>Life Span:</h2>
            {characterDog[0] ? <h3>{characterDog[0].life_span}</h3> : null}
          </div>
          <div className={styles.containerTemperaments}>
            <h2>Temperaments:</h2>
            {characterDog[0] ? <h3>{characterDog[0].temperament}</h3> : null}
          </div>
          <div>
            <h2>Origin:</h2>
            {characterDog[0] ? <h3>{characterDog[0].origin}</h3> : null}
          </div>
          <div>
            <h2>Weight:</h2>
            {characterDog[0]?.weight ? (
              typeof characterDog[0].weight === "object" ? (
                <h3>
                  {characterDog[0].weight.imperial} /
                  {characterDog[0].weight.metric}
                </h3>
              ) : (
                <h3>{characterDog[0].weight}</h3>
              )
            ) : (
              <h3>Weight data not available</h3>
            )}
          </div>
          <div>
            <h2>Height:</h2>
            {characterDog[0]?.height ? (
              typeof characterDog[0].height === "object" ? (
                <h3>
                  {characterDog[0].height.imperial} /
                  {characterDog[0].height.metric}
                </h3>
              ) : (
                <h3>{characterDog[0].height}</h3>
              )
            ) : (
              <h3>Height data not available</h3>
            )}
          </div>
        </div>
        <div className={styles.containerImage}>
          {characterDog[0]?.image ? (
            typeof characterDog[0].image === "object" ? (
              <img src={characterDog[0].image.url} alt="Not Image" />
            ) : (
              <img src={characterDog[0].image} alt="Not Image" />
            )
          ) : (
            <h2>Image data not available</h2>
          )}
          <div>
            <h2>Name:</h2>
            {characterDog[0] ? <h3>{characterDog[0].name}</h3> : null}
          </div>
          <button className={styles.button} onClick={() => history.push("/HomePage")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeatilDogs;
