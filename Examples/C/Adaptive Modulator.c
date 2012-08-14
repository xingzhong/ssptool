

double adaptive_mod(double x,double gamma) {
    double y;
    if (gamma> gamma_0) {
        y= mod_16QAM(x);
    } 
    else {
        y= mod_QPSK(x);
    } 
    return(y);
}