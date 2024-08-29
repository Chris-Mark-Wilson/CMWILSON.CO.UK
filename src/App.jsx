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
        <img src={'/zx81desk.png'} id="zx81-image" />
        <TvScreen />
      </section>
    
    </>
  );
}

export default App;
