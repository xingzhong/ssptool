//xx -- INPUT
//x2 -- INPUT
//x3 -- INPUT
//yy -- OUTPUT
void foo(double xx[5], double yy[5], int i){
    yy[i] = xx[i] + 10;
    xx = xx + 1;
}