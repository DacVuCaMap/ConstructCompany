// export const numberToWords = (number: number) => {
//   const digitMap: { [key: string]: string } = {
//     '0': 'không',
//     '1': 'một',
//     '2': 'hai',
//     '3': 'ba',
//     '4': 'bốn',
//     '5': 'năm',
//     '6': 'sáu',
//     '7': 'bảy',
//     '8': 'tám',
//     '9': 'chín'
//   };
//   const unitNames = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

//   const convertChunk = (number: number) => {
//     let chunk: string = '';
//     if (number >= 100) {
//       chunk += digitMap[Math.floor(number / 100)] + ' trăm ';
//       number %= 100;
//     }
//     if (number >= 10 && number <= 19) {
//       chunk += 'mười ';
//       number %= 10;
//     } else if (number >= 20) {
//       chunk += digitMap[Math.floor(number / 10)] + ' mươi ';
//       number %= 10;
//     }
//     if (number > 0) {
//       chunk += digitMap[number];
//     }
//     return chunk;
//   };

//   let result = '';
//   let chunkIndex = 0;
//   while (number > 0) {
//     const chunk = number % 1000;
//     if (chunk > 0) {
//       const chunkWords = convertChunk(chunk);
//       const unitName = unitNames[chunkIndex];
//       const prefix =
//         chunkIndex === 0 && chunkWords === 'không' ? 'linh ' :
//           chunkIndex === 0 && chunkWords.startsWith('không trăm') ? 'linh ' : '';
//       result = `${prefix}${chunkWords} ${unitName} ${result}`.trim();
//     }
//     number = Math.floor(number / 1000);
//     chunkIndex++;
//   }

//   const capitalizeFirstLetter = (str: string) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//   return capitalizeFirstLetter(result) + " đồng";
// };

const vietnameseNumbers = {
  ones: ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'],
  tens: ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'],
  hundreds: ['', 'một trăm', 'hai trăm', 'ba trăm', 'bốn trăm', 'năm trăm', 'sáu trăm', 'bảy trăm', 'tám trăm', 'chín trăm'],
  unit: ['', 'nghìn', 'triệu', 'tỷ']
};

export function numberToWords(number:number) {
  number = Math.round(number);
  if (number === 0) return 'Không';
  const strNumber = number.toString();
  const parts = [];
  for (let i = 0; i < strNumber.length; i += 3) {
      parts.push(strNumber.slice(Math.max(0, strNumber.length - i - 3), strNumber.length - i));
  }
  console.log(parts);
  let rsString = "";
  for (let i = parts.length - 1; i >= 0; i--) {
      let tempString = "";
      let num = parseInt(parts[i]);
      //first word
      let first = Math.floor(num / 100);
      if (first > 0) {
          tempString += vietnameseNumbers.hundreds[first] + " ";
          num = num - first * 100;
      }
      else {
          if (parts[i].length == 3) {
              tempString += (Math.floor(num / 10) > 0 || Math.floor(num / 1) > 0) ? "không trăm " : "";
          }

      }
      let second = Math.floor(num / 10);
      if (second > 0) {
          tempString += vietnameseNumbers.tens[second] + " ";
          num = num - second * 10
      }
      else {
          if (parts[i].length == 2) {
              tempString += (Math.floor(num / 1) > 0) ? "linh " : "";
          }
      }
      if (Math.floor(num / 1) > 0) {
          tempString += vietnameseNumbers.ones[num] + " ";
      }
      rsString += tempString + vietnameseNumbers.unit[i] + " ";
  }
  return rsString.charAt(0).toUpperCase() + rsString.slice(1)
}
// Example usage:


// Example usage:


// Example usage:



