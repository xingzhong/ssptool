void main() {
    double x;
    double gamma;
    double y;
    if (Signal_Arrival==1) {
        y= adaptive_mod(x,gamma);
    } 
} 

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