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
  const[end,setEnd]=useState(false)
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
        setWritten(true)
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

  const handleKeyDown = (e) => {
    console.log(written)
    if (written) {
      if (txt.length - 1 > block) {
        setBlock(block + 1);
        setPara(0);
        setIndex(0);
        setWritten(false);
      }
    }
    if(written&&end){
        console.dir(window.location)
switch (e.nativeEvent.key.toLowerCase()){
    case "1": window.location.replace('https://chriswilsonncnews.netlify.app/');
    break;
    case"2":window.location.replace('https://github.com/Chris-Mark-Wilson/SafeJourney')
    break;
    case"3":window.location.replace('https://sabotage81.onrender.com')
    default:break;
}
    }
  };

  return (
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
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
};
