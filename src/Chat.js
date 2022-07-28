import React, { useEffect ,useState} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import './chat.css';
function Chat({socket,name,room}) {
    const [message,setMessage]=useState('');
    const [messageList,setMessageList]=useState([]);
    const handleSend=async (e)=>{
        e.preventDefault();
        
        if(message){
            const messageData=
            {
                "name":name,
                "message":message,
                "room":room,
                "time":new Date().toLocaleTimeString()
            }
           await socket.emit('sendMessage',messageData);
            setMessageList([...messageList,messageData]);
            setMessage('');
        }
        
    }
    useEffect(()=>{
        socket.on('recieveMessage',(data)=>{
            console.log(data);
            setMessageList([...messageList,data]);
           
        })},[socket,messageList]);



  return (
    <div className='chat-container'>
        
       
           <ScrollToBottom className='body'>
           {messageList.map((message,index)=>{
                return(
                    <div className={message.name===name?"message-container you":"message-container other"} key={index}>
                        <div className='message'>
                            <p className='messageData'>{message.message}</p>
                        </div>
                        <div className='meta-data'>
                            <p className='name'>{message.name===name?"You":message.name}</p>
                            <p className='time'>{message.time}</p>
                        </div>
                    </div>
                )
            })}
           </ScrollToBottom>
        <div className='footer'>
            <input type='text' id='inputChat' className='textBox' placeholder='Type here' value={message} onChange={(e)=>{setMessage(e.target.value)}} onKeyDown={(e)=>{e.key==='Enter' && handleSend(e);}}/>
            <button onClick={handleSend} className='button'>&#10148;</button>
        </div>
    </div>
  )
}

export default Chat