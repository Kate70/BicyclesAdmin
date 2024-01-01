import React, { useEffect, useState } from 'react'
import styles from "./main.module.css"
import BicycleList from '../bicycleList/BicycleList'
import BicycleForm from '../bicycleForm/BicycleForm'
import { getAllBicycles } from '../../utils/HandleApi'
import Statistics from '../statistics/Statistics'

const Main = () => {
  const [bicycles, setBicycles] = useState([])

  useEffect(()=>{
    getAllBicycles(setBicycles)
  },[])
  return (
    <>
   <span className={styles.title}>ADMIN.BIKE-BOOKING.COM</span>
   <div className={styles.wrapperMain}>
    
   
   <div className={styles.wrapper}>
   <BicycleList bicycles={bicycles} setBicycles= {setBicycles}/>
   </div>
   <div className={styles.container}>
      <BicycleForm setBicycles= {setBicycles}/>
      <Statistics setBicycles= {setBicycles} bicycles={bicycles} />
    </div>
   </div>
   
   <span className={styles.footer}><span>Developer:</span> Kateryna Rudenko</span>
   </>
  )
}

export default Main
