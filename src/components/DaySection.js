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
]
console.log(saying);
const sayingIndex = Math.round(Math.random(saying.length));
console.log(sayingIndex);
const funSaying = saying[sayingIndex];
const current = new Date();
const month = current.getMonth();
const year = current.getFullYear();
const activeMonth = ml[month];
const activeYear = year;
var day = current.getDate();
const numDays = new Date(year, month+1, 0).getDate();


class DaySection extends React.Component{
    state = {
        activeIndex: day-1
    }
    render(){
        var {activeIndex} = this.state
        var pageTitle = `${day}+${activeMonth}+${activeYear}`;
        const journalEntry = createRef();
        function handleSave(){
            var je = journalEntry.current.value
            store.set(pageTitle, {day,year,month,entry:je});
            alert('saved');
        }
        var datePoints = [];
        for (let index = 0; index < numDays; index++) {
            const activeCheck = this.state.activeIndex === index ? 'Active-Date-Button' : 'Date-Button';
            datePoints.push(<div onClick={() => handleClick(index)} key={index} data-date={index} className={activeCheck}></div>) 
        }
        const journalPage = store.get(pageTitle);
        journalEntry.current = journalPage != undefined ? journalPage.entry : 'nothing';
        const handleClick = (ni) => {
            /*
                function setIndex(key){
                    return new Promise((resolve)=>{
                        pageTitle = `${key}+${activeMonth}+${activeYear}`;
                        console.log(pageTitle);
                        resolve();
                    })
                }
                async function changePage(key){
                await setIndex(key);
                journalPage = store.get(pageTitle);
                console.log(journalPage)
                journalEntry.current.value = journalPage != undefined ? journalPage.entry : '';
                }
                changePage(ni);
                this.setState({activeIndex: ni});
            */
           function setDay(){
               return new Promise((resolve)=>{
                day = ni + 1
                console.log(day)
                pageTitle = `${day}+${activeMonth}+${activeYear}`;
                resolve();
               })
           }
           async function turnPage(){
               await setDay();
               console.log(pageTitle);
               const newPage = store.get(pageTitle);
               console.log(newPage);
               journalEntry.current.value = newPage != undefined ? newPage.entry : '';
           }
           turnPage();

           this.setState({activeIndex: day - 1})
           
                
        };
        return(
            <>
                <div className='Text-Container'>
                <button onClick={handleSave}>save</button>
                <h1>Journal</h1>
                    <textarea val='' ref={journalEntry} className='Journal-Text' placeholder={funSaying}></textarea>
                </div>
                <div className='Date-Container'>
                    <h2>{activeMonth} {day}, {activeYear}</h2>
                    {datePoints}
                </div>
            </>
        )
    }
}

export default DaySection;