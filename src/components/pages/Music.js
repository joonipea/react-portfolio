import React from 'react';
import Button from 'react-bootstrap/Button';
import './Music.css';

function Music() {
  return (
    <div className='music-container'>
      <h1 className='section-header'>Music</h1>
      <img className='cover-art' alt='pisces venus cover art' src='/images/pv.jpeg' height='300px' width='300px'></img>
      <h2>Pisces Venus</h2>
      <Button href="https://open.spotify.com/artist/4JOQvQWsrUt7b52MHl8i0B" variant="outline-success">spotify</Button>{' '}<br></br>
      <Button href="https://music.apple.com/us/album/pisces-venus/1605528414?uo=4&app=music&at=1001lry3&ct=dashboard" variant="outline-danger">apple music</Button>{' '}<br></br>
      <Button href="https://soundcloud.com/joonipea/sets/breakup-demo-tape-leaked-up-demo-super-secret/s-RxUere9uFCi?si=af564461feea46a483829744188becf1&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" variant="outline-warning">soundcloud</Button>
    </div>
  )
}

export default Music;
