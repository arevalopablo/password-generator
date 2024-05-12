function generatePassword(arr, numero) {
  let resultado = "";
  for (let i = 0; i < numero; i++) {
    const posicionRandom = Math.floor(Math.random() * arr.length);
    const letraRandom = arr[posicionRandom];
    resultado += letraRandom;
  }

  return resultado;
}

const generateChecksObject = (arr) => {
  const fullObject = arr.reduce((acc, curr) => {
    return {
        ...acc,
        [curr]: true
    }
  }, {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  })

  return Object.entries(fullObject).filter(([key, value]) => value).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]:value
    }
  }, {})
};

const regexDicider = (obj) => {
    const {uppercase, lowercase, numbers, symbols} = obj

    switch (Object.values(obj).length) {
        case 4:
            return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.*\d).+$/;
        case 3: 
            if (uppercase && lowercase && symbols) return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).+$/;
            if (uppercase && lowercase && numbers) return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
            if (uppercase && numbers && symbols) return /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).+$/;    
            if (lowercase && numbers && symbols) return /^(?=.*[a-z])(?=.*[\W_])(?=.*\d).+$/;
        case 2:
            if (uppercase && lowercase) return /^(?=.*[a-z])(?=.*[A-Z]).+$/;    
            if (uppercase && numbers) return /^(?=.*[A-Z])(?=.*\d).+$/;
            if (uppercase && symbols) return /^(?=.*[A-Z])(?=.*[\W_]).+$/;
            if (lowercase && numbers) return /^(?=.*[a-z])(?=.*\d).+$/;
            if (lowercase && symbols) return /^(?=.*[a-z])(?=.*[\W_]).+$/;
            return /^(?=.*\d)(?=.*[\W_]).+$/;   // num + sym
        default:
            return null    
    }
}

function isInArray(arr, name) {
  return arr.includes(name);
}

export { generatePassword, isInArray, generateChecksObject, regexDicider };
