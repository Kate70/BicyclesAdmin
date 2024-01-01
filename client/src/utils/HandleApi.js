import axios from "axios";

const baseUrl = "http://localhost:3000/api";

const getAllBicycles = (setBicycles) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log("data-->", data);
    setBicycles(data);
  });
};
const updateStatus = async (itemId, newStatus) => {
  try {
    const response = await fetch(`http://localhost:3000/api/update/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update status on the backend");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating status:", error.message);
    throw error;
  }
};

const sendData = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}`, formData);
  } catch (error) {
    console.error("Error sending data:", error.message);
    throw error;
  }
};

const removeBicycle = async (itemId, setBicycles) => {
  try {
    const response = await axios.delete(`${baseUrl}/${itemId}`);

    console.log("Bicycle removed successfully:", response.data);
  } catch (error) {
    console.error("Error removing bicycle:", error.message);
    throw error;
  }
};

const getStatistics = async () => {
  try {
    const response = await axios.get(`${baseUrl}/counts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error.message);
    throw error;
  }
};

export { getAllBicycles, updateStatus, sendData, getStatistics, removeBicycle };
