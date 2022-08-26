import React from 'react';
import Button from 'react-bootstrap/Button';
import './Music.css';

function Music() {
  return (
    <div className='music-container'>
      <h1 className='section-header'>Music</h1>
      <img className='cover-art' alt='fiction cover art' src='/images/fiction.jpg' height='300px' width='300px'></img>
      <h2>Fiction</h2>
      <Button href="https://open.spotify.com/album/1y2CCQiRugm0Ks342UAZWG?si=6MNZabvdSc2H7Oa4DYQoFQ" variant="outline-success">spotify</Button>{' '}<br></br>
      <Button href="https://music.apple.com/us/album/fiction/1640145675" variant="outline-danger">apple music</Button>{' '}<br></br>
      <img className='cover-art' alt='pisces venus cover art' src='/images/pv.jpeg' height='300px' width='300px'></img>
      <h2>Pisces Venus</h2>
      <Button href="https://prf.hn/click/camref:1101ljvYv/pubref:albumuuid%3D3A6EEBEE-AA65-41D3-981E9645B016606E/destination:https://open.spotify.com/album/5hfpxIkrml6VGgTiIi0hM8" variant="outline-success">spotify</Button>{' '}<br></br>
      <Button href="https://music.apple.com/us/album/pisces-venus/1605528414?uo=4" variant="outline-danger">apple music</Button>{' '}<br></br>
      <Button href="https://soundcloud.com/joonipea/sets/breakup-demo-tape-leaked-up-demo-super-secret/s-RxUere9uFCi?si=af564461feea46a483829744188becf1&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" variant="warning">soundcloud</Button>
    </div>
  )
}

export default Music;
