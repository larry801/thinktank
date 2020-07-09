import { Prompt, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { loadCredentials, saveCredentials } from "../../api/storage";

import BackToHome from "../BackToHome";
import Multiplayer from "../Multiplayer";
import { Player } from "../../logic";
import ShareLink from "./ShareLink";
import ShowHelp from "../ShowHelp";
import { joinMatch } from "../../api/match";

interface JoinMatchProps {
  serverURL: string;
}

interface Params {
  matchID: string;
  player: Player;
}

/** Join a match when the page is loaded. */
const JoinMatch = ({ serverURL }: JoinMatchProps) => {
  const { matchID, player }: Params = useParams();
  const [credentials, setCredentials] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const creds = loadCredentials(matchID, player);
    if (creds) {
      setCredentials(creds);
    } else {
      joinMatch(serverURL, matchID, player)
        .then((creds) => {
          saveCredentials(matchID, player, creds);
          setCredentials(creds);
        })
        .catch((err) => setError(err.toString()));
    }
  }, [serverURL, matchID, player]);

  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          {credentials && (
            <Multiplayer
              serverURL={serverURL}
              matchID={matchID}
              player={player}
              credentials={credentials}
            />
          )}
          {error && (
            <div className="alert alert-danger margin-top">{error}</div>
          )}
          {credentials && <ShareLink matchID={matchID} player={player} />}
          <div className="row flex-center">
            <div className="col no-padding">
              <ShowHelp />
            </div>
            <div className="col no-padding">
              <BackToHome />
            </div>
          </div>
        </div>
      </div>
      <Prompt message="Are you sure you want to leave?" />
    </div>
  );
};

export default JoinMatch;
