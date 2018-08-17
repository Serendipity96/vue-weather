var app = new Vue({
  el: "#app",
  data: {
    weather: "天气",
    country: "中国",
    province: "广东省",
    city: "深圳",
    condition: {}
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
            console.log(res)
            const {condition}= res.data.data;
            app.condition = Object.assign({},app.condition,{
                temp:condition.temp,
                condition:condition.condition,
                humidity:condition.humidity,
                windDir:condition.windDir,
                windLevel:condition.windLevel,
                tips:condition.tips,
            })
        })
        .catch(error => console.log(error));
    }
  }
});

var axiosConfig = {
  headers: {
    Authorization: "APPCODE 2aa6df85c4be4feca5e89a08bc673960"
  }
};
