import { ReactP5Wrapper } from '@p5-wrapper/react';
import './Game.css';
import { io, Socket } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';
import GameField from './GameField';
import axios from 'axios';


interface BallPos {
	x: number;
	y: number;
}

interface GameData {
	ballPos: BallPos;
	leftPlayerY: number;
	rightPlayerY: number;
	speedX: number;
	speedY: number;
  leftScore: number;
  rightScore: number;
}

interface PlayerData {
  name: string;
  avatar: string;
}


function Game() {

  const [started, setStarted] = useState<boolean>(false);

  const socketRef = useRef<Socket | null>(null);
  const [roomName, setRoomName] = useState<string>();

  const [socket, setSocket] = useState<Socket | null>(null);

  const [data, setData] = useState<GameData>();
  const [playerOne, setPlayerOne] = useState<PlayerData>();
  const [playerTwo, setPlayerTwo] = useState<PlayerData>();
  const [scale, setScale] = useState<number>(1);
  const [endMatch, setEndMatch] = useState<boolean>(false);


  const handleWindowResize = () => {
    if (window.innerWidth <= 600) {
      setScale(0.4);
    }
    else if (window.innerWidth <= 800) {
      setScale(0.5);
    }
    else if (window.innerWidth <= 1000) {
      setScale(0.6);
    }
    else if (window.innerWidth <= 1400) {
      setScale(0.8);
    }
    else {
      setScale(1);
    }
  };
  
  useEffect(() => {
    console.log("test");
    handleWindowResize();
    // Attach the resize event listener when the component mounts
    window.addEventListener('resize', handleWindowResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (socketRef.current === null) {
      socketRef.current = io( "http://localhost:3000/game", { withCredentials: true } );
    }
    setSocket(socketRef.current);
    
    socket?.on("join_room", async (obj: any) => {
      setData(obj.data);
      setRoomName(obj.roomName);

      await axios.get( `http://localhost:3000/users/byid?id=${obj.playerOneId}`, { withCredentials: true } )
      .then( (res) => {
        setPlayerOne({name: res.data.lastname, avatar: res.data.photo});
      })

      await axios.get( `http://localhost:3000/users/byid?id=${obj.playerTwoId}`, { withCredentials: true } )
      .then( (res) => {
        setPlayerTwo({name: res.data.lastname, avatar: res.data.photo});
      })

      setStarted(true);
      console.log("start");
    });

    socket?.on("update", (data: GameData) => {
      setData(data);
    });

    socket?.on("endMatch", () => {
      setEndMatch(true);
    });

    return () => {
      socket?.off("update");
      socket?.off("join_room");
      socket?.disconnect();
    };

  }, [socket]);


  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const divY = event.currentTarget.getBoundingClientRect().top;
    const posY = (event.clientY - divY) * (1/scale);
  
    socket?.emit("move", { posY, roomName });
  }


  if (endMatch) {
    socket?.disconnect();
    return (
      <div className='bg-black text-white text-xl'>
        --- End Match ---
      </div>
    );
  }
  else if (!started) {
    return (
      <div className='bg-black text-white text-xl'>
        --- waiting another player to join you ---
      </div>
    );
  }
  return (
    <div className="bg-black h-screen flex flex-col py-12  items-center space-y-4  overflow-y-scroll">
    <div className="absolute top-4 left-4 flex items-center space-x-2">
    <div className=" w-12 h-12 rounded-full bg-gray-400 "></div>
    <span className="text-white text-xl font-bold">leave the match</span>
    </div>
    <div className="flex space-x-16 lg:space-x-48 items-center">
      <span className="flex flex-col items-center space-y-2">
        <img src={playerOne?.avatar} className="h-16 lg:h-20 w-16 lg:w-20 rounded-full" />
        <span className='text-white text-lg font-mono font-bold'>{playerOne?.name}</span>
      </span>
      <span className="text-4xl lg:text-6xl text-white font-bold">VS</span>
      <span className="flex flex-col items-center space-y-2">
      <img src={playerTwo?.avatar} className="h-16 lg:h-20 w-16 lg:w-20 rounded-full" />
        <span className='text-white text-lg font-mono font-bold'>{playerTwo?.name}</span>
      </span>
    </div>
    <div  className='canvas' onMouseMove={handleMouseMove}>
      <ReactP5Wrapper sketch={GameField} leftPlayerY={data?.leftPlayerY} rightPlayerY={data?.rightPlayerY} ball={data?.ballPos}/>
    </div>
    <div className="flex flex-col items-center">
    <span className="text-2xl lg:text-4xl text-white font-bold underline">score</span>
    <div className="flex space-x-16 lg:space-x-48 items-center">
          <span className="text-white text-2xl lg:text-4xl font-black">{data?.leftScore}</span>
          <span className="text-white text-2xl lg:text-4xl font-black">:</span>
          <span className="text-white text-2xl lg:text-4xl font-black">{data?.rightScore}</span>
    </div>
    </div>
    </div>
  );
}

export default Game;
