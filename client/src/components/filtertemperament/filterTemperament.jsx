import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, filterTemperaments } from "../../redux/actions";

const FilterTemperament = () => {
  const dispatch = useDispatch();
  const allTemperament = useSelector((state) => state.filteredTemperament);


  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const selectedTemperament = e.target.value;
    dispatch(filterTemperaments(selectedTemperament));
  };

  return (
    <select onChange={handleFilterChange}>
        <option>For Temperament</option>
        <option value="allcharacters">All dogs</option>
        {allTemperament.map((temp) => {
            return(
                <option value={temp.name}>{temp.name}</option>
            )
        })}
    </select>
  );
};

export default FilterTemperament;
