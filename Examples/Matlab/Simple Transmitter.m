function Signal_Mod=Transmitter(Signal_Bit)
 Signal_Code_Bit=Channel_Coding(Signal_Bit);
 Signal_Mod=Modulation(Signal_Code_Bit);
end