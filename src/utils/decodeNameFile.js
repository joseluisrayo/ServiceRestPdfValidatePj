const desencriptarCaracter = (cadena) => {
  let nombreOrigenFTP = "",
    anioExp = "",
    codigoExp1_2 = "",
    anioResolucion = "",
    mesResolucion = "",
    diaResolucion = "",
    digitoExp3_4_5 = "",
    horaResolucion = "",
    minutoResolucion = "",
    segundoResolucion = "",
    codigoIncidente = "";

  let pos = 0;
  for (let item in cadena) {
    switch (pos) {
      case 0: {
        let variable = cadena.substring(pos, pos + 3);
        nombreOrigenFTP = tablaSalaSupremaCaracter(variable);
        pos = 3;
        break;
      }
      case 3:
      case 4:
      case 5: {
        let variable = cadena.substring(pos, pos + 1);
        anioExp += anioMinutoSegundoExpedienteCaracter(variable);
        pos++;
        break;
      }
      case 6:
      case 7: {
        let variable = cadena.substring(pos, pos + 1);
        codigoExp1_2 += variable;
        pos++;
        break;
      }
      case 8:
      case 9:
      case 10: {
        let variable = cadena.substring(pos, pos + 1);
        anioResolucion += anioMinutoSegundoExpedienteCaracter(variable);
        pos++;
        break;
      }
      case 11: {
        let variable = cadena.substring(pos, pos + 1);
        mesResolucion += mesResolucionCaracter(variable);
        pos++;
        break;
      }
      case 12: {
        let variable = cadena.substring(pos, pos + 1);
        diaResolucion += diaResolucionCaracter(variable);
        pos++;
        break;
      }
      case 13:
      case 14:
      case 15: {
        let variable = cadena.substring(pos, pos + 1);
        digitoExp3_4_5 += variable;
        pos++;
        break;
      }
      case 16: {
        let variable = cadena.substring(pos, pos + 1);
        horaResolucion += horaResolucionCaracter(variable);
        pos++;
        break;
      }
      case 17:
      case 18: {
        let variable = cadena.substring(pos, pos + 1);
        minutoResolucion += anioMinutoSegundoExpedienteCaracter(variable);
        pos++;
        break;
      }
      case 19:
      case 20: {
        let variable = cadena.substring(pos, pos + 1);
        segundoResolucion += anioMinutoSegundoExpedienteCaracter(variable);
        pos++;
        break;
      }
      case 21:
      case 22:
      case 23: {
        let variable = cadena.substring(pos, pos + 1);
        codigoIncidente += variable;
        pos++;
        break;
      }
    }
  }

  const nombreDocumentoPdf =
    anioExp +
    codigoExp1_2 +
    digitoExp3_4_5 +
    nombreOrigenFTP +
    codigoIncidente +
    anioResolucion +
    mesResolucion +
    diaResolucion +
    horaResolucion +
    minutoResolucion +
    segundoResolucion;

  return (
    cadena.substring(0, 3) +
    "/" +
    nombreDocumentoPdf.substring(0, 16) +
    "/" +
    nombreDocumentoPdf +
    ".pdf"
  );
};

const tablaSalaSupremaCaracter = (caracter) => {
  let constante;

  switch (caracter) {
    case "101":
    case "102":
    case "106":
    case "107":
      constante = "5001217";
      break;
    case "201":
    case "202":
      constante = "5001212";
      break;
    case "203":
    case "204":
    case "205":
    case "206":
    case "207":
    case "208":
    case "209":
      constante = "5001211";
      break;
    case "400":
      constante = "5001237";
      break;
    case "401":
      constante = "5001227";
      break;
    default:
      constante = "";
      break;
  }

  return constante;
};

const mesResolucionCaracter = (caracter) => {
  let constante;

  switch (caracter) {
    case "E":
      constante = "01";
      break;
    case "F":
      constante = "02";
      break;
    case "G":
      constante = "03";
      break;
    case "H":
      constante = "04";
      break;
    case "I":
      constante = "05";
      break;
    case "J":
      constante = "06";
      break;
    case "K":
      constante = "07";
      break;
    case "L":
      constante = "08";
      break;
    case "M":
      constante = "09";
      break;
    case "N":
      constante = "10";
      break;
    case "O":
      constante = "11";
      break;
    case "P":
      constante = "12";
      break;
    default:
      constante = "";
      break;
  }

  return constante;
};

