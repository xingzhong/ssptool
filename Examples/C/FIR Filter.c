double *FIR_filter(double x[3],double A[3]) {
    int n;
    double y[5];
    int i;

  for(n=0;n<5;n++){
       y[n]=0;
        for(i=0;i<3;i++){
            if (n> i) {
                y[n]+=x[i]*A[n-i];
            } 
        }
    }
    return(y);
}