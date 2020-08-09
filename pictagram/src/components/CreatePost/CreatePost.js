import React, { useState } from "react";

import Upload from "../Upload/Upload";

const CreatePost = () => {
  const [imageurl, setImageurl] = useState(null);

  return (
    <div>
      <p>Place holder for a blank image</p>
      {imageurl ? (
        <div style={{ width: "350px", height: "350px", overflow: "hidden" }}>
          <img src={imageurl} style={{ width: "100%" }} />
        </div>
      ) : (
        <div
          style={{
            width: "250px",
            height: "250px",
            backgroundColor: "lightgrey",
            margin: "0 auto",
          }}
        />
      )}
      <Upload setImageurl={setImageurl} imageurl={imageurl} />
    </div>
  );
};

export default CreatePost;
