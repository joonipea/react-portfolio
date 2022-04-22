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


class DaySection extends React.Component{
    state = {
        activeIndex: activeDay-1
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
        function checkJournalUpdate(){
            if (journalEntry.current.innerHTML === journalPage.entry){
                freshText = 0
            }else if (journalEntry.current.innerHTML === undefined) {
                freshText = 0
            }else {
                freshText = 1
            }
        }
        function about(){
            journalEntry.current.innerHTML = `Hi this is a simple react app for storing your thoughts. Entries are stored locally in your browser using <a href='https://www.npmjs.com/package/store-js'>store-js</a>. The heavylifting for this page can be found <a href='https://github.com/joonipea/react-portfolio/blob/master/src/components/DaySection.js'>here</a>.`
        }
        var entries = [];
        function colorOld(){
            return new Promise((resolve)=>{

                store.each(function(value, key) {
                    if(value.activeMonth === activeMonth){
                        console.log(key)
                        entries.push(key);
                        console.log(entries);
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
        return(
            <>
                <div className='Text-Container'>
                <button onClick={handleSave}>save</button>
                <button onClick={handleDelete}>delete entry</button>
                <button onClick ={about}>about this page</button>
                <h2>{ml[activeMonth]} {activeDay}, {activeYear}</h2>
                    <div onKeyDown={() => checkJournalUpdate()} contentEditable ref={journalEntry} className='Journal-Text' placeholder={funSaying}></div>
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
            </>
        );
    }
}

export default DaySection;