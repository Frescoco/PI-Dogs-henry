import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, createDog } from "../../redux/actions";
import validations from "./validate";
import styles from "./Form.module.css";

const Form = () => {
  const [dataDog, setDataDog] = useState({
    image: "",
    name: "",
    weight: "",
    height: "",
    life_span: "",
    temperaments: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errors, setErrors] = useState({});


  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperament = useSelector((state) => state.filteredTemperament);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    if (selectedOptions.length + selected.length <= 7) {
      setSelectedOptions((selectedOptions) => [
        ...new Set([...selectedOptions, ...selected]),
      ]);

      setDataDog((prevData) => ({
        ...prevData,
        temperaments: [...new Set([...prevData.temperaments, ...selected])],
      }));
    }
  };

  const handleRemoveOption = (valueToRemove) => {
    const updatedValues = selectedOptions.filter(
      (value) => value !== valueToRemove
    );
    setSelectedOptions(updatedValues);
  };

  const handleChange = (event) => {
    setDataDog((dataDog) => ({
      ...dataDog,
      [event.target.name]: event.target.value,
    }));
    setErrors(
      validations({ ...dataDog, [event.target.name]: event.target.value })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errors.length > 0) {
      alert("arreglar create");
    } else {
      dispatch(createDog(dataDog));
      alert("Create Dog");
      setDataDog({
        image: "",
        name: "",
        weight: "",
        height: "",
        life_span: "",
        temperaments: "",
      });
      history.push("/HomePage");
    }
  };

  return (
    <div className={styles.containerForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.containerTitle}>
          <h1>Form</h1>
          <button onClick={() => history.push("/HomePage")}>X</button>
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="name">name</label>
          <input
            name="name"
            type="text"
            value={dataDog.name}
            onChange={handleChange}
            placeholder="Insert name..."
          />
          {errors.name ? <p className={styles.msgError}>{errors.name}</p> : null}
        </div>
        <div className={styles.containerRight}>
          <label htmlFor="height">height</label>
          <input
            name="height"
            type="text"
            value={dataDog.height}
            onChange={handleChange}
            placeholder="Insert min and max height"
          />
          {errors.height && <p className={styles.msgError}>{errors.height}</p>}
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="weight">weight</label>
          <input
            name="weight"
            type="text"
            value={dataDog.weight}
            onChange={handleChange}
            placeholder="Insert min and max weight"
          />
          {errors.weight && <p className={styles.msgError}>{errors.weight}</p>}
        </div>
        <div className={styles.containerRight}>
          <label htmlFor="life_span">yearsOfLife</label>
          <input
            name="life_span"
            type="text"
            value={dataDog.life_span}
            onChange={handleChange}
            placeholder="Insert years of life"
          />
          {errors.life_span && <p className={styles.msgError}>{errors.life_span}</p>}
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="image">Image</label>
          <input
            name="image"
            type="text"
            value={dataDog.image}
            onChange={handleChange}
            placeholder="Insert image url"
          />
          {errors.image && <p className={styles.msgError}>{errors.image}</p>}
        </div>
        <div className={styles.containerRight}>
          <label>Temperment</label>
          <select multiple onChange={handleSelectChange}>
            {allTemperament.map((temp) => {
              return <option value={temp.name}>{temp.name}</option>;
            })}
          </select>
          {errors.temperament && <p className={styles.msgError}>{errors.temperament}</p>}
        </div>
        <div className={styles.containerOptionValue}>
          {selectedOptions.map((value, index) => (
            <h3 key={index}>
              {value}
              <span
                style={{ cursor: "pointer", marginLeft: "5px", color: "red" }}
                onClick={() => handleRemoveOption(value)}
              >
                x
              </span>
            </h3>
          ))}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Form;
