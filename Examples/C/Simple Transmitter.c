double Transmitter(double Signal_Bit) {
    double Signal_Code_Bit;
    double Signal_Mod;
    Signal_Code_Bit=Channel_Coding(Signal_Bit);
    Signal_Mod=Modulation(Signal_Code_Bit);
    return(Signal_Mod);
}