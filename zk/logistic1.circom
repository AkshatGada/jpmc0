pragma circom 2.1.6;

include "circomlib/compconstant.circom";
include "circomlib/comparators.circom";


template Example (m,n) {
    signal input a[m][n];
    signal input b[n];
    signal  output result[m];
    signal output in[m];
    signal output out[m];
    signal input ans[m];

    signal ins[m+1][n+1];
    signal inv[m];

var j ;


        component check[m];


for( j=0; j<250;j++){

        ins[j][0] <== 0;

    for(var i=0;i<28;i++){
    ins[j][i+1] <== ins[j][i] + a[j][i]*b[i];
    }
  
    check[j] = LessThan(252);

    result[j] <== ins[j][28];



    check[j].in[0] <== result[j];
    check[j].in[1] <== 0;
    in[j] <== check[j].out;    


    inv[j] <-- in[j]!=0 ? 1/in[j] : 0;

    out[j] <== -in[j]*inv[j] +1;
    in[j]*out[j] === 0;
   

    ans[j] === out[j];
    
}
}

component main { public [ a ] } = Example(250,28);