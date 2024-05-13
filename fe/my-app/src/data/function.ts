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
  teens: ['mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'],
  tens: ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'],
  hundreds: ['', 'một trăm', 'hai trăm', 'ba trăm', 'bốn trăm', 'năm trăm', 'sáu trăm', 'bảy trăm', 'tám trăm', 'chín trăm']
};

export function numberToWords(number: number) {
  number = Math.round(number);
  if (number === 0) return 'Không';
  const strNumber = number.toString();
  const parts = [];
  for (let i = 0; i < strNumber.length; i += 3) {
    parts.push(strNumber.slice(Math.max(0, strNumber.length - i - 3), strNumber.length - i));
  }
  const result = [];
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parseInt(parts[i], 10);
    if (part === 0) continue;
    const ones = part % 10;
    const tens = Math.floor(part / 10) % 10;
    const hundreds = Math.floor(part / 100);
    const partResult = [];
    if (hundreds > 0) {
      partResult.push(vietnameseNumbers.hundreds[hundreds]);
    }
    if (tens === 0 && ones > 0 && i > 0) {
      partResult.push('Linh');
    } else if (tens === 1) {
      partResult.push(vietnameseNumbers.teens[ones]);
    } else if (tens > 1) {
      partResult.push(vietnameseNumbers.tens[tens]);
      if (ones > 0) {
        partResult.push(vietnameseNumbers.ones[ones]);
      }
    } else if (ones > 0) {
      partResult.push(vietnameseNumbers.ones[ones]);
    }
    if (i === 0 && partResult.length > 0) {
      result.push(partResult.join(' '));
    } else if (i === 1) {
      result.push(partResult.join(' ') + ' nghìn');
    } else if (i === 2) {
      result.push(partResult.join(' ') + ' triệu');
    } else if (i === 3) {
      result.push(partResult.join(' ') + ' tỷ');
    }
  }
  const finalResult = result.join(' ');
  return finalResult.charAt(0).toUpperCase() + finalResult.slice(1)
}

// Example usage:


// Example usage:


// Example usage:



