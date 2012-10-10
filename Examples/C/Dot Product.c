//x -- INPUT
//y -- INPUT
double dot(double x[5], double y[5]){
	double z=0;
	double temp;
	int index;
	for (index = 0; index<5; index++){
		temp = x[index] * y[index];
		z = z + temp;
	}
	return z;
}