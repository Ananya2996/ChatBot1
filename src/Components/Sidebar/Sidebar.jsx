import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
   
    await onSent(prompt);
  };

  const handleNewChat = () => {
    // Reset to start a new chat; adjust logic as needed (e.g., clear history or set empty prompt)
    setRecentPrompt("");
    // Optionally, call onSent with an empty string to reset or start fresh
    // await onSent("");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />
        <div className="new-chat" onClick={handleNewChat}>
          <img src={assets.plus_icon} alt="new chat" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div
                key={index}
                className="recent-entry"
                onClick={() => loadPrompt(item)}
              >
                <img src={assets.message_icon} alt="message" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
