import { useState, useEffect, useRef, useContext } from "react";
import { WrittenContext } from "../contexts/WrittenContext";

export const Telewriter = ({ txt, startPos }) => {
  const timerInterval = 50;
  const [feed, setFeed] = useState([]);
  const [timer, setTimer] = useState(0);
  const [index, setIndex] = useState(0);
  const {written, setWritten} = useContext(WrittenContext);
const[block,setBlock]=useState(0)
  const [para, setPara] = useState(0);
  const screenRef = useRef(null);
const[txtArray,setTxtArray]=useState(txt[0].split("\n"))


  
  useEffect(() => {
 
    setFeed(() => {
      return new Array(txtArray.length).fill("\r");
    });
 
    screenRef.current.focus()
  }, [txtArray]);



  useEffect(() => {
    setTimeout(() => {
        timer===1000&&setTimer(()=>0)
      setTimer(timer + 1);
    }, timerInterval);
  }, [timer]);

  useEffect(() => {
      if(!written){

    if (index=== txtArray[para].length-1) {
      
      setPara(para=>para+1);
      setIndex(()=>0)
    }
    if(txtArray[para][index]==="k"){
        setWritten(true)
    }
    setFeed((oldFeed) => {
      
      oldFeed[para]+=(txtArray[para][index]);
      setIndex((index)=>index+1)
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
  
const handleKeyDown=(e)=>{
    if(written){
     if(txt.length-1>block){
        setBlock((block)=>block+1)
        setTxtArray(()=> txt[block].split("\n"))
        setWritten(false)

        

     }
    }
}





  return (
    <div id="screen" ref={screenRef} tabIndex={0}onKeyDown={handleKeyDown} >
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
            onClick={()=>{
                console.log("clicked")
                screenRef.current.focus()}}
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
};
