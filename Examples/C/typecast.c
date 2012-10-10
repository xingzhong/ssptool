//xx -- INPUT
//zz -- INPUT
//yy -- OUTPUT
void bar(void *xx, double *yy, double zz){
    double *x = (double *) xx ;
    *yy  = *x + cos(zz);
}