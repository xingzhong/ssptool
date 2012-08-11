double *FIR_filter(double x[3],double A[3]) {
    int n;
    double y[5];
    int i;

  for(n=0;n<5;n=n+1){
       y[n]=0;
        for(i=0;i<3;i=i+1){
            if (n> i) {
                y[n]+=x[i]*A[n-i];
            } 
        }
    }
    return(y);
}

void main() {
    double signal[3]={1.1,2.3,0.6};
    double coef[3]={0.3,0.8,0.4};
    double *output;

    output=FIR_filter(signal,coef);
}