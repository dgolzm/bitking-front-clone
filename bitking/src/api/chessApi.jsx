export function fetchPieces() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getInitialPieces());
    }, 300);
  });
}

function getInitialPieces() {
  const pieces = [];
  const order = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

  order.forEach((type, col) =>
    pieces.push({ id: `b${type[0]}${col}`, type, color: 'black', row: 0, col })
  );
  for (let col = 0; col < 8; col++)
    pieces.push({ id: `bp${col}`, type: 'pawn', color: 'black', row: 1, col });

  for (let col = 0; col < 8; col++)
    pieces.push({ id: `wp${col}`, type: 'pawn', color: 'white', row: 6, col });
  order.forEach((type, col) =>
    pieces.push({ id: `w${type[0]}${col}`, type, color: 'white', row: 7, col })
  );

  return pieces;
}

let currentTurn = 16;
export function fetchTurnNumber() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(currentTurn);
    }, 300);
  });
}

export function fetchClasses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        class1: 'alien',
        class2: 'robot',
      });
    }, 300);
  });
}

export function fetchNextEvent() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Tormenta Eléctrica',
        icon: '⚡',
        turnsRemaining: 2,
        description: 'Paraliza piezas por un turno',
      });
    }, 300);
  });
}