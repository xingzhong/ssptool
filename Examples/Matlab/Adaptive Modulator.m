if(Signal_Arrival==1)
    y=adaptive_mod(x,gamma);
end

function y=adaptive_mod(x, gamma)
if (gamma>gamma_0)
     y=mod_16QAM(x);
  else
     y=mod_QPSK(x);
end
end