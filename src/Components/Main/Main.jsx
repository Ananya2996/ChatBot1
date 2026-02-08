import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/context'

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setResponse, response } = useContext(Context)

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Types of keys in DBMS</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Suggest me places to visit in Delhi</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Difference between social and anti-social</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr/>
                  <hr/>
                </div>
               
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="main-bottom">
        <div className="search-box">
          <input 
            onChange={(e) => setResponse(e.target.value)} 
            value={response} 
            type="text" 
            placeholder='Enter a prompt here' 
          />
          <div>
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            {response?<img 
              onClick={() => { onSent(response); }} 
              src={assets.send_icon} 
              alt="Send Icon" 
            />:null}
          </div>
        </div>
        <p className="bottom-info">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga autem dolores animi ducimus aut, natus perspiciatis quas vel eaque 
        </p>
      </div>
    </div>
  )
}

export default Main