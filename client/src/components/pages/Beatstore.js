import React, { useRef, useState } from "react"; 
import './Beatstore.css';

function importAll(r) {
  let audio = {};
  r.keys().map((item) => ( audio[item.replace('./', '')] = r(item) ));
  return audio;
}

const audio = importAll(require.context('../../../public/audio', false, /\.(mp3|flac|wav)$/));
const files = Object.values(audio)
const pFiles = files.map((file, index) => ({id: index, file: file, name: file.match(/\/media\/([\w-]+)\./)[1].replace(/_/g, " ")}))
var currentSong = files[0]
var currentSongIndex = 0

function Beatstore() {

    const audioPlayer = useRef();
    const [currentTime, setCurrentTime] = useState(0);
    const [seekValue, setSeekValue] = useState(0);
    const [currentSongTitle, setCurrentSongTitle] = useState("nothing playing");
    const [playing, setPlaying] = useState(0);
    const [playPause, setSymbol] = useState('\u25BA');
    const [looping, setLoop] = useState('\ue908');
    const currentMinutes = Math.trunc(currentTime/60);
    const currentSeconds = Math.floor(currentTime) - (currentMinutes * 60);

    
    const play = () => {
      if (audioPlayer.current.playing === 1){
        audioPlayer.current.pause();
        setPlaying(
          audioPlayer.current.playing = 0
        );
        setSymbol(
          audioPlayer.current.playPause = '\u25BA'
        );
      }else{
        audioPlayer.current.play();
        setCurrentSongTitle(
          audioPlayer.current.currentSongTitle = pFiles[currentSongIndex].name
        );
        setPlaying(
          audioPlayer.current.playing = 1
        );
        setSymbol(
          audioPlayer.current.playPause = '\u23f8'
        );
      }

    };

    const stop = () => {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
      setPlaying(
        audioPlayer.current.playing = 0
      );
      setSymbol(
        audioPlayer.current.playPause = '\u25BA'
      );
    };
    const next = () => {
      if (currentSongIndex === (files.length - 1)){
        var i = 0
      }
      else{
        i = currentSongIndex + 1
      }
      function setSong() {
        return new Promise((resolve)=>{
          audioPlayer.current.pause();
          currentSong = files[i];
          audioPlayer.current.load();
          resolve();
        })
        
      }
      async function playNewSong(){
        await setSong();
        audioPlayer.current.currentTime = 0;
        setCurrentTime(audioPlayer.current.currentTime);
        setSeekValue(
          (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
        );

        currentSongIndex = i
        audioPlayer.current.play();
        setCurrentSongTitle(
          audioPlayer.current.currentSongTitle = pFiles[currentSongIndex].name
        );
      }
      setPlaying(
        audioPlayer.current.playing = 1
      );
      setSymbol(
        audioPlayer.current.playPause = `\u23F8`
      );
      
      playNewSong();
    }
    const prev = () => {

      if (currentSongIndex > 0){
        var p = currentSongIndex - 1
      }
      if (currentSongIndex === 0){
        p = files.length - 1
      }
      
      function setSong() {
        return new Promise((resolve)=>{
          audioPlayer.current.pause();
          currentSong = files[p];
          audioPlayer.current.load();
          resolve();
        })
        
      }
      async function playNewSong(){
        await setSong();
        audioPlayer.current.currentTime = 0;
        setCurrentTime(audioPlayer.current.currentTime);
        setSeekValue(
          (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
        );
        currentSongIndex = p
        audioPlayer.current.play();
        setCurrentSongTitle(
          audioPlayer.current.currentSongTitle = pFiles[currentSongIndex].name
        );
      }
      setPlaying(
        audioPlayer.current.playing = 1
      );
      setSymbol(
        audioPlayer.current.playPause = '\u23F8'
      );
      playNewSong();
    }
    const loop = () => {
      if (audioPlayer.current.loop){
        audioPlayer.current.loop = false;
        setLoop(
          audioPlayer.current.looping = '\ue908'
        );
      }else{
        audioPlayer.current.loop = true;
        setLoop(
          audioPlayer.current.looping = '\ue907'
        );
      }
    }
    const handleChange = (key) => {
      if(pFiles[key].file === currentSong && audioPlayer.current.playing == 0){
        audioPlayer.current.play();
        setSymbol(
          audioPlayer.current.playPause = '\u23f8'
        );
        setPlaying(
          audioPlayer.current.playing = 1
        );
      }else if(pFiles[key].file === currentSong && audioPlayer.current.playing == 1){
        audioPlayer.current.pause();
        setSymbol(
          audioPlayer.current.playPause = '\u25BA'
        );
        setPlaying(
          audioPlayer.current.playing = 0
        );
      }
      
      else{
      function setSong() {
        return new Promise((resolve)=>{
          audioPlayer.current.pause();
          currentSong = files[key];
          audioPlayer.current.load();
          resolve();
        })
        
      }
      async function playNewSong(){
        await setSong();
        audioPlayer.current.currentTime = 0;
        setCurrentTime(audioPlayer.current.currentTime);
        setSeekValue(
          (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
        );
        currentSongIndex = key
        audioPlayer.current.play();
        setCurrentSongTitle(
          audioPlayer.current.currentSongTitle = pFiles[currentSongIndex].name
        );
      }
      setPlaying(
        audioPlayer.current.playing = 1
      );
      setSymbol(
        audioPlayer.current.playPause = '\u23F8'
      );
      playNewSong();
      }
      
    }
    const onPlaying = () => {
      setCurrentTime(audioPlayer.current.currentTime);
      setSeekValue(
        (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
      );
      if (audioPlayer.current.currentTime === audioPlayer.current.duration){
        next()
      };
    };
    return (
      <div className="beatstore-container">
        <div>
          <p>a fun lo-fi mostly functional playlist of what i'm working on updated every now again :~)</p>
        </div>
        <div className="pList">
          {files.map((file, index) => (
            <div onClick={() => handleChange(index)} className="file" key={index}>
              <button>{pFiles[index].file == currentSong ? playPause : '\u25BA'}</button><span>{pFiles[index].name}</span>
            </div>
          ))}
        </div>
        <div className="player">
          <audio
            src={currentSong}
            ref={audioPlayer}
            onTimeUpdate={onPlaying}
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <div className="media-controls">
            <button onClick={prev}>&#xe903;</button>
            <button className={`playing-${playing}`} onClick={play}>{playPause}</button>
            <button onClick={stop}>&#xe902;</button>
            <button onClick={next}>&#xe904;</button>
            <button onClick={loop}>{looping}</button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="0.001"
            value={seekValue}
            onChange={(e) => {
              const seekto = audioPlayer.current.duration * (+e.target.value / 100);
              audioPlayer.current.currentTime = seekto;
              setSeekValue(e.target.value);
            }}
          />
          <span className="song-time">{currentMinutes}:{('0' + currentSeconds).slice(-2)}</span>
          <span>{currentSongTitle}</span>
        </div>
      </div>
    );
}

export default Beatstore;