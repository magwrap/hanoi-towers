import { useEffect, useState } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import "./App.css";
import Puck from "./Puck";

function App() {
  const [numOfPucks, setnumOfPucks] = useState(3);
  const [towerA, setTowerA] = useState<number[]>([]);
  const [towerB, setTowerB] = useState<number[]>([]);
  const [towerC, setTowerC] = useState<number[]>([]);
  const [puckOut, setPuckOut] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [win, setWin] = useState(true);

  const increasePucks = () => {
    if (numOfPucks < 12) {
      setnumOfPucks(numOfPucks + 1);
    }
  };
  const decreasePucks = () => {
    if (numOfPucks > 2) {
      setnumOfPucks(numOfPucks - 1);
    }
  };

  useEffect(() => {
    reset();
  }, [numOfPucks]);

  const renderPucks = (pucks: number[]) => {
    setWin(false);
    setTowerA([...pucks]);
    setTowerB([]);
    setTowerC([]);
    setPuckOut(0);
    setErrorMsg("");
  };

  const reset = () => {
    const pucks = [];
    for (let i = 1; i <= numOfPucks; i++) {
      pucks.push(i);
    }
    renderPucks(pucks);
    setWin(false);
  };

  const onTowerClick = (towerNum: number) => {
    setErrorMsg("");
    if (!puckOut) {
      putOut(towerNum);
    } else {
      insertPuck(towerNum);
    }
  };

  const putOut = (towerNum: number) => {
    switch (towerNum) {
      case 1:
        setPuckOut(towerA[0]);
        setTowerA(towerA.slice(1));
        break;
      case 2:
        setPuckOut(towerB[0]);
        setTowerB(towerB.slice(1));
        break;
      case 3:
        setPuckOut(towerC[0]);
        setTowerC(towerC.slice(1));
        break;
    }
  };

  const insertPuck = (towerNum: number) => {
    switch (towerNum) {
      case 1:
        if (puckOut < towerA[0] || towerA.length === 0) {
          setTowerA([puckOut, ...towerA]);
          setPuckOut(0);
          return;
        }
        break;
      case 2:
        if (puckOut < towerB[0] || towerB.length === 0) {
          setTowerB([puckOut, ...towerB]);
          setPuckOut(0);
          return;
        }
        break;
      case 3:
        if (puckOut < towerC[0] || towerC.length === 0) {
          setTowerC([puckOut, ...towerC]);
          setPuckOut(0);
          checkWin();
          return;
        }
        break;
    }
    setErrorMsg("Pucks must be smaller than previous one's");
  };

  const checkWin = () => {
    console.log("check win len ", towerC.length);
    if (towerC.length === numOfPucks - 1) {
      setWin(true);
    }
  };
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const putOutAsync = (n: number) => {
    putOut(n);
    delay(2000);
    return new Promise((resolve, reject) => {
      useEffect(() => {
        if (puckOut) {
          resolve(true);
        }
      }, [puckOut]);
    });
  };

  const insertPuckAsync = (n: number) => {
    insertPuck(n);
  };

  const waitForPuckIn = async () => {
    //waits for the moment till puck is taken out
    if (puckOut != 0) {
      console.log("exiting puck in");
      return true;
    }
    await delay(3000);
    waitForPuckIn();
  };

  const waitForPuckOut = async () => {
    //waits for the moment till you are able to pull puck out
    if (puckOut == 0) {
      console.log("exiting puck out");
      return true;
    }
    await delay(3000);
    waitForPuckOut();
  };

  const solve_hanoi = async (n: number, A: number, B: number, C: number) => {
    console.log("executing...");
    if (n !== numOfPucks) {
      await delay(2100);
    }
    if (n > 0) {
      solve_hanoi(n - 1, A, C, B);
      let go = await waitForPuckOut();
      putOut(A);
      go = false;
      //if puckOut != 0 continue
      go = await waitForPuckIn();
      if (go) insertPuck(C);
      go = false;
      //if puckOut == 0 continue
      go = await waitForPuckOut();
      if (go) solve_hanoi(n - 1, B, A, C);
    }
  };

  const solve = () => {
    solve_hanoi(numOfPucks, 1, 2, 3);
  };

  return (
    <div className="App">
      <header>
        <h2>Hanoi Towers</h2>
        <p>
          You have to build a pile in the third box, according to these rules:
          <ul>
            <li> Move only one puck from the top of the stack, </li>
            <li>
              Click on the box to take puck out, click again to put it back in
            </li>
            <li> Don't put bigger puck's on smaller ones</li>
          </ul>
        </p>
      </header>
      <p className="error">{errorMsg}</p>
      <main>
        <section>
          <div style={{ height: 60 }}>
            {puckOut ? <Puck index={puckOut} /> : <div> </div>}
          </div>
        </section>
        <section>
          <div className="tower" id="tower1" onClick={() => onTowerClick(1)}>
            {towerA.map((i) => (
              <Puck index={i} />
            ))}
          </div>
          <div className="tower" id="tower2" onClick={() => onTowerClick(2)}>
            {towerB.map((i) => (
              <Puck index={i} />
            ))}
          </div>
          <div className="tower" id="tower3" onClick={() => onTowerClick(3)}>
            {towerC.map((i) => (
              <Puck index={i} />
            ))}
          </div>
          <div>
            {Array.from(Array(numOfPucks)).map((i: number) => (
              <div style={{ height: 47, width: 0 }} key={i}></div>
            ))}
          </div>
        </section>

        <section className="num-pucks">
          <h3>
            <span>Number of pucks:</span> <i className="pucks">{numOfPucks}</i>
          </h3>
          <div className="buttons">
            <button onClick={increasePucks}>
              <AiFillCaretUp size={50} />
            </button>
            <button onClick={decreasePucks}>
              <AiFillCaretDown size={50} />
            </button>
          </div>
        </section>
        <button onClick={solve}>Solve</button>
        <button onClick={reset}>Reset</button>
      </main>
      {win && (
        <button onClick={reset}>
          <div className="winScreen">
            <h1>You Won!!</h1>
            <h3>Press to reset</h3>
          </div>
        </button>
      )}
    </div>
  );
}

export default App;
