import { useEffect, useState } from "react";

const Typewriter = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let intervalId;

    if (currentIndex < text.length) {
      intervalId = setInterval(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [text, speed, currentIndex]);

  return <div>{displayedText}</div>;
};

export default Typewriter;