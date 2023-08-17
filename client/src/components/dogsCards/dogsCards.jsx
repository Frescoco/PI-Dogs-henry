/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderDogs, filterByIdType } from "../../redux/actions/index";
import styles from "./dogsCards.module.css";
import DogCard from "../dogCard/dogCard";
import FilterTemperament from "../filtertemperament/filterTemperament";

const DogCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.charactersDogs);
  const filteredDogs = useSelector((state) => state.filteredDogs);

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  const dogsToDisplay = filteredDogs.length > 0 ? filteredDogs : allCharacters;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const dogCardList = dogsToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dogsToDisplay.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOrder = (e) => {
    dispatch(orderDogs(e.target.value));
  };

  return (
    <div className={styles.containerCards}>
      <div className={styles.containerSelect}>
        <FilterTemperament />
        <select
          onChange={(e) => {
            dispatch(filterByIdType(e.target.value));
          }}
        >
          <option value="all">Show All</option>
          <option value="numeric">Numeric IDs</option>
          <option value="uuid">UUID IDs</option>
        </select>
        <select onChange={handleOrder}>
          <option value="A">Upward</option>
          <option value="D">Falling</option>
        </select>
      </div>
      <div className={styles.cards}>
        {dogCardList?.map((data) => {
          return (
            <DogCard
              id={data.id}
              name={data.name}
              image={data.image}
              temperament={data.temperament}
              weight={data.weight}
            />
          );
        })}
      </div>
      <div className={styles.containerPaginated}>
        <button
          className={styles.buttonPrev}
          onClick={prevPage}
          disabled={currentPage === 1}
        ></button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className={styles.buttonNext}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        ></button>
      </div>
    </div>
  );
};

export default DogCards;
