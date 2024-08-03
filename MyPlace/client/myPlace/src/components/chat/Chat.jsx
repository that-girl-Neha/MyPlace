import { useContext, useState,useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import {SocketContext}  from "../../context/SocketContext";
import apiRequest from "../../library/apiRequest";
import  {format}  from "timeago.js";
import "./Chat.scss";
import { useNotificationStore } from "../../library/notificationStore";

function Chat({chats}){
   
    
const [chat,setChat]=useState(false);
const  {currentUser} = useContext(AuthContext);

const  {socket}  = useContext(SocketContext);

const  messageEndRef = useRef();

const decrease = useNotificationStore((state) => state.decrease);

useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
//console.log(chats)
   const handleOpenChat = async (id,receiver)=>{
            try{
           const res = await  apiRequest("/chats/" + id);
           if (!res.data.seenBy.includes(currentUser.id)) {
            decrease();
          }
           setChat({...res.data , receiver});
            }
            catch(err){
                console.log(err);
            }
   }

   const handleSubmit = async (e)=>{
        e.preventDefault();

        const formData = new FormData(e.target);
        const text = formData.get("text");

        if(!text)return;

        try{
          const res = await apiRequest.post("/messages/" + chat.id ,{text});
          setChat(prev => ({...prev , messages:[...prev.messages,res.data]}));
          e.target.reset();
          socket.emit("sendMessage", {
            resceiverId : chat.receiver.id,
            data : res.data,
          });
        }
        catch(err){
            console.log(err);
        }
   };

   useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if ((chat && socket)) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);


    return (<>
        <div className="chat">
       
            <div className="messages">
                <h1>Messages</h1>
                {
                    chats?.map(c=>(
                        <div className="message" key={c.id}
                        style={{
                     backgroundColor: c.seenBy.includes(currentUser.id)|| chat?.id === c.id
                              ?"white":
                              "fecd514e",
                        }}
                         onClick={()=>handleOpenChat(c.id,c.receiver)}>
                            <img src={c.receiver.avatar || "/noavatar.jpg"} alt=""/>
                            <span>{c.receiver.username}</span>
                            <p>{c.lastMessage}</p>
                        </div>
                    ))
                }
                <div ref={messageEndRef} ></div>
            </div>
            {chat && (<div className="chatBox">
                <div className="top">
                    <div className="user">
                    <img src={chat.receiver.avatar || "/noavatar.jpg"} alt=""/>
                    {chat.receiver.username}
                    <span className="close" onClick={()=>setChat(null)}>𐤕</span>
                    </div>
                </div>
                <div className="center">
                   {
                    chat.messages.map((message)=>(
                       <div className="chatMessage " 
                       key={message.id}
                       style={{
                        alignSelf: message.userId === currentUser.id ? "flex-end":"flex-start",
                        textAlign: message.userId === currentUser.id ? "right":"left",
                       }}
                       >
                        <p>{message.text}</p>
                        <span>{format(message.createdAt)}</span>
                    </div>  
                    ) )
                   }
                   
                </div>
                <form className="bottom" onSubmit={handleSubmit}>
                    <textarea name="text" ></textarea>
                    <button>Send</button>
                </form>
            </div>)}
        </div>
    </>);
}

export default Chat;