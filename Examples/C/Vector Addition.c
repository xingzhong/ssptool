double *vadd(double x[5], double y[5]){
	double z[5];
	int index;
	for (index = 0; index<5; index=index+1){
		z[index] = x[index] + y[index];
	}
	return z;
}