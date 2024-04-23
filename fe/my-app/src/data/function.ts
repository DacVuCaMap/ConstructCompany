export const numberToWords = (number: number) => {
    const digitMap: { [key: string]: string } = {
      '0': 'không',
      '1': 'một',
      '2': 'hai',
      '3': 'ba',
      '4': 'bốn',
      '5': 'năm',
      '6': 'sáu',
      '7': 'bảy',
      '8': 'tám',
      '9': 'chín'
    };
    const unitNames = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
  
    const convertChunk = (number: number) => {
      let chunk: string = '';
      if (number >= 100) {
        chunk += digitMap[Math.floor(number / 100)] + ' trăm ';
        number %= 100;
      }
      if (number >= 10 && number <= 19) {
        chunk += 'mười ';
        number %= 10;
      } else if (number >= 20) {
        chunk += digitMap[Math.floor(number / 10)] + ' mươi ';
        number %= 10;
      }
      if (number > 0) {
        chunk += digitMap[number];
      }
      return chunk;
    };
  
    let result = '';
    let chunkIndex = 0;
    while (number > 0) {
      const chunk = number % 1000;
      if (chunk > 0) {
        const chunkWords = convertChunk(chunk);
        const unitName = unitNames[chunkIndex];
        const prefix =
          chunkIndex === 0 && chunkWords === 'không' ? 'linh ' :
          chunkIndex === 0 && chunkWords.startsWith('không trăm') ? 'linh ' : '';
        result = `${prefix}${chunkWords} ${unitName} ${result}`.trim();
      }
      number = Math.floor(number / 1000);
      chunkIndex++;
    }
  
    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
  
    return capitalizeFirstLetter(result)+" đồng";
  };