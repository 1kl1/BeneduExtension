function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
document.addEventListener('DOMContentLoaded', function(event) {
    $.getJSON("scripts/data.json", function(json) {
        let rand = getRandomInt(0,400);
        let word_front = document.getElementById('wordFront')
        let word_back = document.getElementById('wordBack')
        let tempo = json.Eng_meanings[rand][1].replace(json.Eng_meanings[rand][0],'______')

        word_front.innerText = tempo;
        word_back.innerText = json.Eng_meanings[rand][0];

        document.getElementById('flip-card-btn-turn-to-back').style.visibility = 'visible';
        document.getElementById('flip-card-btn-turn-to-front').style.visibility = 'visible';
    
        document.getElementById('flip-card-btn-turn-to-back').onclick = function() {
            document.getElementById('flip-card').classList.toggle('do-flip');
            word_back.innerText = json.Eng_meanings[rand][0];
    
        };
    
        document.getElementById('flip-card-btn-turn-to-front').onclick = function() {
            document.getElementById('flip-card').classList.toggle('do-flip');
            
            rand = getRandomInt(0,400);
            tempo = json.Eng_meanings[rand][1].replace(json.Eng_meanings[rand][0],'______')
            word_front.innerText = tempo;

        };
    });

    
  
});

