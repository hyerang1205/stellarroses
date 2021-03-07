const PLAYERONE_TOKEN = 'X';
const PLAYERTWO_TOKEN = 'O';

let playerTurn = 0;
//check horizontal win combo
// for (let i = 0; i <targetListBool.length ; i+=4) {
//   if(targetListBool[i]
//   &&targetListBool[i+1]
//   &&targetListBool[i+2]
//   &&targetListBool[i+3]){
//       console.log('win');
//   }
// }




  //   $this = $(this);
  //   const i = $this.data('i');
  //   const j = $this.data('j');
  //   const k = $this.data('k');
  //
  //   if (playerTurn == 0) {
  //     $this.html(PLAYERONE_TOKEN);
  //     grid[k][i][j] = PLAYERONE_TOKEN;
  //     playerTurn = 1;
  //   } else if (playerTurn == 1) {
  //     $this.html(PLAYERTWO_TOKEN);
  //     grid[k][i][j] = PLAYERTWO_TOKEN;
  //     playerTurn = 0;
  //   }
  //
  //   if (isGameOver() === PLAYERONE_TOKEN) {
  //     console.log('Player one Wins');
  //     alert('Player One Wins');
  //   } else if (isGameOver() === PLAYERTWO_TOKEN) {
  //     console.log('Player Two Wins');
  //     alert('Player Two Wins');
  //   }
  // });
  //
  // $('#restart').click(function(){
  //   $('.col').html(" ");
  //
  // });
  //
  // function isGameOver(){
  //   //only check rows
  //   for(let k = 0; k < 4; k++) {
  //     for(let i = 0; i < 4; i++) {
  //       if(grid[k][i][0] !== ' ' && grid[k][i][0] === grid[k][i][1] && grid[k][i][0] === grid[k][i][2] && grid[k][i][0] === grid[k][i][3]) {
  //         return grid[k][i][0];
  //       }
  //
  //     }
  //   }
  //
  //   //for the diagonal
  //   for(let k = 0; k < 4; k++) {
  //     if(grid[k][0][0] !== ' '
  //     && grid[k][0][0] === grid[k][1][1]
  //     && grid[k][0][0] === grid[k][2][2]
  //     && grid[k][0][0] === grid[k][3][3]){
  //       return grid[k][0][0];
  //     }
  //
  //     if(grid[k][0][3] !== ' '
  //     && grid[k][0][3] === grid[k][1][2]
  //     && grid[k][0][3] === grid[k][2][1]
  //     && grid[k][0][3] === grid[k][3][0])  {
  //       return grid[k][0][3];
  //     }
  // }
  //
  //   //only check vertical
  //   for(let k = 0; k < 4; k++) {
  //     for(let j = 0; j < 4; j++) {
  //       if(grid[k][0][j] !== ' ' && grid[k][0][j] === grid[k][1][j] && grid[k][0][j] === grid[k][2][j] && grid[k][0][j] === grid[k][3][j]) {
  //         return grid[k][0][j];
  //       }
  //     }
  //   }
  //
  //   //checks up and down 3d
  //   for(let i = 0; i < 4; i++) {
  //     for(let j = 0; j < 4; j++) {
  //       if(grid[0][i][j] !== ' ' && grid[0][i][j] === grid[1][i][j] && grid[0][i][j] === grid[2][i][j] && grid[0][i][j] === grid[3][i][j]) {
  //         return grid[0][i][j];
  //       }
  //     }
  //   }
  //
  //
  //   //checks diagonal 3d
  //   // for(let i = 0; i < 4; i++) {
  //   //   for(let k = 0; k < 4; k++) {
  //   //     if(grid[0][i][j] !== ' ' && grid[0][i][j] === grid[1][i][j] && grid[0][i][j] === grid[2][i][j] && grid[0][i][j] === grid[3][i][j]) {
  //   //       return grid[0][i][j];
  //   //     }
  //   //   }
  //   }
  //
  //
  //
