signal=[1.1,2.3,0.6];
coef=[0.3,0.8,0.4];
output=FIR_filter(signal,coef);

function y=FIR_filter(x,A)
    N_x=length(x);
    N_A=length(A);
    for(n=1:N_A+N_x-1)
        y(n)=0;
        for(i=1:N_x)
            if(n>i)
                y(n)=y(n)+x(i)*A(n-i);
            end
        end
    end
end