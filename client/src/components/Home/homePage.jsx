import React from 'react';
import styles from './homePage.module.css';
import NavBar from '../navBar/navBar';
import DogCards from '../dogsCards/dogsCards';

const HomePage = () => {
    return(
        <div className={styles.containerHome}>
            <NavBar />
            <DogCards />
        </div>
    )
}

export default HomePage;