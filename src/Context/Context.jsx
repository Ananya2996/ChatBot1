import { useState } from "react";
import runChat from "../config/askify";
import { Context } from "./context"; 

const ContextProvider = (props) => {
  const [response, setResponse] = useState("");  
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    // Placeholder for typing effect (e.g., to display text gradually)
    // Implement if needed, e.g., using setTimeout to append words
    setTimeout(() => {
      setResultData(prev=>prev+nextWord);
    }, 75*index);
  };

  const onSent = async (prompt) => {
    if (!prompt.trim()) {
      console.log("Prompt is empty, not sending");  
      return;
    }
    setResultData("");
    setLoading(true);
    setShowResult(true);
    
    setRecentPrompt(prompt);
    // Only add to prevPrompt if it's not already there (prevents duplicates)
    setPrevPrompt(prev => prev.includes(prompt) ? prev : [...prev, prompt]);
   
    try {
      const result = await runChat(prompt);
      console.log("runChat result:", result); 

      // Process the result for bold formatting (assuming **text** syntax)
      let responseArray = result.split("**");
      let newResponse = "";  // Initialize as empty string
      for (let i = 0; i< responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";  
        }
      }
      let newResponse2=newResponse.split("*").join("<br>")
     let newResponseArray= newResponse2.split(" ");
     for(let i=0;i<newResponseArray.length;i++){
         const nextWord = newResponseArray[i];
         delayPara(i,nextWord+" ")
     }
    } catch (error) {
      console.error("Error in onSent:", error); 
      setResultData("Error: Unable to get response.");
    }
    setLoading(false);
    setResponse("");  // Clear input
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    response,
    setResponse,
    resultData,
    setResultData
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
