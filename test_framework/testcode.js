// test database
function run_test_c(){

        test( "Adaptive Modulator" , function(){
            
            reset_env();
            CLBM_Source_Code = "double adaptive_mod(double x,double gamma) {\n\n    double y;\n\n    if (gamma> gamma_0) {\n\n        y= mod_16QAM(x);\n\n    } \n\n    else {\n\n        y= mod_QPSK(x);\n\n    } \n\n    return(y);\n\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "Dot Product" , function(){
            
            reset_env();
            CLBM_Source_Code = "//x -- INPUT\n\n//y -- INPUT\n\ndouble dot(double x[5], double y[5]){\n\n double z=0;\n\n double temp;\n\n int index;\n\n for (index = 0; index<5; index++){\n\n  temp = x[index] * y[index];\n\n  z = z + temp;\n\n }\n\n return z;\n\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "FIR Filter" , function(){
            
            reset_env();
            CLBM_Source_Code = "double *FIR_filter(double x[3],double A[3]) {\n\n    int n;\n\n    double y[5];\n\n    int i;\n\n\n\n  for(n=0;n<5;n++){\n\n       y[n]=0;\n\n        for(i=0;i<3;i++){\n\n            if (n> i) {\n\n                y[n]+=x[i]*A[n-i];\n\n            } \n\n        }\n\n    }\n\n    return(y);\n\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "IIR Filter" , function(){
            
            reset_env();
            CLBM_Source_Code = "//ord -- INPUT\n\n//a -- INPUT\n\n//b -- INPUT\n\n//np -- INPUT\n\n//x -- INPUT\n\n//y -- OUTPUT\n\nvoid filter(int ord, float *a, float *b, int np, float *x, float *y)\n\n{\n\n int i;\n\n int j;\n\n double temp;\n\n y[0]=b[0]*x[0];\n\n for (i=1;i<ord+1;i++)\n\n {\n\n        y[i]=0.0;\n\n        for (j=0;j<i+1;j++){\n\n   temp = b[j]*x[i-j];\n\n         y[i]=y[i]+ temp;\n\n  }\n\n        for (j=0;j<i;j++){\n\n   temp = a[j+1]*y[i-j-1];\n\n         y[i]=y[i] - temp;\n\n  }\n\n }\n\n j = ord + 1;\n\n for (i=j;i<np+1;i++)\n\n {\n\n  y[i]=0.0;\n\n  for (j=0;j<ord+1;j++){\n\n   temp = b[j]*x[i-j];\n\n   y[i]=y[i]+temp;\n\n  }\n\n  for (j=0;j<ord;j++){\n\n   temp = a[j+1]*y[i-j-1];\n\n         y[i]=y[i]-temp;\n\n  }\n\n }\n\n} \n\n"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "Simple Transmitter" , function(){
            
            reset_env();
            CLBM_Source_Code = "double Transmitter(double Signal_Bit) {\n\n    double Signal_Code_Bit;\n\n    double Signal_Mod;\n\n    Signal_Code_Bit=Channel_Coding(Signal_Bit);\n\n    Signal_Mod=Modulation(Signal_Code_Bit);\n\n    return(Signal_Mod);\n\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "Swap Value" , function(){
            
            reset_env();
            CLBM_Source_Code = "void main()\n\n{\n\n  int *p;\n\n  int *q;\n\n   p=q;\n\n  *p=*q;\n\n  }"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "Vector Addition" , function(){
            
            reset_env();
            CLBM_Source_Code = "//x -- INPUT\n\n//y -- INPUT\n\n//z -- OUTPUT\n\nvoid vadd(double x[5], double y[5], double *z){\n\n \n\n int index;\n\n for (index = 0; index<5; index++){\n\n  z[index] = x[index] + y[index];\n\n }\n\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "average" , function(){
            
            reset_env();
            CLBM_Source_Code = "//x -- INPUT\n//n -- INPUT\ndouble average(double *x, int n){\n int idx;\n double sum=0;\n for (idx = 0; idx<n; idx++){\n  sum = sum + x[idx];\n }\n sum = sum/n;\n return sum;\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "min" , function(){
            
            reset_env();
            CLBM_Source_Code = "double Min(const double *Numbers, const int Count){\n double Minimum = Numbers[0];\n for(int i = 0; i < Count; i++){\n  if( Minimum > Numbers[i] ){\n   Minimum = Numbers[i];\n  }\n }\n return Minimum;\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "parameterIO" , function(){
            
            reset_env();
            CLBM_Source_Code = "//xx -- INPUT\n//i -- INPUT\n//yy -- OUTPUT\nvoid foo(double xx[5], double yy[5], int i){\n    \n yy[i] = xx[i] + 10;\n    \n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "pointer" , function(){
            
            reset_env();
            CLBM_Source_Code = "//xx -- INPUT\n//yy -- OUTPUT\nvoid fun(double *xx, double *yy){\n *yy = *xx + 1;\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "pointerIO" , function(){
            
            reset_env();
            CLBM_Source_Code = "//xx -- INPUT\n//zz -- INPUT\n//yy -- OUTPUT\nvoid bar(double *xx, double *yy, double zz){\n    *yy  = *xx + zz;\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "typecast" , function(){
            
            reset_env();
            CLBM_Source_Code = "//xx -- INPUT\n//zz -- INPUT\n//yy -- OUTPUT\nvoid bar(void *xx, double *yy, double zz){\n    double *x = (double *) xx ;\n    *yy  = *x + fun(zz);\n}"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            };
function run_test_matlab(){

        test( "Adaptive Modulator" , function(){
            
            reset_env();
            CLBM_Source_Code = "if(Signal_Arrival==1)\n\n    y=adaptive_mod(x,gamma);\n\nend\n\n\n\nfunction y=adaptive_mod(x, gamma)\n\nif (gamma>gamma_0)\n\n     y=mod_16QAM(x);\n\n  else\n\n     y=mod_QPSK(x);\n\nend\n\nend"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "Matlab";
            Matlab_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "FIR Filter 1" , function(){
            
            reset_env();
            CLBM_Source_Code = "function y=FIR_filter(x,A)\n\n    N_x=length(x);\n\n    N_A=length(A);\n\n    for(n=1:N_A+N_x-1)\n\n        y(n)=0;\n\n        for(i=1:N_x)\n\n            if(n>i)\n\n                y(n)=y(n)+x(i)*A(n-i);\n\n            end\n\n        end\n\n    end\n\nend"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "Matlab";
            Matlab_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "FIR Filter 2" , function(){
            
            reset_env();
            CLBM_Source_Code = "signal=[1.1,2.3,0.6];\n\ncoef=[0.3,0.8,0.4];\n\noutput=FIR_filter(signal,coef);\n\n\n\nfunction y=FIR_filter(x,A)\n\n    N_x=length(x);\n\n    N_A=length(A);\n\n    for(n=1:N_A+N_x-1)\n\n        y(n)=0;\n\n        for(i=1:N_x)\n\n            if(n>i)\n\n                y(n)=y(n)+x(i)*A(n-i);\n\n            end\n\n        end\n\n    end\n\nend"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "Matlab";
            Matlab_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "Simple Transmitter" , function(){
            
            reset_env();
            CLBM_Source_Code = "if (Signal_arrival==1)\n Signal_Mod=Transmitter(Signal_Bit);\nend\n\nfunction Signal_Mod=Transmitter(Signal_Bit)\n Signal_Code_Bit=Channel_Coding(Signal_Bit);\n Signal_Mod=Modulation(Signal_Code_Bit);\nend"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "Matlab";
            Matlab_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "Vector Addition" , function(){
            
            reset_env();
            CLBM_Source_Code = "N=5;\n\na=[0.1,  -1,  2.0,  7.2,  9.1];\n\nb=[-0.2  4.0,  6.0,  2.8,  10.0];\n\nc=[0.0,  0.0,  0.0,  0.0,  0.0];\nfor(k=1:1:N)\n\n  c(k)=a(k)+b(k);\n\nend"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "Matlab";
            Matlab_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "Vector Assignment" , function(){
            
            reset_env();
            CLBM_Source_Code = "N=5;\n\na=[1.2  3  4  5  6];\nb=[0 3 1.2 0 0];\nfor(k=1:1:N)\n\n  b(k)=a(k);\n\nend"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "Matlab";
            Matlab_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            };
function run_test_cpp(){

        test( "AWGN Channel" , function(){
            
            reset_env();
            CLBM_Source_Code = "void main() {\n\n    channel channel1; \n\n  awgChannel awgChannel2; \n\n channelPara= channel1.setPara(channelPara);\n\n signal=awgChannel2.addNoise(channelPara2);\n\n }\n\n class awgChannel:channel{\n\n  double gNoise;\n\n double addNoise(double para);\n\n}\n\n  class channel{\n\n    double Noise;\n\n  double setPara(double para);\n\n}\n\n double channel::setPara(double para){\n\n para=add(para);\n\n return(para);\n\n }\n\n double awgChannel::addNoise(double para){\n\n para=add(para);\n\n return(para);\n\n }"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C++";
            CPP_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            language = "C";
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            
        test( "Adaptive Modulator" , function(){
            
            reset_env();
            CLBM_Source_Code = "void main() {\n\n    channel channel1; \n\n         double channelPara;\n\n  double Signal_Mod;\n\n channelPara= channel1.setPara(channelPara);\n\n  if (Signal_arrival==1) {\n\n  Signal_Mod= Transmitter(Signal_Bit);\n\n    }\n\n    if (Signal_arrival==1) {\n\n     Signal_Bit=Receiver(Signal_Mod,channel1.Noise);\n\n    }\n\n }\n\n class channel{\n\n    double Noise;\n\n  double setPara(double para);\n\n}\n\n double channel::setPara(double para){\n\n para=add(para);\n\n return(para);\n\n }"
            
            ok( true, displayXML(CLBM_Source_Code));
            language = "C++";
            CPP_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            language = "C";
            
            C_Code = translation_CLBM(XML_CodetoCLBM, "", "C");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, "", "Matlab");
            ok( true, displayMatlab(Matlab_Code));
            });
            };
