import React, {createRef} from "react";
var store = require('store-js');

const saying = [
    "Write something fun",
    "How's your day?",
    "A journal a day keeps the sad away",
    "Throw it in the void"
];
const ml = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
console.log(saying);
const sayingIndex = Math.round(Math.random(saying.length));
console.log(sayingIndex);
const funSaying = saying[sayingIndex];
const current = new Date();
const month = current.getMonth();
const year = current.getFullYear();
const day = current.getDate();
var activeMonth = month;
var activeYear = year;
var activeDay = day;
var monthName = ml[activeMonth];
var numDays = new Date(activeYear, activeMonth+1, 0).getDate();
var pageTitle = `${activeDay}+${monthName}+${activeYear}`;
var journalPage = store.get(pageTitle);
const journalEntry = createRef();
var freshText = 0;
var bgColor = `#ffffff`;
var bodyStyle = `body{background-color: ${bgColor};transition: background-color ease 0.1s;}`

class DaySection extends React.Component{
    state = {
        activeIndex: activeDay-1,
        color: bodyStyle,
        backgroundColor: bgColor,
        pathc1: 458,
        pathc2: 458,       
        pathc3: 458,
        pathc4: 458,
        pathc5: 458,
        pathc6: 458,
        pathc7: 458,
        pathc8: 458,
        pathc9: 458,
        pathc10: 458,
        pathc11: 458,
        pathc12: 458,
        pathc13: 458,
        pathc14: 458,
        pathc15: 458
    }
    componentDidMount(){
        journalEntry.current.innerHTML = journalPage !== undefined ? journalPage.entry : '';
    }
    render(){
        function handleSave(){
            return new Promise((resolve)=>{
                if(freshText === 1){
                    var je = journalEntry.current.innerHTML
                    store.set(pageTitle, {activeDay,activeYear,activeMonth,entry:je});
                    alert('saved');
                    freshText = 0
                    resolve();
                }
                else{
                    resolve();
                }

            })
        }
        function handleDelete(){
            return new Promise((resolve)=>{
                if(window.confirm("delete entry?")) {
                    store.remove(pageTitle);
                    alert('deleted');
                    journalEntry.current.innerHTML = '';
                    resolve();
                }
                else{
                    resolve();
                }
            })
        }
        const checkJournalUpdate = () => {
            if (!journalPage) {
                freshText = 1
            }else if (journalEntry.current.innerHTML === journalPage.entry){
                freshText = 0
            }else {
                freshText = 1
            }
            // change color depending on text in box
            function utf8ToHex(str) {
                return Array.from(str).map(c => 
                  c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : 
                  encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
                ).join('');
              }
              bgColor = `#${(utf8ToHex(journalEntry.current.innerHTML)).substring((utf8ToHex(journalEntry.current.innerHTML)).length - 6)}`
              bodyStyle = `body{background-color: ${bgColor}a1;transition: background-color ease 0.4s;}`
              this.setState({color: bodyStyle})
              this.setState({backgroundColor: bgColor})
              //make the wave
              function getRndInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1) ) + min;
              }
              const randomMid = getRndInteger(425, 475)
              console.log(randomMid)
              function getCoord(diff){
                if(Math.floor(Math.random() * 2) === 1){
                    return randomMid + diff
                }
                else{
                    return randomMid - diff
                }
              }
              const pathc1 = getCoord(15)
              const pathc2 = getCoord(15)
              const pathc3 = getCoord(15)
              const pathc4 = getCoord(15)
              const pathc5 = getCoord(15)
              const pathc6 = getCoord(15)
              const pathc7 = getCoord(15)
              const pathc8 = getCoord(15)
              const pathc9 = getCoord(15)
              const pathc10 = getCoord(15)
              const pathc11 = getCoord(15)
              const pathc12 = getCoord(15)
              const pathc13 = getCoord(15)
              const pathc14 = getCoord(15)
              const pathc15 = getCoord(15)
              this.setState({pathc1, pathc2, pathc3, pathc4, pathc5, pathc6, pathc7, pathc8, pathc9, pathc10, pathc11, pathc12, pathc13, pathc14, pathc15})
              console.log(({pathc1, pathc2, pathc3, pathc4, pathc5, pathc6, pathc7, pathc8, pathc9, pathc10, pathc11, pathc12, pathc13, pathc14, pathc15}))
              
        }
        function about(){
            journalEntry.current.innerHTML = `Hi this is a simple react app for storing your thoughts. Entries are stored locally in your browser using <a href='https://www.npmjs.com/package/store-js'>store-js</a>. The heavylifting for this page can be found <a href='https://github.com/joonipea/react-portfolio/blob/master/src/components/DaySection.js'>here</a>.`
        }
        var entries = [];
        // pushes dates with pervious entries
        function colorOld(){
            return new Promise((resolve)=>{

                store.each(function(value, key) {
                    if(value.activeMonth === activeMonth){
                        entries.push(key);
                    }
                })
                resolve();

            })
        }
        var datePoints = [];
        async function setDatePoints(activeIndex){
            colorOld();
            for (let index = 0; index < numDays; index++) {
                const currentEntry = `${index+1}+${monthName}+${activeYear}`
                const activeCheck = activeIndex === index ? 'Active-Date-Button' : 'Date-Button';
                const oldCheck = entries.includes(currentEntry) ? `${activeCheck} Old-Date-Button` : activeCheck;
                datePoints.push(
                    <div 
                        onClick={
                            async () => {
                                if  (journalEntry.current.innerHTML){
                                    await handleSave(); 
                                }
                                handleClick(index);
                            }
                        } 
                        key={index} 
                        data-date={index} 
                        className={oldCheck}>
                            {index+1}
                    </div>
                        ) 
            }
        }
        setDatePoints(this.state.activeIndex);
        

        const handleClick = async (ni) => {
           function setDay(){
               return new Promise((resolve)=>{
                activeDay = ni + 1
                pageTitle = `${activeDay}+${monthName}+${activeYear}`;
                resolve();
               })
            }
            await setDay();
            const newPage = store.get(pageTitle);
            journalEntry.current.innerHTML = newPage !== undefined ? newPage.entry : '';
            this.setState({activeIndex: activeDay - 1})     
        };
        const nextMonth = async () =>{
            if (activeMonth === 11){
                return
            }else{
            function setMonth(){
                return new Promise((resolve)=>{
                    activeMonth = activeMonth + 1
                    resolve();
                })
            }
            function setDay(){
                return new Promise((resolve)=>{
                    activeDay = 1
                    pageTitle = `${activeDay}+${monthName}+${activeYear}`;
                    resolve();
                })
             }
            await setDay();
            await setMonth();
            datePoints = [];
            numDays = new Date(activeYear, activeMonth+1, 0).getDate();
            const newPage = store.get(pageTitle);
            journalEntry.current.innerHTML = newPage !== undefined ? newPage.entry : '';
            this.setState({ activeIndex: activeDay - 1 });
            setDatePoints(this.state.activeIndex);  
            }
        }
        const previousMonth = async () =>{
            if (activeMonth === 0){
                return
            }else{
            function setMonth(){
                return new Promise((resolve)=>{
                    activeMonth = activeMonth - 1
                    resolve();
                })
            }
            function setDay(){
                return new Promise((resolve)=>{
                    activeDay = 1
                    pageTitle = `${activeDay}+${monthName}+${activeYear}`;
                    resolve();
                })
             }
            await setDay();
            await setMonth();
            datePoints = [];
            numDays = new Date(activeYear, activeMonth+1, 0).getDate();
            const newPage = store.get(pageTitle);
            journalEntry.current.innerHTML = newPage !== undefined ? newPage.entry : '';
            this.setState({activeIndex: activeDay - 1})  
            setDatePoints(this.state.activeIndex);
            }
        }
        const nextYear = async () =>{
            function setMonth(){
                return new Promise((resolve)=>{
                    activeYear = activeYear + 1
                    resolve();
                })
            }
            function setDay(){
                return new Promise((resolve)=>{
                    activeDay = 1
                    pageTitle = `${activeDay}+${monthName}+${activeYear}`;
                    resolve();
                })
             }
            await setDay();
            await setMonth();
            datePoints = [];
            numDays = new Date(activeYear, activeMonth+1, 0).getDate();
            const newPage = store.get(pageTitle);
            journalEntry.current.innerHTML = newPage !== undefined ? newPage.entry : '';
            this.setState({ activeIndex: activeDay - 1 });
            setDatePoints(this.state.activeIndex);  
        }
        const previousYear = async () =>{
            function setMonth(){
                return new Promise((resolve)=>{
                    activeYear = activeYear - 1
                    resolve();
                })
            }
            function setDay(){
                return new Promise((resolve)=>{
                    activeDay = 1
                    pageTitle = `${activeDay}+${monthName}+${activeYear}`;
                    resolve();
                })
            }
            await setDay();
            await setMonth();
            datePoints = [];
            numDays = new Date(activeYear, activeMonth+1, 0).getDate();
            const newPage = store.get(pageTitle);
            journalEntry.current.innerHTML = newPage !== undefined ? newPage.entry : '';
            this.setState({activeIndex: activeDay - 1})  
            setDatePoints(this.state.activeIndex);
        }
        const {color, backgroundColor, pathc1, pathc2, pathc3, pathc4, pathc5, pathc6, pathc7, pathc8, pathc9, pathc10, pathc11, pathc12, pathc13, pathc14, pathc15} = this.state
        return(
            <>
                <style>{color}
                </style>
                <div className='Text-Container'>
                    <h2>{ml[activeMonth]} {activeDay}, {activeYear}</h2>
                    <div onKeyDown={() => checkJournalUpdate()} contentEditable ref={journalEntry} className='Journal-Text' placeholder={funSaying}></div>
                    <button onClick={handleSave}>save</button>
                    <button onClick={handleDelete}>delete entry</button>
                    <button onClick ={about}>about this page</button>
                </div>
                <div className='Date-Container'>
                    <div className="date-control">
                        <button onClick={()=>previousMonth()}>&#60;</button>
                        <h2 style={{width:`80%`,textAlign:`center`}}>{ml[activeMonth]} {activeDay}</h2>
                        <button onClick={()=>nextMonth()}>&#62;</button>
                    </div>
                    <div className="date-point-container">
                    {datePoints}
                    </div>
                    <div className="date-control">
                        <button onClick={()=>previousYear()}>&#60;</button>
                        <h2 style={{width:`80%`,textAlign:`center`}}>{activeYear}</h2>
                        <button onClick={()=>nextYear()}>&#62;</button>
                    </div>
                </div>
                <svg style={{position:`fixed`,bottom:`0`,zIndex:`-1`,left:`0`}}id="visual" viewBox="0 0 960 540" version="1.1">
                    <path d={`M0 ${pathc1}L40 ${pathc2}C80 ${pathc3} 160 ${pathc4} 240 ${pathc5}C320 ${pathc6} 400 ${pathc7} 480 ${pathc8}C560 ${pathc9} 640 ${pathc10} 720 ${pathc11}C800 ${pathc12} 880 ${pathc13} 920 ${pathc14}L960 ${pathc15}L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z`} fill={backgroundColor} strokeLinecap={`round`} strokeLinejoin={`miter`} style={{transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s`}}></path>
                </svg>
            </>
        );
    }
}

export default DaySection;