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
        target.write("test( \"%s\" , function(){\n"%test_name )
        target.write("reset_env();\n")
        target.write("CLBM_Source_Code = \"%s\"\n"%test_content)
        target.write("language = \"C\";\nC_XML_CLBM();\nok(true, XML_CodetoCLBM);\n});\n")
    

target.write("}\n")