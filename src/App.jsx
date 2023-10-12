import { useState } from "react";

import zx81desk from "/zx81desk.jpg";
import "./cssFIles/App.css";
import "./cssFIles/LandingPage.css";
import "./cssFIles/tvscreen.css";

import { TvScreen } from "./components/TvScreen";

function App() {
  const [count, setCount] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  return (
    <>
      <section id="image-container">
        <img src={zx81desk} id="zx81-image" />
        <TvScreen />
      </section>
      {window.innerWidth < 601 && (
        <section id="buttons">
          <button className="button" id="one" onClick={()=> window.location.replace("https://chriswilsonncnews.netlify.app/")}>
            1
          </button>

          <button className="button" id="two" onClick={()=> {
            console.log("clicked two")
            window.location.replace("https://clipchamp.com/watch/GNvttaH0by6")}}>
            2
          </button>

          <button className="button" id="three" onClick={()=>    window.location.replace("https://sabotage81.onrender.com")}>
            3
          </button>
        </section>
      )}
    </>
  );
}

export default App;
