class Economy {
  constructor(textObj, companies) {
    this.textObj = textObj;
    this.companies = companies;
    this.market = this.textObj.text ? this.textObj.text : 'NORM';
  }

  update() {
    if (this.market !== 'NORM') {
      for (const company of this.companies) {
        if (this.market === 'BEAR') {
         company.rate -= this.jitter();
        } else {
         company.rate += this.jitter();
        }
      }
    }
    this.textObj.text = this.market;
    if (Math.random() >= 0.9) {
      const chance = ['BULL', 'BEAR', 'NORM', 'NORM', 'NORM'];
      this.market = chance[Math.floor(Math.random()*chance.length)];
    }
  }


  jitter() {
    if (Math.random() >= 0.1) {
      return Math.floor(Math.random() * 14) + 1;
    } else {
      return Math.floor(Math.random() * 14) + 5;
    }
  }
}