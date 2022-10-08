import axios from 'axios';

async function fetchRatePrivatBank() {
    const CURRENCY_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  try {
    const fetchData = await axios(CURRENCY_URL)
      .then(res => {
        return res.data;
      })
      .then(items => items.map(item => {
        const data = {
          ccy: item.ccy,
          base_ccy: item.base_ccy,
          normalizedBuyValue: Number(item.buy).toFixed(2),
          normalizedSaleValue: Number(item.sale).toFixed(2),
        }
        return data;
      }));
    return fetchData;
      console.log(fetchData);
  } catch (error) {
    console.error(error);
  }
};

export default fetchRatePrivatBank;