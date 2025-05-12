// import React from 'react'
// import "../Styles/styles.css"

// const Wrapper = () => {
//   return (
//     <>
//      <div class="wrapper">
//         <input type="text" class="input-field"/>
//         <div class="content-box">
//             <div class="typing-text">
//                 <p id="paragraph"></p>
//             </div>
//             <div class="content">
//                 <ul class="result-details">
//                     <li class="time">
//                         <p>
//                             Time Left:
//                         </p>
//                         <span><b>60</b>s</span>
//                     </li>
//                     <li class="mistake">
//                         <p>
//                             Mistakes:
//                         </p>
//                         <span>0</span>
//                     </li>
//                     <li class="wpm">
//                         <p>
//                             WPM:
//                         </p>
//                         <span>0</span>
//                     </li>
//                     <li class="cpm">
//                         <p>
//                             CPM:
//                         </p>
//                         <span>0</span>
//                     </li>
//                 </ul>
//                 <button>Try Again</button>
//             </div>
//         </div>
//     </div></>
//   )
// }

// export default Wrapper

import React, { useEffect, useRef, useState } from "react";
import "../Styles/styles.css";

const paragraphs = [
  "The Prophet Muhammad (PBUH) was born in the city of Mecca in the year five hundred seventy CE. Orphaned at a young age, he grew up under the care of his uncle. Known for his honesty and integrity, he earned the title Al-Amin, meaning 'the trustworthy.' At the age of forty, he received the first revelation from Allah through the Angel Jibreel (Gabriel), marking the beginning of Islam.",

  "The early Muslims faced severe persecution in Mecca. Despite this, they remained firm in their belief in one God, rejecting idol worship. In six hundred twenty-two CE, the Prophet and his followers migrated to Medina, a journey known as the Hijrah. This event marks the beginning of the Islamic calendar and laid the foundation for the first Islamic state.",

  "In Medina, the Prophet Muhammad (PBUH) established a peaceful and just society, uniting various tribes under the Constitution of Medina. This document is considered one of the earliest written constitutions, granting rights to Muslims, Jews, and other communities while emphasizing religious freedom and mutual respect.",

  "The Battle of Badr was the first major conflict between the Muslims and the Quraysh of Mecca. Despite being outnumbered, the Muslims achieved a decisive victory, which strengthened their faith and gained them respect among the tribes of Arabia. It was seen as a clear sign of Allah's support.",

  "In six hundred thirty CE, the Prophet (PBUH) and his followers peacefully entered Mecca without bloodshed. He forgave his enemies and removed the idols from the Kaaba, restoring it as the center of monotheistic worship. This event marked the triumph of Islam over polytheism in the Arabian Peninsula.",

  "After the Prophet’s death in six hundred thirty-two CE, Abu Bakr (RA) became the first Caliph of Islam. He led the Muslim community with wisdom and strength, preserving unity and spreading the message of Islam beyond Arabia. His leadership was followed by Umar ibn Al-Khattab, who expanded the Islamic empire to parts of Persia and the Byzantine territories.",

  "The Umayyad Caliphate (six hundred sixty-one to seven hundred fifty CE) was the first major Islamic dynasty, with its capital in Damascus. Under their rule, Islam spread rapidly to North Africa, Spain, and Central Asia. Arabic became the official language, and Islamic art and architecture began to flourish.",

  "The Abbasid Caliphate, which followed the Umayyads, moved the capital to Baghdad. This period is often called the Golden Age of Islam. Scholars in the fields of science, medicine, philosophy, and literature made great advancements. The House of Wisdom in Baghdad became a center of knowledge and learning.",

  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used to test typing speed and accuracy.",

  "Typing is a fundamental skill that helps you work efficiently on computers. Practicing regularly improves your typing speed and reduces mistakes.",

  "A journey of a thousand miles begins with a single step. Persistence and consistency are key when learning how to type fast and accurately.",

  "Programming is not just about writing code; it's about solving problems. A clear mind and precise typing can make a developer much more productive.",

  "Success is not final, failure is not fatal. It is the courage to continue that counts. Keep practicing to improve your skills every day.",

  "Practice makes perfect. The more you type, the more comfortable you become with the keyboard. Aim for both speed and accuracy.",

  "Mistakes are proof that you are trying. When learning how to type, don’t be afraid of making errors. Every error teaches you something new.",

  "She sells seashells by the seashore. Peter Piper picked a peck of pickled peppers. Tongue twisters are great for improving typing fluency.",

  "In the middle of every difficulty lies opportunity. Improve your typing one sentence at a time and watch your confidence grow.",

  "Technology is best when it brings people together. Learning to type faster enables better communication in our digital world.",
];

const Wrapper = () => {
  const [paragraph, setParagraph] = useState([]);

  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);

  const inpRef = useRef(null);
  const timerRef = useRef(null);

  //   useEffect(() => {
  //     loadParagraph();
  //   }, []);
  useEffect(() => {
    loadParagraph();
    if (inpRef.current) inpRef.current.focus(); // focus on load
  }, []);

  useEffect(() => {
    const handleKeydown = () => inpRef.current?.focus(); // focus on keypress
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const loadParagraph = () => {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    const chars = paragraphs[ranIndex].split("");
    setParagraph(chars);
    setCharIndex(0);
    setMistakes(0);
    setTimeLeft(60);
    setIsTyping(false);
    setWpm(0);
    setCpm(0);
    clearInterval(timerRef.current);
    if (inpRef.current) inpRef.current.value = "";
  };

  const handleTyping = (e) => {
    const characters = paragraph;
    const typedChar = e.target.value.charAt(charIndex);

    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true);
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) clearInterval(timerRef.current);
            return prev - 1;
          });
        }, 1000);
      }

      const currentChar = characters[charIndex];
      if (typedChar) {
        if (typedChar === currentChar) {
          setCharIndex((prev) => prev + 1);
        } else {
          setMistakes((prev) => prev + 1);
          setCharIndex((prev) => prev + 1);
        }

        // Calculate WPM & CPM
        const wpmCalc = Math.round(
          ((charIndex + 1 - mistakes) / 5 / (60 - timeLeft)) * 60
        );
        setWpm(wpmCalc > 0 && isFinite(wpmCalc) ? wpmCalc : 0);
        setCpm(charIndex + 1 - mistakes);
      } else if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      }
    } else {
      clearInterval(timerRef.current);
    }
  };

  return (
    <div className="wrapper" onClick={() => inpRef.current.focus()}>
      <input
        type="text"
        ref={inpRef}
        className="input-field"
        onInput={handleTyping}
      />

      <div className="content-box">
        <div className="typing-text">
          <p>
            {paragraph.map((char, i) => (
              <span
                key={i}
                className={
                  i === charIndex
                    ? "active"
                    : i < charIndex
                    ? inpRef.current?.value.charAt(i) === char
                      ? "correct"
                      : "incorrect"
                    : ""
                }
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        <div className="content">
          <ul className="result-details">
            <li className="time">
              <p>Time Left:</p>
              <span>
                <b>{timeLeft}</b>s
              </span>
            </li>
            <li className="mistake">
              <p>Mistakes:</p>
              <span>{mistakes}</span>
            </li>
            <li className="wpm">
              <p>WPM:</p>
              <span>{wpm}</span>
            </li>
            <li className="cpm">
              <p>CPM:</p>
              <span>{cpm}</span>
            </li>
          </ul>
          <button onClick={loadParagraph}>Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
