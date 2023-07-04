import React, { useState } from "react";

function UseModel() {
  const [inputValue, setInputValue] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/predict/${inputValue}`)
      .then((response) => response.json())
      .then((data) => setPrediction(data.predictions))
      .catch((error) => console.error(error));
  };

  const handleReport = () => {
    // onClick button route to registerComplaint page
    window.location.href = "/registerComplaint";
  };

  return (
    <div class="flex flex-col justify-center items-center h-screen bg-black-gradient">
      <form class="w-full max-w-sm" onSubmit={handleSubmit}>
        <div class="flex items-center border-b-2 border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={inputValue}
            onChange={handleInput}
            placeholder="Input message"
          />
          <button
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Predict
          </button>
        </div>
      </form>
      <br />
      {prediction && <div class="text-white mt-3">Results: {prediction}</div>}
      <br />
      <button
        class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        disabled={!prediction}
        onClick={handleReport}
      >
        Report{" "}
      </button>
    </div>
  );
}

export default UseModel;
