function y=FIR_filter(x,A)
    N_x=length(x);
    N_A=length(A);
    for(n=1:N_A+N_x-1)
        y(n)=0;
        for(i=1:N_x)
            if(n>i)
                j=n-i;
                Temp=x(i)*A(j);
                y(n)=y(n)+Temp;
            end
        end
    end
end