import React, { useState } from "react";
import styles from "./upload.module.css";

const Upload = ({ setFile, setImageDim, setError }) => {
  const [tempUrl, setTempUrl] = useState("");

  const handleChange = (e) => {
    setError(null);
    const file = e.target.files[0];
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        const url = URL.createObjectURL(file);
        setTempUrl(url);

        getImage(url).then((value) => {
          setImageDim(value);
          setFile(file);
        });
      } else {
        // Alert user wrong file
        setError("Invalid file type");
      }
    } else {
      // reset file if forum cancelled
      setTempUrl(null);
    }
  };

  const getImage = (data) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = data;
      img.onload = () => resolve(Math.floor((img.height / img.width) * 100));
      img.onerror = () => reject;
    });
  };

  // Rendering to much
  return (
    <div className={styles.containUpload}>
      {tempUrl ? (
        <div className={styles.image_contain}>
          <img src={tempUrl} className={styles.image} alt="user photo" />
        </div>
      ) : (
        <div className={styles.image_placeholder} />
      )}
      <label htmlFor="file" className={styles.label} />
      <input
        name="file"
        id="file"
        type="file"
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default Upload;
