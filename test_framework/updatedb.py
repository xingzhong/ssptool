#!/usr/bin/env pythonw2.7

import os


command = os.popen("ls ../Examples/C | grep .c")
files = command.read().split("\n")
command.close()
target = open("testcode.js", 'w')
target.write("// test database\n")
target.write("function run_test_c(){\n")
for file in files :
    if file.endswith(".c"):
        f = open("../Examples/C/"+file, 'r')
        test_content = f.read()
        test_content = test_content.replace("\n","\\n")
        test_content = test_content.replace("\r","\\n")
        test_content = test_content.replace("\t"," ")
        test_name = file.split(".")[0]
        target.write("""
        test( \"%s\" , function(){
            """%test_name )
        target.write("""
            reset_env();""")
        target.write("""
            CLBM_Source_Code = \"%s\"
            """%test_content)
        target.write("""
            language = \"C\";
            C_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            """)
        target.write("""
            C_Code = translation_CLBM(XML_CodetoCLBM, \"\", \"C\");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, \"\", \"Matlab\");
            ok( true, displayMatlab(Matlab_Code));
            });
            """)
target.write("};\n")


command = os.popen("ls ../Examples/Matlab | grep .m")
files = command.read().split("\n")
command.close()
target.write("function run_test_matlab(){\n")
for file in files :
    if file.endswith(".m"):
        f = open("../Examples/Matlab/"+file, 'r')
        test_content = f.read()
        test_content = test_content.replace("\n","\\n")
        test_content = test_content.replace("\r","\\n")
        test_content = test_content.replace("\t"," ")
        test_name = file.split(".")[0]
        target.write("""
        test( \"%s\" , function(){
            """%test_name )
        target.write("""
            reset_env();""")
        target.write("""
            CLBM_Source_Code = \"%s\"
            """%test_content)
        target.write("""
            language = \"Matlab\";
            Matlab_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            """)
        target.write("""
            C_Code = translation_CLBM(XML_CodetoCLBM, \"\", \"C\");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, \"\", \"Matlab\");
            ok( true, displayMatlab(Matlab_Code));
            });
            """)
target.write("};\n")

command = os.popen("ls ../Examples/C++ | grep .cc")
files = command.read().split("\n")
command.close()
target.write("function run_test_cpp(){\n")
for file in files :
    if file.endswith(".cc"):
        f = open("../Examples/C++/"+file, 'r')
        test_content = f.read()
        test_content = test_content.replace("\n","\\n")
        test_content = test_content.replace("\r","\\n")
        test_content = test_content.replace("\t"," ")
        test_name = file.split(".")[0]
        target.write("""
        test( \"%s\" , function(){
            """%test_name )
        target.write("""
            reset_env();""")
        target.write("""
            CLBM_Source_Code = \"%s\"
            """%test_content)
        target.write("""
            language = \"C++\";
            CPP_XML_CLBM();
            ok(true, displayXML(XML_CodetoCLBM));
            language = \"C\";
            """)
        target.write("""
            C_Code = translation_CLBM(XML_CodetoCLBM, \"\", \"C\");
            ok( true, displayC(C_Code));
            Matlab_Code = translation_CLBM(XML_CodetoCLBM, \"\", \"Matlab\");
            ok( true, displayMatlab(Matlab_Code));
            });
            """)
target.write("};\n")