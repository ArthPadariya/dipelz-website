"use client";

import { useState } from "react";

export default function Chatbot() {

  const [open,setOpen] = useState(false);
  const [messages,setMessages] = useState([
    {
      role:"bot",
      text:"Hi 👋 Welcome to Dipelz support. How can I help you?"
    }
  ]);

  const [input,setInput] = useState("");

  const sendMessage = async () => {

    if(!input) return;

    const userMessage = {
      role:"user",
      text:input
    };

    setMessages(prev => [...prev,userMessage]);

    const res = await fetch("/api/chatbot",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:input
      })
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      {
        role:"bot",
        text:data.reply
      }
    ]);

    setInput("");

  };

  return (

    <div className="fixed bottom-6 right-6 z-50">

      {/* WHATSAPP BUTTON */}

      {!open && (

        <button
          onClick={()=>setOpen(true)}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition"
        >

          <img
            src="/whatsapp.png"
            className="w-8 h-8"
          />

        </button>

      )}

      {/* CHAT WINDOW */}

      {open && (

        <div className="w-[320px] h-[480px] rounded-2xl shadow-2xl overflow-hidden flex flex-col">

          {/* HEADER */}

          <div className="bg-[#075E54] text-white p-3 flex justify-between items-center">

            <div className="flex items-center gap-2">

              <img
                src="/logo.png"
                className="w-8 h-8 rounded-full"
              />

              <div>

                <p className="text-sm font-semibold">
                  Dipelz Support
                </p>

                <p className="text-xs text-green-200">
                  online
                </p>

              </div>

            </div>

            <button
              onClick={()=>setOpen(false)}
              className="text-xl"
            >
              ×
            </button>

          </div>

          {/* MESSAGES */}

          <div
            className="flex-1 p-3 overflow-y-auto space-y-2"
            style={{
              backgroundImage:"url('/whatsapp-bg.png')",
              backgroundSize:"cover"
            }}
          >

            {messages.map((msg,i)=>(

              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 text-sm rounded-lg ${
                  msg.role==="user"
                  ? "ml-auto bg-[#DCF8C6]"
                  : "bg-white"
                }`}
              >

                {msg.text}

              </div>

            ))}

          </div>

          {/* INPUT */}

          <div className="flex items-center gap-2 p-2 bg-gray-100">

            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              placeholder="Type a message"
              className="flex-1 px-3 py-2 rounded-full outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center"
            >

              ➤

            </button>

          </div>

          {/* WHATSAPP REDIRECT */}

          <a
            href="https://wa.me/919512115616"
            target="_blank"
            className="text-center text-green-600 text-sm py-2 bg-white border-t"
          >

            Chat on WhatsApp

          </a>

        </div>

      )}

    </div>

  );

}