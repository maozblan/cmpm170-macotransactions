class Economy {
  constructor(textObj, companies) {
    this.textObj = textObj;
    this.companies = companies;
    this.market = this.textObj.text ? this.textObj.text : 'NORM';
  }

  update() {
    for (const company of this.companies) {
      if (this.market === 'BEAR') {
        company.rate -= this.jitter();
      } else if (this.market === 'BULL'){
        company.rate += this.jitter();
      } else {
        company.rate -= this.jitter(5, -5, 2);
      }

      // protection ig
      if (company.rate < 5) {
        company.rate = 5;
      } else if (company.rate >= 200) {
        company.rate = 200;
      }
    }
    this.textObj.text = this.market;
    if (Math.random() >= 0.9) {
      const chance = ['BULL', 'BEAR', 'NORM', 'NORM', 'NORM'];
      this.market = chance[Math.floor(Math.random()*chance.length)];
    }
  }


  jitter(max=5, min=1, boost=10) {
    if (Math.random() >= 0.1) {
      return Math.floor(Math.random() * (max-min)) + min;
    } else {
      return Math.floor(Math.random() * (max-min)) + boost;
    }
  }
}