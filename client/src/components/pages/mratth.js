import React, {useRef, useState, useEffect} from 'react';
import './mratth.css';

/* create the problem */

var maxNumber = 9
var additionProblems = [];
var subtractionProblems = [];
var multiplicationProblems = [];
var divisionProblems = [];

var problem, i;
for(i = 0; i < maxNumber; i++) {
    problem = {
        num1: i,
        num2: maxNumber - i,
        answer: i + (maxNumber - i),
        type: 'addition'
    }
    additionProblems.push(problem);
}


for(i = 0; i < maxNumber; i++) {
    problem = {
        num1: i,
        num2: i + maxNumber,
        answer: (i + maxNumber) - i,
        type: 'subtraction'
    }
    subtractionProblems.push(problem);
}

for(i = 0; i < Math.floor(maxNumber); i++) {
    problem = {
        num1: i,
        num2: Math.floor(Math.floor(maxNumber) / i),
        answer: i * Math.floor(Math.floor(maxNumber) / i),
        type: 'multiplication'
    }
    if(isFinite(problem.answer)){
        multiplicationProblems.push(problem);
    }

}



for(i = 0; i < maxNumber; i++) {
    problem = {
        num1: i,
        num2: i * maxNumber,
        answer: (i * maxNumber) / i,
        type: 'division'
    }
    if(isFinite(problem.answer)){
        divisionProblems.push(problem);
    }
}



/* retrieve the problem */


const getProblem = () =>{
    var problem = {
        num1: 0,
        num2: 0,
        answer: 0,
        type: 'addition'
    }
    var problemType = Math.floor(Math.random() * 4);
    switch(problemType) {
        case 0:
            problem = additionProblems[Math.floor(Math.random() * additionProblems.length)];
            break;
        case 1:
            problem = subtractionProblems[Math.floor(Math.random() * subtractionProblems.length)];
            break;
        case 2:
            problem = multiplicationProblems[Math.floor(Math.random() * multiplicationProblems.length)];
            break;
        case 3:
            problem = divisionProblems[Math.floor(Math.random() * divisionProblems.length)];
            break;
    }
    return problem;
}

