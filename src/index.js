var app = new Vue({
  el: "#app",
  data: {
    weather: "天气",
    country: "中国",
    province: "广东省",
    city: "深圳",
    condition: {},
    threeDays: [],
    fifteenDays: [],
    liveIndex: []
  },
  methods: {
    getCityWeather() {
      axios
        .post(
          `http://aliv18.data.moji.com/whapi/json/alicityweather/condition?cityId=${284609}`,
          {},
          axiosConfig
        )
        .then(res => {
          const { condition } = res.data.data;
          app.condition = Object.assign({}, app.condition, {
            temp: condition.temp,
            condition: condition.condition,
            humidity: condition.humidity,
            windDir: condition.windDir,
            windLevel: condition.windLevel,
            tips: condition.tips
          });
        })
        .catch(error => console.log(error));
    },
    getForecast() {
      
      axios
        .post(
          `http://aliv18.data.moji.com/whapi/json/alicityweather/forecast15days?cityId=${284609}`,
          {},
          axiosConfig
        )
        .then(res => {
          let forecast = res.data.data.forecast;
          for (let i = 0; i < 3; i++) {
            app.threeDays.push(forecast[i]);
          }
          for (let i = 0; i < 16; i++) {
            app.fifteenDays.push(forecast[i]);
          }
        });
    },
    getLive() {
      let date = new Date();
      let month = date.getMonth()+1;
      if(month < 10){
        month = '0'+month
      }
      const day = date.getFullYear()+'-'+month+'-'+date.getDate()

      axios
        .post(
          `http://aliv18.data.moji.com/whapi/json/alicityweather/index?cityId=${284609}`,
          {},
          axiosConfig
        )
        .then(res => {
          console.log(day)
          console.log(res.data.data.liveIndex);
          console.log(res.data.data.liveIndex.day)
           app.liveIndex = Object.assign({}, app.liveIndex, res.data.data.liveIndex)
        });
    }
  }
});

var axiosConfig = {
  headers: {
    Authorization: "APPCODE 2aa6df85c4be4feca5e89a08bc673960"
  }
};
