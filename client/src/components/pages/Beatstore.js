import React, {useState, useEffect, useRef, useCallback} from "react";
import "./Beatstore.css";
import { DynamicBackground } from "../DynamicBackground";
import axios from "axios";

export const Beatstore = () => {
    const [songs, setSongs] = useState([]);
    const audioPlayer = useRef();
    const [currentTime, setCurrentTime] = useState(0);
    const [seekValue, setSeekValue] = useState(0);
    const [currentSongTitle, setCurrentSongTitle] = useState("nothing playing");
    const [playing, setPlaying] = useState(0);
    const [playPause, setSymbol] = useState('\u25BA');
    const [looping, setLoop] = useState('\ue908');
    const currentMinutes = Math.trunc(currentTime/60);
    const currentSeconds = Math.floor(currentTime) - (currentMinutes * 60);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState("");
    const [currentSongImage, setCurrentSongImage] = useState("./images/score-placeholder.png");


    const getSongs = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}music/getMusic`).then((res) => {
            setSongs(res.data);
            console.log(encodeURI(res.data[0].url));
            setCurrentSong(res.data[0].url);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    useEffect(() => {
        getSongs();
        console.log(songs.length)
    }, [getSongs]);




    const play = () => {
      setCurrentSong(songs[currentSongIndex].url);
      if (audioPlayer.current.playing === 1){
        audioPlayer.current.pause();
        setPlaying(
          audioPlayer.current.playing = 0
        );
        setSymbol(
          audioPlayer.current.playPause = '\u25BA'
        );
      }else{
        setCurrentSongTitle(songs[currentSongIndex].title);
        setCurrentSongImage(songs[currentSongIndex].image);
        setPlaying(
          audioPlayer.current.playing = 1
        );
        setSymbol(
          audioPlayer.current.playPause = '\u23f8'
        );
        audioPlayer.current.play();
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
      console.log(currentSongIndex);
      if (currentSongIndex === (songs.length - 1)){
        var i = 0
      }
      else{
        i = currentSongIndex + 1
      }
      function setSong() {
        return new Promise((resolve)=>{
          audioPlayer.current.pause();
          setCurrentSong(songs[i].url);
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

        setCurrentSongIndex(i);
        audioPlayer.current.play();
        setCurrentSongTitle(songs[i].title);
        setCurrentSongImage(songs[i].image);
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
        p = songs.length - 1
      }
      
      function setSong() {
        return new Promise((resolve)=>{
          audioPlayer.current.pause();
          setCurrentSong(songs[p].url);
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
        setCurrentSongIndex(p);
        audioPlayer.current.play();
        setCurrentSongTitle(songs[p].title);
        setCurrentSongImage(songs[p].image);
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
      if(songs[key].url === currentSong && audioPlayer.current.playing == 0){
        audioPlayer.current.play();
        setSymbol(
          audioPlayer.current.playPause = '\u23f8'
        );
        setPlaying(
          audioPlayer.current.playing = 1
        );
      }else if(songs[key].url === currentSong && audioPlayer.current.playing == 1){
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
          setCurrentSong(songs[key].url);
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
        setCurrentSongIndex(key);
        audioPlayer.current.play();
        setCurrentSongTitle(songs[key].title);
        setCurrentSongImage(songs[key].image);
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
        <>
        <DynamicBackground />
        <div className="beatstore">
            <h1>Beats</h1>
            <div className="beatstore__container">
                <div className="song__container">
                  <div className="beatstore__songs">
                      {songs.map((song, index) => {
                          return (
                              <div key={song._id} className="beatstore__song">
                                  <img src={song.image} alt={song.title} />
                                  <div className="beatstore__song__info">
                                      <h4>{song.title}</h4>
                                      <p>{song.artist}</p>
                                      <p>{song.album}</p>
                                      <p>{song.date.split('T')[0]}</p>
                                      <p>{song.tags.map((tag) => { return(`#${tag} `) })}</p>
                                  </div>
                                  <div className="beatstore__song__buttons">
                                      <button onClick={() => handleChange(index)}>Listen</button>
                                  </div>
                              </div>
                          )
                      }
                      )}
                  </div>
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
                  <div className="player__container">
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
                  </div>
                  <div className="song-details">
                    <img src={currentSongImage} alt={currentSongTitle} />
                    <span>{currentSongTitle}</span> 
                  </div> 
                </div>
            </div>
        </div>
        </>
    )
}



/*

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

*/