const Mathle = () => {

    const guessContainer = useRef(); // guessContainer is a reference to the row in the guess container
    const toast = useRef(); // toast is a reference to the win, lose and invalid responses
    const modal = useRef(); // modal is a reference to the statistics and login modal
    const [activeGuess, setActiveGuess] = useState(0); // activeGuess is the current row/guess
    const [activeBox, setActiveBox] = useState(0); // activeBox is the current box in the current row/guess
    const [activeProblem, setActiveProblem] = useState(''); // activeProblem is the current problem
    const [result, setResult] = useState(''); // result is the message to display in the toast
    const [modalDisplay, setModalDisplay] = useState(false); // modalDisplay is the current modal to display
    
        /* turn the problem into a string for validation and set the active problem */

        const turnProblemtoString = (problem) =>{

            var problemString = "";

            switch(problem.type) {
                case 'addition':
                    problemString = problem.num1 + "+" + problem.num2 + "=" + problem.answer;
                    break;
                case 'subtraction':
                    problemString = problem.num2 + "-" + problem.num1 + "=" + problem.answer;
                    break;
                case 'multiplication':
                    problemString = problem.num1 + "*" + problem.num2 + "=" + problem.answer;
                    break;
                case 'division':
                    problemString = problem.num2 + "/" + problem.num1 + "=" + problem.answer;
                    break;
            }
            setActiveProblem(problemString);
            return problemString;
        }
        //if there's no active problem, get a new problem
        if (activeProblem === ''){
            turnProblemtoString(getProblem());
        }


        /* handle when the user presses a key in the box */
        const maxLength = 1 //only allow 1 character per box
        const onKeyDwn = async (e) => {
                const currentTextLength = e.target.outerText.length;
                //if the key pressed isn't backspace, delete, or enter or the box is full prevent the key from being pressed
                if (currentTextLength === maxLength && e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 13) { 
                    e.preventDefault();
                }
                //if the key pressed isn't a number prevent the key from being pressed
                if (!(/([0-9])|\+|\=|\-|\/|\*/).test(e.key)) {
                    e.preventDefault();
                }
                //if the key pressed is enter check the answer and move to the next box
                if (e.charCode == '13') {
                    console.log('checking answer');
                    await checkAnswer(guessContainer.current);
                    e.target.parentElement.nextElementSibling.firstElementChild.focus();
                }
                //if the key pressed is a number and the next box is empty, enter the number and move to the next box
                if ((/([0-9])|\+|\=|\-|\/|\*/).test(e.key) && e.target.nextElementSibling) {
                    if (activeBox < activeProblem.length - 1) {
                        setActiveBox(activeBox + 1);
                    }
                    e.target.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                    e.target.nextElementSibling.focus();
                    }, 50);
                }
        }
        const onKeyUp = (e) => {
            //if the key pressed was backspace or delete and the box is not empty delete and move to the previous box
            if (e.keyCode == 8 || e.keyCode == 46) {
                if (!e.target.innerText){
                    e.target.previousElementSibling.innerText = '';
                }else{
                    e.target.innerText = '';
                }
                if (e.target.previousElementSibling) {
                setActiveBox(activeBox - 1);
                e.target.previousElementSibling.focus();
                }

            }
        }
        //check the answer through the enter button on the virtual keyboard
        const enter = async () =>{
            console.log('checking answer');
            await checkAnswer(guessContainer.current);
           guessContainer.current.firstElementChild.focus();
        }

        /* check the answer */

        const checkAnswer = (guess) => {
            return new Promise((resolve) => {
                var answer = JSON.stringify(guess.innerText).replace(/\\n/g, '').replace(/"/g, '');
                var problem = activeProblem
                var correct = answer === problem;
                var activeBoxes = guess.querySelectorAll('.guessBox');
                const numKeys = document.querySelectorAll('.numberKey');
                //if the answer is a valid equation, check the answer
                if(evaluate(answer)){
                    //if the problem length isn't the same as the answer length, the answer will not be checked
                    if(answer.length != problem.length){
                        resolve();
                    }
                    //if the answer equals the problem, the user wins
                    if(correct) {
                        activeBoxes.forEach(box => {
                            box.classList.add('correct');
                            box.removeAttribute('contenteditable');
                        });
                        setResult('You win!');
                        toast.current.classList.add('show');
                        setTimeout(() => {
                            toast.current.classList.remove('show');
                        }, 1000);
                        setModalDisplay(true);
                        resolve();
                    } else { //if the answer doesn't equal the problem, the user either moves to the next container or loses
                        let diff = [];
                        let diffArray = [];
                        //find the difference between the answer and the problem
                        answer.split('').forEach(function(val, i){
                        if (val != problem.charAt(i)){
                            diff.push(val);   
                            diffArray.push(i);
                            if (problem.includes(answer.charAt(i))){
                                activeBoxes[i].classList.add('close'); //adds class to box if the number is contained in the answer
                            }else{
                                activeBoxes[i].classList.add('incorrect'); //adds class to box if the number is not contained in the answer
                            }
        
                        }else{
                            activeBoxes[i].classList.add('correct'); //adds class to box if the number is correct
                        }   
                        });
                        //colors the number keys in the footer
                        numKeys.forEach(key => {
                            if(answer.includes(key.innerText) && problem.includes(key.innerText) && diff.includes(key.innerText)){
                                key.classList.add('close');
                            }else if (diff.includes(key.innerText)){
                                key.classList.add('incorrect');
                            }else if(answer.includes(key.innerText) && problem.includes(key.innerText) && !diff.includes(key.innerText)){
                                key.classList.add('correct');
                            }
                        });
                        //if that was the last guess the user loses
                        if (activeGuess === 5){
                            setResult('You lose :(');
                            toast.current.classList.add('show');
                            setTimeout(() => {
                                toast.current.classList.remove('show');
                            }, 1000);
                            activeBoxes.forEach(box => {
                                box.removeAttribute('contenteditable');
                            });
                            setModalDisplay(true);
                        } else { //if not move on to the next row
                            setActiveGuess(activeGuess + 1);
                        }
                        setActiveBox(0); //reset the active box
                        resolve(); 
                    }
                } else { //if the answer is not a valid equation, the user can't move on
                    setResult(`sorry that's not a valid answer`);
                    shakeBox(guess);
                    toast.current.classList.add('show');
                    setTimeout(() => {
                        toast.current.classList.remove('show');
                    }, 1000);
                    resolve();
                }
            });
        }
        //evaluate the inputted equation to see if it is valid
        function evaluate(guess) {
            var input = guess.split('=')
            if (input[0].includes('+')){
                var nums = input[0].split('+');
                var userGuess =  parseInt(nums[0]) + parseInt(nums[1]);
                console.log(userGuess);
                console.log(parseInt(input[1]));
                if ((userGuess === parseInt(input[1]))){
                    return userGuess;
                }
            }
            if (input[0].includes('-')){
                var nums = input[0].split('-');
                var userGuess = parseInt(nums[0]) - parseInt(nums[1]);
                console.log(userGuess);
                console.log(parseInt(input[1]));
                if ((userGuess === parseInt(input[1]))){
                    return userGuess;
                }
            }
            if (input[0].includes('*')){
                var nums = input[0].split('*');
                var userGuess = parseInt(nums[0]) * parseInt(nums[1]);
                console.log(userGuess);
                console.log(parseInt(input[1]));
                if ((userGuess === parseInt(input[1]))){
                    return userGuess;
                }
            }
            if (input[0].includes('/')){
                var nums = input[0].split('/');
                var userGuess =  parseInt(nums[0]) / parseInt(nums[1]);
                console.log(userGuess);
                console.log(parseInt(input[1]));
                if ((userGuess === parseInt(input[1]))){
                    return userGuess;
                }
            }

        }
        //shake the box if the answer is not valid
        function shakeBox(box){
            box.classList.add('shake');
            setTimeout(() => {
                box.classList.remove('shake');
            }, 500);
        }

        /* make jsx elements */

        //make boxes for the guess
        const guessBoxes = (active) => {
            var i;
            var boxes = [];
            const editable = active == 'yes' ? 'true' : 'false';
            for(i = 0; i < activeProblem.length; i++) {
                boxes.push(<div key={i} data-key={i} onClick={()=>setActiveBox(i)} onKeyPress={onKeyDwn} onKeyUp={onKeyUp} className='guessBox' inputmode='numeric' contentEditable={editable}></div>);
            }
            return boxes;
        }

        //make the guess row
        const guesses = [];
        for(var i = 0; i < 6; i++) {
            if(i == activeGuess) {
            guesses.push(<div ref={guessContainer} className='guess activeGuess' key={i}>
                {guessBoxes('yes')}
            </div>)
            } else {
            guesses.push(<div className='guess' key={i}>
                {guessBoxes()}
            </div>)
            }
        }


        //make the number keys
        var validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '='];
        //number key click event
        const numberKey = (e) => {
            Array.from(guessContainer.current.querySelectorAll('.guessBox'))[activeBox].innerText += e.target.innerText;
            if (activeBox < activeProblem.length - 1) {
                Array.from(guessContainer.current.querySelectorAll('.guessBox'))[activeBox].nextElementSibling.focus();
                setActiveBox(activeBox + 1);
            }else {
                Array.from(guessContainer.current.querySelectorAll('.guessBox'))[activeBox].focus();
            }
        }
        //number key keyboard
        const numbers = [];
        for(var i = 0; i < validKeys.length; i++) {
            numbers.push(<div className='numberKey' key={i} onClick={numberKey}>{validKeys[i]}</div>)
        }



        /* focus on the first box on component mount */
        useEffect(() => {
            guessContainer.current.firstElementChild.focus();
        }, []);
        useEffect(() => {
        if(modalDisplay){
            modal.current.classList.add('show');
        }else{
            modal.current.classList.remove('show');
        }
        }, [modalDisplay]);
        return(
            <div>
                <div ref={toast} className='toast'>{result}</div>
                <div ref={modal} className='modal'>
                <div className='modalContent'>
                        <div className='close' onClick={()=>setModalDisplay(false)}>X</div>
                        <div className='modalHeader'>
                            <h1>Mathle</h1>
                            <h2>{result}</h2>
                        </div>
                        <div className='modalBody'>
                            <p>answer: {activeProblem}</p>
                            <p>number of guesses: {activeGuess + 1}</p>
                        </div>
                        <div className='modalFooter'>
                            <button onClick={()=>setModalDisplay(false)}>close</button>
                        </div>
                    </div>
                </div>
                <h1 style={{textAlign:`center`}}>Mathle</h1>
                <div className='guessHolder'>
                    {guesses}
                </div>
                <div className='numberHolder'>
                    {numbers}
                    <div onClick={enter} className='solve'>Enter</div>
                </div>
            </div>
        );    


}

export default Mathle;