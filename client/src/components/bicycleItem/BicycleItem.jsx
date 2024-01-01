import React from 'react';
import styles from './bicycleItem.module.css'
import close from './close.svg';

import Dropdown from '../Dropdown/Dropdown';
import { useState } from 'react';
import { updateStatus,getAllBicycles,removeBicycle } from '../../utils/HandleApi';

const BicycleItem = ({ name,ID, _id,type, color, wheelSize, price, status,setBicycles }) => {
    const [selectedStatus, setSelectedStatus] = useState(status);

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable' },
    { value: 'busy', label: 'Busy' },
  ];
  const handleStatusChange = async(newStatus) => {
    try {
        // Perform PATCH request to update the status on the backend
        await updateStatus(_id, newStatus);
  
        // Update the local state with the new status
        setSelectedStatus(newStatus);
        getAllBicycles(setBicycles)
      } catch (error) {
        // Handle errors as needed
        console.error('Failed to update status:', error.message);
      }
  };

  const handleRemove = async () => {
    try {
      
      await removeBicycle(_id, setBicycles);
      getAllBicycles(setBicycles)
    } catch (error) {
      // Handle errors as needed
      console.error('Failed to remove bicycle:', error.message);
    }
  };
  return (
   <>
      {/* Left side */}
      <div className={styles.leftSide}>
        <span className={styles.title}>{name} <span className={styles.type}>- {type} ({color})</span></span>
        <p className={styles.itemId}>ID: {ID}</p>
        <div className={styles.status}><p className={styles.statusItem}>STATUS:</p>  <Dropdown
                options={statusOptions}
                selectedValue={selectedStatus}
                onSelect={handleStatusChange}
                setBicycles={setBicycles}
              /></div>
        
      </div>

      {/* Right side */}
      <div className={styles.rightSide}>
        <button onClick={handleRemove}><img src={close}></img></button>
        <p className={styles.price}>{price} <span>UAH/hr.</span> </p>
      </div>
      </>
  
  )
}

export default BicycleItem