const diaResolucionCaracter = (caracter) => {
  let constante;

  switch (caracter) {
    case "A":
      constante = "1";
      break;
    case "B":
      constante = "2";
      break;
    case "C":
      constante = "3";
      break;
    case "D":
      constante = "4";
      break;
    case "E":
      constante = "5";
      break;
    case "F":
      constante = "6";
      break;
    case "G":
      constante = "7";
      break;
    case "H":
      constante = "8";
      break;
    case "I":
      constante = "9";
      break;
    case "J":
      constante = "10";
      break;
    case "K":
      constante = "11";
      break;
    case "L":
      constante = "12";
      break;
    case "M":
      constante = "13";
      break;
    case "N":
      constante = "14";
      break;
    case "O":
      constante = "15";
      break;
    case "P":
      constante = "16";
      break;
    case "Q":
      constante = "17";
      break;
    case "R":
      constante = "18";
      break;
    case "S":
      constante = "19";
      break;
    case "T":
      constante = "20";
      break;
    case "U":
      constante = "21";
      break;
    case "V":
      constante = "22";
      break;
    case "W":
      constante = "23";
      break;
    case "X":
      constante = "24";
      break;
    case "Y":
      constante = "25";
      break;
    case "Z":
      constante = "26";
      break;
    case "1":
      constante = "27";
      break;
    case "2":
      constante = "28";
      break;
    case "3":
      constante = "29";
      break;
    case "4":
      constante = "30";
      break;
    case "5":
      constante = "31";
      break;
    default:
      constante = "";
      break;
  }

  return constante;
};

const horaResolucionCaracter = (caracter) => {
  let constante;

  switch (caracter) {
    case "X":
      constante = "1";
      break;
    case "W":
      constante = "2";
      break;
    case "V":
      constante = "3";
      break;
    case "U":
      constante = "4";
      break;
    case "T":
      constante = "5";
      break;
    case "S":
      constante = "6";
      break;
    case "R":
      constante = "7";
      break;
    case "Q":
      constante = "8";
      break;
    case "P":
      constante = "9";
      break;
    case "O":
      constante = "10";
      break;
    case "N":
      constante = "11";
      break;
    case "M":
      constante = "12";
      break;
    case "L":
      constante = "13";
      break;
    case "K":
      constante = "14";
      break;
    case "J":
      constante = "15";
      break;
    case "I":
      constante = "16";
      break;
    case "H":
      constante = "17";
      break;
    case "G":
      constante = "18";
      break;
    case "F":
      constante = "19";
      break;
    case "E":
      constante = "20";
      break;
    case "D":
      constante = "21";
      break;
    case "C":
      constante = "22";
      break;
    case "B":
      constante = "23";
      break;
    case "A":
      constante = "24";
      break;
    default:
      constante = "";
      break;
  }

  return constante;
};

const anioMinutoSegundoExpedienteCaracter = (caracter) => {
  let constante;

  switch (caracter) {
    case "X":
      constante = "19";
      break;
    case "Y":
      constante = "20";
      break;
    case "M":
    case "A":
      constante = "1";
      break;
    case "N":
    case "B":
      constante = "2";
      break;
    case "O":
    case "C":
      constante = "3";
      break;
    case "P":
    case "D":
      constante = "4";
      break;
    case "Q":
    case "E":
      constante = "5";
      break;
    case "R":
    case "F":
      constante = "6";
      break;
    case "S":
    case "G":
      constante = "7";
      break;
    case "T":
    case "H":
      constante = "8";
      break;
    case "U":
    case "I":
      constante = "9";
      break;
    case "V":
    case "J":
      constante = "0";
      break;
    default:
      constante = "";
      break;
  }

  return constante;
};

export const methods = {
  desencriptarCaracter,
};
