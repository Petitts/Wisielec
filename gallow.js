//send a request to API for a secret
fetch("https://type.fit/api/quotes")
.then(response => {
    if (!response.ok) {
        throw new Error(`Connection error: ${response.statusText}`);
    }
    return response.json();
})
    .then(secretFromApi => {
        // choose ramdom quote from response
        const randomNumber = Math.floor(Math.random() * 16);
        const secret = secretFromApi[randomNumber].text.toUpperCase();
        // create blank secret text
        let secretBlank = createSecretBlank(secret);
        // an alphabet
        const alphabet= new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y" , "Z");
        // count a failure
        let failCounter = 0;
        

        // write the secretBlank in board div
        function writeSecret(){
            document.getElementById("board").innerHTML = secretBlank;

        }
        // create a alphabet keyboard in alphabet div
        function writeAlphabet(){
            let divContent = "";
            for(i=0; i<26; i++){
                divContent += '<div id="letter' + i + '" class="letter" ">' + alphabet[i] + '</div>';
            }
            document.getElementById("alphabet").innerHTML= divContent;
        }
        // generate secretBlank text
        function createSecretBlank(string){
            let result = "";
            for(i=0; i<string.length; i++){
                if(string.charAt(i)==" ")result += " ";
                else result += "-";
            }
            return result;
        }
        // replace char on specific position
        String.prototype.setChar = function(position, character){
            if(position > this.length - 1 || position < 0) return this.toString();
            else return this.substring(0, position) + character + this.substring(position + 1);
        }
        // start the game
        function start(){
            writeSecret();
            writeAlphabet();
        }


        start();
        // create event listener for alphabet keyboard
        const alphabetContainer = document.getElementById('alphabet');
        alphabetContainer.addEventListener('click', function(event){
            if (event.target.classList.contains("letter")){
                // identify a clicked letter
                const clickedElement = event.target;
                // hit initialize
                let hit = false;
                // get a letter number from id
                let letterNumber = clickedElement.id.substring("letter".length);
                // compare clicked letter with secret
                for(i=0; i<secret.length; i++){
                    if(secret.charAt(i) == alphabet[letterNumber]){
                        secretBlank = secretBlank.setChar(i ,alphabet[letterNumber]);
                        hit = true;
                    }
                }
                // hit handle
                if(hit){
                    document.getElementById("letter" + letterNumber).style.background = "#009900";
                    document.getElementById("letter" + letterNumber).style.color = "white";
                    document.getElementById("letter" + letterNumber).style.border = "3px solid #009900";
                    document.getElementById("letter" + letterNumber).style.cursor = "default";
                    writeSecret();
                }
                // fail handle
                else{
                    failCounter++;
                    document.getElementById("letter" + letterNumber).style.background = "#990000";
                    document.getElementById("letter" + letterNumber).style.color = "white";
                    document.getElementById("letter" + letterNumber).style.border = "3px solid #990000";
                    document.getElementById("letter" + letterNumber).style.cursor = "default";
                    document.getElementById("letter" + letterNumber).setAttribute("onclick",";");
                    document.getElementById("gallow").innerHTML = "<img src='img/s" + failCounter + ".jpg' alt='gallow'>";
                }
                // win
                if(secret == secretBlank){
                    document.getElementById("alphabet").innerHTML = "You Won !!!<br><br><button onclick='location.reload()' class='reset'>RESTART</button>";
                    document.getElementById("alphabet").style.cursor = "pointer";
                }
                // lose
                if(failCounter >= 9){
                    document.getElementById("alphabet").innerHTML = "You Lose :(<br><br><button onclick='location.reload()' class='reset'>RESTART</button>";
                    document.getElementById("alphabet").style.cursor = "pointer";
                }
            }
        });
})