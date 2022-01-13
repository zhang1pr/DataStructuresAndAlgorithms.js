class DisjointSetUnion {
  constructor(N) {
    this.par = [...Array(N)].map((_,idx) => idx);
    this.rank = Array(N).fill(0);
    this.sz = Array(N).fill(1);
  }   
    
  find(x) {
    if (this.par[x] != x) {
      this.par[x] = this.find(this.par[x]);  
    }  
      
    return this.par[x];  
  }

  union(x, y) {
    let xr = this.find(x), yr = this.find(y);
      
    if (xr == yr) return false;
    if (this.rank[xr] < this.rank[yr]) [xr,yr] = [yr,xr];
    if (this.rank[xr] == this.rank[yr]) this.rank[xr]++;
      
    this.par[yr] = xr; 
    this.sz[xr] += this.sz[yr];  
     
    return true;  
  }  
    
  size(x) {
    return this.sz[this.find(x)];  
  }  

  inSameSet(x, y) {
    return this.find(x) == this.find(y);
  }
}  
