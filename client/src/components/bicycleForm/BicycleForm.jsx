import React from "react";
import styles from "./bicycleForm.module.css";
import { sendData } from "../../utils/HandleApi";
import { useState, useEffect } from "react";
import { getAllBicycles } from "../../utils/HandleApi";

const BicycleForm = ({ setBicycles }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    price: "",
    type: "",
    wheelSize: "",
    ID: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setFormErrors(validLength(formData));
    setIsSubmit(true);

    try {
      await sendData(formData);
      getAllBicycles(setBicycles);
      setFormData({
        name: "",
        color: "",
        price: "",
        type: "",
        wheelSize: "",
        ID: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formErrors]);
  const validLength = (value) => {
    const errors = {};
    if (!value.name || value.name.length < 5) {
      errors.name = "Name should be at least 5 characters long!";
    }
    if (!value.color || value.color.length < 5) {
      errors.color = "Color should be at least 5 characters long";
    }
    if (!value.price || isNaN(value.price)) {
      errors.price = "Price should be a valid number.";
    }
    if (!value.type || value.type.length < 5) {
      errors.type = "Type should be at least 5 characters long.";
    }
    if (!value.wheelSize || isNaN(value.wheelSize)) {
      errors.wheelSize = "Wheel size should be a valid number.";
    }
    if (!value.ID || value.ID.length < 5) {
      errors.ID = "ID should be at least 5 characters long.";
    }
    if (!value.description || value.description.length < 5) {
      errors.description = "Description should be at least 5 characters long.";
    }
    return errors;
  };

  const clearForm = () => {
    setFormData({
      name: "",
      color: "",
      price: "",
      type: "",
      wheelSize: "",
      ID: "",
      description: "",
    });
    setFormErrors({});
    setIsSubmit(false);
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <div className={styles.error}>{formErrors.name}</div>
              )}
            </label>
            <label>
              <input
                type="text"
                name="color"
                placeholder=" Color"
                value={formData.color}
                onChange={handleChange}
              />
              {formErrors.color && (
                <div className={styles.error}>{formErrors.color}</div>
              )}
            </label>
            <label>
              <input
                type="number"
                name="price"
                placeholder=" Price"
                value={formData.price}
                onChange={handleChange}
              />
              {formErrors.price && (
                <div className={styles.error}>{formErrors.price}</div>
              )}
            </label>
          </div>
          <div className={styles.column}>
            <label>
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
              />
              {formErrors.type && (
                <div className={styles.error}>{formErrors.type}</div>
              )}
            </label>
            <label>
              <input
                type="number"
                name="wheelSize"
                placeholder="Wheel size"
                value={formData.wheelSize}
                onChange={handleChange}
              />
              {formErrors.wheelSize && (
                <div className={styles.error}>{formErrors.wheelSize}</div>
              )}
            </label>

            <label>
              <input
                type="text"
                name="ID"
                placeholder="ID (Slug):xxxxx"
                value={formData.ID}
                onChange={handleChange}
              />
              {formErrors.ID && (
                <div className={styles.error}>{formErrors.ID}</div>
              )}
            </label>
          </div>
        </div>
        <label>
          <textarea
            name="description"
            placeholder=" Description"
            value={formData.description}
            onChange={handleChange}
          />
          {formErrors.description && (
            <div className={styles.error}>{formErrors.description}</div>
          )}
        </label>
      </form>
      <div className={styles.btn}>
        <button
          className={styles.btnSave}
          type="submit"
          onClick={handleSaveClick}
        >
          SAVE
        </button>
        <button className={styles.btnClear} onClick={clearForm}>
          CLEAR
        </button>
      </div>
      <div className={styles.horizontal}></div>
    </div>
  );
};

export default BicycleForm;
