function y = ConvolutionalEncoder(x)
    
    N_x = length(x);
    for i = 1:1:N_x
        k = 3*i;
        k = k - 2;
        y(k) = x(i);
        k = k+1;
        if (i == 1)
            y(k) = x(i);           
        end
        if (i > 1)
            j = i-1;
            y(k) = x(i) + x(j);
            if (y(k) == 2)
                y(k) = 0;
            end
        end
        k = k+1;
        if (i == 1)
            y(k) = x(i);
        end
        if (i == 2)
            j = i-1;
            y(k) = x(i) + x(j);
            if (y(k) == 2)
                y(k) = 0;
            end
        end
        if (i > 2)
            j = i-1;
            y(k) = x(i) + x(j);
            if (y(k) == 2)
                y(k) = 0;
            end
            j = i-2;
            y(k) = y(k) + x(j);
            if (y(k) == 2)
                y(k) = 0;
            end
        end
    end
end