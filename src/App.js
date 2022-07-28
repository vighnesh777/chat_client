
import './App.css';
import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import Chat from './Chat';
const socket = io('https://vighneshschatserver.herokuapp.com/');
function App() {
  const [name,setName]=useState('');
  const rooms=['room1room','room2room'];
  const [erroMessage,setErrorMessage]=useState('');
  const [visible,setVisible]=useState(true);
  const [room,setRoom]=useState('');
  const joinHandle= (e)=>{
    e.preventDefault();
    if(name && room && rooms.includes(room)){
      
      socket.emit('join',{name,room}, (error)=>{
        if(error){
          alert(error);
          setName('');
          setRoom('');
          
        }
        
       
        
      }
      );
      setVisible(false);
    


      if(erroMessage)
      {
        console.log(erroMessage);
        setVisible(true);
      }
      
    }
    else if(!rooms.includes(room)){
      setErrorMessage("Room not available");
    }
    else{
      alert("Please enter name and room");
    }
    
  }
  useEffect(()=>{
    setTimeout(()=>{
      setErrorMessage("");
      
    },3000);
  }
  ,[erroMessage]);
  
  return (
    <div className="App">
{visible ?
      <div className='main-container'>
        <h1>Join Chat</h1>
        <input type="text" onChange={(e)=>{setName(e.target.value)} } placeholder="Your Name" />
        <input type="text" onChange={(e)=>{setRoom(e.target.value)}} placeholder="Room Name"/>
        <button onClick={joinHandle}>Join</button>
        {erroMessage &&
        <div className='error'>
          <i className="fas fa-exclamation-triangle"></i>
         <p className='error-message'>{erroMessage}</p>
        </div>}
      </div>
     :
      <Chat socket={socket} name={name} room={room} />
}
    </div>
  );
}

export default App;
