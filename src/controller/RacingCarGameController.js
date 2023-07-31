import GameTrack from "../model/GameTrack";
import GameWinners from "../model/GameWinners";

import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import {
  CAR_NAME_INPUT_PROMPT,
  DEFAULT_SCORE,
  MAX_RANDOM_NUMBER,
  MIN_RANDOM_NUMBER,
  NUM_RACING_ROUNDS,
  RACE_FORWARD_RANDOM_NUMBER_LIMIT,
  WINNER_ANNOUNCEMENT_MESSAGE,
} from "../constants/rules";

import { updateView } from "../view/PrintView";

import { getRandomNumber } from "../utils/helpers";
import { VERSION_STATUS, isValidName } from "./validator";

export default class RacingCarGameController {
  constructor(readline) {
    this.readline = readline;
    this.gameCount = 0;
    this.gameTrack = new GameTrack();
    this.gameWinners = new GameWinners();
    this.forwardScoreIcon;
  }

  startGame() {
    this.readline.question(CAR_NAME_INPUT_PROMPT, (carName) => {
      try {
        if (!isValidName(VERSION_STATUS.official, carName)) {
          this.replayGame();
        } else {
          updateView.print(`\n 실행결과 \n`);

          this.gameTrack.setGameStatus(carName);
          this.startRace();

          this.gameWinners.setGameWinners(this.gameTrack.gameStatus);
          const winners = this.getWinners();
          updateView.printWinners(winners + WINNER_ANNOUNCEMENT_MESSAGE);

          this.endGame();
        }
      } catch (error) {
        updateView.print(error.message);
        this.replayGame();
      }
    });
  }

  startRace() {
    this.setForwardScoreIcon(DEFAULT_SCORE);

    while (this.gameCount < NUM_RACING_ROUNDS) {
      this.setAdvanceCars();

      this.gameCount++;

      const gameStatus = this.getGameStatus();
      updateView.printGameStatus(gameStatus);

      updateView.print("\n");
    }
  }

  setForwardScoreIcon(icon) {
    this.forwardScoreIcon = icon;
  }

  setAdvanceCars() {
    this.gameTrack.gameStatus.forEach((currentStatus) => {
      if (
        getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER) >=
        RACE_FORWARD_RANDOM_NUMBER_LIMIT
      ) {
        currentStatus.forward += this.forwardScoreIcon;
      }
    });
  }

  getGameStatus() {
    return this.gameTrack.gameStatus.map(
      (car) => `${car.carName}: ${car.forward}`
    );
  }

  getWinners() {
    return this.gameWinners.winners.join(",");
  }

  endGame() {
    this.readline.close();
  }

  replayGame() {
    this.startGame();
  }

  exit() {
    updateView.printErrorMessage(ERROR_MESSAGE["invalidInput"]);
    // this.replayGame();
    // throw Error(ERROR_MESSAGE["invalidInput"]);
  }

  // exit() {
  //   // throw Error(ERROR_MESSAGE["invalidInput"]);
  // }
}
