double dot(double x[5], double y[5]){
	double z=0;
	int index;
	for (index = 0; index<5; index=index+1){
		z += x[index] * y[index];
	}
	return z;
}