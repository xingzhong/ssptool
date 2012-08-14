//a -- INPUT
//b -- INPUT
//result -- OUTPUT
void add_matrices(int a[][3], int b[][3], int result[][3])
{
   int i, j;
   for(i=0; i<3; i++)
   {
	 for(j=0; j<3; j++)
	 {
	    result[i][j] = a[i][j] + b[i][j];
	 }
   }
}