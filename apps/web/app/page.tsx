"use client";
import React, { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";

export default function Page(): JSX.Element {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  const sendMessageHandler = (e: any) => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    }
    sendMessage(message);
    setMessage("");
  };
  return (
    <div className={classes.parent}>
      <div className={classes.mobile}>
        <div className={classes.display_message}>
          {messages.map((msg, index) => (
            <p className={classes.dialoge} key={index}>{msg}</p>
          ))}
        </div>
        <form onSubmit={sendMessageHandler} className={classes.form}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className={classes.form_input}
            type="text"
            name="message"
            id="messageInput"
            placeholder="Messages..."
            autoComplete="off"
          />
          <button className={classes.form_button} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
