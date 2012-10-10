double Min(const double *Numbers, const int Count){
	double Minimum = Numbers[0];
	for(int i = 0; i < Count; i++){
		if( Minimum > Numbers[i] ){
			Minimum = Numbers[i];
		}
	}
	return Minimum;
}