//x -- INPUT
//y -- INPUT
//z -- OUTPUT
void vadd(double x[5], double y[5], double *z){
	
	int index;
	for (index = 0; index<5; index++){
		z[index] = x[index] + y[index];
	}
}