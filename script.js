let questionCount=0;
let score=0;
let ans; // holds correct ansewr to compare with user's choice
let timeOut=0; // checks if timer ran out
let rand; // generates a random number to mix up quiz order
let record=[];
let isActive=0;

function $(id){
    return document.getElementById(id);
}

let quiz=$("quiz");
let quizSet=$("quizSet");
let question=$("question");
let option1=$("option1");
let option2=$("option2");
let option3=$("option3");
let option4=$("option4");
let submit=$("submit");
let progress=$("progress");
let retake=$("retake");
let button1=$("btn1");
let button2=$("btn2");
let button3=$("btn3");
let button4=$("btn4");

let restult=$("result");
let resultBox=$("resultBox");


let tracker;
let countDown;
let secsInput=20;
let seconds=secsInput;
let t;

function setQuestion(qCount, rand){
    let ques= questions[rand];
    question.textContent=(qCount+1)+". "+ ques.question;
    option1.textContent=ques.option1;
    option2.textContent=ques.option2;
    option3.textContent=ques.option3;
    option4.textContent=ques.option4;
}

function changeProgressBar(qCount){
    progress.innerHTML="Question"+(qCount+1)+" 0f 10";
    tracker=$("num"+(qCount+1))
    tracker.style.backgroundColor="#cc7a00";
}

function defaultOptionColors() {
	button1.style.backgroundColor = "#e6f3ff";
	button2.style.backgroundColor = "#e6f3ff";
	button3.style.backgroundColor = "#e6f3ff";
	button4.style.backgroundColor = "#e6f3ff";
}


function getQuestion(qCount,rand){

    if(qCount==9){//is this the last question
        submit.innerHTML="Submit Test";
        submit.style.backgroundColor="green";
    }
    if(qCount>9){//ran out of questions
        return; //stops the function
    }

    setQuestion(qCount,rand);
    changeProgressBar(qCount);
    defaultOptionColors();

    startTimer(seconds,"timer");//reset and start the timer from the top
}


function setCorrect(){
    score++;//add 1 point to score
    tracker.style.backgroundColor="#009900";//change tracker to green
}

function setWrong(){
    tracker.style.backgroundColor="#cc0000";//change tracker to red
}

function finalScore(){

    if(score>5){
        result.innerHTML="Congrats! You passed! <br/> Your score is " + score+  "!";
    }

    else{
        result.innerHTML="Sorry, you failed. <br/> Your score is " +score+"!";
    }
}

function setResultPage(){
    quizSet.style.display="none";
    resultBox.style.display="block";
    progress.innerHTML="Quiz Completed"
    timer.textContent="00:00";
    finalScore();
}

function randomGenerator() {
	while(isActive == 0) {
		rand = Math.round(Math.random() * questions.length);
		if(rand !== questions.length) {
			//run through record array to find if its unique
			for(var j=0; j<record.length; j++) {
				if(rand === record[j]) {
					break;
				}
				
				else if(j == record.length - 1) {
					record[questionCount] = rand;
					isActive = 1;
				}
			}
		}
	}
	isActive = 0;
	return rand;
}

//Timer function

