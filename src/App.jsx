import Player from "./components/Player";
import Header from "./components/Header";
import data from "./data";
import React from "react";
import ReactConfetti from "react-confetti";
// import { treemapSquarify } from "d3";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";

// Optional for full screen effect

export default function App(props) {
  const [playerPressed, setPlayerPressed] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [resetTrigger, setResetTrigger] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const [players, setPlayers] = React.useState(""); // State to track input
  const [isStartScreen, setIsStartScreen] = React.useState(true);
  const [forbbidenList, setForbbidenList] = React.useState([]);
  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [entryElements, setEntryElements] = React.useState([]);
  const [discoveredList, setDiscoveredList] = React.useState([]);
  const arrayRef = React.useRef([]);
  const [message, setMessage] = React.useState("");
  const [gameOver, setGameOver] = React.useState(false);
  const { width, height } = useWindowSize();
  const [errorMessage, setErrorMessage] = React.useState("");

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleInputChange = (e) => {
    setPlayers(e.target.value);
    setErrorMessage("");
  };
  const handleForbbidenList = (e) => {
    setForbbidenList((prevList) => {
      const newList = [...prevList];
      newList.push(e);
      return newList;
    });
  };
  const handleSubmit = (e) => {
    setScore(0);
    setCount(0);
    setForbbidenList([]);
    setValue1(null);
    setValue2(null);
    setPlayerPressed(null);
    setEntryElements([]);
    setDiscoveredList([]);

    // Reset arrayRef
    // Reset arrayRef to an empty array

    // Go back to the start screen

    arrayRef.current = [];
    e.preventDefault();
    const playersNum = Number(players);
    if (!players.trim()) {
      setErrorMessage("Please enter a valid number");
      return;
    } else if (isNaN(playersNum) || playersNum < 1 || playersNum > 245) {
      setErrorMessage("Please enter a number between 1 and 245");
      return;
    } else {
      setIsStartScreen(false);
      setDiscoveredList(Array.from({ length: players }, () => false));
      setResetTrigger(true);
    }
  };
  function handleResetTrigger() {
    setResetTrigger((currentMode) => !currentMode);
  }
  function increaseScore() {
    setScore((prevScore) => prevScore + 1);
  }
  function resetScore() {
    setScore(0);
  }
  function handleButtonClick(playerId) {
    setPlayerPressed(playerId);
  }
  function PlayerContainer({ value }) {
    if (value === null) return null;

    return <>{entryElements[value]}</>;
  }

  const toggleValueAtIndex = (index) => {
    setDiscoveredList((prevList) => {
      // Create a copy of the current list
      const newList = [...prevList];

      // Toggle the value at the specified index
      newList[index] = !newList[index];

      // Return the updated list
      return newList;
    });
  };

  const resetGame = () => {
    setScore(0);
    setCount(0);
    setForbbidenList([]);
    setValue1(null);
    setValue2(null);
    setPlayerPressed(null);
    setEntryElements([]);
    setDiscoveredList([]);

    // Reset arrayRef
    // Reset arrayRef to an empty array

    // Go back to the start screen

    arrayRef.current = [];
    setIsStartScreen(true);
  };
  React.useEffect(() => {
    if (data) {
      const elements = data.map((entry) => (
        <Player
          key={entry.id}
          id={entry.id}
          imgSrc={entry.img.src}
          imgAlt={entry.img.alt}
          title={entry.title}
          points={entry.points}
          onButtonClick={handleButtonClick}
          showPoints={discoveredList[entry.id]}
        />
      ));
      setEntryElements(elements); // Set the entryElements state
    }
  }, [data, discoveredList]); // Dependencies are data and discoveredList

  React.useEffect(() => {
    if (resetTrigger) {
      // Perform your logic like setting value1 and value2

      // if (Number(count) < 1000000) {
      const theArray = Array.from({ length: Number(players) }, (_, i) =>
        Math.floor(Math.random() * 250)
      );

      // }
      let tempValue1 = null;
      if (count != 0) {
        toggleValueAtIndex(value2 + 1);
        tempValue1 = value2;
      } else {
        const tempArray = [...theArray];
        tempValue1 = tempArray.splice(
          Math.floor(Math.random() * arrayRef.current.length),
          1
        )[0];
        handleForbbidenList(tempValue1);
        arrayRef.current = tempArray;
      }
      const newArray = arrayRef.current.filter(
        (num) => !forbbidenList.includes(num)
      );
      const tempValue2 = newArray[Math.floor(Math.random() * newArray.length)];
      if (newArray.length === 0) {
        setGameOver(true);
      }
      handleForbbidenList(tempValue2);
      increment();
      setValue1(tempValue1);
      setValue2(tempValue2);

      // Handling the score logic

      // Only set resetTrigger to false after everything is done
      setResetTrigger(false); // This will prevent infinite looping
    }
  }, [resetTrigger]);

  React.useEffect(() => {
    if (playerPressed === null || value1 === null || value2 === null) {
      return;
    }
    const correctPlayerId = playerPressed - 1;
    const chosenPlayerId =
      data[value1].points > data[value2].points ? value1 : value2;

    if (chosenPlayerId === correctPlayerId) {
      setIsCorrect(true);

      setMessage(
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 8 }}
            className="text-3xl font-bold"
          >
            {`${data[value1].title} has ${data[value1].points} points`}
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 8 }}
            className="text-3xl font-bold"
          >
            {`${data[value2].title} has ${data[value2].points} points`}
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 8 }}
            className="text-3xl font-bold"
          >
            {"Correct!!!!!"}
          </motion.h2>
        </>
      );
      increaseScore();
    } else {
      setIsCorrect(false);
      setMessage(
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 8 }}
            className="text-3xl font-bold"
          >
            {`${data[value1].title} has ${data[value1].points} points`}
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 8 }}
            className="text-3xl font-bold"
          >
            {`${data[value2].title} has ${data[value2].points} points`}
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 8 }}
            className="text-3xl font-bold"
          >
            {"Wrong!!!!!"}
          </motion.h2>
        </>
      );
    }
    const timeout = setTimeout(() => {
      if (chosenPlayerId !== correctPlayerId) {
        resetGame();
      }
      setResetTrigger(true);
      setPlayerPressed(null);
    }, 3000);
  }, [playerPressed, value1, value2]);

  React.useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setGameOver(false);
        setIsStartScreen(true);
      }, 7500);
    }
  });

  console.log(entryElements);
  return (
    <div className="app">
      {gameOver ? (
        <>
          <ReactConfetti width={width} height={height} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 8 }}
            className="text-3xl font-bold"
          >
            {`You win with ${players} players`}
          </motion.h1>
        </>
      ) : isStartScreen ? (
        <div className="startScreen">
          <h1>NBA Higher or Lower</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="startTextBox"
              placeholder="Enter number of players"
              value={players}
              onChange={handleInputChange}
            />
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      ) : (
        <>
          <Header />
          <p>{`${score}/${Number(players) - 1} players correct`}</p>

          {value1 !== null && value2 !== null && (
            <div className="content">
              <main className="player1">
                {playerPressed ? message : <PlayerContainer value={value1} />}
              </main>
              <main className="player2">
                {!playerPressed && <PlayerContainer value={value2} />}
              </main>
            </div>
          )}
        </>
      )}
    </div>
  );

  // Log to console
  console.log("Hello console");
}
/* {determineHigherScore === 3 && (
          <>
            <main className="player1">{entryElements[value1]}</main>
            <main className="player2">{entryElements[value2]}</main>
          </>
        )}
        {determineHigherScore === 2 && (
          <>
            <main className="player1">{entryElements[value1]}</main>
            <main className="player2">{entryElements[value2]}</main>
          </>
        )} */
