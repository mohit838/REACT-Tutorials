import { useEffect, useState } from "react";
import axios from "./axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");

  const getApiData = async () => {
    try {
      const res = await axios.get("/posts");
      setData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      {isError !== "" && <h2>{isError}</h2>}
      <div className="mainApp">
        <div className="grid">
          {data.slice(0, 12).map((post) => {
            const { id, title, body } = post;

            return (
              <div key={id} className="cardDesign">
                <h2>{title.slice(0, 15).toUpperCase()}</h2>
                <p>{body.slice(0, 100)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
