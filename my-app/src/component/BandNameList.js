import axios from "axios";
import React, { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
export default function BandNameList() {
  const [bandnames, setBandnames] = useState();
  const [triggerApiCall, setTriggerApiCall] = useState(false);
  function handleClick() {
    setTriggerApiCall(true);
  }

  useEffect(() => {
    if (!bandnames && triggerApiCall == true) {
      axios
        .get("http://localhost:8000/bandnames/all")
        .then((resp) => setBandnames(resp.data));
    }
  }, [triggerApiCall, bandnames]);

  return (
    <>
      <button
        className="App-button"
        type="button"
        id="button"
        onClick={handleClick}
      >
        See a list of upvoted band names!
      </button>
      {bandnames != null
        ? bandnames.map((bandname) => {
            return (
              <LikeButton
                bandname={bandname.name}
                likes={bandname.likes}
                key={bandname.id}
                id={bandname.id}
              />
            );
          })
        : null}
    </>
  );
}
