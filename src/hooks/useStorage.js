import { useEffect, useState } from "react";
import { fbStorage } from "../config/firebase";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(null);
  const [url, setUrl] = useState(null);

  let storageRef = fbStorage.ref();
  let uploadTask = storageRef.child("images/" + file.name);

  useEffect(() => {
    uploadTask.put(file).on(
      "state_changed",
      (snapshot) => {
        let percentage =
          Math.floor(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
        setProgress(percentage);
      },
      (err) => {
        setErrors(err);
      },
      async () => {
        const imageUrl = await uploadTask.getDownloadURL();
        setUrl(imageUrl);
      }
    );
  }, [file]);

  return { progress, url, errors };
};

export default useStorage;
