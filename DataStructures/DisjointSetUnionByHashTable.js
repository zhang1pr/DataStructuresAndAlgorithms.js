class DisjointSetUnion {
  constructor() {
    this.par = new Map();
    this.rank = new Map();
    this.sz = new Map();
  }   
    
  find(x) {
    if (!this.par.has(x)) this.par.set(x, x);  
     
    if (this.par.get(x) != x) {
      this.par.set(x, this.find(this.par.get(x)));  
    }  
      
    return this.par.get(x);  
  }  
    
  union(x, y) {
    let xr = this.find(x), yr = this.find(y);
      
    if (xr == yr) return false;

    if (!this.rank.has(xr)) this.rank.set(xr,1) 
    if (!this.rank.has(yr)) this.rank.set(yr,1);
      
    if (this.rank.get(xr) < this.rank.get(yr)) [xr,yr] = [yr,xr];
    if (this.rank.get(xr) == this.rank.get(yr)) this.rank.set(xr, this.rank.get(xr) + 1);
      
    this.par.set(yr, xr); 
      
    if (!this.sz.has(xr)) this.sz.set(xr,1) 
    if (!this.sz.has(yr)) this.sz.set(yr,1);   
      
    this.sz.set(xr, this.sz.get(xr) + this.sz.get(yr));  
     
    return true;  
  }  
    
  size(x) {
    return this.sz.get(this.find(x));  
  }  

  areInSameSet(x, y) {
    return this.find(x) == this.find(y);
  }
}  