function startTimer(secs,elem){
    t=$(elem);
    t.innerHTML="00:"+ secs;

    if (secs<0){

        clearTimeout(countDown);
         
        //no option selected-set answer to wrong,cheking the colours of buttons
        if(button1.style.backgroundColor!=="rgb(26, 255, 26)" && 
            button2.style.backgroundColor!=="rgb(26, 255, 26)" &&
            button3.style.backgroundColor!=="rgb(26, 255, 26)"&&
            button4.style.backgroundColor!=="rgb(26, 255, 26)"){
            //if we are at the last question
                if(questionCount==9){
                    setWrong();
                    setResultPage();
                    return;//stop the function when last question is completed
                }

                setWrong();
                secs=secsInput;//set the timer back to 5s
                getQuestion(++questionCount,randomGenerator());//next question to be loaded

            }
        //if user has selected an option
        else{
            if (questionCount==9){
                //call set correct function when user's choice is the same as answer
                if(ans===questions[rand].answer){
                    setCorrect();
                }
                else{
                    setWrong();
                }
                setResultPage();
                return////stop the function when last question is completed
            }

        }
        //if question is not the last question
        //if user chose the right answer
        if(ans == questions[rand].answer) {
            setCorrect();
            secs = secsInput;
            getQuestion(++questionCount, randomGenerator());//go to the next question
        }
         //if user chose the wrong answer
        else {
            setWrong();
            secs = secsInput;
            getQuestion(++questionCount, randomGenerator());
        }

        return;//stop running the function once the timer has ran out
    }
    secs--;
    //recurring function
    countDown = setTimeout('startTimer('+secs+',"'+elem+'")', 1000);
}

// Make option selection work

option1.addEventListener("click",optionSelect);
option2.addEventListener("click",optionSelect);
option3.addEventListener("click",optionSelect);
option4.addEventListener("click",optionSelect);

function optionSelect(e){

//get parent elemnt and change background color
let parentEl=e.target.parentElement//get the target that is clicked and get the parent element
parentEl.style.backgroundColor="#1aff1a"; //change the colour to green

	//switch statement - the other buttons' colors go back to default
	switch(e.target.id) {
		case "option1": button2.style.backgroundColor = "#e6f3ff";
						button3.style.backgroundColor = "#e6f3ff";
						button4.style.backgroundColor = "#e6f3ff";
						break;
		case "option2": button1.style.backgroundColor = "#e6f3ff";
						button3.style.backgroundColor = "#e6f3ff";
						button4.style.backgroundColor = "#e6f3ff";
						break;
		case "option3": button1.style.backgroundColor = "#e6f3ff";
						button2.style.backgroundColor = "#e6f3ff";
						button4.style.backgroundColor = "#e6f3ff";
						break;
		case "option4": button1.style.backgroundColor = "#e6f3ff";
						button2.style.backgroundColor = "#e6f3ff";
						button3.style.backgroundColor = "#e6f3ff";
						break;
	}
	//set ans(answer) value based on the option selected 
	ans = parseInt(e.target.id.replace("option",""),10);
    //"option1" is converted to "1" 10 means that it will be an integer 
}


//6. Loading the next question after the next question button is clicked 
submit.addEventListener("click",nextQuestion);

function nextQuestion() {
	//no option selected
	console.log(button1.style.backgroundColor);
	console.log(button1.style.backgroundColor !== "rgb(26, 255, 26)");
	if(button1.style.backgroundColor !== "rgb(26, 255, 26)" && 
        button2.style.backgroundColor !== "rgb(26, 255, 26)" && 
        button3.style.backgroundColor !== "rgb(26, 255, 26)" && 
        button4.style.backgroundColor !== "rgb(26, 255, 26)") {
		alert("Please select an option");
		return;
	}

    else{
        clearTimeout(countDown); //stop the timer
        secs=secsInput; // set the timer value back to original
    }
		//if its the last question - load result page 
		if(questionCount == 9 && questionCount != 10) {
			if(ans == questions[rand].answer) {
				setCorrect();
			}
			else {
				setWrong();
			}
			setResultPage();
			return;
		}

        if(ans == questions[rand].answer) {
			setCorrect();
			getQuestion(++questionCount, randomGenerator());
		}
		else {
			setWrong();
			getQuestion(++questionCount, randomGenerator());
		}	
}

//7. Final parts - retake button, setting up random number for the first time, what happens when the page first loads etc
//Retake button 
retake.addEventListener("click",retakeTest);

function retakeTest() {
	window.location.reload();
}

rand = Math.round(Math.random() * questions.length);

while(rand == questions.length) {
	rand = Math.round(Math.random() * questions.length);
}

record[0] = rand;

//onload function
window.onload = getQuestion(questionCount, rand);


