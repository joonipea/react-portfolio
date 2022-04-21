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
const journalPage = store.get(pageTitle);
const journalEntry = createRef();


class DaySection extends React.Component{
    state = {
        activeIndex: activeDay-1
    }
    componentDidMount(){
        journalEntry.current.value = journalPage !== undefined ? journalPage.entry : '';
    }
    render(){
        function handleSave(){
            var je = journalEntry.current.value
            store.set(pageTitle, {activeDay,activeYear,activeMonth,entry:je});
            alert('saved');
        }
        function handleDelete(){
            store.remove(pageTitle);
            alert('saved');
        }
        var oldEntries = [];
        function colorOld(){
            return new Promise((resolve)=>{

                store.each(function(value, key) {
                    if(value.activeMonth === activeMonth){
                        console.log(key)
                        oldEntries.push(key.match(/([1-9][0-9]|[1-9])/g)[0])
                        console.log(oldEntries);
                    }
                })
                resolve();

            })
        }
        var datePoints = [];
        async function setDatePoints(activeIndex){
            colorOld();
            for (let index = 0; index < numDays; index++) {
                const activeCheck = activeIndex === index ? 'Active-Date-Button' : 'Date-Button';
                const oldCheck = oldEntries.includes(`${index+1}`) ? 'Old-Date-Button Date-Button' : activeCheck;
                datePoints.push(<div onClick={() => handleClick(index)} key={index} data-date={index} className={oldCheck}></div>) 
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
            journalEntry.current.value = newPage !== undefined ? newPage.entry : '';
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
            journalEntry.current.value = newPage !== undefined ? newPage.entry : '';
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
            journalEntry.current.value = newPage !== undefined ? newPage.entry : '';
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
            journalEntry.current.value = newPage !== undefined ? newPage.entry : '';
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
            journalEntry.current.value = newPage !== undefined ? newPage.entry : '';
            this.setState({activeIndex: activeDay - 1})  
            setDatePoints(this.state.activeIndex);
        }
        return(
            <>
                <div className='Text-Container'>
                <button onClick={handleSave}>save</button>
                <button onClick={handleDelete}>delete entry</button>
                <h2>{ml[activeMonth]} {activeDay}, {activeYear}</h2>
                    <textarea ref={journalEntry} className='Journal-Text' placeholder={funSaying}></textarea>
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