
'use client'
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { FaTimes } from 'react-icons/fa'; 

const socket = io('http://localhost:4002'); 

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const handleChatMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      showNotification(message);
    };

    socket.on('chatMessage', handleChatMessage);

    return () => {
      socket.off('chatMessage', handleChatMessage);
    };
  }, []);

  const handleSendMessage = () => {
    // Check if the message is not empty before sending
    if (newMessage.trim() !== '') {
      // Emit a chatMessage event to the server
      socket.emit('chatMessage', newMessage);
      setNewMessage('');
    } else {
      // Handle empty message (show a notification, for example)
      console.log("Message cannot be empty!");
    }
  };

  const handleClose = () => {
    // Implement your logic for closing the chat box (e.g., unmounting the component)
    // For now, let's clear the messages
    setMessages([]);
    setChatVisible(false);
  };

  const handleOpen = () => {
    setChatVisible(true);
    setUnreadMessages(0);
  };

  const showNotification = (message) => {
    // Check if the chat box is not currently visible
    if (!chatVisible) {
      // Increase the unread messages count
      setUnreadMessages((prevUnreadMessages) => prevUnreadMessages + 1);
    }

    if (Notification.permission === 'granted') {
      new Notification('New Message', {
        body: 'You have a new message!',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('New Message', {
            body:'You have a new message!',
          });
        }
      });
    }
  };
  

  return (
    <>
      {chatVisible && (
    <div className="fixed bottom-4 right-4 w-80 border rounded overflow-hidden bg-green-100" style={{ borderColor: 'black' }}>
      <div className="flex justify-end items-center p-2">
        <button
          onClick={handleClose}
          className="p-2 rounded border cursor-pointer"
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          <FaTimes />
        </button>
      </div>
      <div className="p-4 max-h-48 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">{message}</div>
        ))}
        <div className="flex items-center p-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-3/4 p-2 mr-2 rounded border bg-green-100" 
          />
          <button
            onClick={handleSendMessage}
            className="p-2 rounded border cursor-pointer"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    )}
    {!chatVisible && (
      <button
        onClick={handleOpen}
        className="fixed bottom-4 right-4 p-2 rounded cursor-pointer"
        style={{ backgroundColor: 'blue', color: 'white' }}
      >
        Chat
      </button>
    )}
  </>
);
};
export default AdminChat;
