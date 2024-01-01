import React from 'react';
import styles from "./statistics.module.css";
import { getStatistics } from '../../utils/HandleApi';
import { useState, useEffect } from 'react';

const Statistics = ({bicycles}) => {
  const [statistics, setStatistics] = useState({
    totalBikes: 0,
    availableBikes: 0,
    bookedBikes: 0,
    averageBikeCost: 0.00,
  });
  useEffect(() => {
    // Fetch statistics initially
    fetchStatistics();

    // Update statistics whenever setBicycles changes
   

   
  }, [bicycles]);

  


  const fetchStatistics = async () => {
    try {
      const statisticsData = await getStatistics();
      setStatistics(statisticsData);
    } catch (error) {
      console.error('Error fetching statistics:', error.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.statistics}>
     <span className={styles.title}>STATISTICS</span> 
      <p>Total Bikes: <span className={styles.number}>{statistics.totalBikes}</span></p>
      <p>Available Bikes: <span className={styles.number}>{statistics.availableCount}</span></p>
      <p>Booked Bikes: <span className={styles.number}>{statistics.bookedCount}</span></p>
      <p>Average bike cost: <span className={styles.number}>{statistics.averageBikeCost} UAH/hr.</span></p>
      </div>
      
    </div>
  )
}

export default Statistics
