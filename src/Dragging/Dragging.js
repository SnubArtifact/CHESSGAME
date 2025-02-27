let draggedPiece = null;
let startSquare = null;
let floatingPiece = null;

const initializeDragging = (boardElement) => {
  const squares = boardElement.querySelectorAll('.square');

 
  const createFloatingPiece = (piece, x, y) => {
    const floatingPiece = document.createElement('div');
    floatingPiece.textContent = piece;
    floatingPiece.classList.add('floating-piece');
    document.body.appendChild(floatingPiece);

    
    floatingPiece.style.position = 'absolute';
    floatingPiece.style.left = `${x}px`;
    floatingPiece.style.top = `${y}px`;

    return floatingPiece;
  };

  
  const updateFloatingPiecePosition = (x, y) => {
    if (floatingPiece) {
      floatingPiece.style.left = `${x}px`;
      floatingPiece.style.top = `${y}px`;
    }
  };

  
  const resetDraggingState = () => {
    if (startSquare) {
      startSquare.classList.remove('dragging');
      startSquare = null;
    }
    if (floatingPiece) {
      document.body.removeChild(floatingPiece);
      floatingPiece = null;
    }
    draggedPiece = null;
  };

  squares.forEach((square) => {
    square.addEventListener('mousedown', (e) => {
      if (!square.textContent) return; 

      draggedPiece = square.textContent;
      startSquare = square;
      square.textContent = '';
      square.classList.add('dragging');

      
      floatingPiece = createFloatingPiece(draggedPiece, e.clientX, e.clientY);
    });

    square.addEventListener('mouseup', () => {
      if (draggedPiece && startSquare !== square) {
        square.textContent = draggedPiece; 
      } else if (startSquare === square) {
        startSquare.textContent = draggedPiece; 
      }

      resetDraggingState();
    });

    
    square.addEventListener('mouseenter', () => {
      if (draggedPiece && startSquare !== square) {
        square.classList.add('valid-drop');
      }
    });

    square.addEventListener('mouseleave', () => {
      square.classList.remove('valid-drop');
    });
  });

  
  document.addEventListener('mousemove', (e) => {
    if (floatingPiece) {
      updateFloatingPiecePosition(e.clientX, e.clientY);
      e.preventDefault();
    }
  });

 
  document.addEventListener('mouseup', () => {
    if (draggedPiece && startSquare) {
      startSquare.textContent = draggedPiece; 
      resetDraggingState();
    }
  });
};

export default initializeDragging;