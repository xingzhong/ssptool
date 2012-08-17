// test database
function run_test_c(){
test( "Adaptive Modulator" , function(){
reset_env();
CLBM_Source_Code = "double adaptive_mod(double x,double gamma) {\n\n    double y;\n\n    if (gamma> gamma_0) {\n\n        y= mod_16QAM(x);\n\n    } \n\n    else {\n\n        y= mod_QPSK(x);\n\n    } \n\n    return(y);\n\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "Dot Product" , function(){
reset_env();
CLBM_Source_Code = "//x -- INPUT\n\n//y -- INPUT\n\ndouble dot(double x[5], double y[5]){\n\n double z=0;\n\n double temp;\n\n int index;\n\n for (index = 0; index<5; index++){\n\n  temp = x[index] * y[index];\n\n  z = z + temp;\n\n }\n\n return z;\n\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "FIR Filter" , function(){
reset_env();
CLBM_Source_Code = "double *FIR_filter(double x[3],double A[3]) {\n\n    int n;\n\n    double y[5];\n\n    int i;\n\n\n\n  for(n=0;n<5;n++){\n\n       y[n]=0;\n\n        for(i=0;i<3;i++){\n\n            if (n> i) {\n\n                y[n]+=x[i]*A[n-i];\n\n            } \n\n        }\n\n    }\n\n    return(y);\n\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "IIR Filter" , function(){
reset_env();
CLBM_Source_Code = "//ord -- INPUT\n\n//a -- INPUT\n\n//b -- INPUT\n\n//np -- INPUT\n\n//x -- INPUT\n\n//y -- OUTPUT\n\nvoid filter(int ord, float *a, float *b, int np, float *x, float *y)\n\n{\n\n int i;\n\n int j;\n\n double temp;\n\n y[0]=b[0]*x[0];\n\n for (i=1;i<ord+1;i++)\n\n {\n\n        y[i]=0.0;\n\n        for (j=0;j<i+1;j++){\n\n   temp = b[j]*x[i-j];\n\n         y[i]=y[i]+ temp;\n\n  }\n\n        for (j=0;j<i;j++){\n\n   temp = a[j+1]*y[i-j-1];\n\n         y[i]=y[i] - temp;\n\n  }\n\n }\n\n j = ord + 1;\n\n for (i=j;i<np+1;i++)\n\n {\n\n  y[i]=0.0;\n\n  for (j=0;j<ord+1;j++){\n\n   temp = b[j]*x[i-j];\n\n   y[i]=y[i]+temp;\n\n  }\n\n  for (j=0;j<ord;j++){\n\n   temp = a[j+1]*y[i-j-1];\n\n         y[i]=y[i]-temp;\n\n  }\n\n }\n\n} \n\n"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "Simple Transmitter" , function(){
reset_env();
CLBM_Source_Code = "double Transmitter(double Signal_Bit) {\n\n    double Signal_Code_Bit;\n\n    double Signal_Mod;\n\n    Signal_Code_Bit=Channel_Coding(Signal_Bit);\n\n    Signal_Mod=Modulation(Signal_Code_Bit);\n\n    return(Signal_Mod);\n\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "Swap Value" , function(){
reset_env();
CLBM_Source_Code = "void main()\n\n{\n\n  int *p;\n\n  int *q;\n\n   p=q;\n\n  *p=*q;\n\n  }"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "Vector Addition" , function(){
reset_env();
CLBM_Source_Code = "//x -- INPUT\n\n//y -- INPUT\n\n//z -- OUTPUT\n\nvoid vadd(double x[5], double y[5], double *z){\n\n \n\n int index;\n\n for (index = 0; index<5; index++){\n\n  z[index] = x[index] + y[index];\n\n }\n\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "average" , function(){
reset_env();
CLBM_Source_Code = "//x -- INPUT\n//n -- INPUT\ndouble average(double *x, int n){\n int idx;\n double sum=0;\n for (idx = 0; idx<n; idx++){\n  sum = sum + x[idx];\n }\n sum = sum/n;\n return sum;\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "min" , function(){
reset_env();
CLBM_Source_Code = "double Min(const double *Numbers, const int Count){\n double Minimum = Numbers[0];\n for(int i = 0; i < Count; i++){\n  if( Minimum > Numbers[i] ){\n   Minimum = Numbers[i];\n  }\n }\n return Minimum;\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "parameterIO" , function(){
reset_env();
CLBM_Source_Code = "//xx -- INPUT\n//i -- INPUT\n//yy -- OUTPUT\nvoid foo(double xx[5], double yy[5], int i){\n    \n yy[i] = xx[i] + 10;\n    \n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "pointer" , function(){
reset_env();
CLBM_Source_Code = "//xx -- INPUT\n//yy -- OUTPUT\nvoid fun(double *xx, double *yy){\n *yy = *xx + 1;\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
test( "pointerIO" , function(){
reset_env();
CLBM_Source_Code = "//xx -- INPUT\n//zz -- INPUT\n//yy -- OUTPUT\nvoid bar(double *xx, double *yy, double zz){\n    *yy  = *xx + zz;\n}"
language = "C";
C_XML_CLBM();
ok(true, XML_CodetoCLBM);
});
}
