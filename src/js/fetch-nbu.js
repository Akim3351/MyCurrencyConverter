import axios from 'axios';

async function fetchRateNationalBank() {
    const CURRENCY_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  try {
    const fetchData = await axios(CURRENCY_URL)
    .then(res => res.data.map(item => {
      const {
        txt,
        rate,
        cc,
      } = item;
      const data = {
        txt,
        cc,
        rate,
      }
      return data;
    }));
    // console.log(fetchData);

    return [
      {txt: "Українська гривня", cc: "UAH", rate: 1},
      ...fetchData,
    ];
  } catch(error) {
    console.log(error);
  }};

  export default fetchRateNationalBank;