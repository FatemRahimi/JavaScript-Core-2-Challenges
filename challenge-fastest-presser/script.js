const keyPresses = {
  l: 0,
  s: 0
}

const startGame = (seconds) => {
  document.addEventListener("keypress", keyBoardEvents);
  keyPresses.l = 0;
  keyPresses.s = 0;
  document.getElementById('l-box').style.backgroundColor = 'white'
  document.getElementById('s-box').style.backgroundColor =  'white'
  document.getElementById('s-count').innerText = keyPresses.s;
  document.getElementById('l-count').innerText = keyPresses.l;
  document.getElementById('s-winner').innerText = ' ';
  document.getElementById('l-winner').innerText = ' ';
  setTimeout(()=>{
    document.removeEventListener('keypress', keyBoardEvents, false)
    if(keyPresses.l > keyPresses.s) {
      document.getElementById('l-box').style.backgroundColor = 'green'
      document.getElementById('l-winner').innerText = 'Player two wins!';
    } else if (keyPresses.l < keyPresses.s){
      document.getElementById('s-box').style.backgroundColor = 'green'
      document.getElementById('s-winner').innerText = 'Player one wins!';
    } else {
      document.getElementById('s-winner').innerText = 'It\'s a draw';
      document.getElementById('l-winner').innerText = 'It\'s a draw';
    }
  }, seconds * 1000)

}

function keyBoardEvents(e) {
  if (e.keyCode === 83) {
    keyPresses.s++
    document.getElementById('s-count').innerText = keyPresses.s;
  } else if (e.keyCode === 76) {
    keyPresses.l++
    document.getElementById('l-count').innerText = keyPresses.l;
  }
}


document.getElementById('start').addEventListener("click", () => startGame(document.getElementById('start-seconds').value));
