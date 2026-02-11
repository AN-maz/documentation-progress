import React from 'react';
import Hero from './Hero'; 
import Divisions from './Divisions';
import Gallery from './GalleryPreview'
import VisionMission from './VisionMission';

const Home = () => {
  return (
    <>
      <Hero />
      <Divisions />
      <Gallery />
      <VisionMission />
    </>
  );
};

export default Home;