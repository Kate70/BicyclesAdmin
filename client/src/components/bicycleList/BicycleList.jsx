import React from 'react';
import BicycleItem from '../bicycleItem/BicycleItem';
import styles from "./bicycleList.module.css"

const BicycleList = ({bicycles, setBicycles}) => {
  return (
    <div className={styles.wrapperIndide}>
       <ul className={styles.list}>
      {bicycles.map((item) => (
        <li key={item._id}
        className={
          item.status === 'available'
            ? styles.available
            : item.status === "unavailable"
            ? styles.unavailable
            : item.status === 'busy'
            ? styles.busy
            : ''
        }>
          <BicycleItem {...item} setBicycles={setBicycles}/>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default BicycleList
