//ord -- INPUT
//a -- INPUT
//b -- INPUT
//np -- INPUT
//x -- INPUT
//y -- OUTPUT
void filter(int ord, float *a, float *b, int np, float *x, float *y)
{
	int i;
	int j;
	double temp;
	y[0]=b[0]*x[0];
	for (i=1;i<ord+1;i++)
	{
        y[i]=0.0;
        for (j=0;j<i+1;j++){
			temp = b[j]*x[i-j];
        	y[i]=y[i]+ temp;
		}
        for (j=0;j<i;j++){
			temp = a[j+1]*y[i-j-1];
        	y[i]=y[i] - temp;
		}
	}
	j = ord + 1;
	for (i=j;i<np+1;i++){
		;
	}
}