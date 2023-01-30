import Head from 'next/head';
import Image from 'next/image';
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { useState } from 'react';

const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [userInputName, setUserInputName] = useState(' ')

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInputName, userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
  }

  const onUserChangedName = (event) => {
    console.log(event.target.value);
    setUserInputName(event.target.value);
  };

  const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
  };

  const [text, count] = useTypewriter({
    words: [
        "Elon Musk, Is AI a force for good?", 
        "Messi, your favourite goal?", 
        "Master Chief, How tall are you?"
    ],
    loop: true,
    delaySpeed: 400,
    cursor: true,
  });

  return (
    <div className="root">
      <Head>
        <title>TextMateAI</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>TextMateAI</h1>
          </div>
          <div className="header-subtitle">
            <h2>If you could ask anyone a question who and what would you ask?</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
        <form className="form-input">
              <label for="Name">Name:  </label><input className="form-text" type="text" value={userInputName} onChange={onUserChangedName}/></form>
          <div className="prompt-input">
            <textarea  className="prompt-box" type="text"
          placeholder={text} 
          value={userInput}
          onChange={onUserChangedText} /> </div>
        <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint} >
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
            </a>
            </div>
          {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
            <h3>Output</h3>
        </div>
          </div>
              <div className="output-content">
                <p>{apiOutput}</p>
          </div>
              </div>
            )}
        </div>
      </div>
    <div className='footer'> <h3>
      TextMateAI Beta 2023</h3></div>    
    </div>
  );
};


export default Home;
