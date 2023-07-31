import GameTrack from "../src/model/GameTrack";
import RacingCarGameController from "../src/controller/RacingCarGameController";
import GameWinners from "../src/model/GameWinners";
import { VERSION_STATUS, isValidName } from "../src/controller/validator";
import { ERROR_MESSAGE } from "../src/constants/ErrorMessage";
import { MAX_CAR_NAME_LENGTH } from "../src/constants/rules";

const newGame = new RacingCarGameController();
const gameTrack = new GameTrack();
const gameWinners = new GameWinners();

const DEFAULT_SCORE = "-";

gameTrack.gameStatus = [
  { carName: "kim", forward: "--" },
  { carName: "vs", forward: "-" },
  { carName: "frank", forward: "----" },
  { carName: "myself", forward: "----" },
];

describe("RacingCarGameController 사용자가 입력하는 데이터", () => {
  const invalidEmptyName = "";
  const invalidMaxCarNameLength = "123456";
  const validName = "frank";
  const invalidNameList = ["", "123456", "frank"];
  test("사용자가 입력 값 validation 값 리턴한다. ", () => {
    expect(isValidName(VERSION_STATUS.official, invalidEmptyName)).toBeFalsy();
    expect(
      isValidName(VERSION_STATUS.official, invalidMaxCarNameLength)
    ).toBeFalsy();
    expect(isValidName(VERSION_STATUS.official, validName)).toBeTruthy();

    invalidNameList.forEach((name) => {
      if (!name) {
        expect(name).toBeFalsy();
      }

      if (name.length > MAX_CAR_NAME_LENGTH) {
        expect(name).toBeFalsy;
      }
    });
  });

  test("사용자가 잘못된 입력 값을 작성한 경우 에러 처리를 한다.", () => {
    expect(() => isValidName(VERSION_STATUS.test, invalidEmptyName)).toThrow(
      ERROR_MESSAGE.noEmptyName
    );

    expect(() =>
      isValidName(VERSION_STATUS.test, invalidMaxCarNameLength)
    ).toThrow(ERROR_MESSAGE.maxCarNameLength);

    invalidNameList.forEach((name) => {
      try {
        isValidName(VERSION_STATUS.test, name);
      } catch (e) {
        if (!name) {
          expect(e.message).toBe(ERROR_MESSAGE.noEmptyName);
        }

        if (name.length > MAX_CAR_NAME_LENGTH) {
          expect(e.message).toBe(ERROR_MESSAGE.maxCarNameLength);
        }
      }
    });
  });
});
