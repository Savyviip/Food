import React, { useEffect, useState } from "react";
import style from "./About.module.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`${style.container} ${isVisible ? style.visible : ""}`}>
      
      <h1 className={`${style.title} ${isVisible ? style.visible : ""}`}>
        Muy Pronto
      </h1>
      {/* Overlay de imagen */}
      <div className={style["image-overlay"]}>
        <img
          src="https://die.mep.go.cr/sites/all/files/enconstruccion_4.gif"
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default About;