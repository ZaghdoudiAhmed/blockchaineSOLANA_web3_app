import React, { useEffect, useState } from "react";

import "./App.css";

const TWITTER_HANDLE = "ahmedzaghd";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function App() {
  //States
  const [walletAddress, setWalletAddress] = useState(null);

  const TEST_GIFS = [
    "https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp",
    "https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g",
    // "https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g",
    // "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
  ];

  //Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect();
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <div className="d-flex justify-content-evenly">
        {TEST_GIFS.map((gif) => (
          <div className="" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  const connectWallet = async () => {};

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/solana_logo.png"
              alt
              width={30}
              height={24}
              className="d-inline-block align-text-top"
            />{" "}
            Solana
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                About Blockchaine
              </a>
            </li> */}
            <li className="nav-item d-flex justify-content-end">
              <a className="nav-link active" aria-current="page" href="#">
                About us
              </a>
            </li>
          </ul>
          <div className="d-flex dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={"/phontom.jpeg"} width={35} height={30} />
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* This was solely added for some styling fanciness */}
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container ">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}

          {/* Add the condition to show this only if we don't have a wallet address */}
        </div>
        <div className="footer-container">
          <img
            alt="Twitter Logo"
            className="twitter-logo"
            src={"/twitter.png"}
            width={30}
            height={24}
          />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
