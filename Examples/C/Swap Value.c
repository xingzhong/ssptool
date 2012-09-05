void main()
{
  int *p;
  int *q;
  int *x;
   *p=1;
   *q=2;
   *x=*p;
   *p=*q;
   *q=*x;
  }