
import React, { useEffect, useRef } from 'react';
import './Chessboard.css';
import  initialPieces  from '../Pieces/Pieces.js';
import  initializeDragging  from '../Dragging/Dragging.js';






const Chessboard = () => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  const boardRef = useRef(null);
  
  

 
  useEffect(() => {
    if (boardRef.current) {
      initializeDragging(boardRef.current);
    }
  }, []);
  
  

  return (
    <div className="board" ref={boardRef}>
      {ranks.map((rank) => (
        <div key={rank} className="row">
          {files.map((file) => {
            const square = `${file}${rank}`;
            const isDark = (files.indexOf(file) + rank) % 2 === 1;
            const piece = initialPieces[square] || '';

            return (
              <div
                key={square}
                className={`square ${isDark ? 'dark' : 'light'}`}
              >
                {piece}
              </div>
            );
          })}
        </div>
      ))}
       
       
    </div>
  );
};

export default Chessboard;