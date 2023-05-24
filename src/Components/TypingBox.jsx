import React, { createRef, useMemo, useState, useRef, useEffect } from 'react'
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TestModeContext';
import Stats from './Stats'


var randomwords = require('random-words');

const TypingBox = () => {
    //use useref to refernce the input
    //reference is a object
    const inputRef = useRef(null);
    const { testTime } = useTestMode();
    //countdwn for timer
    const [countDown, setCountDown] = useState(testTime);
    const [intervalId, setIntervalId] = useState(null);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [wordsArray, setWordsArray] = useState(() => {
        return randomwords(50);
    });

    //for macthing the character need index
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);

    const [graphData, setGraphData] = useState([]);

    //use usememo, and createref to create the reference of each  span word in wordsArray
    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null));
    }, [wordsArray]);


    const startTimer = () => {

        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);
        function timer() {
            setCountDown((latestCountDown) => {

                setCorrectChars((correctChars)=>{

                    setGraphData((graphData)=>{
                        return [...graphData, [testTime-latestCountDown+1, (correctChars/5)/((testTime-latestCountDown+1)/60)]];
                    })
                    return correctChars;
                })

                if (latestCountDown === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }

                return latestCountDown - 1;
            });
        }
    }

    const resetTest = () => {
        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrCharIndex(0);
        setCurrWordIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomwords(50));
        resetWordsSpanRefClassname();
        focusInput();
    }


    const resetWordsSpanRefClassname = () => {
        wordsSpanRef.map(i => {
            Array.from(i.current.childNodes).map(j => {
                j.className = '';
            })
        });
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }
    //  console.log(wordsSpanRef);

    const handleUserInput = (e) => {

        //ontyping starttimer and this statement only runs once
        if (!testStart) {
            startTimer();
            setTestStart(true);
        }

        // console.log(e);

        const allCurrChar = wordsSpanRef[currWordIndex].current.childNodes;

        // check user is typing space 
        if (e.keyCode === 32) {

            let correctCharsInWord = wordsSpanRef[currCharIndex].current.querySelectorAll('correct');

            if (correctCharsInWord === allCurrChar.length) {
                setCorrectWords(correctWords + 1);
            }

            //logic for spcae
            if (allCurrChar.length <= currCharIndex) {
                //remove cursor from last place in a word
                allCurrChar[currCharIndex - 1].classList.remove('current-right');
            }
            else {
                //calculate the missed chars
                setMissedChars(missedChars + (allCurrChar.length - currCharIndex));
                //remove cursor in between the words
                allCurrChar[currCharIndex].classList.remove('current');
            }

            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';

            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;

        }

        //logic for backspace
        if (e.keyCode === 8) {

            if (currCharIndex !== 0) {

                if (allCurrChar.length === currCharIndex) {

                    if (allCurrChar[currCharIndex - 1].className.includes('extra')) {
                        allCurrChar[currCharIndex - 1].remove();
                        allCurrChar[currCharIndex - 2].className += ' current-right';
                    }
                    else {
                        allCurrChar[currCharIndex - 1].className = 'current';
                    }

                    setCurrCharIndex(currCharIndex - 1);
                    return;
                }

                allCurrChar[currCharIndex].className = '';
                allCurrChar[currCharIndex - 1].className = 'current';
                setCurrCharIndex(currCharIndex - 1);
            }

            return;

        }

        if (currCharIndex === allCurrChar.length) {

            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'incorrect extra current-right';
            allCurrChar[currCharIndex - 1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            //count extra chars
            setExtraChars(extraChars + 1);
            return;
        }



        if (e.key === allCurrChar[currCharIndex].innerText) {
            //change the color of char
            allCurrChar[currCharIndex].className = 'correct';

            //correct char calc
            setCorrectChars(correctChars + 1);
        }
        else {
            allCurrChar[currCharIndex].className = 'incorrect';

            //correct char calc
            setIncorrectChars(incorrectChars + 1);
        }

        // if index at last char of word chnage the classname
        if (currCharIndex + 1 === allCurrChar.length) {
            allCurrChar[currCharIndex].className += ' current-right';
        }
        else {
            allCurrChar[currCharIndex + 1].className = 'current';
        }



        setCurrCharIndex(currCharIndex + 1)
    }

    //calculate the WPA
    const calculateWPM = () => {
       return Math.round((correctChars / 5) / (testTime));
    }

    const calculateAcc = () => {
       return Math.round((correctWords / currWordIndex) * 100);
    }
    // console.log(inputRef);
    // console.log(calculateAcc() + " acc and wpm " + calculateWPM());
    //on page load the focus on inputbox
    const focusInput = () => {
        inputRef.current.focus();
    }



    useEffect(() => {
        resetTest();
    }, [testTime])

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }, []);

    return (
        <div>
            <UpperMenu countDown={countDown} />


            {(testEnd) ? (
            <Stats wpm={calculateWPM()}
                accuracy={calculateAcc()}
                correctChars={correctChars}
                incorrectChars={incorrectChars}
                missedChars={missedChars}
                extraChars={extraChars}
                graphData={graphData}
            />) : (<div className='type-box' onClick={focusInput}>
                <div className="words">
                    {
                        wordsArray.map((word, index) => (
                            <span className='word' ref={wordsSpanRef[index]}>
                                {
                                    word.split('').map(char => (
                                        <span>{char}</span>
                                    ))
                                }
                            </span>
                        ))
                    }
                </div>
            </div>)}

            <input type="text"
                className='hidden-input'
                ref={inputRef}
                onKeyDown={handleUserInput}
            />
        </div>
    )
}

export default TypingBox;