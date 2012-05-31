void main() {
    channel channel1; 
         double channelPara;
  double Signal_Mod;
 channelPara= channel1.setPara(channelPara);
  if (Signal_arrival==1) {
  Signal_Mod= Transmitter(Signal_Bit);
    }
    if (Signal_arrival==1) {
     Signal_Bit=Receiver(Signal_Mod,channel1.Noise);
    }
 }
 class channel{
    double Noise;
  double setPara(double para);
}
 double channel::setPara(double para){
 para=add(para);
 return(para);
 }