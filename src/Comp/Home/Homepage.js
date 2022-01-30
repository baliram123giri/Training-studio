import React from "react";
import CallToAction from "./CallToAction";
import Contact from "./Contact";
import Features from "./Features";
import HeroBanner from "./HeroBanner";
import OurClasses from "./OurClasses";
import Schedule from "./Schedule"
import Trainers from "./Trainers";

export default function Homepage() {
  return (
    <>
      <HeroBanner />
      <Features />
      <CallToAction />
      <OurClasses />
      <Schedule />
      <Trainers />
      <Contact />
    </>
  );
}
