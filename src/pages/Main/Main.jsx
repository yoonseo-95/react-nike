import React, { useEffect, useRef, useState } from "react";
import "./Main.scss";
import { Link } from "react-router-dom";
import MainVideo from "../../videos/nike.mp4";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Main() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();

  const handleMouseEnter = () => {
    if (videoRef.current && !isPlaying) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("동영상 재생하는 중 오류가 발생했습니다.:", error);
          });
      }
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="main">
      <div className="product-wrap">
        <video
          ref={videoRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          muted
          autoPlay
          playsInline
          className="video"
        >
          <source src={MainVideo} type="video/mp4" />
        </video>
      </div>
      <div className="mainWrap">
        <div className="txt">
          <div className="txt_wrap">
            <h3 className="txt-typing">JUST DO IT. NIKE</h3>
          </div>
          <Link to={`/products`}>
            <span>Product More</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
