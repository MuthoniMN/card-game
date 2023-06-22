if(!localStorage.getItem('deckId')){   

    fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
    console.log(data)
    let deckId = data.deck_id

    localStorage.setItem('deckId', deckId)
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

if (!localStorage.getItem('player1')) {
    localStorage.setItem('player1', 0)
}

if (!localStorage.getItem('player2')) {
    localStorage.setItem('player2', 0)
}

document.querySelector('#play').addEventListener('click', drawTwo)



function drawTwo(){
    const deck = localStorage.getItem('deckId') 
  const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        document.getElementById('player1').src = data.cards[0].image
        document.getElementById('player2').src = data.cards[1].image

        let player1Val = getNumber(data.cards[0].value)
        let player2Val = getNumber(data.cards[1].value)

        checkWin(player1Val, player2Val)

        document.getElementById('player1Score').innerText = localStorage.getItem('player1')
        document.getElementById('player2Score').innerText = localStorage.getItem('player2')
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function getNumber(val) {
    if (val === 'ACE') {
        return 1
    }else if(val === "JACK"){
        return 11
    }else if(val === "QUEEN"){
        return 12
    }else if(val === "KING"){
        return 13
    }else{
        return val
    }
}

function checkWin(a, b) {
    if(a > b){
        document.getElementById('result').innerText = 'Player 1 Wins!!'
        let player1 = Number(localStorage.getItem('player1'))
        player1 += 1
        localStorage.setItem('player1', player1)
    }else if(b > a){
        document.getElementById('result').innerText = 'Player 2 Wins!!'
        let player2 = Number(localStorage.getItem('player2'))
        player2 += 1
        localStorage.setItem('player2', player2)
    }else if(a === b){
        document.getElementById('result').innerText = "It's War"
    }
}

document.querySelector('#reset').addEventListener('click', () => {
    localStorage.clear()
    window.location.reload()
})