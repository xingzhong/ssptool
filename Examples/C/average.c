//x -- INPUT
//n -- INPUT
double average(double *x, int n){
	int idx;
	double sum=0;
	for (idx = 0; idx<n; idx++){
		sum = sum + x[idx];
	}
	sum = sum/n;
	return sum;
}