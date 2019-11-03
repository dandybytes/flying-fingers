export const isPrintableChar = c => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890,.?!;:'\"()-$/<>[]\\{}|`~@#%^&*=_+".includes(c); //prettier-ignore
export const isLowerCaseLetter = c => c.charCodeAt() >= 97 && c.charCodeAt() <= 122;
export const isUpperCaseLetter = c => c.charCodeAt() >= 65 && c.charCodeAt() <= 90;
export const isRightShiftValue = c => "ABCDEFGQRSTVWXZ!$@#%".includes(c); //prettier-ignore
export const isLeftShiftValue = c => 'HIJKLMNOPUY?:"()<>{}|^&*_+'.includes(c); //prettier-ignore
export const isEnter = c => c === "Enter";
export const isBackspace = c => c === "Backspace";
export const isValidInputChar = c => isEnter(c) || isPrintableChar(c);
