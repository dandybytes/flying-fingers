export const isPrintableChar = c =>
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890,.?!;:'\"()-$/<>[]\\{}|`~@#%^&*=_+".includes(c); //prettier-ignore
export const isEnter = c => c === "Enter";
export const isBackspace = c => c === "Backspace";
export const isValidInputChar = c => isEnter(c) || isPrintableChar(c);
