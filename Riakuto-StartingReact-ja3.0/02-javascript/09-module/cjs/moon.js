/*
  CommonJS形式によるモジュールの書き方
 */
const moon = {
  modifier: 'prism',
  transform() {
    console.log(`Moon ${this.modifier} power, make up!`);
  },
};

module.exports = moon;
