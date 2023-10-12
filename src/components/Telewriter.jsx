import { useState, useEffect, useRef, useContext } from "react";
import { WrittenContext } from "../contexts/WrittenContext";

export const Telewriter = ({ txt, startPos }) => {
  const timerInterval = 50;
  const [feed, setFeed] = useState([]);
  const [timer, setTimer] = useState(0);
  const [index, setIndex] = useState(0);
  const { written, setWritten } = useContext(WrittenContext);
  const [block, setBlock] = useState(0);
  const [para, setPara] = useState(0);
  const [txtArray, setTxtArray] = useState(txt[0].split("\n"));
  const [end, setEnd] = useState(false);
  const screenRef = useRef(null);

  useEffect(() => {
    setFeed(() => {
      return new Array(txtArray.length).fill("\r");
    });

    screenRef.current.focus();
  }, [txtArray]);

  ///////////////TIMER//////////////
  useEffect(() => {
    setTimeout(() => {
      timer === 1000 && setTimer(() => 0);
      setTimer(timer + 1);
    }, timerInterval);
  }, [timer]);

  //////////TELEWRITER////////////
  useEffect(() => {
    if (!written) {
      if (index === txtArray[para].length - 1) {
        setPara((para) => para + 1);
        setIndex(() => 0);
      }
      if (txtArray[para][index] === "k") {
        setWritten(true);
      }
      if (txtArray[para][index] === "e") {
        setWritten(true);
        setEnd(true);
      }
      setFeed((oldFeed) => {
        oldFeed[para] += txtArray[para][index];
        setIndex((index) => index + 1);
        return [...oldFeed];
      });

      //scrollHeight increases beyond  clientHeight on overflow so...
      screenRef.current.scrollTo({
        top: screenRef.current.scrollHeight,
        left: 0,
        behaviour: "smooth",
      });
    }
  }, [timer]);
  useEffect(() => {
    setTxtArray(() => txt[block].split("\n"));
  }, [block]);

  useEffect(()=>{

      screenRef.current.focus()
 
  },[block,written])

  const handleKeyDown = (e) => {
    
    if (written) {
      if (txt.length - 1 > block) {
        setBlock(block + 1);
        setPara(0);
        setIndex(0);
        setWritten(false);
      }
    }
    if (written && end) {
      
      switch (e.nativeEvent.key.toLowerCase()) {
        case "1":
          window.open("https://chriswilsonncnews.netlify.app/","_blank","noreferrer");
          break;
        case "2":
          window.open("https://clipchamp.com/watch/GNvttaH0by6","_blank","noreferrer");
          break;
        case "3":
          window.open("https://sabotage81.onrender.com","_blank","noreferrer");
        default:
          break;
      }
    }
  };

  return (
  <>
      <div id="screen" ref={screenRef} tabIndex={0} onKeyDown={handleKeyDown}>
        {feed.map((paragraph, index) => {
          return (
            <p
              key={index}
              className="paragraph"
              style={{
                position: "relative",
                top: `${startPos.top}`,
                left: `${startPos.left}`,
              }}
              onClick={() => {
                console.log("clicked");
                screenRef.current.focus();
              }}
              onLoad={()=>{
                screenRef.current.focus();
              }}
            >
              {paragraph}
            </p>
          );
        })}
      </div>
      {window.innerWidth < 601 && end &&(
        <section id="buttons">
          <button className="button" id="one" onClick={()=> window.open("https://chriswilsonncnews.netlify.app/","_blank","noreferrer")}>
            
          </button>

          <button className="button" id="two" onClick={()=> {
            console.log("clicked two")
            window.open("https://clipchamp.com/watch/GNvttaH0by6","_blank","noreferrer")}}>
     
          </button>

          <button className="button" id="three" onClick={()=>    window.open("https://sabotage81.onrender.com","_blank","noreferrer")}>
           
          </button>
        </section>
      )}
      </> 
 
  );
};
