import React from 'react';
import HeroSection from '../HeroSection';
import '../../App.css';
import { DynamicBackground } from '../DynamicBackground';


function Home() {
  return (
  <>
    <DynamicBackground />
     <HeroSection />
  </>);
}

export default Home;
