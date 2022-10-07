const tweetInput = document.getElementById('new-tweet');
const charLimit = 280

const tweets = [{text: 'This is how true happiness looks like 👍😜 #RandomTweets #blizzard2017 #blizzard #Happiness #funny #studentlife', date: 'Mar 16, 2017'}];

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "  " + strTime;
}

const formControl = () => {
    tweetInput.addEventListener('input', (e) => {
        const count = e.target.value.length
        if (count > charLimit || count === 0) {
            document.getElementById('char-count').classList.add('text-danger');
            document.getElementById('tweet').setAttribute('disabled', true);
        } else if (count > 0) {
            document.getElementById('tweet').removeAttribute('disabled');
        }
        document.getElementById('char-count').innerText = `${count} / ${charLimit} chars`
    })

    document.getElementById('tweet').addEventListener('click', () => {
        tweets.unshift({text: tweetInput.value, date: formatDate(new Date())});
        renderTweets();
    });
}

renderTweets = () => {
    document.getElementById('tweet-container').innerHTML = ' ';
    tweets.forEach(({text, date}, id, tweets) => {
        const newTweet = document.createElement('li')    
        newTweet.classList.add('container', 'mt-2', 'list-group-item')
        
        const tweetRow = document.createElement('div')
        tweetRow.classList.add('row')
        const tweetCol = document.createElement('div')
        tweetCol.classList.add('col-11')

        const newTweetText = document.createElement('p')
        newTweetText.classList.add('text-lg', 'fw-bold', 'fs-5')
        newTweetText.innerHTML = text.replace(/(^|[^@\w])@(\w{1,15})\b/g, `$1<a href="http://twitter.com/$2" class="link-primary text-decoration-none">@$2</a>`)

        const newTweetDate = document.createElement('p')
        newTweetDate.classList.add('text-end', 'text-secondary')   
        newTweetDate.innerText = date

        
        tweetCol.appendChild(newTweetText)
        tweetCol.appendChild(newTweetDate)

        const buttonCol =  document.createElement('div')
        buttonCol.classList.add('col-1', 'd-flex', 'justify-content-end', 'align-items-center') 

        const tweetDeleteBtn = document.createElement('button')
        tweetDeleteBtn.classList.add('btn-close', 'text-warning')
        tweetDeleteBtn.addEventListener('click', () => {
            tweets.splice(id, 1)
            console.log(tweets)
            renderTweets();
        })
        buttonCol.appendChild(tweetDeleteBtn); 
        

        tweetRow.appendChild(tweetCol)
        tweetRow.appendChild(buttonCol)
        newTweet.appendChild(tweetRow)
        
        document.getElementById('tweet-container').appendChild(newTweet)
        tweetInput.value = ''
    })
}

formControl();

renderTweets();