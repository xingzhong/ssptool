void main() {
    channel channel1; 
  awgChannel awgChannel2; 
 channelPara= channel1.setPara(channelPara);
 signal=awgChannel2.addNoise(channelPara2);
 }
 class awgChannel:channel{
  double gNoise;
 double addNoise(double para);
}
  class channel{
    double Noise;
  double setPara(double para);
}
 double channel::setPara(double para){
 para=add(para);
 return(para);
 }
 double awgChannel::addNoise(double para){
 para=add(para);
 return(para);
 }