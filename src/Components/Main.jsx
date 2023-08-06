import { useState, useEffect } from "react";

export default function Main() {
  const [text, setText] = useState("");
  const [userText, setUserText] = useState("");
  const [timerunning, setTimerunning] = useState(false);
  const [time, setTime] = useState(60);
  const [correctWords, setCorrectWords] = useState(0);

  useEffect(() => {
    let interval;
    if (timerunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setTimerunning(false);
      calculateCorrectWords();
    }
    return () => clearInterval(interval);
  }, [timerunning, time]);

  const calculateCorrectWords = () => {
    const textArray = text.trim().split(" ");
    const userTextArray = userText.trim().split(" ");
    let correctCount = 0;
    for (let i = 0; i < userTextArray.length; i++) {
      if (userTextArray[i] === textArray[i]) {
        correctCount++;
      }
    }
    setCorrectWords(correctCount);
  };
  const handleChange = (e) => {
    if (!timerunning) {
      setTimerunning(true);
    }
    let userTextArray = userText.split(" ");
    userTextArray = userTextArray.slice(0, userTextArray.length - 1);
    userTextArray = userTextArray.concat([e.target.value]);
    setUserText(userTextArray.join(" "));
    if (userText.length >= text.length) {
      fetchWords(text);
    }
  };

  const fetchWords = async (txt) => {
    let response = await fetch(
      "https://random-word-api.vercel.app/api?words=40"
    );
    response = await response.json();
    response.map((word) => {
      txt = txt.concat(word).concat(" ");
    });
    setText(txt);
  };
  useEffect(() => {
    fetchWords("");
  }, []);
  return (
    <main className="px-3 text-white pt-10 gradient">
      <div>
        <div className="text-base text-white flex justify-center mb-4 mx-auto">
          <span className="bg-indigo-500 px-2 py-2 rounded">
            Time:{time == 60 ? "01:00" : `00:${time}`}
          </span>
        </div>
        <p>
          Text:{" "}
          {text
            .split(" ")
            .slice(0, userText.split(" ").length - 1)
            .map((txt, i) => {
              return (
                <span
                  key={i}
                  className={
                    userText.split(" ")[i] == txt
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {txt}{" "}
                </span>
              );
            })}
          {text
            .split(" ")
            .slice(userText.split(" ").length - 1, text.split(" ").length)
            .map((txt, i) => {
              return (
                <span
                  key={i}
                  className={`px-1 py-1 ${i == 0 ? "bg-gray-800" : ""}`}
                >
                  {txt}{" "}
                </span>
              );
            })}
        </p>
      </div>
      <div>
        <div className=" my-4 flex justify-between">
          <input
            id="message"
            name="message"
            value={userText.split(" ").slice(userText.split(" ").length - 1)}
            onChange={handleChange}
            className="w-[86%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            disabled={time == 0}
          />
          <button
            className=" px-2 py-2 bg-indigo-500 rounded"
            onClick={() => {
              setTimerunning(false);
              setTime(60);
              setUserText("");
              fetchWords("");
            }}
          >
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              width="1.5em"
            >
              <path
                fill="currentColor"
                d="M20.9 41.7q-5.55-1.05-9.225-5.45T8 26.05q0-3.55 1.5-6.7Q11 16.2 13.75 14q.4-.3.95-.275.55.025.95.425.5.5.45 1.15-.05.65-.65 1.15-2.1 1.75-3.275 4.275Q11 23.25 11 26.05q0 4.7 2.9 8.175 2.9 3.475 7.35 4.475.55.1.925.55.375.45.375 1 0 .7-.5 1.125-.5.425-1.15.325Zm6.3 0q-.65.1-1.15-.325-.5-.425-.5-1.125 0-.55.375-1 .375-.45.925-.55 4.5-1 7.35-4.475 2.85-3.475 2.85-8.175 0-5.45-3.775-9.225Q29.5 13.05 24.05 13.05h-1L25 15q.4.4.4 1.05T25 17.1q-.45.45-1.1.45-.65 0-1.05-.45l-4.55-4.5q-.25-.25-.35-.5-.1-.25-.1-.55 0-.3.1-.55.1-.25.35-.5l4.55-4.55q.4-.4 1.05-.4t1.1.4q.4.45.4 1.1 0 .65-.4 1.05l-1.95 1.95h1q6.7 0 11.35 4.675 4.65 4.675 4.65 11.325 0 5.8-3.65 10.2-3.65 4.4-9.2 5.45Z"
              />
            </svg>
          </button>
        </div>
      </div>
      {time === 0 && (
        <p className="text-white">Your typing speed: {correctWords}wpm</p>
      )}
    </main>
  );
}
