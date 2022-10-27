class RollingHash {
  constructor(s) {
    this.P = 37n;
    this.MOD = 344555666677777n
    let Pinv = this.binpow(this.P, this.MOD - 2n, this.MOD);

    let prefixes = [0n];
    this.p = prefixes;

    let pinvs = [1n];
    this.pi = pinvs;

    let ha = 0n;
    let pwrinv = 1n, pwr = 1n;

    for (let ch of s) {
      let x = BigInt(ch.charCodeAt(0));
      ha = (ha + x * pwr) % this.MOD;
      pwr = pwr * this.P % this.MOD;
      pwrinv = pwrinv * Pinv % this.MOD;
      prefixes.push(ha);
      pinvs.push(pwrinv);
    }
  }

  query(i, j) {
    return (this.p[j+1] - this.p[i] + this.MOD) * this.pi[i] % this.MOD;
  }

  binpow(a, b, m) {
    a %= m;
    let res = 1n;
    while (b > 0) {
      if (b % 2n == 1n) {
        res = res * a % m;
        b--;
      }

      a = a * a % m;
      b /= 2n;
    }

    return res;
  }
}
