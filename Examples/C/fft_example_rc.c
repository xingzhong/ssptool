void main()

{
  double  input[] = {1.0, 1.0, 1.0, 1.0 ,1.0, 1.0, 1.1 ,1.4};
  fftw_complex   *out;
  fftw_plan       p;
  int size;
  int memory;
  size=sizeof(fftw_complex);
  memory=size*5;
  out = (fftw_complex*) malloc(memory);
  p = fftw_plan_dft_r2c_1d(8, input, out, FFTW_ESTIMATE);
  fftw_execute(p);

}
