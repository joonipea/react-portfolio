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
const sayingIndex = Math.round(Math.random(saying.length));
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
var bodyStyle = `body{background-color: ${bgColor};transition: background-color ease 0.1s;}`;
var sDisplay = `.Settings-Container{display: none;}`;



class DaySection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fontSize: 16,
            textColor: '#000000',
            activeIndex: activeDay-1,
            color: bodyStyle,
            activeMonth,
            monthName,
            backgroundColor: bgColor,
            alertMessage: '',
            deleteConfirmation: 'delete entry',
            deleteClass: '',
            messageOpacity: '0%',
            aboutOpen: 'about this page',
            settingsDisplay: sDisplay,
            sOpen: false,
            allowColor: false,
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
    }
    componentDidMount(){
        journalEntry.current.innerHTML = journalPage !== undefined ? journalPage.entry : '';
    }
    render(){
        if (this.props.userLoggedin === true){
            const cloudLoad = () => {
                this.props.details.journalEntries.map((item, index) => {
                    store.set(item.key, item.value);
                })
            }
            cloudLoad()
        }
        const handleSave = () =>{
            return new Promise((resolve)=>{
                if(freshText === 1){
                    var je = journalEntry.current.innerHTML
                    store.set(pageTitle, {activeDay,activeYear,activeMonth,entry:je});
                    var entry = JSON.stringify({key: pageTitle, value: {activeDay,activeYear,activeMonth,entry:je}})
                    console.log(entry);
                    freshText = 0
                    const that = this
                    this.setState({alertMessage: 'saved'});
                    this.setState({messageOpacity: '100%'})
                    var dis = this;
                    setTimeout(function(){
                        that.setState({messageOpacity:'0%'})
                    },1200)

                    /* cloud saving */
                    if (this.props.userLoggedin === true){
                        fetch(`${process.env.REACT_APP_API_ENDPOINT}users/saveJournalEntry`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${dis.props.appContext.token}`,
                            },
                            body: entry
                        })
                        .then(response => {
                            if(!response.ok){
                                console.log(response)
                            } else {
                                console.log(response)
                            }
                        });
                    }
                    resolve();
                }
                else{
                    resolve();
                }

            })
        }
        const handleDelete = () => {
            return new Promise((resolve)=>{
                var je = journalEntry.current.innerHTML
                var entry = JSON.stringify({key: pageTitle, value: {activeDay,activeYear,activeMonth,entry:je}})
                const dis = this;
                if(deleteConfirmation === 'are you sure?') {
                    if (this.props.userLoggedin === true){
                        fetch(`${process.env.REACT_APP_API_ENDPOINT}users/deleteJournalEntry`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${this.props.appContext.token}`,
                            },
                            body: entry
                        })
                        .then(response => {
                            if(!response.ok){
                                console.log(response)
                            } else {
                                console.log(response)
                            }
                        });
                    }
                    store.remove(pageTitle);
                    journalEntry.current.innerHTML = '';
                    this.setState({alertMessage: 'deleted'});
                    this.setState({messageOpacity: '100%'})
                    const that = this
                    setTimeout(function(){
                        that.setState({messageOpacity:'0%'})
                    },1200)
                    this.setState({deleteConfirmation:'delete entry'});
                    this.setState({deleteClass:''});
                    resolve();
                }
                else{
                    const handleDeleteConfirmation = () => {
                        if (this.props.userLoggedin === true){
                            fetch(`${process.env.REACT_APP_API_ENDPOINT}users/saveJournalEntry`, {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${dis.props.appContext.token}`,
                                },
                                body: entry
                            })
                            .then(response => {
                                if(!response.ok){
                                    console.log(response)
                                } else {
                                    console.log(response)
                                }
                            });
                        }
                        this.setState({deleteConfirmation:'are you sure?'});
                        this.setState({deleteClass:'delConf'});
                    }
                    handleDeleteConfirmation();
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
                if(this.state.allowColor){
                function utf8ToHex(str) {
                    return Array.from(str).map(c => 
                      c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : 
                      encodeURIComponent(c).replace(/%/g,'').toLowerCase()
                    ).join('');
                  }
                  bgColor = `#${(utf8ToHex(journalEntry.current.innerHTML)).substring((utf8ToHex(journalEntry.current.innerHTML)).length - 6)}`
                  bodyStyle = `body{background-color: ${bgColor};transition: background-color ease 0.4s;} .Journal-Text{color: ${bgColor}; filter:contrast(10);}`
                  this.setState({color: bodyStyle})
                  this.setState({backgroundColor: bgColor})
                  //make the wave
                  function getRndInteger(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) ) + min;
                  }
                  const randomMid = getRndInteger(425, 475)
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

            }
            
              
        }
        const about = async() =>{
            if(aboutOpen === 'about this page'){
                await handleSave();
                
                journalEntry.current.innerHTML = `Hi this is a simple react app for storing your thoughts. Entries are stored locally in your browser using <a href='https://www.npmjs.com/package/store-js'>store-js</a>. The heavylifting for this page can be found <a href='https://github.com/joonipea/react-portfolio/blob/master/src/components/DaySection.js'>here</a>.`
                journalEntry.current.contentEditable = false;
                this.setState({aboutOpen:'close about'});
            }else{
                const newPage = store.get(pageTitle);
                journalEntry.current.innerHTML = newPage !== undefined ? newPage.entry : '';
                journalEntry.current.contentEditable = true;
                this.setState({aboutOpen:'about this page'});
            }

        }
        const settings = async() =>{
            if(!this.state.sOpen){
                this.setState({settingsDisplay:`.Settings-Container{display: block; background-color:${bgColor}}`});
                this.setState({sOpen:true});
            }else{
                this.setState({settingsDisplay:`.Settings-Container{display: none; background-color:${bgColor}}`});
                this.setState({sOpen:false});
            }

        }

        const exportEntries = () =>{
            const entryList = [];
            function getEntries(){
                return new Promise((resolve)=>{
                    store.each(function(value, key){
                        entryList.push({key,value})
                    })
                    resolve();
                })
            }
            console.log(store.get(pageTitle))
            console.log(entryList)
            async function download(filename, data) {
                await getEntries();
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
                element.setAttribute('download', filename);
              
                element.style.display = 'none';
                document.body.appendChild(element);
              
                element.click();
              
                document.body.removeChild(element);
              }
              // Start file download.
              download("journalEntries.journ",entryList);
        }


        var importedEntries = [];
        const importEntries = () =>{
            var that = this;
            var element = document.createElement('input');
            function selectFile(){
                return new Promise((resolve)=>{
                    element.setAttribute('type','file');
                    element.setAttribute('accept','.journ');
                    element.style.display = 'none';

                    document.body.appendChild(element);

                    element.click();

                    resolve();
                })
            }
            function readFile(){
                return new Promise( async (resolve)=>{
                    await selectFile();
                    var interval = setInterval(function(){
                        if (element.files[0]){
                            const journ = element.files[0];
                            const reader = new FileReader();
                            reader.addEventListener('load', (event) => {
                              importedEntries = JSON.parse(event.target.result);
                              resolve();
                            });
                            reader.readAsText(journ);
                            clearInterval(interval);                        
                        }
                    }, 500);
                });
            }
            async function handleFile(){
                await readFile();
                for (let index = 0; index < importedEntries.length; index++) {
                    const ci = importedEntries[index];
                    store.set(ci.key, ci.value);
                }
                that.setState({alertMessage: 'entries imported'});
                that.setState({messageOpacity: '100%'})
                setTimeout(function(){
                    that.setState({messageOpacity:'0%'})
                },1200)           
            }
            handleFile();
            
        }
        var fontStyle = `.Journal-Text{font-size: ${this.state.fontSize}px;} body{color: ${this.state.textColor}}`
        const handleFont = async (event) =>{
            this.setState({fontSize: event.target.value})
            fontStyle = `.Journal-Text{font-size: ${this.state.fontSize}px;}`
        }

        const textC = async (event) =>{
            this.setState({textColor: event.target.value})
            fontStyle = `.Journal-Text{font-size: ${this.state.fontSize}px;} body{color: ${this.state.textColor}}`
            console.log(fontStyle)
        }
        const backgroundC = async (event) =>{
            bgColor = event.target.value
            bodyStyle = `body{background-color: ${bgColor};transition: background-color ease 0.4s;}`
            this.setState({color: bodyStyle})
            this.setState({backgroundColor: bgColor})
        }
        const colorMode = (event) =>{
            if (event.target.checked){
                this.setState({allowColor: true});
            }else{
                this.setState({allowColor: false});
            }
        }
        // pushes dates with previous entries
        var entries = [];
        const colorOld = () => {
            var that = this;
            return new Promise((resolve)=>{

                store.each(function(value, key) {
                    if(value.activeMonth === that.state.activeMonth){
                        entries.push(key);
                        console.log(entries);
                    }
                })
                resolve();

            })
        }
        var datePoints = [];
        const setDatePoints = async (activeIndex) =>{
            colorOld();
            for (let index = 0; index < numDays; index++) {
                const currentEntry = `${index+1}+${this.state.monthName}+${activeYear}`
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
            monthName = ml[activeMonth];
            datePoints = [];
            numDays = new Date(activeYear, activeMonth+1, 0).getDate();
            const newPage = store.get(pageTitle);
            journalEntry.current.innerHTML = newPage !== undefined ? newPage.entry : '';
            this.setState({ activeIndex: activeDay - 1 });
            this.setState({activeMonth});
            this.setState({monthName});
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
            monthName = ml[activeMonth]
            datePoints = [];
            numDays = new Date(activeYear, activeMonth+1, 0).getDate();
            const newPage = store.get(pageTitle);
            journalEntry.current.innerHTML = newPage !== undefined ? newPage.entry : '';
            this.setState({activeIndex: activeDay - 1}) 
            this.setState({monthName})
            this.setState({activeMonth}) 
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
        const {fontSize, color, backgroundColor, alertMessage, deleteConfirmation, deleteClass, messageOpacity, aboutOpen, settingsDisplay, pathc1, pathc2, pathc3, pathc4, pathc5, pathc6, pathc7, pathc8, pathc9, pathc10, pathc11, pathc12, pathc13, pathc14, pathc15} = this.state
        return(
            <>
                <div className="Settings-Container">
                    <h2>Settings</h2>
                    <div>Font Size <input type={`number`} value={fontSize} onChange={handleFont}></input></div>
                    <div>Color Mode <input onChange={colorMode} type={`checkbox`}></input></div>
                    <div>Background Color <input onChange={backgroundC} value={bgColor} type={`color`}></input></div>
                    <div>Font Color <input onChange={textC} type={`color`}></input></div>
                    <div><button onClick={exportEntries}>Export Entries</button></div>
                    <div><button onClick={importEntries}>Import Entries</button></div>
                    <div><a href={'/user'}><button>{this.props.userLoggedin ? 'Account' : 'Login'}</button></a></div>
                    <div><button onClick={settings}>Close Settings</button></div>
                </div>
                <style>{color}{settingsDisplay}{fontStyle}
                </style>
                <div className='Text-Container'>
                    <h2>{ml[activeMonth]} {activeDay}, {activeYear}</h2>
                    <div onKeyDown={() => checkJournalUpdate()} contentEditable ref={journalEntry} className='Journal-Text' placeholder={funSaying}></div>
                    <div className="btn-grp">
                        <button onClick={handleSave}>save</button>
                        <button className={deleteClass} onClick={handleDelete}>{deleteConfirmation}</button>
                        <button onClick={about}>{aboutOpen}</button>
                        <button onClick={settings}>settings</button>
                    </div>
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
                    <path d={`M0 ${pathc1}L40 ${pathc2}C80 ${pathc3} 160 ${pathc4} 240 ${pathc5}C320 ${pathc6} 400 ${pathc7} 480 ${pathc8}C560 ${pathc9} 640 ${pathc10} 720 ${pathc11}C800 ${pathc12} 880 ${pathc13} 920 ${pathc14}L960 ${pathc15}L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z`} fill={backgroundColor} strokeLinecap={`round`} strokeLinejoin={`miter`} style={{transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0s`}}></path>
                </svg>
                <div style={{width:`100%`,position:`fixed`,display:`flex`,justifyContent:`center`,opacity:messageOpacity,transition:`all ease 0.4s`}}>
                    <div className="alert">{alertMessage}</div>
                </div>
                
            </>
        );
    }
}

export default DaySection;