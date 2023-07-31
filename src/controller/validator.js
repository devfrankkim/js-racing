import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import { MAX_CAR_NAME_LENGTH } from "../constants/rules";
import { updateView } from "../view/PrintView";

/**
 * TEST CODE: 0, OFFICIAL : 1
 * @param number status
 * @param string carName
 * @returns
 */

export const VERSION_STATUS = {
  test: 0,
  official: 1,
};

export const isValidName = (status, carName) => {
  switch (status) {
    case VERSION_STATUS.official:
      if (!carName) {
        updateView.printErrorMessage(ERROR_MESSAGE.noEmptyName);
        return false;
      }
      if (carName.length > MAX_CAR_NAME_LENGTH) {
        updateView.printErrorMessage(ERROR_MESSAGE.maxCarNameLength);
        return false;
      }
      break;

    case VERSION_STATUS.test:
      if (!carName) {
        throw Error(ERROR_MESSAGE.noEmptyName);
      }
      if (carName.length > MAX_CAR_NAME_LENGTH) {
        throw Error(ERROR_MESSAGE.maxCarNameLength);
      }
      break;
    default:
      break;
  }

  return true;
};
