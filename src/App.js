import React, { useState, useEffect } from "react";
import { Card } from "react-casino";
import Modal from "react-modal";
import coinImage from "../src/img/money.svg";
import "reactjs-popup/dist/index.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function App() {
  const [deck, setDeck] = useState([]);
  const [tableCard, setTableCard] = useState([]);
  const [highLowColor, setHighLowColor] = useState("");
  const [playerCredit, setPlayerCredit] = useState(500);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalPlay, setModalPlay] = useState(true);

  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
  var suits = ["C", "D", "H", "S"];

  useEffect(() => {
    getDeck();
    shuffleCards();
    getRandomCard();
  }, []);

  const getDeck = () => {
    // make full deck of cards
    var i, j;

    for (i = 0; i < suits.length; i++) {
      for (j = 0; j < ranks.length; j++) {
        deck.push({ ranks: ranks[j], suits: suits[i], image: "" });
      }
    }
    setDeck(deck);
  };

  //Draw Random Card

  const getRandomCard = () => {
    var item = deck[Math.floor(Math.random() * deck.length)];

    const findElement = (element) => element === item;

    const index = deck.findIndex(findElement);
    deck.splice(index, 1);

    setDeck(deck);
    setTableCard(item);
  };

  //Shufle Dack of Cards

  const shuffleCards = () => {
    // shuffle the cards
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  };

  const handleClick = (bet) => {
    const oldCard = tableCard;
    const newCard = deck[Math.floor(Math.random() * deck.length)];

    let res = compareCards(oldCard, newCard, bet);
    if (res === true) {
      setHighLowColor({ text: "True", class: "ui green message" });
      setPlayerCredit(playerCredit + 20);
      window.setTimeout(() => {
        setHighLowColor("");
      }, 1000);
    } else {
      setHighLowColor({ text: "False", class: "ui red message" });
      setIsOpen(true);
    }
    setTableCard(newCard);
  };

  //Compare drawn card and on on the table

  const compareCards = (oldCard, newCard, bet) => {
    const oldCartNum = convertSignToNumber(oldCard.ranks);
    const newCartNum = convertSignToNumber(newCard.ranks);

    let res = "";

    if (bet === "high") {
      res = newCartNum >= oldCartNum;
    }
    if (bet === "low") {
      res = newCartNum <= oldCartNum;
    }
    return res;
  };

  //Converting card in number for easier compare

  const convertSignToNumber = (sign) => {
    switch (sign) {
      case "A":
        return 1;
        break;
      case "T":
        return 10;
        break;
      case "J":
        return 12;
        break;
      case "Q":
        return 13;
        break;
      case "K":
        return 14;
        break;
      default:
        return sign;
    }
  };

  //Modal call for easier control of game

  const closeModal = () => {
    setIsOpen(false);
    setModalPlay(false);
    setHighLowColor("");
  };

  const resetGame = () => {
    getDeck();
    shuffleCards();
    getRandomCard();
    closeModal();
    setPlayerCredit(500);
  };

  const playGame = () => {
    getDeck();
    shuffleCards();
    getRandomCard();
    setPlayerCredit(playerCredit - 100);
    closeModal();
  };

  return (
    <div className="ui grid">
      <div className="row">
        <div className="six wide column"></div>
        <div
          style={{ textAlign: "center", padding: "2%", fontSize: "large" }}
          className="four wide column"
        >
          <h2>High-Low Card Game</h2>
        </div>
        <div className="six wide column">
          <table style={{ float: "right", padding: "2%", fontSize: "large" }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold" }}>Credit:</td>
                <td></td>
                <td>{playerCredit}</td>
                <td>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={coinImage}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="six wide column"></div>
        <div className="four wide column">
          <Card suit="" face="" />
          <Card
            style={{ marginLeft: "16px" }}
            suit={tableCard.suits}
            face={tableCard.ranks}
          />
        </div>
        <div className="six wide column"></div>
      </div>
      <div className="row">
        <div className="six wide column"></div>
        <div className="four wide column">
          <div className={highLowColor.class}>
            <p style={{ textAlign: "center" }}>{highLowColor.text}</p>
          </div>
        </div>
        <div className="six wide column"></div>
      </div>

      <div className="row">
        <div className="six wide column"></div>
        <div style={{ textAlign: "center" }} className="four wide column">
          <button
            className="ui green button"
            title="Next card would be higher then one on the table!"
            onClick={() => handleClick("high")}
          >
            High
          </button>
          <button
            className="ui red button"
            title="Next card would be lower then one on the table!"
            onClick={() => handleClick("low")}
          >
            Low
          </button>
        </div>
        <div className="six wide column"></div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="content">
          <h2>You lose a game!</h2>
          <div style={{ textAlign: "center" }} className="extra content">
            <div className="ui green button" onClick={resetGame}>
              Play again
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalPlay}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Play Game"
      >
        <div className="content">
          <h2 style={{ textAlign: "center" }}>Play a game!</h2>
          <div style={{ textAlign: "center" }} className="extra content">
            <div className="ui raised segment">
              <p>
                <b>Little into in game:</b>
                <br /> You need to guess next card drawn from dack. <br />
                You guss is the card high or low then one on the table.
                <br /> If you guss is right you get 20 coins, if not you loose a
                game.
              </p>
            </div>
            <div>
              Starting game will cost you <b>100 coins</b>
            </div>
            <br />
            <div className="ui green button" onClick={playGame}>
              Play
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
