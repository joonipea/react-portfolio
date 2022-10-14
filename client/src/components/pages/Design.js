import React from 'react';
import { DynamicBackground } from '../DynamicBackground';
import './Design.css';


function Design() {
  function Rotate(a) {
  const anchors = document.getElementsByClassName(a);
  for (const anchor of anchors){
  const base = anchor.parentElement;
  base.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX - base.offsetLeft;
    const mouseY = e.clientY;




      const rect = base.getBoundingClientRect();
      const anchorX = rect.left + rect.width / 2;
      const anchorY = rect.top + rect.height / 2;
      const xRatio = (mouseX - anchorX) / anchorX;
      const yRatio = (mouseY - anchorY) / anchorY;

      const x = xRatio * 10;
      const y = yRatio * 10;
      const child = anchor.firstElementChild.firstElementChild;
      if (Math.abs(x) <= 10 && Math.abs(y) <= 10) {
      child.style.transform = `rotateX(${y * -2}deg) rotateY(${x}deg) rotateZ(0deg)`;
      }
    
  });
}
}
Rotate("design-image");
  return (
    <>
    <DynamicBackground />
    <div id='design' className='design-container'>
      <meta name="robots" content="noindex"></meta>
      <h2>Websites</h2>
      <div className='design-wrapper'>
      <div className='design-image'>
        <a href='https://amalijewelry.com'>
          <img style={{transformStyle:`preserve-3d`,willChange:`transform`,borderRadius:`15px`,boxShadow:`0 1px 4px 0 rgb(0 0 0 / 20%)`}} className='website-image' alt='A screenshot of the homepage of Amáli Jewelry' src='./images/Amali.png'></img>
        </a>
      </div>
      <div className='design-text'>
        <p>2020-present</p>
        <p>
          <a href='https://amalijewelry.com'>Amáli Jewelry</a> is luxury handcrafted jewelry company with a focus on handwoven chains and signature techniques.
        </p>
        <p>As the sole developer I've designed, built and tested multiple iterations of the website. I've worked closely with the owners to ensure that their story is told on every page. Amáli is a Shopify site and is currently built on liquid, HTML, CSS, and Javascript as well as custom built apps made with React, Polaris, Express, Node, and PostgresQL. A new site is currently being built with Shopify's new framework Hydrogen.</p>
      </div>
      </div>
      <div className='design-wrapper'>
      <div className='design-image'>
      <a href='https://houseofpentacles.org'><img style={{transformStyle:`preserve-3d`,willChange:`transform`,borderRadius:`15px`,boxShadow:`0 1px 4px 0 rgb(0 0 0 / 20%)`}} className='website-image' alt='A screenshot of the homepage of House of Pentacles' src='./images/House of Pentacles.png'></img></a>
      </div>
      <div className='design-text'>
      <p>2020</p>
      <p><a href='https://houseofpentacles.org'>House of Pentacles</a> (HOP) is a Film Training Program and Production House designed to launch Black trans youth (ages 18-35) into the film industry and tell stories woven at the intersection of being Black and Trans.</p>
      <p>HOP's front facing site is built on wordpress using HTML, Javascript, and SCSS. Private member only functions are built using PHP, React, and Node.</p>
      </div>
      </div>
      <div className='design-wrapper'>
      <div className='design-image'>
      <a href='https://ushaoils.com'><img style={{transformStyle:`preserve-3d`,willChange:`transform`,borderRadius:`15px`,boxShadow:`0 1px 4px 0 rgb(0 0 0 / 20%)`}} className='website-image' alt='A screenshot of the homepage of House of Pentacles' src='./images/usha oils.png'></img></a>
      </div>
      <div className='design-text'>
      <p>2018-2020</p>
      <p><a href='https://ushaoils.com'>Usha Oils</a> Usha Oils was an essential oils company based out of Nepal and Durham, North Carolina.</p>
      <p>Usha Oils was a Shopify site and was built on liquid, HTML, CSS, and Javascript as well as custom built apps made with React, Polaris, Express, and Node.</p>
      </div>
      </div>
      <h2>Web Apps</h2>
      <div className="design-card"><a href='/journal'><h3>Journal</h3></a></div>
      <div className="design-card"><a href='/beats'><h3>Lo-fi Playlist</h3></a></div>
      <div className="design-card"><a href='/names'><h3>Random Name Generator</h3></a></div>
    </div>
  </>
  );
}

export default Design;
