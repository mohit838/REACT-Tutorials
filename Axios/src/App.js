import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="mainApp">
      <div className="grid">
        {data.map((post) => {
          const { id, title, body } = post;

          return (
            <div key={id} className="cardDesign">
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
