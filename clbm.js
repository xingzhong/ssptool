/*Xingzhong create this file to seperate the html and js*/

var CLBM_XML_Code = '';
var CLBM_Source_Code = '';
// the input source code
var XML_CodetoCLBM = '';
// the CLBM XML representation
var CLBM_XML_Hardware_Code = '';
var wordLengthGlobal = 16;
var fractionLengthGlobal = 8;
var isFixedPointGlobal = 1;


/*
* adding the following functions to improve the java to javascript interface
* Xingzhong Jun.1 
*/

function reset_env(){
// reset all the environment variables
	CLBM_XML_Code = '';
	CLBM_Source_Code = '';	// the input source code
	XML_CodetoCLBM = '';	// the CLBM XML representation
	CLBM_XML_Hardware_Code = '';
	wordLengthGlobal = 16;
	fractionLengthGlobal = 8;
	isFixedPointGlobal = 1;
	Pattern1 = ['loop cause', 'multiplication', 'addition'];
	Pattern2 = ['selection cause', 'value assignment'];
	Pattern3 = ['selection cause', 'function call'];
	Pattern4 = ['loop cause', 'function call'];
	Rec_V = [0, 0];
	///////////////////////////////////////////////////Global variable
	func = "";
	//var seq;
	lab = "";

	General_Keywords = ['if', 'for', 'while', 'function', 'switch', 'else', 'elseif'];
	//GLobal Constant
	General_Type_Keywords = ['int', 'double', 'float', 'unsigned int', 'boolet', 'cvec'];

	var_list = new Array();
	//global
	var_list[0] = new Array();
	//name of varibles
	var_list[1] = new Array();
	//size of varibales
	var_list[2] = new Array();
	//type of varibales
	point_list = new Array();
	// fangming define it for seach all pointer;
	////////////////////////////////////////////////////
	//////////////////////////////////////////////////// Matlab build-in function list (generally used)
	// add by Ning Han
	BuildinFun = new Array();
	// Matlab Build-in function (output size) and the correpsonding C functions
	BuildinFun[0] = new Array();
	// store the name of the matlab build-in functions
	BuildinFun[1] = new Array();
	// store the output size of each function  (functions with single output are considered)
	BuildinFun[2] = new Array();
	// corresponding C functions
	BuildinFun[0] = ['rand', 'sqrt'];


	//////////////////////////////////////////////////// Library of communication module (basic OFDM for now)
	//////////////////////////////////////////////////// Library of communication module (basic OFDM for now)
	// add by Ning Han for waveform level
	LibFun = new Array();
	// Library functions of communication module (basic OFDM for now)
	LibFun[0] = new Array();
	// store the names of the library functions
	LibFun[1] = new Array();
	// store the output/input signal size change indicator (0: size change; 1: no size change)
	LibFun[2] = new Array();
	// store the input signal type of each function (this may be needed in a later version)
	LibFun[3] = new Array();
	// store the input parameter value of each function (this will be abstract from the source code) (current version support at most two input parameters in giins and girem)
	LibFun[4] = new Array();
	// store the output signal size of each function (communication module functions are considered with single output (signal stream))
	LibFun[5] = new Array();
	// store the output signal type of each function (communication module functions are considered with single output (signal stream))
	LibFun[6] = new Array();
	// store the name of each function in C
	LibFun[0] = ['qpskmod', 'ifft', 'giins', 'girem', 'fft', 'qpskdemod'];
	LibFun[1] = [0, 1, 0, 0, 1, 0, ];
	LibFun[5] = ['Complex', 'Complex', 'Complex', 'Complex', 'Complex', 'int'];
	LibFun[6] = ['Modulator_QPSK', 'SRIFFT', 'InsertCP', 'RemCP', 'SRFFT', 'DeModulator_QPSK'];


	//////////////////////////////////////////////////// Library of communication module (basic OFDM for now)


	//////////////////////////////////////////////////// Library of communication module (basic OFDM for now)
	// add by W_Fangming He 2011-04-12
	SigBase = new Array();
	Indsize = new Array();

	IndSize = [1, 1, 0, 1, 1, 0, 1, 1];

	SigBase[0] = ['qpskmod', 'QAMXXX', 'ifft', 'giins', 'girem', 'fft', 'qpskdemod', 'DeQAMXXX'];
	SigBase[1] = ['Modulator_QPSK', 'Modulator_16QAM', 'SRIFFT', 'InsertCP', 'RemCP', 'SRFFT', 'DeModulator_QPSK', 'DeModulator_16QAM'];
	CBase = new Array();
	CBase[0] = ['Modulator_QPSK', 'source', 'Output2'];
	CBase[1] = ['Modulator_16QAM', 'source', 'Output2'];
	CBase[2] = ['SRIFFT', 'Output2', 'Output2'];
	CBase[3] = ['InsertCP', 'Output2', 'Output'];
	CBase[4] = ['RemCP', 'Output', 'Output2'];
	CBase[5] = ['SRFFT', 'Output2', 'Output2'];
	CBase[6] = ['DeModulator_QPSK', 'Output2', 'Dest'];
	CBase[7] = ['DeModulator_16QAM', 'Output2', 'Dest'];
}

/* Xingzhong's Seperate Line */

function getSourceCode(SourceCode)
//seems a recursive function to accumulate the source code line by line -Xingzhong
 {
    CLBM_Source_Code = CLBM_Source_Code + SourceCode + '\n';
}


function passXMLCode(AbstractionType)
 {

    if (AbstractionType == 'Matlab')
    {
        Matlab_XML_CLBM();
    }
    if (AbstractionType == 'C')
    {
        C_XML_CLBM();
    }
    if (AbstractionType == 'C++')
    {
        CPP_XML_CLBM();
    }
    if (AbstractionType == 'VHDL')
    {
        VHDL_XML_CLBM();
    }
    CLBM_Source_Code = '';

    document.SSP.getAbstractedXMLCode(XML_CodetoCLBM);

}


// from xml to other languages use
function getXMLCode(XMLCode)
 {
    //alert(XMLCode);
    CLBM_XML_Code = CLBM_XML_Code + XMLCode + '\n';

}

function getFloatingFixedSelection(fixedPointSelection)
 {
    //alert(XMLCode);
    isFixedPointGlobal = parseInt(fixedPointSelection);

}


function getXMLHardwareCode(XMLHardwareCode)
 {
    //alert(XMLCode);
    CLBM_XML_Hardware_Code = CLBM_XML_Hardware_Code + XMLHardwareCode + '\n';

}

function getImplementationCode(InferenceType)
 {
    CLBM_Temp = '';
    while (CLBM_XML_Code.indexOf(' CLBM_QOUTE ') > -1)
    {
        CLBM_Temp = CLBM_XML_Code.slice(0, CLBM_XML_Code.indexOf(' CLBM_QOUTE '));
        CLBM_Temp = CLBM_Temp + '\"';
        CLBM_XML_Code = CLBM_Temp + CLBM_XML_Code.slice(CLBM_XML_Code.indexOf(' CLBM_QOUTE ') + 12);
    }
    CLBM_Hardware_Temp = '';
    while (CLBM_XML_Hardware_Code.indexOf(' CLBM_QOUTE ') > -1)
    {
        CLBM_Hardware_Temp = CLBM_XML_Hardware_Code.slice(0, CLBM_XML_Hardware_Code.indexOf(' CLBM_QOUTE '));
        CLBM_Hardware_Temp = CLBM_Hardware_Temp + '\"';
        CLBM_XML_Hardware_Code = CLBM_Hardware_Temp + CLBM_XML_Hardware_Code.slice(CLBM_XML_Hardware_Code.indexOf(' CLBM_QOUTE ') + 12);
    }
    //alert(CLBM_XML_Code);
    if (InferenceType == "Matlab")
    {

        Matlab_Code = translation_CLBM(CLBM_XML_Code, CLBM_XML_Hardware_Code, 'Matlab');

        //Matlab_Output = window.open("about:blank","Matlab Code","location=1, status=1, scrollbars=1, height = 500, width = 400, resizable = 0");
        //Matlab_Output.document.write(Matlab_Code);
        while (Matlab_Code.indexOf('<br >') != -1)
        {
            Matlab_Code = Matlab_Code.replace('<br >', '\n');
        }
        while (Matlab_Code.indexOf('<br>') != -1)
        {
            Matlab_Code = Matlab_Code.replace('<br>', '\n');
        }
        while (Matlab_Code.indexOf('<br />') != -1)
        {
            Matlab_Code = Matlab_Code.replace('<br />', '\n');
        }
        while (Matlab_Code.indexOf('<br/>') != -1)
        {
            Matlab_Code = Matlab_Code.replace('<br/>', '\n');
        }
        while (Matlab_Code.indexOf('&nbsp;') != -1)
        {
            Matlab_Code = Matlab_Code.replace('&nbsp;', ' ');
        }
        document.SSP.getMatlabCode(Matlab_Code);


    }
    if (InferenceType == "C")
    {
        C_Code = translation_CLBM(CLBM_XML_Code, CLBM_XML_Hardware_Code, 'C');

        //C_Output = window.open("about:blank","C Code","location=1, status=1, scrollbars=1, height = 500, width = 400, resizable = 0");
        //C_Output.document.write(C_Code);
        while (C_Code.indexOf('<br >') != -1)
        {
            C_Code = C_Code.replace('<br >', '\n');
        }
        while (C_Code.indexOf('<br>') != -1)
        {
            C_Code = C_Code.replace('<br>', '\n');
        }
        while (C_Code.indexOf('<br />') != -1)
        {
            C_Code = C_Code.replace('<br />', '\n');
        }
        while (C_Code.indexOf('<br/>') != -1)
        {
            C_Code = C_Code.replace('<br/>', '\n');
        }
        while (C_Code.indexOf('&nbsp;') != -1)
        {
            C_Code = C_Code.replace('&nbsp;', ' ');
        }
        document.SSP.getCCode(C_Code);

    }
    if (InferenceType == "C++")
    {
        CPlus_Code = translation_CLBM(CLBM_XML_Code, CLBM_XML_Hardware_Code, 'C++');
        //CPlus_Output = window.open("about:blank","C++ Code","location=1, status=1, scrollbars=1, height = 500, width = 400, resizable = 0");
        //CPlus_Output.document.write(CPlus_Code);	
        while (CPlus_Code.indexOf('<br >') != -1)
        {
            CPlus_Code = CPlus_Code.replace('<br >', '\n');
        }
        while (CPlus_Code.indexOf('<br>') != -1)
        {
            CPlus_Code = CPlus_Code.replace('<br>', '\n');
        }
        while (CPlus_Code.indexOf('<br />') != -1)
        {
            CPlus_Code = CPlus_Code.replace('<br />', '\n');
        }
        while (CPlus_Code.indexOf('<br/>') != -1)
        {
            CPlus_Code = CPlus_Code.replace('<br/>', '\n');
        }
        while (CPlus_Code.indexOf('&nbsp;') != -1)
        {
            CPlus_Code = CPlus_Code.replace('&nbsp;', ' ');
        }

        document.SSP.getCPlusCode(CPlus_Code);

    }
    if (InferenceType == "VHDL")
    {
        VHDL_Code = translation_CLBM(CLBM_XML_Code, CLBM_XML_Hardware_Code, 'VHDL');
        //CPlus_Output = window.open("about:blank","C++ Code","location=1, status=1, scrollbars=1, height = 500, width = 400, resizable = 0");
        //CPlus_Output.document.write(CPlus_Code);	
        while (VHDL_Code.indexOf('<br >') != -1)
        {
            VHDL_Code = VHDL_Code.replace('<br >', '\n');
        }
        while (VHDL_Code.indexOf('<br>') != -1)
        {
            VHDL_Code = VHDL_Code.replace('<br>', '\n');
        }
        while (VHDL_Code.indexOf('<br />') != -1)
        {
            VHDL_Code = VHDL_Code.replace('<br />', '\n');
        }
        while (VHDL_Code.indexOf('<br/>') != -1)
        {
            VHDL_Code = VHDL_Code.replace('<br/>', '\n');
        }
        while (VHDL_Code.indexOf('&nbsp;') != -1)
        {
            VHDL_Code = VHDL_Code.replace('&nbsp;', ' ');
        }

        document.SSP.getVHDLCode(VHDL_Code);

    }

    if (InferenceType == "CUDA")
    {
        CUDA_Code = translation_CLBM(CLBM_XML_Code, CLBM_XML_Hardware_Code, 'CUDA');
        //C_Output = window.open("about:blank","C Code","location=1, status=1, scrollbars=1, height = 500, width = 400, resizable = 0");
        //C_Output.document.write(C_Code);
        while (CUDA_Code.indexOf('<br >') != -1)
        {
            CUDA_Code = CUDA_Code.replace('<br >', '\n');
        }
        while (CUDA_Code.indexOf('<br>') != -1)
        {
            CUDA_Code = CUDA_Code.replace('<br>', '\n');
        }
        while (CUDA_Code.indexOf('<br />') != -1)
        {
            CUDA_Code = CUDA_Code.replace('<br />', '\n');
        }
        while (CUDA_Code.indexOf('<br/>') != -1)
        {
            CUDA_Code = CUDA_Code.replace('<br/>', '\n');
        }
        while (CUDA_Code.indexOf('&nbsp;') != -1)
        {
            CUDA_Code = CUDA_Code.replace('&nbsp;', ' ');
        }
        document.SSP.getCUDACode(CUDA_Code);

    }

    if (InferenceType == "OpenCL")
    {
        OpenCL_Code = translation_CLBM(CLBM_XML_Code, CLBM_XML_Hardware_Code, 'OpenCL');
        //C_Output = window.open("about:blank","C Code","location=1, status=1, scrollbars=1, height = 500, width = 400, resizable = 0");
        //C_Output.document.write(C_Code);
        while (OpenCL_Code.indexOf('<br >') != -1)
        {
            OpenCL_Code = OpenCL_Code.replace('<br >', '\n');
        }
        while (OpenCL_Code.indexOf('<br>') != -1)
        {
            OpenCL_Code = OpenCL_Code.replace('<br>', '\n');
        }
        while (OpenCL_Code.indexOf('<br />') != -1)
        {
            OpenCL_Code = OpenCL_Code.replace('<br />', '\n');
        }
        while (OpenCL_Code.indexOf('<br/>') != -1)
        {
            OpenCL_Code = OpenCL_Code.replace('<br/>', '\n');
        }
        while (OpenCL_Code.indexOf('&nbsp;') != -1)
        {
            OpenCL_Code = OpenCL_Code.replace('&nbsp;', ' ');
        }
        document.SSP.getOpenCLCode(OpenCL_Code);

    }


    CLBM_XML_Code = "";
    CLBM_XML_Hardware_Code = "";
    isFixedPointGlobal = 1;
    wordLengthGlobal = 16;
    fractionLengthGlobal = 8;
	//reset_env();

}

function Matlab_XML_CLBM()
/*The main function for Matlab abstraction and XML generation*/
 {

    var_list[0] = new Array();
    //name of varibles
    var_list[1] = new Array();
    //size of varibales
    var_list[2] = new Array();
    //type of varibales

    //var matlab=Source_input.value+";";
    matlab = CLBM_Source_Code;
    
    console.log(matlab);
    matlab = code_format(matlab, 'Matlab');
    //matlab=matlabcode_format(matlab);// Added by Ning


    if (matlab.indexOf("function ") != -1)
    {
        var matlabmain = matlab.slice(0, matlab.indexOf("function "))
        func = matlab.slice(matlab.indexOf("function "))
    }
    else
    {
        var matlabmain = matlab;
        func = "";
    }
    matlabmain = delblank(matlabmain);

    //seq=0
    var xml = ""
    //lab=0
    var ind_level = 0;

    if (matlabmain.length == 0)
    {
        matlabmain = matlab.slice(matlab.indexOf('function') + 8, matlab.indexOf(";") + 1);
    }



    var matlabline = matlabmain.slice(0, matlabmain.indexOf(";"));
    var lab0 = 0
    if (matlabmain.length != 0)
    {

        xml += "<Path name=\"" + "main\" >" + "\n"
        ind_level += 1;
        lab0 = 1

    }
    xml += matlabf(matlabmain, ind_level);
    if (lab0 == 1)
    {

        xml += "</Path>"
    }
    lab0 = 0

    //lab=0
    xml = xml.replace(/&gt/g, "&gt; ");
    xml = xml.replace(/&lt/g, "&lt; ")
    // xml_input.value=xml;
    //return xml;
    XML_CodetoCLBM = xml;

}

function getIO( comments )
/* accapte the comments and recognize the input output variable name  */
{
    console.log(comments);
    var inputs = String(comments).match(/\w+(?=\s*--\s*INPUT\s*;)/g);
    var outputs = String(comments).match(/\s*\w+(?=\s*--\s*OUTPUT\s*;)/g);
    return {i:inputs, o:outputs};
}

var IORec  ;   //store the IO results
function C_XML_CLBM()
/*The main function for C abstraction and xml generation*/
 {
    //var c_code=Source_input.value+";";
    var c_code = CLBM_Source_Code;
    c_code = code_format(c_code, 'C');
    c_code = delblank(c_code);
    IORec = getIO(g_comments);
    //console.log("input:" + IORec.i);
    //console.log("output:" + IORec.o);
    //	var lab0=0;
    //seq=0
    var xml = ""
    lab = 0

    funcs_all = search_func(c_code);
    console.log(funcs_all);
    var c_main = funcs_all[2][0];
    var pathname = funcs_all[0][0];
    pathname = pathname.replace(/\s/g, "");
    xml += "<Path name=\"" + pathname + "\" >" + "\n" + inputfunc(funcs_all[1][0], 0, 'C');
    
    c_main = delblank(c_main);
    xml += cf(c_main);
    xml += pathoutputfunc_c(funcs_all[1][0], funcs_all[2][0]) + "</Path>\n"

    lab = 0
    xml = xml.replace(/&gt/g, "&gt; ");
    xml = xml.replace(/&lt/g, "&lt; ")
    //xml_input.value=xml;
    //return xml;
    XML_CodetoCLBM = xml;

}

function CPP_XML_CLBM()
/*The main function for C++ abstraction and XML generation*/
 {
    var cpp_code = CLBM_Source_Code;
    cpp_code = code_format(cpp_code, 'C++');
    cpp_code = delblank(cpp_code);

    //	var lab0=0;
    //seq=0
    var xml = ""
    lab = 0


    funcs_all = search_func_cpp(cpp_code);
    // add by liu Apr11.2011
    //funcs_all=search_func(cpp_code);   // comment by liu Apr11. 2011
    classes_all = search_class(cpp_code);
    // added by Liu;

    var cpp_main = funcs_all[2][0];
    var pathname = funcs_all[0][0];
    pathname = pathname.replace(/\s/g, "");
    //xml += "<Path name=\""+pathname+"\" >"+"\n"+inputfunc(funcs_all[1][0],0,'C');
    cpp_main = delblank(cpp_main);

    // Added by Liu begins;
    // Classes Parsing;
    for (i = 0; i <= classes_all[0].length - 1; i++)
    //
    {
        if (classes_all[0][i] == 'main')
        {

            var pathname = classes_all[0][i];
            pathname = pathname.replace(/\s/g, "");

            xml += "<Path name=\"" + pathname + "\" >" + "\n";
            //
            var cpp_class = classes_all[2][i];
            cpp_class = delblank(cpp_class);
            xml += cppf(cpp_class);
            xml += "</Path>\n"
            xml += "\n"
        }
        else
        {
            /*
			var pathname=classes_all[0][i];
		    pathname= pathname.replace(/\s/g,"");
			
			xml += "<Path name=\""+pathname+"\" >"+"\n"; //
			xml += "<Path name=\""+pathname+"\" >"+"\n"; //
			var cpp_class=classes_all[2][i];
			cpp_class=delblank(cpp_class);
			//document.write(cpp_class)
			xml+=cf(cpp_class);
			xml+="</Path>\n"
			xml+="\n"
			*/

        }
    }
    // Added by Liu ends;
    //xml+=cf(c_main);
    //xml+=pathoutputfunc_c(funcs_all[1][0],funcs_all[2][0])+"</Path>\n"	
    lab = 0
    xml = xml.replace(/&gt/g, "&gt; ");
    xml = xml.replace(/&lt/g, "&lt; ")
    //xml_input.value=xml;
    //return xml;
    XML_CodetoCLBM = xml;


}


function VHDL_XML_CLBM()
/*The main function to abstract VHDL and generate corresponding XML code*/
 {
    //VHDL=Source_input.value+';';
    var VHDL = CLBM_Source_Code;
    VHDL = VHDL_code_format(VHDL);
    //VHDL=code_format(VHDL);
    TempVariable = VHDL;
    i = 0;
    while (indexOfwhole(TempVariable, 'entity') != -1)
    {
        i = i + 1;
        TempVariable = TempVariable.slice(TempVariable.indexOf('entity') + 6, TempVariable.length);
    }
    /*if (i<2)
    	xml=VHDLf(VHDL);
    else
    {
    	xml='<Path name=\"main\">\n';
    	xml+=VHDLf(VHDL);
    	xml+='</Path>';
    }*/
    xml = VHDLf(VHDL);
    xml = xml.replace(/&gt/g, "&gt; ");
    xml = xml.replace(/&lt/g, "&lt; ")
    //xml_input.value=xml;	
    //return xml;
    XML_CodetoCLBM = xml;
}

function translation_CLBM(xml_code, hardware_code, language)
/* The main function for the inference and code generation.
The target code is generated according to an xml code and displayed in the target field
xml_code: the xml code to be inferenced
result_id: the id of the target field
language: the target code language
*/
 {
    // Load XML
    var xmlDoc;
    var xmlHardwareDoc;
    xml_code = xmlformat(xml_code);

    if (language == 'C' || language == 'C++')
    {
        xml_code = xml_code.replace(/~/g, "!")
    }
    if (language == 'Matlab')
    {
        xml_code = xml_code.replace(/!/g, "~")
    }

    xmlDoc = load_XML(xml_code);
    xmlHardwareDoc = load_XML(hardware_code);

	
	
    //Initialize
    //W_Fangming He 2011-04-12.
    memosize = new Array();
    //var output='<div style="color:#009900"> //This is the '+language+' code generated from XML.<br /><br /> </div>';
    if (language == 'Matlab')
    var output = '%%This is the ' + language + ' code generated from XML \n \n';
    else
    var output = '//This is the ' + language + ' code generated from XML \n \n';

    language_constant = language;
    if ((language_constant == 'CUDA') || (language_constant == 'OpenCL'))
    {
        language = 'C';
    }

    ind_level = 0;
    var path_input_variable = new Array();
    var path_output_variable = new Array();
    if (language == 'C' || language == 'C++')
    {
        path_input_variable[0] = '';
        path_output_variable[0] = '';
        //str = creat_func(path_input_variable, path_output_variable, 'main', '', language);
		// remvoe main function 
		str = '';
        output = insertString(output, str);
        ind_level = ind_level + 1;
    }

    //Main
    var firstnode = xmlDoc.documentElement
    var pathnum = 0;

	
    if (firstnode.nodeName == "Path")
    {
        var path = firstnode;
    }


    var path_att = path.attributes.getNamedItem("name");
/*
    if (path.nodeName == "Path" && path_att.value != 'main' && language != 'VHDL')
    // This is to add a main function to call the first function if the first path is not 'main'
    {
        path_inputnode = 0;
        //while(path.childNodes[path_inputnode].attributes.getNamedItem("name")=='Declaration') path_inputnode++;
        path_input_variable = read_variables(path.childNodes[path_inputnode]);
        path_output_variable = read_variables(path.childNodes[path.childNodes.length - 1]);



        //Declaration of variables
        if (language == 'C' || language == 'C++')
        {
            output = insertString(output, declare_all(path_output_variable, ind_level));
        }

        func_name = path_att.value;

        if (IsOperator(func_name))
        {
            var str = indent(ind_level) + get_variableName(path_output_variable[0], language) + '=' + get_variableName(path_input_variable[0]) + ' ' + func_name + ' ' + get_variableName(path_input_variable[1], language) + ';<br />';
            output = insertString(output, str);
        }
        else
        {
            class_name = func_name.substring(0, 1).toUpperCase() + func_name.substring(1, func_name.length);
            obj_name = class_name + '_obj';
            if (language == 'C++')
            {
                output = insertString(output, indent(ind_level) + creat_object(class_name, obj_name));
                func_name = 'work';
            }

            output = insertString(output, indent(ind_level) + call_func(path_input_variable, path_output_variable, func_name, obj_name, language));
        }


        if (language == 'C' || language == 'C++')
        {
            ind_level -= 1;
            output = insertString(output, indent(ind_level) + f_end(language, ''));
        }

        output = insertString(output, "<br /><br />");

    }
	*/
    /*if (language_constant=='OpenCL')
    	output='//This is the '+language_constant+' code generated from XML \n \n';*/


    //Definition of all Paths
    var path1 = xmlDoc.getElementsByTagName("Path");
    var classes_declaration = new Array();
    // add by liu Apr.04.2011 4PM
    for (var i = 0; i < path1.length; i++)
    {
        if ((path1[i].parentNode.nodeName == 'Cause') && ((((language_constant == 'CUDA') || (language_constant == 'OpenCL')) && (path1[i].parentNode.attributes.getNamedItem("type") == null)) || ((language_constant != 'CUDA') && (language_constant != 'OpenCL'))))
        {
            continue;
        }

        /*if((path1[i].parentNode.nodeName=='Cause')&&(language_constant!='CUDA'))
		{
			continue;		
		}*/

        else
        {
            var path1_att = path1[i].attributes.getNamedItem("name");

            var place = path1[i].childNodes;

            var path1_input_variable = new Array();
            path1_input_variable[0] = '';
            var path1_output_variable = new Array();
            path1_output_variable[0] = '';
            ind_level = 0;

            var func_name = path1_att.value;
            var classFuncFlag = 0;
            // add by liu Apr16.2011. 1AM
            // Begin: added by Liu	Apr.02.2011 		
            if (func_name.indexOf('_') != -1 && func_name != 'main' && language == 'C++')
            // inference class function definition;
            {

                classFuncFlag = 1;
                // add by liu Apr16.2011. 1AM
                func_name_back = func_name;
                func_name = func_name_back.slice(func_name_back.indexOf('_') + 1, func_name_back.length);
                func_prefix = func_name_back.slice(0, func_name_back.indexOf('_'));

                for (var p = 0; p < classes_declaration.length; p++)
                {
                    if (func_prefix == classes_declaration[p].value[0] && classes_declaration[p].type != null && classes_declaration[p].type != "double" && classes_declaration[p].type != "int")
                    {
                        class_name = classes_declaration[p].type;

                        path1_input_variable = get_pathinput(path1[i]);
                        path1_output_variable = get_pathoutput(path1[i]);
                        if (func_name != 'main' && (path1[i].parentNode.nodeName != 'Cause'))
                        {
                            // var class_name=func_name.substring(0,1).toUpperCase()+func_name.substring(1,func_name.length);
                            //if(language=='C++')
                            //{
                            private_v = new Array();
                            public_v = new Array();
                            // output=insertString(output,creat_class(class_name,private_v,public_v,path1_input_variable,path1_output_variable)); //comment by liu, Apr.02.2011
                            output = insertString(output, creat_func(path1_input_variable, path1_output_variable, func_name, class_name, language));
                            // Add by liu Apr.02.2011.9PM
                            //func_name='work';
                            //}
                            //cppOutput=insertString(output,creat_func(path1_input_variable,path1_output_variable,func_name,class_name,language));
                            cppOutput = creat_func(path1_input_variable, path1_output_variable, func_name, class_name, language);
                        }
                    }
                }
                //alert(cppOutput)
                //continue; // comment by liu Apr.02.2011
            }
            // End: added by Liu; */
            path1_input_variable = get_pathinput(path1[i]);
            path1_output_variable = get_pathoutput(path1[i]);
			
			console.log(path1_input_variable);
			console.log(path1_output_variable);
			
			if (language == 'C' ) //xingzhong added for pointer return
	        {
				var outputs = new Array();
	            for (var idx = 0; idx < path1_output_variable.length; idx++){
					if (path1_output_variable[idx].isPointer == 0 && path1_output_variable[idx].isElement == 0 ){
						outputs.push(path1_output_variable[idx]);
					}
					else{
						path1_input_variable.push(path1_output_variable[idx]);
					}
				}
				path1_output_variable = outputs;
				console.log(path1_input_variable);
				console.log(path1_output_variable);
	        }
			
            //if (func_name != 'main' && (path1[i].parentNode.nodeName != 'Cause'))
			if ( (path1[i].parentNode.nodeName != 'Cause'))
            {
				
                var class_name = func_name.substring(0, 1).toUpperCase() + func_name.substring(1, func_name.length);
            
				if (language == 'C++' && classFuncFlag == 0)
                {
                    private_v = new Array();
                    public_v = new Array();
                    //output=insertString(output,creat_class(class_name,private_v,public_v,path1_input_variable,path1_output_variable));
                    class_name = "";
                    output = insertString(output, creat_func(path1_input_variable, path1_output_variable, func_name, class_name, language));
                }
                else
                {
                    if (classFuncFlag == 0){
                    // add by liu Apr16.2011 1AM
                    output = insertString(output, creat_func(path1_input_variable, path1_output_variable, func_name, class_name, language));
					
					}
				}
				console.log(output);
            }
            ind_level = ind_level + 1;
            //Search all the variables to be declared
            var variables_declaration = new Array();
            var dec_num = 0;
            var str_declare = '';

            if ((language == 'C') && (language_constant != 'CUDA') && (language_constant != 'OpenCL'))
            {

                variables_declaration = search_varDec(path1[i]);
				
                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {
                    if (get_type(variables_declaration[dec_num]) != null)
                    //added by liu
                    {
                        str_declare += indent(ind_level) + declare(variables_declaration[dec_num], language);
                    }

                }
            }

            if (language_constant == 'CUDA')
            {
                if (path1[i].parentNode.nodeName == 'Cause')
                variables_declaration = search_varDec_cuda(path1[i]);
                else
                variables_declaration = search_varDec(path1[i]);

                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {
                    if (get_type(variables_declaration[dec_num]) != null)
                    //added by liu
                    {
                        str_declare += indent(ind_level) + declare(variables_declaration[dec_num], language);
                    }

                }

            }

            if (language_constant == 'OpenCL')
            {
                if (path1[i].parentNode.nodeName == 'Cause')
                variables_declaration = search_varDec_opencl(path1[i]);
                else
                variables_declaration = search_varDec(path1[i]);

                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {
                    if (get_type(variables_declaration[dec_num]) != null)
                    //added by liu
                    {
                        str_declare += indent(ind_level) + declare(variables_declaration[dec_num], language);
                    }

                }

            }



            if (language == 'C++')
            {

                // Add by Liu Apr.02.2011.10PM
                if (func_name == 'main')
                {
                    allClassStr = '';
                    for (var p = 0; p < path1[i].childNodes.length; p++)
                    {
                        classNode = path1[i].childNodes[p];
                        if (classNode.attributes.getNamedItem("name").value == "CDeclaration")
                        // Declaration of Class;
                        {

                            var classStr = '';
                            class_name = classNode.childNodes[0].childNodes[0].childNodes[0].attributes.getNamedItem("name").value;
                            classStr = classStr + 'Class&nbsp;' + class_name;

                            // add by liu Apr.05.2011.1PM
                            var inheritInd = 0;
                            var classComp = classNode.childNodes[0].childNodes[0].childNodes[0];
                            if (classComp.lastChild.attributes.getNamedItem("name").value == "Inheritance")
                            {
                                classStr = classStr + ':' + classComp.lastChild.childNodes[0].childNodes[0].nodeValue + '&nbsp;{ <br \>'
                                inheritInd = 1;
                            }
                            else
                            {
                                classStr = classStr + '&nbsp;{ <br \> ';
                                inheritInd = 0;
                            }
                            // end by liu Apr.05.2011.1PM
                            classThing = classNode.childNodes[0].childNodes[0].childNodes[0];
                            // Class Content;
                            placeIndex = 0;
                            for (var q = 0; q < classThing.childNodes.length - inheritInd; q++)
                            {
                                classPlaceName = classThing.childNodes[q].attributes.getNamedItem("name").value;
                                if (classPlaceName == "Declaration")
                                // inference variables
                                {
                                    classVariableName = classThing.childNodes[q].childNodes[0].attributes.getNamedItem("name").value;
                                    classVariableType = classThing.childNodes[q].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue;
                                    classStr = classStr + classVariableType + '&nbsp;' + classVariableName + ';<br \> ';
                                    placeIndex = q;
                                }
                                // add by liu Apr12.2011 12PM
                                // childNodes[q-1] is the input place of childNodes[q], which is the function declaration.
                                else if (classPlaceName == "Input")
                                {
                                    var inputStr = '';
                                    var inputNum = classThing.childNodes[q].childNodes.length;
                                    if (classThing.childNodes[q].childNodes[0].nodeName == "Place")
                                    {
                                        for (var qq = 0; qq < inputNum; qq++)
                                        {
                                            inputStr = inputStr + classThing.childNodes[q].childNodes[qq].childNodes[0].childNodes[0].nodeValue;
                                            if (qq != inputNum - 1)
                                            {
                                                inputStr = inputStr + ",";
                                            }
                                        }
                                    }
                                    else
                                    {
                                        inputStr = inputStr + classThing.childNodes[q].childNodes[0].childNodes[0].nodeValue;
                                    }
                                }
                                // end by liu Apr12.2011 12PM
                                else if (classPlaceName != "Input" && classPlaceName != "Output")
                                // inference functions;
                                {
                                    classFuncName = classThing.childNodes[q].attributes.getNamedItem("name").value;
                                    classStr = classStr + classFuncName + '(';
                                    // comment by liu Apr13.2011 1PM
                                    /* for(k=placeIndex+1;k<q;k++)                              // inference function input;
									{
										// classFuncInputType=classThing.childNodes[k].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue;
										classFuncInputType="double"; // change by liu Apr.08.2011 11PM

										//classFuncInputName=classThing.childNodes[k].childNodes[0].attributes.getNamedItem("name").value;
										classFuncInputName=classThing.childNodes[k].childNodes[0].childNodes[0].nodeValue; // change by Liu Apr.08.2011 11PM

										classStr=classStr+classFuncInputType+'&nbsp;'+classFuncInputName;
										if((q-k)!=1)
										{
											classStr=classStr+';';
										}
									} */
                                    // comment by liu Apr13.2011 1PM
                                    // add by liu Apr12.2011 12PM
                                    if (inputStr != '')
                                    {
                                        classStr = classStr + inputStr;
                                    }
                                    // end by liu Apr12.2011 12PM									
                                    //classStr=classStr+');<br \> } <br \>'; // comment by liu Apr12.2011 12PM
                                    classStr = classStr + ');<br \>';
                                    // add by liu Apr12.2011. 12PM
                                    placeIndex = q;
                                }
                            }
                            allClassStr = allClassStr + classStr + '} <br \>';
                            // changed by liu Apr12.2011 12PM							
                        }
                    }

                }
                // add by liu Apr15.2011 12PM
                //else		
                //{
                //    if(classFuncFlag==1)
                //    {
                //        class_name='null';
                //        output=insertString(output,creat_func(path1_input_variable,path1_output_variable,func_name,class_name,language));
                //    }			
                //}
                // end by liu Apr15.2011 12PM				
                // End by Liu Apr.02.2011.10PM					
                variables_declaration = search_varDeccpp(path1[i], language);
                // Change by Liu Apr.02.2011
                //if(func_name=='main')                                   // add by liu Apr.04.2011. 4PM
                //{
                //	class_declaration=search_clsDec(pathl[i],language);
                //}
                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {

                    if (get_type(variables_declaration[dec_num]) != null)
                    //added by liu
                    {
                        //added by liu
                        //alert(get_type(variables_declaration[dec_num]))
                        str_declare += indent(ind_level) + declare(variables_declaration[dec_num], language);
                    }
                    //added by liu														
                }

                // Add by liu Apr.04.2011 4PM  // Extract the declared classes;
                classInd = 0;
                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {
                    tmpType = get_type(variables_declaration[dec_num]);
                    if (tmpType != null && tmpType != 'double' && tmpType != 'int' && tmpType != 'bool' && func_name == 'main')
                    {
                        classes_declaration[classInd] = variables_declaration[dec_num];
                        classInd++;
                    }
                }
                // End by liu Apr.04.2011 4PM

            }
            // End by Liu Apr.02.2011
            if (language == 'VHDL')

            {

                components = search_components(path1[i]);
                str_declare += components_declare(ind_level, components);

                variables_declaration = search_varDec(path1[i]);


                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {
                    var flag_exist = 0;
                    for (var output_i = 0; output_i < path1_output_variable.length; output_i++)
                    if (get_variableName(variables_declaration[dec_num]) == get_variableName(path1_output_variable[output_i]))
                    flag_exist = 1;
                    if (flag_exist == 0)
                    str_declare += indent(ind_level) + declare(variables_declaration[dec_num], language) + '<br \>';
                }
                str_declare = str_declare + '<br />begin<br />';
            }

			

            //W_Fangming He added in 2011-04-12
            memvar(path1[i], ind_level, language);

            //search all the places
            var str_places = '';
            if ((language_constant == 'CUDA') && (path1[i].parentNode.nodeName == 'Cause'))
            	str_places = search_places_cuda_kernel(path1[i], path1[i].parentNode, ind_level, language);
            else if ((language_constant == 'CUDA') && (path1[i].parentNode.nodeName != 'Cause'))
            	str_places = search_places_cuda(path1[i], ind_level, language, xmlHardwareDoc);
            else if ((language_constant == 'OpenCL') && (path1[i].parentNode.nodeName == 'Cause'))
            	str_places = search_places_opencl_kernel(path1[i], path1[i].parentNode, ind_level, language);
            else if ((language_constant == 'OpenCL') && (path1[i].parentNode.nodeName != 'Cause'))
            	str_places = search_places_opencl(path1[i], ind_level, language, xmlHardwareDoc);
            else
            	str_places = search_places(path1[i], ind_level, language);

            if (((language_constant == 'CUDA') || language_constant == 'OpenCL') && (path1[i].parentNode.nodeName == 'Cause'))
            	output = insertString(output, str_places);
            else
            	output = insertString(output, str_declare + str_places);


            if (path1[i].parentNode.nodeName != 'Cause')
            {
				
                if ((language == 'C' || language == 'C++') && path1_output_variable.length > 0 && path1_output_variable[0] != '')
                	output = insertString(output, indent(ind_level) + return_out(get_variableName(path1_output_variable[0], language)));
                if (! (i == 0 && language == 'Matlab'))
                {
                    ind_level -= 1;

                    output = insertString(output, indent(ind_level) + f_end(language, func_name));
                }
            }
            output = insertString(output, "<br /><br />")
        }
    }
    if (language == "C++")
    // Add by Liu, Apr.02.2011. 12PM
    {
        output = insertString(output, allClassStr);
        // Add by Liu, Apr.02.2011. 12PM
    }

    //Display_txt_html(document.getElementById(result_id),output);
	
    return output;
}


function search_places_cuda(path, ind_level, language, HardwareDoc)
/*Search all the places in a path and generate corresponding statement according to the type of the places
path: the path node
ind_level: the indent level (to format code display)
language: the target code language*/
 {

    var xmlHardwareDoc = HardwareDoc;
    var place = path.childNodes;
    var str_places = '';

    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);
    var loop_flag = '';
    var loop_path = '';
    var loop_variable = '';
    var cuda_kernel_name = '';
    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;

        /*************************************W_Fangming He 2011-04-07******************************************/
        var flag = 0;
        if (((place_name == 'malloc') || (place_name == 'memset') || (place_name == 'sizeof')) && (language == 'Matlab'))
        {
            continue;
        }
        /****************************************************************************************************/


        if (place[l].nodeName == "Cause")
        {
            if (place[l].attributes.getNamedItem("type") == null)
            var place_cause_type = 'once';
            else
            var place_cause_type = place[l].attributes.getNamedItem("type").value;

            if (place_cause_type == 'loop')
            {
                var end_key = 'loop';
                loop_flag[l] = 1;
                loop_path[l] = place[l].childNodes;
                loop_variable = search_varDec_cuda(place[l].childNodes[0]);
                cuda_kernel_name = place[l].childNodes[0].attributes.getNamedItem("name").value.slice(0, place[l].childNodes[0].attributes.getNamedItem("name").value.indexOf('+'));
            }

            else
            var end_key = 'if';

            if (place_cause_type == 'loop')
            {
                str_places += indent(ind_level) + creat_cause_cuda(place_name, language, place_cause_type, loop_variable, cuda_kernel_name, xmlHardwareDoc);
            }
            else
            {
                str_places += indent(ind_level) + creat_cause(place_name, language, place_cause_type);
                ind_level += 1;

                var path_cause = place[l].childNodes;
                for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
                {
                    //alert(search_places(path_cause[pathindex_cause],ind_level))
                    str_places += search_places(path_cause[pathindex_cause], ind_level, language);
                }
                ind_level -= 1;


                if (l < place.length - 1)
                {
                    if (place[l + 1].attributes.getNamedItem("name").value != 'else' || language != 'Matlab')
                    {
                        str_places += indent(ind_level) + f_end(language, end_key);
                    }
                }
                else
                {

                    str_places += indent(ind_level) + f_end(language, end_key);
                }
            }


        }

        else if (place[l].nodeName == "Place")
        {

            if (place_name == 'Return')
            {
                var variable = place[l].childNodes[0].childNodes[0].nodeValue;
                if (variable != get_variableName(path_output_variable[0], language))
                str_places += get_variableName(path_output_variable[0], language) + '=' + variable + '\n';
                continue;
            }

            if (place_name != "Output" && place_name != "Input" && place_name != 'Declaration' && place_name != 'Return' && place_name != 'CDeclaration')
            {

                var place_input_variable = read_variables(place[l - 1]);


                /************************W_Fangming He added in 2011-04-12**********************************/
                var flag2 = 0;
                var flag1 = 0;
                for (var i = 0; i < memosize.length; i++)
                {
                    if ((memosize[i] == place[l + 1].childNodes[0].childNodes[0].nodeValue) && (language == 'Matlab'))
                    {
                        flag1 = 1;
                        break;
                    }
                }
                if (flag1 == 1) {
                    continue;
                }
                /***************************************************************************************/

                if (l < place.length - 1 && place[l + 1].attributes.getNamedItem("name").value == 'Output')
                var place_output_variable = read_variables(place[l + 1]);
                else
                var place_output_variable = new Array();
                place_outputn = 1;


                if (place[l].childNodes[0].nodeName == "Path")
                {
                    var place_func_name = place_name;
                }
                else
                {
                    var place_func_name = place[l].childNodes[1].childNodes[0].nodeValue;
                    /****************************W_Fangming He Inserted 2011-04-14************************************/
                    //also changed by Ning Han
                    for (var i = 0; i < SigBase[1].length; i++)
                    {
                        if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 1))
                        {
                            place_input_variable = place_input_variable.concat(place_output_variable);
                            place_output_variable = new Array;
                        }
                        else if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 0)) {
                            place_output_variable = new Array;
                        }
                        if ((place_name == SigBase[1][i]) && (language == 'Matlab'))
                        {
                            place_func_name = SigBase[0][i];
                            flag = 1;
                            //break;
                        }
                        else if ((place_name == SigBase[0][i]) && (language == 'C'))
                        {
                            place_func_name = SigBase[1][i];
                            flag = 1;
                            break;
                        }
                    }
                    /***********************************************************************************************/
                }


                if (IsOperator(place_func_name))
                {
                    place_func_name = place_func_name.replace('LAND', '&&');
                    // add by Ning Han
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+place_func_name+get_variableName(place_input_variable[1],language)+';<br />';
                    str_places += Array_operation(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    continue;
                }

                if (place_func_name == 'Equal')
                {
                    //str_places+=inference_assign(ind_level,place_input_variable,place_output_variable,language);
                    str_places += Array_operation(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+';<br />';
                    continue;
                }

                /*	if (place[l].childNodes[0].nodeName != "Path")
					place_func_name=place_func_name+'_'+language;*/

                //class_name=place_func_name.substring(0,1).toUpperCase()+place_func_name.substring(1,place_func_name.length);
                class_name = place_func_name.substring(0, place_func_name.length);
                //obj_name=class_name+'_obj';
                if (language == 'C++')
                {
                    //str_places+=indent(ind_level)+creat_object(class_name,obj_name); // comment by liu Apr.03.2011.1AM
                    // add by liu Apr.04.2011 6PM
                    if (class_name.indexOf("_") != -1)
                    {
                        obj_name = class_name.slice(0, class_name.indexOf("_") - 1);
                        place_func_name = class_name.slice(class_name.indexOf("_") + 1, class_name.length);
                    }
                    else
                    {
                        obj_name = "";
                        place_func_name = class_name;
                    }
                    //end by liu Apr.04.2011. 6PM
                    // place_func_name='work'; // comment by liu Apr.04.2011 6PM
                }
                else
                {
                    obj_name = class_name;
                    //add by liu Apr.03.2011.1AM
                }

                if (language == 'VHDL' && place_func_name.indexOf('VHDL_component') == 0)
                {
                    place_func_name = place_func_name.slice(15);
                    obj_name = place_func_name.slice(place_func_name.indexOf('_') + 1);
                    place_func_name = place_func_name.slice(0, place_func_name.indexOf('_'));

                    for (var comp_ind = 0; comp_ind < components.length; comp_ind++)
                    {
                        component = new read_component(components[comp_ind]);
                        if (component.name == obj_name)
                        {
                            if (component.inputports.length != place_input_variable.length || component.outputports.length != place_output_variable.length)
                            {
                                alert('Port number does not match');
                                exit(0);
                            }

                            for (var port_ind = 0; port_ind < component.inputports.length; port_ind++)
                            {
                                //alert(get_variableName(place_input_variable[port_ind])
                                //alert(component.inputports[port_ind].value)
                                place_input_variable[port_ind].value[0] = component.inputports[port_ind].value + ' => ' + place_input_variable[port_ind].value[0];
                                //alert(place_input_variable[port_ind].value)
                            }

                            for (var port_ind = 0; port_ind < component.outputports.length; port_ind++)
                            {
                                place_output_variable[port_ind].value[0] = component.outputports[port_ind].value + ' => ' + place_output_variable[port_ind].value[0];
                            }
                            break;
                        }
                    }

                }


                str_places += indent(ind_level) + call_func(place_input_variable, place_output_variable, place_func_name, obj_name, language);
            }
        }
        else
        {
            alert('XML code is wrong, a path cannot contain a ' + place[l].nodeName);
            str_places = '';
            break;
        }

    }
    return str_places;

}

function search_places_opencl(path, ind_level, language, HardwareDoc)
/*Search all the places in a path and generate corresponding statement according to the type of the places
path: the path node
ind_level: the indent level (to format code display)
language: the target code language*/
 {

    var xmlHardwareDoc = HardwareDoc;
    var place = path.childNodes;
    var str_places = '';

    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);
    var loop_flag = '';
    var loop_path = '';
    var loop_variable = '';
    var opencl_kernel_name = '';
    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;

        /*************************************W_Fangming He 2011-04-07******************************************/
        var flag = 0;
        if (((place_name == 'malloc') || (place_name == 'memset') || (place_name == 'sizeof')) && (language == 'Matlab'))
        {
            continue;
        }
        /****************************************************************************************************/


        if (place[l].nodeName == "Cause")
        {
            if (place[l].attributes.getNamedItem("type") == null)
            var place_cause_type = 'once';
            else
            var place_cause_type = place[l].attributes.getNamedItem("type").value;

            if (place_cause_type == 'loop')
            {
                var end_key = 'loop';
                loop_flag[l] = 1;
                loop_path[l] = place[l].childNodes;
                loop_variable = search_varDec_opencl(place[l].childNodes[0]);
                opencl_kernel_name = place[l].childNodes[0].attributes.getNamedItem("name").value.slice(0, place[l].childNodes[0].attributes.getNamedItem("name").value.indexOf('+'));
            }

            else
            var end_key = 'if';

            if (place_cause_type == 'loop')
            {
                str_places += indent(ind_level) + creat_cause_opencl(place_name, language, place_cause_type, loop_variable, opencl_kernel_name, xmlHardwareDoc);
            }
            else
            {
                str_places += indent(ind_level) + creat_cause(place_name, language, place_cause_type);
                ind_level += 1;

                var path_cause = place[l].childNodes;
                for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
                {
                    //alert(search_places(path_cause[pathindex_cause],ind_level))
                    str_places += search_places(path_cause[pathindex_cause], ind_level, language);
                }
                ind_level -= 1;


                if (l < place.length - 1)
                {
                    if (place[l + 1].attributes.getNamedItem("name").value != 'else' || language != 'Matlab')
                    {
                        str_places += indent(ind_level) + f_end(language, end_key);
                    }
                }
                else
                {

                    str_places += indent(ind_level) + f_end(language, end_key);
                }
            }


        }

        else if (place[l].nodeName == "Place")
        {

            if (place_name == 'Return')
            {
                var variable = place[l].childNodes[0].childNodes[0].nodeValue;
                if (variable != get_variableName(path_output_variable[0], language))
                str_places += get_variableName(path_output_variable[0], language) + '=' + variable + '\n';
                continue;
            }

            if (place_name != "Output" && place_name != "Input" && place_name != 'Declaration' && place_name != 'Return' && place_name != 'CDeclaration')
            {

                var place_input_variable = read_variables(place[l - 1]);


                /************************W_Fangming He added in 2011-04-12**********************************/
                var flag2 = 0;
                var flag1 = 0;
                for (var i = 0; i < memosize.length; i++)
                {
                    if ((memosize[i] == place[l + 1].childNodes[0].childNodes[0].nodeValue) && (language == 'Matlab'))
                    {
                        flag1 = 1;
                        break;
                    }
                }
                if (flag1 == 1) {
                    continue;
                }
                /***************************************************************************************/

                if (l < place.length - 1 && place[l + 1].attributes.getNamedItem("name").value == 'Output')
                var place_output_variable = read_variables(place[l + 1]);
                else
                var place_output_variable = new Array();
                place_outputn = 1;


                if (place[l].childNodes[0].nodeName == "Path")
                {
                    var place_func_name = place_name;
                }
                else
                {
                    var place_func_name = place[l].childNodes[1].childNodes[0].nodeValue;
                    /****************************W_Fangming He Inserted 2011-04-14************************************/
                    //also changed by Ning Han
                    for (var i = 0; i < SigBase[1].length; i++)
                    {
                        if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 1))
                        {
                            place_input_variable = place_input_variable.concat(place_output_variable);
                            place_output_variable = new Array;
                        }
                        else if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 0)) {
                            place_output_variable = new Array;
                        }
                        if ((place_name == SigBase[1][i]) && (language == 'Matlab'))
                        {
                            place_func_name = SigBase[0][i];
                            flag = 1;
                            //break;
                        }
                        else if ((place_name == SigBase[0][i]) && (language == 'C'))
                        {
                            place_func_name = SigBase[1][i];
                            flag = 1;
                            break;
                        }
                    }
                    /***********************************************************************************************/
                }


                if (IsOperator(place_func_name))
                {
                    place_func_name = place_func_name.replace('LAND', '&&');
                    // add by Ning Han
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+place_func_name+get_variableName(place_input_variable[1],language)+';<br />';
                    str_places += Array_operation(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    continue;
                }

                if (place_func_name == 'Equal')
                {
                    //str_places+=inference_assign(ind_level,place_input_variable,place_output_variable,language);
                    str_places += Array_operation(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+';<br />';
                    continue;
                }

                /*	if (place[l].childNodes[0].nodeName != "Path")
					place_func_name=place_func_name+'_'+language;*/

                //class_name=place_func_name.substring(0,1).toUpperCase()+place_func_name.substring(1,place_func_name.length);
                class_name = place_func_name.substring(0, place_func_name.length);
                //obj_name=class_name+'_obj';
                if (language == 'C++')
                {
                    //str_places+=indent(ind_level)+creat_object(class_name,obj_name); // comment by liu Apr.03.2011.1AM
                    // add by liu Apr.04.2011 6PM
                    if (class_name.indexOf("_") != -1)
                    {
                        obj_name = class_name.slice(0, class_name.indexOf("_") - 1);
                        place_func_name = class_name.slice(class_name.indexOf("_") + 1, class_name.length);
                    }
                    else
                    {
                        obj_name = "";
                        place_func_name = class_name;
                    }
                    //end by liu Apr.04.2011. 6PM
                    // place_func_name='work'; // comment by liu Apr.04.2011 6PM
                }
                else
                {
                    obj_name = class_name;
                    //add by liu Apr.03.2011.1AM
                }

                if (language == 'VHDL' && place_func_name.indexOf('VHDL_component') == 0)
                {
                    place_func_name = place_func_name.slice(15);
                    obj_name = place_func_name.slice(place_func_name.indexOf('_') + 1);
                    place_func_name = place_func_name.slice(0, place_func_name.indexOf('_'));

                    for (var comp_ind = 0; comp_ind < components.length; comp_ind++)
                    {
                        component = new read_component(components[comp_ind]);
                        if (component.name == obj_name)
                        {
                            if (component.inputports.length != place_input_variable.length || component.outputports.length != place_output_variable.length)
                            {
                                alert('Port number does not match');
                                exit(0);
                            }

                            for (var port_ind = 0; port_ind < component.inputports.length; port_ind++)
                            {
                                //alert(get_variableName(place_input_variable[port_ind])
                                //alert(component.inputports[port_ind].value)
                                place_input_variable[port_ind].value[0] = component.inputports[port_ind].value + ' => ' + place_input_variable[port_ind].value[0];
                                //alert(place_input_variable[port_ind].value)
                            }

                            for (var port_ind = 0; port_ind < component.outputports.length; port_ind++)
                            {
                                place_output_variable[port_ind].value[0] = component.outputports[port_ind].value + ' => ' + place_output_variable[port_ind].value[0];
                            }
                            break;
                        }
                    }

                }


                str_places += indent(ind_level) + call_func(place_input_variable, place_output_variable, place_func_name, obj_name, language);
            }
        }
        else
        {
            alert('XML code is wrong, a path cannot contain a ' + place[l].nodeName);
            str_places = '';
            break;
        }

    }
    return str_places;

}



function search_places_cuda_kernel(path, cause, ind_level, language)
/*Search all the places in a path and generate corresponding statement according to the type of the places
path: the path node
ind_level: the indent level (to format code display)
language: the target code language*/
 {

    var place = path.childNodes;
    var str_places = '';

    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);
    var loop_flag = '';
    var loop_path = '';
    var loop_variable = search_varDec_cuda(path);
    var loop_index_max = 'N';
    var loop_index_name = cause.attributes.getNamedItem("name").value;
    var cuda_kernel_name = path.attributes.getNamedItem("name").value.slice(0, path.attributes.getNamedItem("name").value.indexOf('+'));
    loop_index_name = loop_index_name.slice(0, loop_index_name.indexOf('<') + loop_index_name.indexOf('>') + 1);
    str_places += '_global_ void ' + cuda_kernel_name + '_loop_kernel(';
    for (var i = 0; i < loop_variable.length; i = i + 1)
    {
        /*if((get_variableName(loop_variable[i],language).indexOf('[')>-1)&&(get_variableName(loop_variable[i],language).indexOf(']')>-1))
		{
			str_places+=get_variableName(loop_variable[i],language).slice(0,get_variableName(loop_variable[i],language).indexOf('['))+',';			
		}*/
        //alert(loop_variable[i].value);
        if ((loop_variable[i].value.toString().indexOf(',') > -1))
        {
            str_places += loop_variable[i].value.toString().slice(0, loop_variable[i].value.toString().indexOf(',')) + ',';
        }

    }
    str_places += loop_index_max + '){<br \>';
    str_places += '&nbsp;&nbsp;&nbsp;&nbsp;int i=blockDim.x*blockIdx.x+threadIdx.x;<br \>';
    str_places += '&nbsp;&nbsp;&nbsp;&nbsp;if(i<' + loop_index_max + '){<br \>';

    ind_level = ind_level + 1;
    var flag_kernel = 0;

    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;

        /*************************************W_Fangming He 2011-04-07******************************************/
        var flag = 0;
        if (((place_name == 'malloc') || (place_name == 'memset') || (place_name == 'sizeof')) && (language == 'Matlab'))
        {
            continue;
        }
        /****************************************************************************************************/


        if (place[l].nodeName == "Cause")
        {
            if (place[l].attributes.getNamedItem("type") == null)
            var place_cause_type = 'once';
            else
            var place_cause_type = place[l].attributes.getNamedItem("type").value;

            if (place_cause_type == 'loop')
            {
                var end_key = 'loop';
                loop_flag[l] = 1;
                loop_path[l] = place[l].childNodes;
                loop_variable = search_varDec(place[l].childNodes[0]);
            }

            else
            var end_key = 'if';

            if (place_cause_type == 'loop')
            {
                str_places += indent(ind_level) + creat_cause_cuda(place_name, language, place_cause_type, loop_variable, cuda_kernel_name, xmlHardwareDoc);
            }
            else
            {
                str_places += indent(ind_level) + creat_cause(place_name, language, place_cause_type);
                ind_level += 1;

                var path_cause = place[l].childNodes;
                for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
                {
                    //alert(search_places(path_cause[pathindex_cause],ind_level))
                    str_places += search_places_kernel(path_cause[pathindex_cause], ind_level, language);
                }
                ind_level -= 1;


                if (l < place.length - 1)
                {
                    if (place[l + 1].attributes.getNamedItem("name").value != 'else' || language != 'Matlab')
                    {
                        str_places += indent(ind_level) + f_end(language, end_key);
                    }
                }
                else
                {

                    str_places += indent(ind_level) + f_end(language, end_key);
                }
            }

        }

        else if (place[l].nodeName == "Place")
        {

            if (place_name == 'Return')
            {
                var variable = place[l].childNodes[0].childNodes[0].nodeValue;
                if (variable != get_variableName(path_output_variable[0], language))
                str_places += get_variableName(path_output_variable[0], language) + '=' + variable + '\n';
                continue;
            }

            if (place_name != "Output" && place_name != "Input" && place_name != 'Declaration' && place_name != 'Return' && place_name != 'CDeclaration')
            {

                var place_input_variable = read_variables(place[l - 1]);


                /************************W_Fangming He added in 2011-04-12**********************************/
                var flag2 = 0;
                var flag1 = 0;
                for (var i = 0; i < memosize.length; i++)
                {
                    if ((memosize[i] == place[l + 1].childNodes[0].childNodes[0].nodeValue) && (language == 'Matlab'))
                    {
                        flag1 = 1;
                        break;
                    }
                }
                if (flag1 == 1) {
                    continue;
                }
                /***************************************************************************************/

                if (l < place.length - 1 && place[l + 1].attributes.getNamedItem("name").value == 'Output')
                var place_output_variable = read_variables(place[l + 1]);
                else
                var place_output_variable = new Array();
                place_outputn = 1;


                if (place[l].childNodes[0].nodeName == "Path")
                {
                    var place_func_name = place_name;
                }
                else
                {
                    var place_func_name = place[l].childNodes[1].childNodes[0].nodeValue;
                    /****************************W_Fangming He Inserted 2011-04-14************************************/
                    //also changed by Ning Han
                    for (var i = 0; i < SigBase[1].length; i++)
                    {
                        if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 1))
                        {
                            place_input_variable = place_input_variable.concat(place_output_variable);
                            place_output_variable = new Array;
                        }
                        else if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 0)) {
                            place_output_variable = new Array;
                        }
                        if ((place_name == SigBase[1][i]) && (language == 'Matlab'))
                        {
                            place_func_name = SigBase[0][i];
                            flag = 1;
                            //break;
                        }
                        else if ((place_name == SigBase[0][i]) && (language == 'C'))
                        {
                            place_func_name = SigBase[1][i];
                            flag = 1;
                            break;
                        }
                    }
                    /***********************************************************************************************/
                }


                if (IsOperator(place_func_name))
                {
                    var flag_kernel_1 = 0;
                    place_func_name = place_func_name.replace('LAND', '&&');
                    // add by Ning Han
                    /*if(flag_kernel==0)  //yulong zou cuda
					{
						flag_kernel_1=1;
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;int i=blockDim.x*blockIdx.x+threadIdx.x;<br \>';
					}*/
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+place_func_name+get_variableName(place_input_variable[1],language)+';<br />';
                    var temp_string_cuda = '';
                    for (var i = 0; i < place_input_variable.length; i = i + 1)
                    {
                        //alert(get_variableName(place_input_variable[i],language));
                        if ((get_variableName(place_input_variable[i], language).indexOf('[') > -1) && (get_variableName(place_input_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel = 1;
                            temp_string_cuda = get_variableName(place_input_variable[i], language).slice(0, get_variableName(place_input_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_input_variable[i], language).slice(get_variableName(place_input_variable[i], language).indexOf(']'));
                            place_input_variable[i].value[0] = temp_string_cuda;
                            place_input_variable[i].isComposed = 0;
                            place_input_variable[i].isElement = 0;
                        }
                        /*if(place_input_variable[i].value.toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_input_variable[i].value.toString().slice(0,place_input_variable[i].value.toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+place_input_variable[i].value.toString().slice(place_input_variable[i].value.toString().indexOf(','));
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/
                    }
                    for (var i = 0; i < place_output_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_output_variable[i], language).indexOf('[') > -1) && (get_variableName(place_output_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel_1 = 1;
                            temp_string_cuda = get_variableName(place_output_variable[i], language).slice(0, get_variableName(place_output_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_output_variable[i], language).slice(get_variableName(place_output_variable[i], language).indexOf(']'));
                            place_output_variable[i].value[0] = temp_string_cuda;
                            place_output_variable[i].isComposed = 0;
                            place_output_variable[i].isElement = 0;

                        }
                        /*if(place_output_variable[i].value.toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_output_variable[i].value.toString().slice(0,place_output_variable[i].value.toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+place_output_variable[i].value.toString().slice(place_output_variable[i].value.toString().indexOf(','));
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    var str_place_temp = Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    while ((str_place_temp.indexOf('&nbsp;') != -1) || (str_place_temp.indexOf(' ') != -1) || (str_place_temp.indexOf('<br \>') != -1) || (str_place_temp.indexOf('<br />') != -1))
                    {
                        str_place_temp = str_place_temp.replace('&nbsp;', '');
                        str_place_temp = str_place_temp.replace(' ', '');
                        str_place_temp = str_place_temp.replace('<br \>', '');
                        str_place_temp = str_place_temp.replace('<br />', '');
                    }
                    while (str_place_temp.indexOf(';') != -1)
                    {
                        str_place_temp = str_place_temp.replace(';', '');
                    }
                    var str_place_temp_variable = str_place_temp.slice(0, str_place_temp.indexOf('='));
                    if (str_place_temp_variable != loop_index_name)
                    str_places += Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    //alert(get_variableName(place_output_variable[0],language));
                    /*if (flag_kernel_1==1)
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;if(i<'+loop_index_max+'){<br \>';
					
					str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
					if (flag_kernel_1==1)
						str_places+='&nbsp;&nbsp;&nbsp;&nbsp;}<br \>';*/

                    continue;
                }

                if (place_func_name == 'Equal')
                {
                    /*if(flag_kernel==0)  //yulong zou cuda
					{
						flag_kernel=1;
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;int i=blockDim.x*blockIdx.x+threadIdx.x;<br \>';
					}*/
                    var temp_string_cuda = '';
                    var flag_kernel_1 = 0;
                    for (var i = 0; i < place_input_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_input_variable[i], language).indexOf('[') > -1) && (get_variableName(place_input_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel = 1;
                            temp_string_cuda = get_variableName(place_input_variable[i], language).slice(0, get_variableName(place_input_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_input_variable[i], language).slice(get_variableName(place_input_variable[i], language).indexOf(']'));
                            place_input_variable[i].value[0] = temp_string_cuda;
                            place_input_variable[i].isComposed = 0;
                            place_input_variable[i].isElement = 0;
                        }
                        /*	alert(get_variableName(place_input_variable[i],language));
						if(place_input_variable[i].value[0].toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_input_variable[i].value[0].toString().slice(0,place_input_variable[i].value[0].toString().indexOf(','))+'[';										
							temp_string_cuda=temp_string_cuda+'i'+']';
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    for (var i = 0; i < place_output_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_output_variable[i], language).indexOf('[') > -1) && (get_variableName(place_output_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel_1 = 1;
                            temp_string_cuda = get_variableName(place_output_variable[i], language).slice(0, get_variableName(place_output_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_output_variable[i], language).slice(get_variableName(place_output_variable[i], language).indexOf(']'));
                            place_output_variable[i].value[0] = temp_string_cuda;
                            place_output_variable[i].isComposed = 0;
                            place_output_variable[i].isElement = 0;
                        }
                        /*if(place_output_variable[i].value[0].toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_output_variable[i].value[0].toString().slice(0,place_output_variable[i].value[0].toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+']';
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    str_places += Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    //alert(get_variableName(place_output_variable[0],language));
                    /*if (flag_kernel_1==1)
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;if(i<'+loop_index_max+'){<br \>';
					str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
					if (flag_kernel_1==1)
						str_places+='&nbsp;&nbsp;&nbsp;&nbsp;}<br \>';*/
                    //str_places+=inference_assign(ind_level,place_input_variable,place_output_variable,language);
                    //str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+';<br />';
                    continue;
                }

                /*	if (place[l].childNodes[0].nodeName != "Path")
					place_func_name=place_func_name+'_'+language;*/

                //class_name=place_func_name.substring(0,1).toUpperCase()+place_func_name.substring(1,place_func_name.length);
                class_name = place_func_name.substring(0, place_func_name.length);
                //obj_name=class_name+'_obj';
                if (language == 'C++')
                {
                    //str_places+=indent(ind_level)+creat_object(class_name,obj_name); // comment by liu Apr.03.2011.1AM
                    // add by liu Apr.04.2011 6PM
                    if (class_name.indexOf("_") != -1)
                    {
                        obj_name = class_name.slice(0, class_name.indexOf("_") - 1);
                        place_func_name = class_name.slice(class_name.indexOf("_") + 1, class_name.length);
                    }
                    else
                    {
                        obj_name = "";
                        place_func_name = class_name;
                    }
                    //end by liu Apr.04.2011. 6PM
                    // place_func_name='work'; // comment by liu Apr.04.2011 6PM
                }
                else
                {
                    obj_name = class_name;
                    //add by liu Apr.03.2011.1AM
                }

                if (language == 'VHDL' && place_func_name.indexOf('VHDL_component') == 0)
                {
                    place_func_name = place_func_name.slice(15);
                    obj_name = place_func_name.slice(place_func_name.indexOf('_') + 1);
                    place_func_name = place_func_name.slice(0, place_func_name.indexOf('_'));

                    for (var comp_ind = 0; comp_ind < components.length; comp_ind++)
                    {
                        component = new read_component(components[comp_ind]);
                        if (component.name == obj_name)
                        {
                            if (component.inputports.length != place_input_variable.length || component.outputports.length != place_output_variable.length)
                            {
                                alert('Port number does not match');
                                exit(0);
                            }

                            for (var port_ind = 0; port_ind < component.inputports.length; port_ind++)
                            {
                                //alert(get_variableName(place_input_variable[port_ind])
                                //alert(component.inputports[port_ind].value)
                                place_input_variable[port_ind].value[0] = component.inputports[port_ind].value + ' => ' + place_input_variable[port_ind].value[0];
                                //alert(place_input_variable[port_ind].value)
                            }

                            for (var port_ind = 0; port_ind < component.outputports.length; port_ind++)
                            {
                                place_output_variable[port_ind].value[0] = component.outputports[port_ind].value + ' => ' + place_output_variable[port_ind].value[0];
                            }
                            break;
                        }
                    }

                }


                str_places += indent(ind_level) + call_func(place_input_variable, place_output_variable, place_func_name, obj_name, language);
            }
        }
        else
        {
            alert('XML code is wrong, a path cannot contain a ' + place[l].nodeName);
            str_places = '';
            break;
        }

    }
    str_places += '&nbsp;&nbsp;&nbsp;&nbsp;}<br \>';
    str_places += '}';
    return str_places;

}

function search_places_opencl_kernel(path, cause, ind_level, language)
/*Search all the places in a path and generate corresponding statement according to the type of the places
path: the path node
ind_level: the indent level (to format code display)
language: the target code language*/
 {


    var place = path.childNodes;
    var str_places = '';

    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);
    var loop_flag = '';
    var loop_path = '';
    var loop_variable = search_varDec_cuda(path);
    var loop_index_max = 'N';
    var loop_index_name = cause.attributes.getNamedItem("name").value;
    var opencl_kernel_name = path.attributes.getNamedItem("name").value.slice(0, path.attributes.getNamedItem("name").value.indexOf('+'));
    loop_index_name = loop_index_name.slice(0, loop_index_name.indexOf('<') + loop_index_name.indexOf('>') + 1);
    str_places += '_kernel void ' + opencl_kernel_name + '(';
    for (var i = 0; i < loop_variable.length; i = i + 1)
    {
        /*if((get_variableName(loop_variable[i],language).indexOf('[')>-1)&&(get_variableName(loop_variable[i],language).indexOf(']')>-1))
		{
			str_places+=get_variableName(loop_variable[i],language).slice(0,get_variableName(loop_variable[i],language).indexOf('['))+',';			
		}*/
        //alert(loop_variable[i].value);
        if ((loop_variable[i].value.toString().indexOf(',') > -1))
        {
            str_places += '_global ' + loop_variable[i].value.toString().slice(0, loop_variable[i].value.toString().indexOf(',')) + ', ';
        }

    }
    str_places += '){<br \>';
    str_places = str_places.replace(', )', ')');
    str_places += '&nbsp;&nbsp;&nbsp;&nbsp;int i=get_global_id(0);<br \>';

    //ind_level=ind_level+1;
    var flag_kernel = 0;

    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;

        /*************************************W_Fangming He 2011-04-07******************************************/
        var flag = 0;
        if (((place_name == 'malloc') || (place_name == 'memset') || (place_name == 'sizeof')) && (language == 'Matlab'))
        {
            continue;
        }
        /****************************************************************************************************/


        if (place[l].nodeName == "Cause")
        {
            if (place[l].attributes.getNamedItem("type") == null)
            var place_cause_type = 'once';
            else
            var place_cause_type = place[l].attributes.getNamedItem("type").value;

            if (place_cause_type == 'loop')
            {
                var end_key = 'loop';
                loop_flag[l] = 1;
                loop_path[l] = place[l].childNodes;
                loop_variable = search_varDec(place[l].childNodes[0]);
            }

            else
            var end_key = 'if';

            if (place_cause_type == 'loop')
            {
                str_places += indent(ind_level) + creat_cause_cuda(place_name, language, place_cause_type, loop_variable, cuda_kernel_name, xmlHardwareDoc);
            }
            else
            {
                str_places += indent(ind_level) + creat_cause(place_name, language, place_cause_type);
                ind_level += 1;

                var path_cause = place[l].childNodes;
                for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
                {
                    //alert(search_places(path_cause[pathindex_cause],ind_level))
                    str_places += search_places_kernel(path_cause[pathindex_cause], ind_level, language);
                }
                ind_level -= 1;


                if (l < place.length - 1)
                {
                    if (place[l + 1].attributes.getNamedItem("name").value != 'else' || language != 'Matlab')
                    {
                        str_places += indent(ind_level) + f_end(language, end_key);
                    }
                }
                else
                {

                    str_places += indent(ind_level) + f_end(language, end_key);
                }
            }

        }

        else if (place[l].nodeName == "Place")
        {

            if (place_name == 'Return')
            {
                var variable = place[l].childNodes[0].childNodes[0].nodeValue;
                if (variable != get_variableName(path_output_variable[0], language))
                str_places += get_variableName(path_output_variable[0], language) + '=' + variable + '\n';
                continue;
            }

            if (place_name != "Output" && place_name != "Input" && place_name != 'Declaration' && place_name != 'Return' && place_name != 'CDeclaration')
            {

                var place_input_variable = read_variables(place[l - 1]);


                /************************W_Fangming He added in 2011-04-12**********************************/
                var flag2 = 0;
                var flag1 = 0;
                for (var i = 0; i < memosize.length; i++)
                {
                    if ((memosize[i] == place[l + 1].childNodes[0].childNodes[0].nodeValue) && (language == 'Matlab'))
                    {
                        flag1 = 1;
                        break;
                    }
                }
                if (flag1 == 1) {
                    continue;
                }
                /***************************************************************************************/

                if (l < place.length - 1 && place[l + 1].attributes.getNamedItem("name").value == 'Output')
                var place_output_variable = read_variables(place[l + 1]);
                else
                var place_output_variable = new Array();
                place_outputn = 1;


                if (place[l].childNodes[0].nodeName == "Path")
                {
                    var place_func_name = place_name;
                }
                else
                {
                    var place_func_name = place[l].childNodes[1].childNodes[0].nodeValue;
                    /****************************W_Fangming He Inserted 2011-04-14************************************/
                    //also changed by Ning Han
                    for (var i = 0; i < SigBase[1].length; i++)
                    {
                        if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 1))
                        {
                            place_input_variable = place_input_variable.concat(place_output_variable);
                            place_output_variable = new Array;
                        }
                        else if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 0)) {
                            place_output_variable = new Array;
                        }
                        if ((place_name == SigBase[1][i]) && (language == 'Matlab'))
                        {
                            place_func_name = SigBase[0][i];
                            flag = 1;
                            //break;
                        }
                        else if ((place_name == SigBase[0][i]) && (language == 'C'))
                        {
                            place_func_name = SigBase[1][i];
                            flag = 1;
                            break;
                        }
                    }
                    /***********************************************************************************************/
                }


                if (IsOperator(place_func_name))
                {
                    var flag_kernel_1 = 0;
                    place_func_name = place_func_name.replace('LAND', '&&');
                    // add by Ning Han
                    /*if(flag_kernel==0)  //yulong zou cuda
					{
						flag_kernel_1=1;
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;int i=blockDim.x*blockIdx.x+threadIdx.x;<br \>';
					}*/
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+place_func_name+get_variableName(place_input_variable[1],language)+';<br />';
                    var temp_string_cuda = '';
                    for (var i = 0; i < place_input_variable.length; i = i + 1)
                    {
                        //alert(get_variableName(place_input_variable[i],language));
                        if ((get_variableName(place_input_variable[i], language).indexOf('[') > -1) && (get_variableName(place_input_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel = 1;
                            temp_string_cuda = get_variableName(place_input_variable[i], language).slice(0, get_variableName(place_input_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_input_variable[i], language).slice(get_variableName(place_input_variable[i], language).indexOf(']'));
                            place_input_variable[i].value[0] = temp_string_cuda;
                            place_input_variable[i].isComposed = 0;
                            place_input_variable[i].isElement = 0;
                        }
                        /*if(place_input_variable[i].value.toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_input_variable[i].value.toString().slice(0,place_input_variable[i].value.toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+place_input_variable[i].value.toString().slice(place_input_variable[i].value.toString().indexOf(','));
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/
                    }
                    for (var i = 0; i < place_output_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_output_variable[i], language).indexOf('[') > -1) && (get_variableName(place_output_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel_1 = 1;
                            temp_string_cuda = get_variableName(place_output_variable[i], language).slice(0, get_variableName(place_output_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_output_variable[i], language).slice(get_variableName(place_output_variable[i], language).indexOf(']'));
                            place_output_variable[i].value[0] = temp_string_cuda;
                            place_output_variable[i].isComposed = 0;
                            place_output_variable[i].isElement = 0;

                        }
                        /*if(place_output_variable[i].value.toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_output_variable[i].value.toString().slice(0,place_output_variable[i].value.toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+place_output_variable[i].value.toString().slice(place_output_variable[i].value.toString().indexOf(','));
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    var str_place_temp = Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    while ((str_place_temp.indexOf('&nbsp;') != -1) || (str_place_temp.indexOf(' ') != -1) || (str_place_temp.indexOf('<br \>') != -1) || (str_place_temp.indexOf('<br />') != -1))
                    {
                        str_place_temp = str_place_temp.replace('&nbsp;', '');
                        str_place_temp = str_place_temp.replace(' ', '');
                        str_place_temp = str_place_temp.replace('<br \>', '');
                        str_place_temp = str_place_temp.replace('<br />', '');
                    }
                    while (str_place_temp.indexOf(';') != -1)
                    {
                        str_place_temp = str_place_temp.replace(';', '');
                    }
                    var str_place_temp_variable = str_place_temp.slice(0, str_place_temp.indexOf('='));
                    if (str_place_temp_variable != loop_index_name)
                    str_places += Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    //alert(get_variableName(place_output_variable[0],language));
                    /*if (flag_kernel_1==1)
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;if(i<'+loop_index_max+'){<br \>';
					
					str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
					if (flag_kernel_1==1)
						str_places+='&nbsp;&nbsp;&nbsp;&nbsp;}<br \>';*/

                    continue;
                }

                if (place_func_name == 'Equal')
                {
                    /*if(flag_kernel==0)  //yulong zou cuda
					{
						flag_kernel=1;
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;int i=blockDim.x*blockIdx.x+threadIdx.x;<br \>';
					}*/
                    var temp_string_cuda = '';
                    var flag_kernel_1 = 0;
                    for (var i = 0; i < place_input_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_input_variable[i], language).indexOf('[') > -1) && (get_variableName(place_input_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel = 1;
                            temp_string_cuda = get_variableName(place_input_variable[i], language).slice(0, get_variableName(place_input_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_input_variable[i], language).slice(get_variableName(place_input_variable[i], language).indexOf(']'));
                            place_input_variable[i].value[0] = temp_string_cuda;
                            place_input_variable[i].isComposed = 0;
                            place_input_variable[i].isElement = 0;
                        }
                        /*	alert(get_variableName(place_input_variable[i],language));
						if(place_input_variable[i].value[0].toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_input_variable[i].value[0].toString().slice(0,place_input_variable[i].value[0].toString().indexOf(','))+'[';										
							temp_string_cuda=temp_string_cuda+'i'+']';
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    for (var i = 0; i < place_output_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_output_variable[i], language).indexOf('[') > -1) && (get_variableName(place_output_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel_1 = 1;
                            temp_string_cuda = get_variableName(place_output_variable[i], language).slice(0, get_variableName(place_output_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_output_variable[i], language).slice(get_variableName(place_output_variable[i], language).indexOf(']'));
                            place_output_variable[i].value[0] = temp_string_cuda;
                            place_output_variable[i].isComposed = 0;
                            place_output_variable[i].isElement = 0;
                        }
                        /*if(place_output_variable[i].value[0].toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_output_variable[i].value[0].toString().slice(0,place_output_variable[i].value[0].toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+']';
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    str_places += Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    //alert(get_variableName(place_output_variable[0],language));
                    /*if (flag_kernel_1==1)
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;if(i<'+loop_index_max+'){<br \>';
					str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
					if (flag_kernel_1==1)
						str_places+='&nbsp;&nbsp;&nbsp;&nbsp;}<br \>';*/
                    //str_places+=inference_assign(ind_level,place_input_variable,place_output_variable,language);
                    //str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+';<br />';
                    continue;
                }

                /*	if (place[l].childNodes[0].nodeName != "Path")
					place_func_name=place_func_name+'_'+language;*/

                //class_name=place_func_name.substring(0,1).toUpperCase()+place_func_name.substring(1,place_func_name.length);
                class_name = place_func_name.substring(0, place_func_name.length);
                //obj_name=class_name+'_obj';
                if (language == 'C++')
                {
                    //str_places+=indent(ind_level)+creat_object(class_name,obj_name); // comment by liu Apr.03.2011.1AM
                    // add by liu Apr.04.2011 6PM
                    if (class_name.indexOf("_") != -1)
                    {
                        obj_name = class_name.slice(0, class_name.indexOf("_") - 1);
                        place_func_name = class_name.slice(class_name.indexOf("_") + 1, class_name.length);
                    }
                    else
                    {
                        obj_name = "";
                        place_func_name = class_name;
                    }
                    //end by liu Apr.04.2011. 6PM
                    // place_func_name='work'; // comment by liu Apr.04.2011 6PM
                }
                else
                {
                    obj_name = class_name;
                    //add by liu Apr.03.2011.1AM
                }

                if (language == 'VHDL' && place_func_name.indexOf('VHDL_component') == 0)
                {
                    place_func_name = place_func_name.slice(15);
                    obj_name = place_func_name.slice(place_func_name.indexOf('_') + 1);
                    place_func_name = place_func_name.slice(0, place_func_name.indexOf('_'));

                    for (var comp_ind = 0; comp_ind < components.length; comp_ind++)
                    {
                        component = new read_component(components[comp_ind]);
                        if (component.name == obj_name)
                        {
                            if (component.inputports.length != place_input_variable.length || component.outputports.length != place_output_variable.length)
                            {
                                alert('Port number does not match');
                                exit(0);
                            }

                            for (var port_ind = 0; port_ind < component.inputports.length; port_ind++)
                            {
                                //alert(get_variableName(place_input_variable[port_ind])
                                //alert(component.inputports[port_ind].value)
                                place_input_variable[port_ind].value[0] = component.inputports[port_ind].value + ' => ' + place_input_variable[port_ind].value[0];
                                //alert(place_input_variable[port_ind].value)
                            }

                            for (var port_ind = 0; port_ind < component.outputports.length; port_ind++)
                            {
                                place_output_variable[port_ind].value[0] = component.outputports[port_ind].value + ' => ' + place_output_variable[port_ind].value[0];
                            }
                            break;
                        }
                    }

                }


                str_places += indent(ind_level) + call_func(place_input_variable, place_output_variable, place_func_name, obj_name, language);
            }
        }
        else
        {
            alert('XML code is wrong, a path cannot contain a ' + place[l].nodeName);
            str_places = '';
            break;
        }

    }
    str_places += '}';
    return str_places;

}


function search_places_kernel(path, ind_level, language)
/*Search all the places in a path and generate corresponding statement according to the type of the places
path: the path node
ind_level: the indent level (to format code display)
language: the target code language*/
 {

    var place = path.childNodes;
    var str_places = '';

    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);
    var loop_flag = '';
    var loop_path = '';
    var loop_variable = '';
    var cuda_kernel_name = path.attributes.getNamedItem("name").value.slice(0, path.attributes.getNamedItem("name").value.indexOf('+'));
    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;

        /*************************************W_Fangming He 2011-04-07******************************************/
        var flag = 0;
        if (((place_name == 'malloc') || (place_name == 'memset') || (place_name == 'sizeof')) && (language == 'Matlab'))
        {
            continue;
        }
        /****************************************************************************************************/


        if (place[l].nodeName == "Cause")
        {
            if (place[l].attributes.getNamedItem("type") == null)
            var place_cause_type = 'once';
            else
            var place_cause_type = place[l].attributes.getNamedItem("type").value;

            if (place_cause_type == 'loop')
            {
                var end_key = 'loop';
                loop_flag[l] = 1;
                loop_path[l] = place[l].childNodes;
                loop_variable = search_varDec_cuda(place[l].childNodes[0]);
            }

            else
            var end_key = 'if';

            if (place_cause_type == 'loop')
            {
                str_places += indent(ind_level) + (place_name, language, place_cause_type, loop_variable, cuda_kernel_name);
            }
            else
            {
                str_places += indent(ind_level) + creat_cause(place_name, language, place_cause_type);
                ind_level += 1;

                var path_cause = place[l].childNodes;
                for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
                {
                    //alert(search_places(path_cause[pathindex_cause],ind_level))
                    str_places += search_places(path_cause[pathindex_cause], ind_level, language);
                }
                ind_level -= 1;


                if (l < place.length - 1)
                {
                    if (place[l + 1].attributes.getNamedItem("name").value != 'else' || language != 'Matlab')
                    {
                        str_places += indent(ind_level) + f_end(language, end_key);
                    }
                }
                else
                {

                    str_places += indent(ind_level) + f_end(language, end_key);
                }
            }


        }

        else if (place[l].nodeName == "Place")
        {

            if (place_name == 'Return')
            {
                var variable = place[l].childNodes[0].childNodes[0].nodeValue;
                if (variable != get_variableName(path_output_variable[0], language))
                str_places += get_variableName(path_output_variable[0], language) + '=' + variable + '\n';
                continue;
            }

            if (place_name != "Output" && place_name != "Input" && place_name != 'Declaration' && place_name != 'Return' && place_name != 'CDeclaration')
            {

                var place_input_variable = read_variables(place[l - 1]);


                /************************W_Fangming He added in 2011-04-12**********************************/
                var flag2 = 0;
                var flag1 = 0;
                for (var i = 0; i < memosize.length; i++)
                {
                    if ((memosize[i] == place[l + 1].childNodes[0].childNodes[0].nodeValue) && (language == 'Matlab'))
                    {
                        flag1 = 1;
                        break;
                    }
                }
                if (flag1 == 1) {
                    continue;
                }
                /***************************************************************************************/

                if (l < place.length - 1 && place[l + 1].attributes.getNamedItem("name").value == 'Output')
                var place_output_variable = read_variables(place[l + 1]);
                else
                var place_output_variable = new Array();
                place_outputn = 1;


                if (place[l].childNodes[0].nodeName == "Path")
                {
                    var place_func_name = place_name;
                }
                else
                {
                    var place_func_name = place[l].childNodes[1].childNodes[0].nodeValue;
                    /****************************W_Fangming He Inserted 2011-04-14************************************/
                    //also changed by Ning Han
                    for (var i = 0; i < SigBase[1].length; i++)
                    {
                        if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 1))
                        {
                            place_input_variable = place_input_variable.concat(place_output_variable);
                            place_output_variable = new Array;
                        }
                        else if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 0)) {
                            place_output_variable = new Array;
                        }
                        if ((place_name == SigBase[1][i]) && (language == 'Matlab'))
                        {
                            place_func_name = SigBase[0][i];
                            flag = 1;
                            //break;
                        }
                        else if ((place_name == SigBase[0][i]) && (language == 'C'))
                        {
                            place_func_name = SigBase[1][i];
                            flag = 1;
                            break;
                        }
                    }
                    /***********************************************************************************************/
                }


                if (IsOperator(place_func_name))
                {
                    var flag_kernel_1 = 0;
                    place_func_name = place_func_name.replace('LAND', '&&');
                    // add by Ning Han
                    /*if(flag_kernel==0)  //yulong zou cuda
					{
						flag_kernel_1=1;
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;int i=blockDim.x*blockIdx.x+threadIdx.x;<br \>';
					}*/
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+place_func_name+get_variableName(place_input_variable[1],language)+';<br />';
                    var temp_string_cuda = '';
                    for (var i = 0; i < place_input_variable.length; i = i + 1)
                    {
                        //alert(get_variableName(place_input_variable[i],language));
                        if ((get_variableName(place_input_variable[i], language).indexOf('[') > -1) && (get_variableName(place_input_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel = 1;
                            temp_string_cuda = get_variableName(place_input_variable[i], language).slice(0, get_variableName(place_input_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_input_variable[i], language).slice(get_variableName(place_input_variable[i], language).indexOf(']'));
                            place_input_variable[i].value[0] = temp_string_cuda;
                            place_input_variable[i].isComposed = 0;
                            place_input_variable[i].isElement = 0;
                        }
                        /*if(place_input_variable[i].value.toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_input_variable[i].value.toString().slice(0,place_input_variable[i].value.toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+place_input_variable[i].value.toString().slice(place_input_variable[i].value.toString().indexOf(','));
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/
                    }
                    for (var i = 0; i < place_output_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_output_variable[i], language).indexOf('[') > -1) && (get_variableName(place_output_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel_1 = 1;
                            temp_string_cuda = get_variableName(place_output_variable[i], language).slice(0, get_variableName(place_output_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_output_variable[i], language).slice(get_variableName(place_output_variable[i], language).indexOf(']'));
                            place_output_variable[i].value[0] = temp_string_cuda;
                            place_output_variable[i].isComposed = 0;
                            place_output_variable[i].isElement = 0;

                        }
                        /*if(place_output_variable[i].value.toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_output_variable[i].value.toString().slice(0,place_output_variable[i].value.toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+place_output_variable[i].value.toString().slice(place_output_variable[i].value.toString().indexOf(','));
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    var str_place_temp = Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);

                    str_places += Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    //alert(get_variableName(place_output_variable[0],language));
                    /*if (flag_kernel_1==1)
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;if(i<'+loop_index_max+'){<br \>';
					
					str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
					if (flag_kernel_1==1)
						str_places+='&nbsp;&nbsp;&nbsp;&nbsp;}<br \>';*/

                    continue;
                }

                if (place_func_name == 'Equal')
                {
                    /*if(flag_kernel==0)  //yulong zou cuda
					{
						flag_kernel=1;
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;int i=blockDim.x*blockIdx.x+threadIdx.x;<br \>';
					}*/
                    var temp_string_cuda = '';
                    var flag_kernel_1 = 0;
                    for (var i = 0; i < place_input_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_input_variable[i], language).indexOf('[') > -1) && (get_variableName(place_input_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel = 1;
                            temp_string_cuda = get_variableName(place_input_variable[i], language).slice(0, get_variableName(place_input_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_input_variable[i], language).slice(get_variableName(place_input_variable[i], language).indexOf(']'));
                            place_input_variable[i].value[0] = temp_string_cuda;
                            place_input_variable[i].isComposed = 0;
                            place_input_variable[i].isElement = 0;
                        }
                        /*	alert(get_variableName(place_input_variable[i],language));
						if(place_input_variable[i].value[0].toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_input_variable[i].value[0].toString().slice(0,place_input_variable[i].value[0].toString().indexOf(','))+'[';										
							temp_string_cuda=temp_string_cuda+'i'+']';
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    for (var i = 0; i < place_output_variable.length; i = i + 1)
                    {
                        if ((get_variableName(place_output_variable[i], language).indexOf('[') > -1) && (get_variableName(place_output_variable[i], language).indexOf(']') > -1))
                        {
                            flag_kernel_1 = 1;
                            temp_string_cuda = get_variableName(place_output_variable[i], language).slice(0, get_variableName(place_output_variable[i], language).indexOf('[') + 1);
                            temp_string_cuda = temp_string_cuda + 'i' + get_variableName(place_output_variable[i], language).slice(get_variableName(place_output_variable[i], language).indexOf(']'));
                            place_output_variable[i].value[0] = temp_string_cuda;
                            place_output_variable[i].isComposed = 0;
                            place_output_variable[i].isElement = 0;
                        }
                        /*if(place_output_variable[i].value[0].toString().indexOf(',')) // yulong zou to be modified
						{	
							flag_kernel=1;				
							temp_string_cuda=place_output_variable[i].value[0].toString().slice(0,place_output_variable[i].value[0].toString().indexOf(',')+1);					
							temp_string_cuda=temp_string_cuda+'i'+']';
							place_input_variable[i].value[0]=temp_string_cuda;
						}*/

                    }
                    str_places += Array_operation_cuda(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    //alert(get_variableName(place_output_variable[0],language));
                    /*if (flag_kernel_1==1)
						str_places+= '&nbsp;&nbsp;&nbsp;&nbsp;if(i<'+loop_index_max+'){<br \>';
					str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
					if (flag_kernel_1==1)
						str_places+='&nbsp;&nbsp;&nbsp;&nbsp;}<br \>';*/
                    //str_places+=inference_assign(ind_level,place_input_variable,place_output_variable,language);
                    //str_places+=Array_operation_cuda(ind_level,place_input_variable,place_output_variable,equal_symbol(language),place_func_name,language);
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+';<br />';
                    continue;
                }

                /*	if (place[l].childNodes[0].nodeName != "Path")
					place_func_name=place_func_name+'_'+language;*/

                //class_name=place_func_name.substring(0,1).toUpperCase()+place_func_name.substring(1,place_func_name.length);
                class_name = place_func_name.substring(0, place_func_name.length);
                //obj_name=class_name+'_obj';
                if (language == 'C++')
                {
                    //str_places+=indent(ind_level)+creat_object(class_name,obj_name); // comment by liu Apr.03.2011.1AM
                    // add by liu Apr.04.2011 6PM
                    if (class_name.indexOf("_") != -1)
                    {
                        obj_name = class_name.slice(0, class_name.indexOf("_") - 1);
                        place_func_name = class_name.slice(class_name.indexOf("_") + 1, class_name.length);
                    }
                    else
                    {
                        obj_name = "";
                        place_func_name = class_name;
                    }
                    //end by liu Apr.04.2011. 6PM
                    // place_func_name='work'; // comment by liu Apr.04.2011 6PM
                }
                else
                {
                    obj_name = class_name;
                    //add by liu Apr.03.2011.1AM
                }

                if (language == 'VHDL' && place_func_name.indexOf('VHDL_component') == 0)
                {
                    place_func_name = place_func_name.slice(15);
                    obj_name = place_func_name.slice(place_func_name.indexOf('_') + 1);
                    place_func_name = place_func_name.slice(0, place_func_name.indexOf('_'));

                    for (var comp_ind = 0; comp_ind < components.length; comp_ind++)
                    {
                        component = new read_component(components[comp_ind]);
                        if (component.name == obj_name)
                        {
                            if (component.inputports.length != place_input_variable.length || component.outputports.length != place_output_variable.length)
                            {
                                alert('Port number does not match');
                                exit(0);
                            }

                            for (var port_ind = 0; port_ind < component.inputports.length; port_ind++)
                            {
                                //alert(get_variableName(place_input_variable[port_ind])
                                //alert(component.inputports[port_ind].value)
                                place_input_variable[port_ind].value[0] = component.inputports[port_ind].value + ' => ' + place_input_variable[port_ind].value[0];
                                //alert(place_input_variable[port_ind].value)
                            }

                            for (var port_ind = 0; port_ind < component.outputports.length; port_ind++)
                            {
                                place_output_variable[port_ind].value[0] = component.outputports[port_ind].value + ' => ' + place_output_variable[port_ind].value[0];
                            }
                            break;
                        }
                    }

                }


                str_places += indent(ind_level) + call_func(place_input_variable, place_output_variable, place_func_name, obj_name, language);
            }
        }
        else
        {
            alert('XML code is wrong, a path cannot contain a ' + place[l].nodeName);
            str_places = '';
            break;
        }

    }
    return str_places;

}

function creat_cause_cuda(cause, language, type, variables, cuda_kernel_name, HardwareDoc)
/*creat the control statement, including selection control (if) statement and loop (while) statement in code generation
cause: the condition in the cause
language: the target code lauguage
type: selection (once) or loop
*/

 {
    var xmlHardwareDoc = HardwareDoc;
    var str = '';
    if (language == 'VHDL' && cause.indexOf('VHDL_Process') == 0)
    {
        //str='begin<br \>'
        cause = cause.slice(13);
        str = str + 'process (' + cause + ')<br \>';
        str = str + 'begin<br \>';
        //str=str+split_variable(output[0])+'<='+split_variable(input[0])+ ' '+ func_name+' ' + split_variable(input[1])+';<br \>';
        //str=str+'end process;<br \><br \>';
        return str;
    }
    else if (type == 'loop')
    {
        //str='while&nbsp;('+cause+')';
        var flag = 0;
        var flag1 = 0;
        var loop_index_max = '';
        if (cause.indexOf('+') > -1)
        loop_index_max = cause.slice(cause.indexOf('<') + 1, cause.indexOf('+'));
        else
        loop_index_max = cause.slice(cause.indexOf('<') + 1, cause.length);
        //		var loop_index_max=cause.slice(cause.indexOf('<')+1,cause.length);
        loop_index_max = delblank(loop_index_max);
        if (IsNumeric(loop_index_max))
        loop_index_max = loop_index_max - 1;

        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Allocate memory in device (GPU);<br \>';
                }
                str += '&nbsp;&nbsp;&nbsp;&nbsp;' + get_type(variables[i]) + '* d_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ';<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;size_t size_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + '=(' + loop_index_max + ')*sizeof(' + get_type(variables[i]) + ');<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;cudaMalloc(& d_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',size_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ');<br \>';
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Allocate memory in device (GPU);<br \>';
                }
                str += '&nbsp;&nbsp;&nbsp;&nbsp;' + get_type(variables[i]) + '* d_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ';<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;size_t size_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + '=(' + loop_index_max + ')*sizeof(' + get_type(variables[i]) + ');<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;cudaMalloc(& d_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',size_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ');<br \>';
            }


        }

        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag1 == 0)
                {
                    flag1 = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Copy memory from host(CPU) to device(GPU);<br \>';
                }
                //str+='&nbsp;&nbsp;&nbsp;&nbsp;double* d_'+get_variableName(variables[i]).slice(0,get_variableName(variables[i]).indexOf('['))+';<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;cudaMemcpy(d_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',size_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',cudaMemcpyHostToDevice);<br \>';
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag1 == 0)
                {
                    flag1 = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Copy memory from host(CPU) to device(GPU);<br \>';
                }
                //str+='&nbsp;&nbsp;&nbsp;&nbsp;double* d_'+get_variableName(variables[i]).slice(0,get_variableName(variables[i]).indexOf('['))+';<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;cudaMemcpy(d_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',size_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',cudaMemcpyHostToDevice);<br \>';
            }


        }

        str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Invoke Kernel;<br \>';
        var thingPropertyItems = xmlHardwareDoc.getElementsByTagName("Thing");

        for (var i = 0; i < thingPropertyItems.length; i = i + 1)
        {
            if (thingPropertyItems[i].attributes.getNamedItem("name") != null)
            {
                if (thingPropertyItems[i].attributes.getNamedItem("name").value == "thread")
                {
                    if ((IsNumeric(loop_index_max)) && (thingPropertyItems[i].childNodes[0].nodeValue >= loop_index_max))
                    {
                        str += '&nbsp;&nbsp;&nbsp;&nbsp;dim3 threadsPerBlock(' + loop_index_max + ');<br \>';
                        str += '&nbsp;&nbsp;&nbsp;&nbsp;dim3 numBlocks(1);<br \>';
                    }
                    if ((IsNumeric(loop_index_max)) && (thingPropertyItems[i].childNodes[0].nodeValue < loop_index_max))
                    {
                        str += '&nbsp;&nbsp;&nbsp;&nbsp;dim3 threadsPerBlock(' + thingPropertyItems[i].childNodes[0].nodeValue + ');<br \>';
                        var temp_temp = '';
                        if ((loop_index_max % thingPropertyItems[i].childNodes[0].nodeValue) < (thingPropertyItems[i].childNodes[0].nodeValue / 2))
                        temp_temp = 1 + Math.round(loop_index_max / thingPropertyItems[i].childNodes[0].nodeValue);
                        else
                        temp_temp = Math.round(loop_index_max / thingPropertyItems[i].childNodes[0].nodeValue);
                        str += '&nbsp;&nbsp;&nbsp;&nbsp;dim3 numBlocks(' + temp_temp + ');<br \>';
                    }
                    if (! (IsNumeric(loop_index_max)))
                    {
                        str += '&nbsp;&nbsp;&nbsp;&nbsp;dim3 threadsPerBlock(' + thingPropertyItems[i].childNodes[0].nodeValue + ');<br \>';
                        str += '&nbsp;&nbsp;&nbsp;&nbsp;dim3 numBlocks((' + loop_index_max + ')/threadsPerBlock.x);<br \>';
                    }
                    break;
                }
            }
        }


        str += '&nbsp;&nbsp;&nbsp;&nbsp;' + cuda_kernel_name + '_loop_kernel<<<numBlocks,threadsPerBlock>>>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(';
        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                str += 'd_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',';
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                str += 'd_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',';
            }

        }
        str += loop_index_max + ');<br \>';

        flag = 0;
        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Copy result from device memory to host memory;<br \>';
                }
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Copy result from device memory to host memory;<br \>';
                }
            }
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;cudaMemcpy(' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',' + 'd_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',size_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',cudaMemcpyDeviceToHost);<br \>';
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;cudaMemcpy(' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',' + 'd_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',size_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',cudaMemcpyDeviceToHost);<br \>';
            }


        }

        flag = 0;
        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Free device memory;<br \>';
                }
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//Free device memory;<br \>';
                }
            }
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;cudaFree(d_' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ');<br \>';

            }
            if ((variables[i].value.toString().indexOf(',') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;cudaFree(d_' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ');<br \>';

            }


        }

    }
    else
    {
        if (cause == 'else')
        str = 'else';
        else
        str = 'if&nbsp;(' + cause + ')';
    }

    return str + '<br \>';
}

function creat_cause_opencl(cause, language, type, variables, opencl_kernel_name, HardwareDoc)
/*creat the control statement, including selection control (if) statement and loop (while) statement in code generation
cause: the condition in the cause
language: the target code lauguage
type: selection (once) or loop
*/

 {
    var xmlHardwareDoc = HardwareDoc;
    var str = '';
    if (language == 'VHDL' && cause.indexOf('VHDL_Process') == 0)
    {
        //str='begin<br \>'
        cause = cause.slice(13);
        str = str + 'process (' + cause + ')<br \>';
        str = str + 'begin<br \>';
        //str=str+split_variable(output[0])+'<='+split_variable(input[0])+ ' '+ func_name+' ' + split_variable(input[1])+';<br \>';
        //str=str+'end process;<br \><br \>';
        return str;
    }
    else if (type == 'loop')
    {
        //str='while&nbsp;('+cause+')';
        var flag = 0;
        var flag1 = 0;
        var loop_index_max = '';
        if (cause.indexOf('+') > -1)
        loop_index_max = cause.slice(cause.indexOf('<') + 1, cause.indexOf('+'));
        else
        loop_index_max = cause.slice(cause.indexOf('<') + 1, cause.length);
        //		var loop_index_max=cause.slice(cause.indexOf('<')+1,cause.length);
        loop_index_max = delblank(loop_index_max);
        if (IsNumeric(loop_index_max))
        loop_index_max = loop_index_max - 1;

        /*var thingPropertyItems=xmlHardwareDoc.getElementsByTagName("Thing");

		for (var i=0;i<thingPropertyItems.length;i=i+1)
		{
			if (thingPropertyItems[i].attributes.getNamedItem("name")!=null)
			{
				if(thingPropertyItems[i].attributes.getNamedItem("name").value=="thread")
				{
					if((IsNumeric(loop_index_max))&&(thingPropertyItems[i].childNodes[0].nodeValue>=loop_index_max))
					{
						str+='&nbsp;&nbsp;&nbsp;&nbsp;dim3 threadsPerBlock('+loop_index_max+');<br \>';
						str+='&nbsp;&nbsp;&nbsp;&nbsp;dim3 numBlocks(1);<br \>';
					}
					if((IsNumeric(loop_index_max))&&(thingPropertyItems[i].childNodes[0].nodeValue<loop_index_max))
					{
						str+='&nbsp;&nbsp;&nbsp;&nbsp;dim3 threadsPerBlock('+thingPropertyItems[i].childNodes[0].nodeValue+');<br \>';
						var temp_temp='';
						if((loop_index_max%thingPropertyItems[i].childNodes[0].nodeValue)<512)
							temp_temp=1+Math.round(loop_index_max/thingPropertyItems[i].childNodes[0].nodeValue);
						else
							temp_temp=Math.round(loop_index_max/thingPropertyItems[i].childNodes[0].nodeValue);
						str+='&nbsp;&nbsp;&nbsp;&nbsp;dim3 numBlocks('+temp_temp+');<br \>';
					}
					if(!(IsNumeric(loop_index_max)))
					{
						str+='&nbsp;&nbsp;&nbsp;&nbsp;dim3 threadsPerBlock('+thingPropertyItems[i].childNodes[0].nodeValue+');<br \>';
						str+='&nbsp;&nbsp;&nbsp;&nbsp;dim3 numBlocks(('+loop_index_max+')/threadsPerBlock.x);<br \>';
					}
					break;
				}
			}
		}*/

        if ((IsNumeric(loop_index_max)) && (loop_index_max <= 512))
        {
            str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnBlockSize = ' + loop_index_max + ';<br \>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnBlocks = 1;<br \>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnDimension = cnBlocks * cnBlockSize;<br \>';
        }
        if ((IsNumeric(loop_index_max)) && (loop_index_max > 512))
        {
            str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnBlockSize = 512;<br \>';
            var temp_temp = '';
            if ((loop_index_max % 512) < 216)
            temp_temp = 1 + Math.round(loop_index_max / 512);
            else
            temp_temp = Math.round(loop_index_max / 512);
            str += '&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnBlocks = ' + temp_temp + ');<br \>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnDimension = ' + loop_index_max + ';<br \>';
        }
        if (! (IsNumeric(loop_index_max)))
        {
            str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnBlockSize = 512;<br \>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnBlocks =' + loop_index_max + '/512;<br \>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;const unsigned int cnDimension = ' + loop_index_max + ';<br \>';
        }


        str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//create OpenCL device & context;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;cl_context hContext;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;hContext = clCreateContextFromType(0, CL_DEVICE_TYPE_GPU, <br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0, 0, 0);<br \>';

        str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//query all devices available to the context;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;size_t nContextDescriptorSize;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;clGetContextInfo(hContext, CL_CONTEXT_DEVICES,<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0, 0, &nContextDescriptorSize);<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;cl_device_id * aDevices = malloc(nContextDescriptorSize);<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;clGetContextInfo(hContext, CL_CONTEXT_DEVICES,<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nContextDescriptorSize, aDevices, 0);<br \>';

        str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//create a command queue;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;cl_command_queue hCmdQueue;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;hCmdQueue= clCreateCommandQueue(hContext, aDevices[0], 0, 0);<br \>';

        str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//create & compile program;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;cl_program hProgram;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;hProgram = clCreateProgramWithSource(hContext, 1, sProgramSource, 0, 0);<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;clBuildProgram(hProgram, 0, 0, 0, 0, 0);<br \>';

        str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//create kernel;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;cl_kernel hKernel;<br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;hKernel = clCreateKernel(hProgram, \"' + opencl_kernel_name + '\", 0);<br \>';

        flag = 0;
        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//allocate host memory;<br \>';
                }
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//allocate host memory;<br \>';
                }
            }
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;' + get_type(variables[i]) + ' * p' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ' = new ' + get_type(variables[i]) + '[cnDimension];<br \>';

            }
            if ((variables[i].value.toString().indexOf(',') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;' + get_type(variables[i]) + ' * p' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ' = new ' + get_type(variables[i]) + '[cnDimension];<br \>';

            }


        }


        flag = 0;
        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//initialize host memory;<br \>';
                }
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//initialize host memory;<br \>';
                }
            }
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;randomInit(p' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ', cnDimension);<br \>';

            }
            if ((variables[i].value.toString().indexOf(',') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;randomInit(p' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ', cnDimension);<br \>';

            }


        }

        flag = 0;
        flag1 = 0;
        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//allocate memory in device (GPU);<br \>';
                }
                str += '&nbsp;&nbsp;&nbsp;&nbsp;cl_mem' + ' hDeviceMem' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ';<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;hDeviceMem' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ' = ' + 'clCreateBuffer(hContext,<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CL_MEM_READ_WRITE | CL_MEM_COPY_HOST_PTR,<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cnDimension * sizeof(cl_' + get_type(variables[i]) + '),<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ',<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0);<br \>';
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//allocate device memory in device;<br \>';
                }
                str += '&nbsp;&nbsp;&nbsp;&nbsp;cl_mem' + ' hDeviceMem' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ';<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;hDeviceMem' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ' = ' + 'clCreateBuffer(hContext,<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CL_MEM_READ_WRITE | CL_MEM_COPY_HOST_PTR,<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cnDimension * sizeof(cl_' + get_type(variables[i]) + '),<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ',<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0);<br \>';
            }


        }

        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag1 == 0)
                {
                    flag1 = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//setup parameter values;<br \>';
                }
                //str+='&nbsp;&nbsp;&nbsp;&nbsp;double* d_'+get_variableName(variables[i]).slice(0,get_variableName(variables[i]).indexOf('['))+';<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;clSetKernelArg(hKernel, ' + i + ', sizeof(cl_mem), ' + '(void *) &hDeviceMem' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ');<br \>';
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag1 == 0)
                {
                    flag1 = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//setup parameter values;<br \>';
                }
                //str+='&nbsp;&nbsp;&nbsp;&nbsp;double* d_'+get_variableName(variables[i]).slice(0,get_variableName(variables[i]).indexOf('['))+';<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;clSetKernelArg(hKernel, ' + i + ', sizeof(cl_mem), ' + '(void *) &hDeviceMem' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ');<br \>';
            }


        }

        str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//execute kernel;<br \>';



        str += '&nbsp;&nbsp;&nbsp;&nbsp;clEnqueueNDRangeKernel(hCmdQueue, hKernel, 1, 0, <br \>';
        str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&cnDimension, 0, 0, 0, 0);<br \>';

        /*for(var i=0; i<variables.length; i=i+1)
		{					
			if((get_variableName(variables[i]).indexOf('[')>-1)&&(get_variableName(variables[i]).indexOf(']')>-1))
			{
				str+='d_'+get_variableName(variables[i]).slice(0,get_variableName(variables[i]).indexOf('['))+',';
			}
			if(variables[i].value.toString().indexOf(',')>-1)
			{
				str+='d_'+variables[i].value.toString().slice(0,variables[i].value.toString().indexOf(','))+',';
			}
		
		}*/

        flag = 0;
        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//copy results from device back to host;<br \>';
                }
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//copy results from device back to host;<br \>';
                }
            }
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                str += '&nbsp;&nbsp;&nbsp;&nbsp;clEnqueueReadBuffer(hContext, hDeviceMem' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ', CL_TRUE, 0,<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cnDimension * sizeof(cl_' + get_type(variables[i]) + '),<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ', 0, 0, 0);<br \>';
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;clEnqueueReadBuffer(hContext, hDeviceMem' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ', CL_TRUE, 0,<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cnDimension * sizeof(cl_' + get_type(variables[i]) + '),<br \>';
                str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ', 0, 0, 0);<br \>';
            }


        }

        flag = 0;
        for (var i = 0; i < variables.length; i = i + 1)
        {
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//free device memory;<br \>';
                }
            }
            if (variables[i].value.toString().indexOf(',') > -1)
            {
                if (flag == 0)
                {
                    flag = 1;
                    str += '<br \>&nbsp;&nbsp;&nbsp;&nbsp;//free device memory;<br \>';
                }
            }
            if ((get_variableName(variables[i]).indexOf('[') > -1) && (get_variableName(variables[i]).indexOf(']') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;clReleaseMemObj(hDeviceMem' + get_variableName(variables[i]).slice(0, get_variableName(variables[i]).indexOf('[')) + ');<br \>';

            }
            if ((variables[i].value.toString().indexOf(',') > -1))
            {

                str += '&nbsp;&nbsp;&nbsp;&nbsp;clReleaseMemObj(hDeviceMem' + variables[i].value.toString().slice(0, variables[i].value.toString().indexOf(',')) + ');<br \>';

            }


        }




    }
    else
    {
        if (cause == 'else')
        str = 'else';
        else
        str = 'if&nbsp;(' + cause + ')';
    }

    return str + '<br \>';
}


function Array_operation_cuda(ind_level, input_variable, output_variable, eq, operator, language)
/*Generate the basic operator or value assignment statement for array or scalar variables in code generation
ind_level: indent level (to format the code display)
input_variable: the array of the input variables for the operation or value assignment
output_varialbe: the array of the output variables for the operation or value assignment
eq: the equal symbol
operator: the operator to be generated
language: the target code generation
*/

 {
    var str = '';
    var isArrayOp = 0;
    var isComposedOp = 0;


    //alert('size:'+input_variable[0].size[0])
    for (var inputn = 0; inputn < input_variable.length; inputn++)
    {

        if (input_variable[inputn].size[0] != 1 || input_variable[inputn].dimension > 1)
        {


            isArrayOp = 1;
            var size_Array = new Array();
            size_Array = size_Array.concat(input_variable[inputn].size);
            dimension_Array = input_variable[inputn].dimension;
            if (input_variable[inputn].isComposed == 1)
            {
                isComposedOp = 1;
                break;
            }
        }
    }

    //alert('isarray:'+isArrayOp)

    if (isArrayOp == 1 && isComposedOp == 1 && (language == 'C' || language == 'C++'))
    {

        for (var index = 0; index < size_Array[0]; index++)
        {
            //alert('index:'+index)
            var input_variable_new = new Array();
            //input_variable_new=input_variable_new.concat(input_variable);
            for (var inputn = 0; inputn < input_variable.length; inputn++)
            {

                if (input_variable[inputn].size[0] != 1 || input_variable[inputn].dimension > 1)
                {


                    if (input_variable[inputn].size[0] != size_Array[0])
                    {

                        //alert('The sizes of multiple input does not match.'+input_variable[inputn].size[0]+'vs.'+size_Array[0])	
                        }
                    else
                    {
                        if (input_variable[inputn].isComposed == 1)
                        {
                            input_variable_new[inputn] = input_variable[inputn].subthings[index];
                        }
                        else
                        {
                            input_variable_new[inputn] = new read_thingClass(null);

                            input_variable_new[inputn].value[0] = input_variable[inputn].value[0] + '[' + index + ']';
                            input_variable_new[inputn].dimension = input_variable[inputn].dimension - 1;
                            if (input_variable_new[inputn].dimension > 0)
                            {
                                for (var size_ind = 0; size_ind < input_variable_new[inputn].dimension; size_ind++)
                                {
                                    input_variable_new[inputn].size[size_ind] = input_variable[inputn].size[size_ind + 1];
                                }
                            }
                            else
                            {
                                input_variable_new[inputn].size[0] = 1;
                            }

                        }

                    }

                }
                else
                {
                    input_variable_new[inputn] = input_variable[inputn];
                }

            }

            var output_variable_new = new Array();
            //output_variable_new=output_variable_new.concat(output_variable);
            output_variable_new[0] = new read_thingClass(null);

            if (size_Array[0] > 1)
            //TO remove the dimension whose size equals to 1
            {
                output_variable_new[0].value[0] = output_variable[0].value[0] + '[' + index + ']';
            }
            else
            {
                output_variable_new[0].value[0] = output_variable[0].value[0];
            }

            str += Array_operation(ind_level, input_variable_new, output_variable_new, eq, operator, language);

        }


    }
    else if (isArrayOp == 1 && isComposedOp == 0 && (language == 'C' || language == 'C++'))
    {
        var output = get_variableName(output_variable[0], language);
        //var input1=get_variableName(input_variable[0],language);
        //var input2=get_variableName(input_variable[1],language);
        var var_index = '';

        for (var dim = 0; dim < size_Array.length; dim++)
        {
            var index = output + '_index' + dim;
            if (size_Array[dim] != 1)
            {
                str += indent(ind_level) + 'for(int ' + index + '=0;' + index + '<' + size_Array[dim] + ';' + index + '++)<br />';
                ind_level += 1;
                var_index += '[' + index + ']';
            }
            else
            {
                continue;
            }
        }

        var input_value = new Array();

        for (var inputn = 0; inputn < input_variable.length; inputn++)
        {

            if (input_variable[inputn].size[0] != 1 || input_variable[inputn].dimension > 1)
            {

                if (input_variable[inputn].dimension != size_Array.length)
                {
                    alert('The sizes of multiple input does not match.');
                    break;
                }
                else
                {
                    var flag = 0;
                    for (var dim = 0; dim < size_Array.length; dim++)
                    {
                        if (input_variable[inputn].size[dim] != size_Array[dim])
                        {
                            alert('The sizes of multiple input does not match.');
                            flag = 1;
                            break;

                        }

                    }
                    if (flag == 0)
                    {
                        input_value[inputn] = input_variable[inputn].value[0] + var_index;

                    }
                }

            }
            else
            {
                input_value[inputn] = input_variable[inputn].value[0];
            }

        }

        var output_value = output_variable[0].value[0] + var_index;


        str += indent(ind_level - 1) + '{<br />';
        if (operator == 'Equal')
        {
            str += indent(ind_level) + output_value + eq + input_value[0];
        }
        else
        {
            str += indent(ind_level) + output_value + eq + input_value[0] + ' ' + operator + ' ' + input_value[1] + ';<br />';
        }
        str += indent(ind_level - 1) + '}<br />';

    }
    else
    {
        if (operator == 'Equal')
        {
            //str+=indent(ind_level)+get_variableName(output_variable[0],language)+eq+get_variableName(input_variable[0],language)+';<br />';	
            /***********Replace by Fangming He 2011-04-06**************/
            //alert('output_variable[0]='+output_variable[0]);//fangming test 2011-04-06;
            if (language == 'Matlab')
            {
                //alert('str='+str);//fangming test 2011-04-07
                str += indent(ind_level);
                var flag = 0;
                //alert('getinput_variableName='+get_variableName(input_variable[0],language));//fangming test 2011-04-07
                //alert('getoutput_variableName='+get_variableName(output_variable[0],language));//fangming test 2011-04-07
                for (var i = 0; i < point_list.length; i++) {
                    //alert('point_list='+point_list[i]);//fangming test 2011-04-07
                    //alert('input_variables[0]='+input_variables[0]);//fangming test 2011-04-07
                    //if((get_variableName(input_variable[0],language)==point_list[i]) || (input_variables[0].indexOf('&')>0))
                    if ((get_variableName(input_variable[0], language) == point_list[i]))
                    {
                        //alert('--');//fangming test 2011-04-07
                        str += get_variableName(output_variable[0], language) + '.address =' + point_list[i] + '.address;<br />';
                        str += indent(ind_level);
                        str += get_variableName(output_variable[0], language) + '.value =' + point_list[i] + '.value;<br />';
                        flag = 1;
                        continue;
                    }
                }
                for (var i = 0; i < point_list.length; i++) {
                    //alert('point_list='+point_list[i]);//fangming test 2011-04-07
                    if ((flag == 0) && (get_variableName(output_variable[0], language).slice(1) == point_list[i]))
                    {
                        //alert('++');//fangming test 2011-04-07
                        str += point_list[i] + '.value =' + get_variableName(input_variable[0], language).slice(1) + '.value' + ';<br />';
                        flag = 1;
                        continue;
                    }
                }
                if (flag == 0)
                {
                    //alert('-+-+');//fangming test 2011-04-07
                    str += get_variableName(output_variable[0], language) + eq + get_variableName(input_variable[0], language) + ';<br />';
                }
                point_list = new Array;
            }
            else
            {
                //alert('+-+-');//fangming test 2011-04-07
                str += indent(ind_level) + get_variableName(output_variable[0], language) + eq + get_variableName(input_variable[0], language) + ';<br />';
            }
            /*********************************************************/

        }
        else
        // This is changed by Ning Han to include b=~d with only sigle input.
        {
            if (operator == '!' || operator == '~')
            str += indent(ind_level) + get_variableName(output_variable[0], language) + eq + ' ' + operator + ' ' + get_variableName(input_variable[0], language) + ';<br />';
            else
            str += indent(ind_level) + get_variableName(output_variable[0], language) + eq + get_variableName(input_variable[0], language) + ' ' + operator + ' ' + get_variableName(input_variable[1], language) + ';<br />';
        }
    }



    return str;


}


function search_varDec_cuda(path)
/* Search all the variables to be declared in a path for code generation
path: the path node*/
 {
    var place = path.childNodes;
    var variables_declaration = new Array();
    var dec_num = 0;
    var str_declare = '';



    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);



    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;

        var variables = new Array();


        if (place_name == "Declaration")
        {
            //variables[0]=new read_thingClass(place[l].childNodes[0]);
            if (language == "C++")
            variables[0] = new read_thingClasscpp(place[l].childNodes[0], typeFlag);
            else
            variables[0] = new read_thingClass(place[l].childNodes[0]);
        }

        if (place_name == 'Input')
        //place_name=="Input" || place_name=="Output")
        {
            /*var variable_temp=read_variables(place[l]);
			for (var i=0;i<variable_temp.length;i=i+1)
			{		
				var value_temp=variable_temp[i].value.toString();
				if((!IsNumeric(value_temp))&&(value_temp.indexOf(',')==-1))
					variables=variables.concat(variable_temp[i]);
			}*/
            variables = read_variables(place[l]);

        }


        if (place_name == 'Output')
        //place_name=="Input" || place_name=="Output")
        {
            variables = read_variables(place[l]);
        }

        if (place[l].nodeName == "Cause")
        {
            var path_cause = place[l].childNodes;
            for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
            {
                variables = variables.concat(search_varDec_cuda(path_cause[pathindex_cause]));
            }
        }




        for (var p = 0; p < variables.length; p++)
        {
            var flag_exist = 0;


            if (variables[p].isElement == 1)
            {
                var var_name1 = variables[p].value[0];
                var var_size = variables[p].value[1];
            }
            else
            var var_name1 = variables[p].value[0];




            for (var ss = 0; ss < path_input_variable.length; ss++)
            {
                //if(path_input_variable[ss].isElement==1)
                //	var var_name2=path_input_variable[ss].value[0];
                //else
                if (path_input_variable[ss] != '')
                {
                    var var_name2 = path_input_variable[ss].value[0];

                    if (var_name1 == var_name2 || var_name1 == var_name2.slice(var_name2.indexOf('*') + 1))
                    {
                        flag_exist = 1;
                        break;
                    }
                }

            }

            if (flag_exist == 0)
            {
                //alert('dec_num:'+dec_num)
                for (var ind = 0; ind < dec_num; ind++)
                {


                    //	alert('abc:'+variables_declaration[ind].value)
                    //	alert('var_name1:'+var_name1);
                    var var_name2 = variables_declaration[ind].value[0];

                    if (var_name1 == var_name2 || var_name1 == var_name2.slice(var_name2.indexOf('*') + 1))
                    {
                        flag_exist = 1;
                        break;
                    }
                }

            }


            if (flag_exist == 0)
            {
                variables_declaration[dec_num] = variables[p];

                if (variables[p].isElement == 1)
                {

                    variables_declaration[dec_num].value[0] = var_name1;
                    variables_declaration[dec_num].size[0] = var_size;

                }
                variables_declaration[dec_num].isElement = 0;



                dec_num += 1;
            }
        }

    }

    return variables_declaration;
}

function search_varDec_opencl(path)
/* Search all the variables to be declared in a path for code generation
path: the path node*/
 {
    var place = path.childNodes;
    var variables_declaration = new Array();
    var dec_num = 0;
    var str_declare = '';



    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);



    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;

        var variables = new Array();


        if (place_name == "Declaration")
        {
            //variables[0]=new read_thingClass(place[l].childNodes[0]);
            if (language == "C++")
            variables[0] = new read_thingClasscpp(place[l].childNodes[0], typeFlag);
            else
            variables[0] = new read_thingClass(place[l].childNodes[0]);
        }

        if (place_name == 'Input')
        //place_name=="Input" || place_name=="Output")
        {
            /*var variable_temp=read_variables(place[l]);
			for (var i=0;i<variable_temp.length;i=i+1)
			{		
				var value_temp=variable_temp[i].value.toString();
				if((!IsNumeric(value_temp))&&(value_temp.indexOf(',')==-1))
					variables=variables.concat(variable_temp[i]);
			}*/
            variables = read_variables(place[l]);

        }


        if (place_name == 'Output')
        //place_name=="Input" || place_name=="Output")
        {
            variables = read_variables(place[l]);
        }

        if (place[l].nodeName == "Cause")
        {
            var path_cause = place[l].childNodes;
            for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
            {
                variables = variables.concat(search_varDec_opencl(path_cause[pathindex_cause]));
            }
        }




        for (var p = 0; p < variables.length; p++)
        {
            var flag_exist = 0;


            if (variables[p].isElement == 1)
            {
                var var_name1 = variables[p].value[0];
                var var_size = variables[p].value[1];
            }
            else
            var var_name1 = variables[p].value[0];




            for (var ss = 0; ss < path_input_variable.length; ss++)
            {
                //if(path_input_variable[ss].isElement==1)
                //	var var_name2=path_input_variable[ss].value[0];
                //else
                if (path_input_variable[ss] != '')
                {
                    var var_name2 = path_input_variable[ss].value[0];

                    if (var_name1 == var_name2 || var_name1 == var_name2.slice(var_name2.indexOf('*') + 1))
                    {
                        flag_exist = 1;
                        break;
                    }
                }

            }

            if (flag_exist == 0)
            {
                //alert('dec_num:'+dec_num)
                for (var ind = 0; ind < dec_num; ind++)
                {


                    //	alert('abc:'+variables_declaration[ind].value)
                    //	alert('var_name1:'+var_name1);
                    var var_name2 = variables_declaration[ind].value[0];

                    if (var_name1 == var_name2 || var_name1 == var_name2.slice(var_name2.indexOf('*') + 1))
                    {
                        flag_exist = 1;
                        break;
                    }
                }

            }


            if (flag_exist == 0)
            {
                variables_declaration[dec_num] = variables[p];

                if (variables[p].isElement == 1)
                {

                    variables_declaration[dec_num].value[0] = var_name1;
                    variables_declaration[dec_num].size[0] = var_size;

                }
                variables_declaration[dec_num].isElement = 0;



                dec_num += 1;
            }
        }

    }

    return variables_declaration;
}


function toInteger(floatingVariable, wordLength, fractionLength)
 {
    var scaleFactor = Math.pow(2, fractionLength);
    var fixedVariable = floatingVariable * scaleFactor;
    fixedVariable = Math.floor(fixedVariable);
    //fixedVariable = fixedVariable/(Math.pow(2,fractionLength));
    return fixedVariable;
}

function getFixedWordlength(wordLength)
 {
    //alert(XMLCode);
    wordLengthGlobal = parseInt(wordLength);
}

function getFixedFractionLength(fractionLength)
 {
    //alert(XMLCode);
    fractionLengthGlobal = parseInt(fractionLength);
}


var DefaultType = 'double';
// Global variable; This is used to be the default type of the variables whose type is not specified and cannot be inferenced in the source code

function insertString(output, str)
/* This function is used to append a sub-string to a string;
 output: the string to be returned;
  str: the sub-string to be appended to output.
 */
 {
    output = output + str;
    return output;
}

function Display_txt_html(myField, output)
/*This function is used to display html-style text in a field; 
myField: the id of the field; 
output: the html code (html-style text)*/
 {
    myField.innerHTML = output;
    return false;
}


function load_XML(xml_code) {
    /* load the xml code into a xml parser.
 xml_code: the xml code to be parsed.*/
    var xmlDoc;
    // code for IE
    if (window.ActiveXObject)
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");

        xmlDoc.async = false;
        xmlDoc.loadXML(xml_code);
    }
    // code for Mozilla, Firefox, Opera, etc.
    else
    //if (document.implementation && document.implementation.createDocument)
    {

        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(xml_code, "text/xml");
    }
    //else
    //{
    //	alert('Your browser cannot handle this script');
    //}
    return xmlDoc;
}

function Display_XML(myField, xml_code)
/* Display XML code using defaultss.xsl; 
Notice this function can only be run when the file defaultss.xsl is at the server side; 
To be modified so that it can support local style file;
myField: The filed id that will display the xml
xml_code: the xml code*/
 {
    myField.style.display = '';
    var xhttp = false;
    /* running locally on IE5.5, IE6, IE7 */
    ///*; @cc_on
    if (location.protocol == "file:") {
        if (!xhttp) try {
            xhttp = new ActiveXObject("MSXML2.XMLHTTP");
        } catch(e) {
            xhttp = false;
        }
        if (!xhttp) try {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch(e) {
            xhttp = false;
        }
    }
    //; @cc_off @*/
    /* IE7, Firefox, Safari, Opera...  */
    if (!xhttp) try {
        xhttp = new XMLHttpRequest();
    } catch(e) {
        xhttp = false;
    }
    /* IE6 */
    if (typeof ActiveXObject != "undefined")
    {
        if (!xhttp) try {
            xhttp = new ActiveXObject("MSXML2.XMLHTTP");
        } catch(e) {
            xhttp = false;
        }
        if (!xhttp) try {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch(e) {
            xhttp = false;
        }
    }
    /* IceBrowser */
    if (!xhttp) try {
        xhttp = createRequest();
    } catch(e) {
        xhttp = false;
    }

    if (!xhttp) alert("Your browser doesn't seem to support xhttpRequests.");
    xhttp.open("GET", "defaultss.xsl", true);
    //make sure open appears before onreadystatechange lest IE will encounter issues beyond the first request
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState != 4) return;
        if (!xhttp.status || xhttp.status == 200)
        {
            //alert(xhttp.responseText);
            var xmlDoc = load_XML(xml_code);
            var xslDoc = xhttp.responseXML;
            xmlDoc.async = false;
            xslDoc.async = false;
            // code for IE
            if (window.ActiveXObject)
            {
                var objXML = xmlDoc.transformNode(xslDoc);
            }
            // code for Mozilla, Firefox, Opera, etc.
            else if (document.implementation && document.implementation.createDocument)
            {
                var xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xslDoc);
                var objXML = xsltProcessor.transformToFragment(xmlDoc, document);
            }


            myField.innerHTML = '<div>&nbsp;</div>' + objXML;

        }
        else
        alert("Request failed!");
    };
    //onreadystatechange
    xhttp.send(null);
    xml_input.style.display = 'none';
    return false;
}

function deleteblank(str)
/*delete blanks at the beginning and end of the string
 str: a string*/
 {

    var i = 0;
    while (str.charAt(i) == " ")
    {
        str = str.slice(1);
        i = 0;
    }
    i = str.length;
    while (str.charAt(str.length - 1) == " ")
    {
        str = str.slice(0, str.length - 1);
        i = str.length;
    }
    return str;

}

function xmlformat(str)
/* Format the xml code to delete special characters not supported by XML parser;
 str: the XML code*/
 {
    str = str.replace(/\n/g, "");
    str = str.replace(/\r/g, "");
    str = deleteblank(str);

    var xml = "";

    while (str != "")
    {
        xml += str.slice(str.indexOf("<"), str.indexOf(">") + 1);
        str = str.slice(str.indexOf(">") + 1);
        var a = str.slice(0, str.indexOf("<"));
        str = str.slice(str.indexOf("<"));
        var b = str.slice(str.indexOf("<"), str.indexOf(">") + 1);
        if (b.indexOf("/") > 0)
        {
            a = deleteblank(a);
            xml += a;
        }
    }

    xml = deleteblank(xml);
    xml = xml.replace(/&&/g, 'LAND');
    // changed by Ning Han
    return xml;
}

function indent(n)
/* Return a string with 4n html blanks (&nbsp;) for indent*/
 {
    var i = 0;
    str = '';
    for (i = 0; i < n; i++){
        str = str + "&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    return str;
}

//VHDL parts of following functions are contributed by Jie Li
// f_end
// creat_function
// call_func
// Folowwing functions are added by Jie
//creat_entity: to generate entity in VHDL

function get_arch_entity(path_name)
/* get the name of the architecture and entity from the name of the path in the XML code; 
path_name: the name of the path.*/
 {
    var v_arch_ent = new Array();
    if (path_name.indexOf('VHDL_Architecture') == 0)
    {
        var arch_entity = path_name.slice(18);
        var arch_name = arch_entity.slice(0, arch_entity.indexOf('_'));
        var entity_name = arch_entity.slice(arch_entity.indexOf('_') + 1);
    }
    else
    {
        var arch_name = path_name;
        var entity_name = path_name;
    }
    v_arch_ent[0] = arch_name;
    v_arch_ent[1] = entity_name;
    return v_arch_ent;
}

function f_end(language, keyword)
/* generate end statement for different languages; 
language: the language used in the target code, e.g., 'Matlab', 'C', 'C++' or 'VHDL'; 
keyword: the keyword that the end is matched to; 
The keyword paramater is just for some language need statements like "end keyword', e.g., 'end if'.*/
 {
    //================Matlab=====================//
    if (language == 'Matlab')
    str = 'end <br \>';

    //==================C/C++===========================//
    else if (language == 'C' | language == 'C++')
    str = '} <br \>';

    //=================VHDL===========================//
    else if (language == 'VHDL')
    {
        v_arch_entity = get_arch_entity(keyword);
        str = '<br \>end ' + v_arch_entity[0] + '; <br \>';
        //alert(str);
    }

    ////////////////////////////////////////////////////
    return str;
}

function creat_entity(input, output, entity_name)
/* Creat the entity statements in VHDL code generation
input: the vector of input variables
output: the vector of output variables
entity_name: the name of the entity*/
 {
    var inputn = input.length;
    var outputn = output.length;


    var i = 0;
    var varialbe = '';
    var type = '';



    var str = 'entity ' + entity_name + ' is <br \>' + 'port ( <br \>';

    for (i = 0; i < inputn; i++)
    {
        if (input[i].isComposed == 0)
        {
            variable = get_variableName(input[i], language);
            if (input[i].size[0] > 1)
            {
                var ini_index = parseInt(input[i].size[0]) - 1;
                var end_index = 0;
                str = str + variable + ' : ' + 'in std_logic_vector (' + ini_index + ' downto ' + end_index + '); <br \>';
            }
            else
            str = str + variable + ' : ' + 'in std_logic; <br \>';
        }
        else
        {
            //alert('No composed vector in VHDL entity definition');
            str = str + '<div style=\"color:red\">' + 'No composed vector in VHDL entity definition' + '</div><br \>'
        }
    }

    for (i = 0; i < outputn; i++)
    {
        variable = get_variableName(output[i], language);
        if (output[i].size[0] > 1)
        {
            var ini_index = parseInt(input[i].size[0]) - 1;
            var end_index = 0;
            str = str + variable + ' : ' + 'out std_logic_vector (' + ini_index + ' downto ' + end_index + '); <br \>';
        }
        else
        str = str + variable + ' : ' + 'out std_logic; <br \>';
        if (i == outputn - 1)
        str = str + ')<br />end entity; <br \>';

    }

    str = str + '<br />';
    return str;
}

function creat_func(input, output, func_name, class_name, language)

// Create the head of the function definition in code generation (Architecture definition in VHDL),
//including the funcition name and declaration of input and output variables
// input: a vector of input variables
// output: a vector of output variables
// func_name: the name of the function
// class_name: the name of class if the target language is C++, the name of entity if the target language is VHDL
// language: the target code language
/****************************************************************/
 {
	console.log("create func header");
	console.log(input);
	console.log(output);
    var inputn = input.length;
    var outputn = output.length;

    var i = 0;
    var str = '';
    var varialbe = '';
    var type = '';
    //Add function head: function name and output variables (if they are in front of the function name)
    //===================Matlab==========================//
    if (language == 'Matlab')
    {
        type = '';
        str = 'function&nbsp;'

        if (outputn == 1)
        {

            variable = get_variableName(output[0], language);
            str = str + variable + '=' + func_name + '(';
        }
        else
        {
            str = str + '[';
            for (i = 0; i < outputn; i++)
            {
                variable = get_variableName(output[i], language);
                str = str + variable;

                if (i < outputn - 1)
                str = str + ',';
            }
            str = str + ']=' + func_name + '(';

        }
    }

    //=====================C===============================//				
    if (language == 'C')
    {
        if (outputn == 1)
        {
            type = get_type(output[0]);
            if (type == undefined){
				type = 'void';}
        }
		else if(outputn == 0){
			type = 'void';
		}
        else
        {
            type = get_type(output[0]);
            if (type == undefined){
				type = 'void';}

            str += '<div style=\"color:red\">' + '//Warning: no support for multiple output in C. So we have omitted some output variables.*/' + '</div><br \>'
            //alert('no support for multiple output in C')
        }
        str = str + type + '&nbsp;' + func_name + '(';
		
    }

    //=====================C++===========================//
    if (language == 'C++')
    {
        if (outputn == 1)
        {
            type = get_type(output[0]);
            if (type == undefined)
            type = 'void';

        }
        else
        {
            //alert('no support for multiple output in C++')
            type = get_type(output[0]);
            if (type == undefined)
            type = 'void';
            str += '<div style=\"color:red\">' + '//Warning: no support for multiple output in C++. So we have omitted some output variables.*/' + '</div><br \>'
        }
        if (class_name == '')
        str = type + '&nbsp;' + func_name + '(';
        else
        str = type + '&nbsp;' + class_name + '&nbsp;::&nbsp;' + func_name + '(';
    }

    //===================VHDL==============================//
    if (language == 'VHDL')
    {
        type = '';
        var path_name = func_name;
        var v_arch_ent = get_arch_entity(path_name);
        var arch_name = v_arch_ent[0];
        var entity_name = v_arch_ent[1];

        str = creat_entity(input, output, entity_name);
        //Need to add some code to avoid repeating definition of entities
        str += 'architecture ' + arch_name + ' of ' + entity_name + ' is <br />';
    }

    //Add input variables

    for (i = 0; i < inputn; i++)
    {

        //=================Matlab================================//
        if (language == 'Matlab')
        {
            variable = get_variableName(input[i], language);
            if (i < inputn - 1)
            variable = variable + ',';
            str = str + variable;
        }

        //=============================C/C++=====================//
        if ((language == 'C' || language == 'C++') && input[i] != '')
        {


            variable = declare(input[i], language);
            //get_type(input[i])+'&nbsp;'+get_variableName(input[i],language);
            variable = variable.replace('&nbsp;', ' ');
            variable = variable.slice(0, variable.indexOf(';'));
            if (i < inputn - 1)
            variable = variable + ',';
            str = str + variable;

        }

    }



    if (language == 'Matlab')
    {
        str = str + ')';
        str = str + '<br />';
    }
    if (language == 'C' || language == 'C++')
    {
        str = str + ')';
        str = str + '&nbsp;{<br />'
    }

    return str;
}

function declare_func(input, output, func_name, class_name, language)
/* Generate the function declaration statement;
In VHDL, This is component declaration;
We do not add function declaration in C/C++ in current re-hosting demo, need to be added later
input: the vector of input variables
output: the vector of output variables
func_name: the name of the function
class_name: the name of class if the target language is C++, the name of entity if the target language is VHDL; no use for other languages
language: the target code language
*/
 {
    var outputn = output.length;
    var inputn = input.length;
    var str = '';

    if (language == 'VHDL')
    {
        var type = '';
        var path_name = func_name;
        var v_arch_ent = get_arch_entity(path_name);
        var arch_name = v_arch_ent[0];
        var entity_name = v_arch_ent[1];

        str = 'component ' + func_name + ' is <br \>' + 'port ( <br \>';

        for (var i = 0; i < inputn; i++)
        {
            var variable = split_variable(input[i]);
            str = str + variable + ' : ' + 'in std_logic; <br \>';
        }
        for (var i = 0; i < outputn; i++)
        {
            variable = split_variable(output[i]);
            if (i < outputn - 1)
            str = str + variable + ' : ' + 'out std_logic; <br \>';
            else
            str = str + variable + ' : ' + 'out std_logic <br \>' + '); <br \>' + 'end component ; <br \>';
        }



    }
    return str;
}

function call_func(input, output, func_name, obj_name, language)
/* Generate the function call statement;
input: the vector of input variables
output: the vector of output variables
func_name: the name of the function
obj_name: the name of object if the target language is C++, the name of entity if the target language is VHDL; no use for other languages
language: the target code language
*/

 {
    var inputn = input.length;
    var outputn = output.length;
    var i = 0;
    if (language == 'Matlab')
    {
        if (outputn == 0)
        {
            str = func_name + '(';
        }
        else if (outputn == 1)
        {

            //str=get_variableName(output[0],language)+'='+func_name+'(';
            // add by liu Apr.05.2011. 11AM
            str = get_variableName(output[0], language) + '=' + func_name + '(';


        }

        else
        {
            str = '[';
            for (i = 0; i < outputn; i++)
            {
                str = str + get_variableName(output[i], language);
                if (i < outputn - 1)
                str = str + ',';
            }
            str = str + ']=' + func_name + '(';
        }

        for (i = 0; i < inputn; i++)
        {

            str = str + get_variableName(input[i], language);
            if (i < inputn - 1)
            str = str + ',';
        }

        str = str + ');<br \>';
    }
    if (language == 'C')
    {
        if (outputn == 0)
        {
            str = func_name + '(';
        }
        else if (outputn == 1)
        str = get_variableName(output[0], language) + '=' + func_name + '(';
        else
        {
            //alert('no multiple output in C/C++');
            str = '<div style=\"color:red\">' + '//Warning: no support for multiple output in C++. So we have omitted some output variables.*/' + '</div><br \>'
            str += get_variableName(output[0], language) + '=' + func_name + '(';
        }

        for (i = 0; i < inputn; i++)
        {
            str = str + get_variableName(input[i], language);
            if (i < inputn - 1)
            str = str + ',';
        }

        str = str + ');<br \>';
    }
    if (language == 'C++')
    {
        if (outputn == 0)
        {
            //add by liu Apr11.2011 5PM
            if (obj_name == "")
            str = func_name + '(';
            else
            str = obj_name + '.' + func_name + '(';

            //end by liu Apr11.2011 5PM
        }
        else if (outputn == 1)
        // add by liu Apr09.2011. 6PM
        if (obj_name == "")
        str = get_variableName(output[0], language) + '=' + func_name + '(';
        else
        str = get_variableName(output[0], language) + '=' + obj_name + '.' + func_name + '(';
        // end by liu Apr09.2011. 6PM
        else
        {
            //alert('no multiple output in C/C++');
            str = '<div style=\"color:red\">' + '//Warning: no support for multiple output in C++. So we have omitted some output variables.*/' + '</div><br \>';
            str += get_variableName(output[0], language) + '=' + obj_name + '.' + func_name + '(';


        }

        for (i = 0; i < inputn; i++)
        {
            str = str + get_variableName(input[i], language);
            if (i < inputn - 1)
            str = str + ',';
        }

        str = str + ');<br \>';
    }



    if (language == 'VHDL')
    {


        str = func_name + ' : ' + obj_name + '<br \>' + ' port map ( <br \>';
        for (var i = 0; i < inputn; i++)
        {

            str = str + get_variableName(input[i], language) + ', <br \>';
            //if(i<inputn-1)
            //	str=str+', <br \>';
        }

        for (var i = 0; i < outputn; i++)
        {
            if (i < outputn - 1)
            str = str + get_variableName(output[i], language) + ', <br \>';
            else
            str = str + get_variableName(output[i], language) + ' <br \>';
        }
        str = str + '); <br \> <br \>';
    }


    return str;

}

function declare(variable, language)
/* Generate the variable declaration statement
variable: name of the variable (the type of variable may be included, e.g., int i)
language: the target language
*/
 {

    var type = get_type(variable);
    var variable_name = get_variableName(variable, language);



    if (language == 'C' || language == 'C++')
    {
        var str = type + '&nbsp;' + variable_name;

        if (variable.dimension > 1 || variable.size[0] != 1)
        {

            for (var dim = 0; dim < variable.dimension; dim++)
            {
                if (IsNumeric(variable.size[dim]))
                {
                    if (parseInt(variable.size[dim]) != 1)
                    //to remove the dimension whose size is 1
                    str = str + '[' + variable.size[dim] + ']';
                }
                else
                str = str + '[' + ']';
            }
        }
        str += ';<br \>';

    }
    if (language == 'VHDL')
    {
        var size = parseInt(variable.size[0]);
        var str = 'signal ' + variable_name + ': std_logic';
        if (size > 1)
        {
            var ini_index = size - 1;

            str += '_vector(' + ini_index + ' downto 0)';
        }
        str += ';'

    }

    return str;
}

function declare_all(variables, ind_level)
/* Generate the variable declaration statement for multiple variables
variables: the vector of variables (the type of variable may be included, e.g., int i)
ind_level: the indent level (to format the display of the code)
*/
 {

    var i = 0;
    var str = '';

    for (i = 0; i < variables.length; i++)
    {
        str += declare(variables[i], 'C')
    }
    return str;
}

function return_out(variable)
/* Generate the return statement in code generation
variable: the variable to be returned
*/
 {
    str = 'return(' + variable + ');<br\>';
    return str;
}

function creat_cause(cause, language, type)
/*creat the control statement, including selection control (if) statement and loop (while) statement in code generation
cause: the condition in the cause
language: the target code lauguage
type: selection (once) or loop
*/

 {
    var str = '';
    if (language == 'VHDL' && cause.indexOf('VHDL_Process') == 0)
    {
        //str='begin<br \>'
        cause = cause.slice(13);
        str = str + 'process (' + cause + ')<br \>';
        str = str + 'begin<br \>';
        //str=str+split_variable(output[0])+'<='+split_variable(input[0])+ ' '+ func_name+' ' + split_variable(input[1])+';<br \>';
        //str=str+'end process;<br \><br \>';
        return str;
    }
    else if (type == 'loop')
    str = 'while&nbsp;(' + cause + ')';
    else
    {
        if (cause == 'else')
        str = 'else';
        else
        str = 'if&nbsp;(' + cause + ')';
    }
    if (language == 'Matlab')
    str = str + '<br \>';
    if (language == 'C' || language == 'C++')
    str = str + '&nbsp;{<br \>';
    return str;
}

function creat_class(class_name, private_v, public_v, work_input, work_output)
/*creat the class definition in C++ code generation
class_name: the name of the class
private_v: the vector of private variables
public_v: the vector of public variables
work_input: the vector of input variables for work function in the class
work_output: the vector of output variables for work function in the class
*/

 {

    var type = get_type(work_output[0]);
    type = type + '&nbsp;'
    var i = 0;
    var str = '';
    str = str + 'Class&nbsp;' + class_name + '&nbsp;{ <br \> ';
    str = str + indent(1) + "Private:" + " <br \> ";
    for (i = 0; i < private_v.length; i++)
    {
        str = str + indent(1) + declare(private_v[i]);
    }

    str = str + indent(1) + "Public:" + " <br \> ";
    for (i = 0; i < public_v.length; i++)
    {
        str = str + indent(1) + declare(public_v[i]);
    }

    str = str + indent(1) + type + "work(";
    for (i = 0; i < work_input.length; i++)
    {
        str = str + type + work_input[i];
        if (i < work_input.length - 1)
        str = str + ',';
    }
    str = str + ');<br \>';
    str = str + '}<br \><br \>';
    return str;

}

function creat_object(class_name, obj_name)
/*creat the object declaration statement in C++ code generation
class_name: the name of the class
obj_name: the name of the object
*/
 {
    var str = class_name + '&nbsp;' + obj_name + ';<br \>';
    return str;
}

function read_thingClass(thingNode)
/*Read the thing Node to get all the attributes of a thing (variable/constant/value)
thingNode: the thing Node in XML
this.size: the size of the thing
this.value: the value of the thing
this.type: the type of the thing
this.dimension: the dimension of the thing
this.isComposed: The thing is composed by several other things or not, e.g., for [1,2], isComposed==1, for a variable "a", isComposed=0 
this.isElement: The thing is an element of an array or not
this.isPointer: The thing is a pointer or not
*/
 {
    this.size = new Array();
    this.value = new Array();

    if (thingNode == null)
    {
        this.value[0] = 'Empty';
        //Value of a number or name of a variable
        this.type = '';
        //type of a variable
        this.size[0] = 1;
        //size of a vector,5,3
        this.dimension = 0;
        // dimension of the vector
        this.isComposed = 0;
        // The variable is composed by several variables or values or not, e.g. [a,b]
        this.isElement = 0;
        //The variable is an element of a vector or not
        this.isPointer = 0;
        //The variable is not a pointer
    }
    else
    {

        if (thingNode.childNodes[0].nodeValue != null)
        //a simple variable or value
        {
			context = thingNode.childNodes[0].nodeValue.split(" ");
			this.value[0] = context.pop();
            //this.value[0] = thingNode.childNodes[0].nodeValue;
            //Value of a number or name of a variable
            this.type = context.join(" ");
            //type of a variable
            this.size[0] = 1;
            //size of a vector,5,3
            this.dimension = 0;
            // dimension of the vector
            this.isComposed = 0;
            // The variable is composed by several variables or values or not, e.g. [a,b]
            this.isElement = 0;
			this.isPointer = 0;
            //The variable is an element of a vector or not
			if (this.value[0].match(/\*/)){
				console.log(this.value[0]);
				this.isPointer = 1;
				this.dimension = 1;
			}
            
            //The variable is not a pointer
			

        }
        else
        {
            var variable = thingNode.attributes.getNamedItem('name');
            var placeNode = thingNode.childNodes;

            if (placeNode[placeNode.length - 1].attributes.getNamedItem('name').value == 'type')
            {
                var variableType = placeNode[placeNode.length - 1].childNodes[0].childNodes[0].nodeValue;

                if (placeNode.length > 1 && placeNode[placeNode.length - 2].attributes.getNamedItem('name').value == 'size')
                var variableSize = placeNode[placeNode.length - 2].childNodes[0].childNodes[0].nodeValue;
                else
                var variableSize = '1';
            }

            else
            {
                var variableType = '';
                if (placeNode[placeNode.length - 1].attributes.getNamedItem('name').value == 'size')
                var variableSize = placeNode[placeNode.length - 1].childNodes[0].childNodes[0].nodeValue;
                else
                var variableSize = '1';
            }

            this.type = variableType;


            if (variable != undefined)
            //named composed variable, may be vector variable
            {

                this.isComposed = 0;
                this.isElement = 0;


                if (variableSize.indexOf(',') == -1)
                {

                    this.size[0] = variableSize;
                    this.dimension = 1;
                }
                else
                {

                    this.dimension = 0;
                    var size_index = 0;
                    while (variableSize.indexOf(',') > -1)
                    {
                        this.size[size_index] = variableSize.slice(0, variableSize.indexOf(','));
                        variableSize = variableSize.slice(variableSize.indexOf(',') + 1);
                        size_index += 1;
                        this.dimension += 1;
                    }
                    this.size[size_index] = variableSize;
                    this.dimension += 1;
                }

                if (variable.value.indexOf('*') == 0)
                {

                    this.isPointer = 1;
                    this.value[0] = variable.value;
                    this.value[1] = 'value';

                }
                else
                {

                    this.value[0] = variable.value;

                    this.isPointer = 0;
                }

            }

            else
            //anonymous composed thing, which maybe vector or element of vector
            {

                variableSize = parseInt(variableSize);
                if (placeNode[0].childNodes[0].nodeName == 'Thing' && placeNode[0].attributes.getNamedItem('name').value == '0' && placeNode[0].childNodes[1].childNodes[0].nodeValue == 'SET')
                {
                    this.isElement = 0;
                    this.isPointer = 0;

                    var Sub_thingNode = placeNode[0].childNodes[0];

                    var Sub_thing = new read_thingClass(Sub_thingNode);
                    this.subthings = new Array();
                    this.subthings[0] = Sub_thing;

                    this.type = Sub_thing.type;
                    if (Sub_thing.isComposed == 0 && variableSize == 1)
                    {
                        this.value[0] = Sub_thing.value[0];
                        this.dimension = 1;
                        this.size[0] = 1;
                        this.isComposed = 0;
                    }
                    else
                    {

                        this.size[0] = variableSize;
                        this.size = this.size.concat(Sub_thing.size);

                        this.isComposed = 1;
                        this.dimension = Sub_thing.dimension + 1;


                        this.value[0] = Sub_thing.value;

                        for (var i = 1; i < variableSize; i++)
                        {

                            if (placeNode[i].childNodes[1].childNodes[0].nodeValue == 'SET')
                            {

                                var Sub_thingNode = placeNode[i].childNodes[0];

                                if (Sub_thingNode.nodeName == 'Thing')
                                {
                                    var Sub_thing = new read_thingClass(Sub_thingNode);
                                    this.subthings[i] = Sub_thing;
                                    this.value[i] = Sub_thing.value;
                                }
                                else
                                alert('This is not a Thing node')
                            }
                            else if (placeNode[i].childNodes[1].childNodes[0].nodeValue == 'INCREMENT')
                            {
                                var Sub_thingNode = placeNode[i].childNodes[0];
                                var region = placeNode[i].attributes.getNamedItem('name').value;

                                var ini_value = parseInt(region.slice(0, region.indexOf('~')));
                                var end_value = parseInt(region.slice(region.indexOf('~') + 1));


                                if (Sub_thingNode.nodeName == 'Thing')
                                {
                                    var Sub_thing = new read_thingClass(Sub_thingNode);
                                    for (k = ini_value; k < end_value; k++)
                                    {
                                        this.value[i + k - 1] = parseInt(this.value[i + k - 2]) + parseInt(Sub_thing.value[0]) + '';
                                        this.subthings[i + k - 1] = new read_thingClass(null);
                                        this.subthings[i + k - 1].value[0] = this.value[i + k - 1];
                                        this.subthings[i + k - 1].type = '';
                                        //type of a variable
                                        this.subthings[i + k - 1].size[0] = 1;
                                        //size of a vector,5,3
                                        this.subthings[i + k - 1].dimension = 0;
                                        // dimension of the vector
                                        this.subthings[i + k - 1].isComposed = 0;
                                        // The variable is composed by several variables or values or not, e.g. [a,b]
                                        this.subthings[i + k - 1].isElement = 0;
                                        //The variable is an element of a vector or not
                                    }
                                    i = i + end_value - 1;
                                }
                                else
                                alert('This is not a Thing node')

                            }
                        }
                    }
                }


                else if (placeNode[0].childNodes[0].nodeName == 'Thing' && placeNode[0].childNodes[1].childNodes[0].nodeValue == 'GET')
                {
                    this.isComposed = 0;

                    this.size[0] = 1;
                    this.dimension = 1;



                    var Sub_thingNode = placeNode[0].childNodes[0];
                    var Sub_thing = new read_thingClass(Sub_thingNode);

                    if (placeNode[0].attributes.getNamedItem('name').value == 'address')
                    {
                        this.isElement = 0;
                        if (Sub_thing.value[0].indexOf('*') == 0)
                        {
                            this.isPointer = 1;
                            this.value[0] = Sub_thing.value[0].slice(1);
                            this.value[1] = 'address';
                        }
                        else
                        {
                            this.isPointer = 0;
                            this.value[0] = '&' + Sub_thing.value[0];
                            this.value[1] = 'address';

                        }


                    }
                    else
                    {
                        this.isElement = 1;
                        this.isPointer = 0;
                    }


                    this.value = Sub_thing.value.concat(placeNode[0].attributes.getNamedItem('name').value);


                }

                else
                {
                    alert('This node is not a Thing node');
                }

            }

        }
    }

    /*	for(var size_index=0;size_index<this.size.length;size_index++)
	{
		//if(IsNumeric(this.size[size_index]))
			this.size[size_index]=parseInt(this.size[size_index]);

	}*/



}

//Read things
function read_thingClasscpp(thingNode, typeFlag)
// change by liu Apr.02.2011
 {

    this.size = new Array();
    this.value = new Array();

    if (thingNode == null)
    {
        this.value[0] = 'Empty';
        //Value of a number or name of a variable
        this.type = '';
        //type of a variable
        this.size[0] = 1;
        //size of a vector,5,3
        this.dimension = 0;
        // dimension of the vector
        this.isComposed = 0;
        // The variable is composed by several variables or values or not, e.g. [a,b]
        this.isElement = 0;
        //The variable is an element of a vector or not
    }
    else
    {

        if (thingNode.childNodes[0].nodeValue != null)
        //a simple variable or value
        {

            this.value[0] = thingNode.childNodes[0].nodeValue;
            //Value of a number or name of a variable
            this.type = '';
            //type of a variable
            this.size[0] = 1;
            //size of a vector,5,3
            this.dimension = 0;
            // dimension of the vector
            this.isComposed = 0;
            // The variable is composed by several variables or values or not, e.g. [a,b]
            this.isElement = 0;
            //The variable is an element of a vector or not

        }
        else
        {
            var variable = thingNode.attributes.getNamedItem('name');
            var placeNode = thingNode.childNodes;

            if (placeNode[placeNode.length - 1].attributes.getNamedItem('name').value == 'type')
            {
                // Add by Liu Apr.02.2011
                if (typeFlag == 'class')
                {
                    var variableType = placeNode[placeNode.length - 1].childNodes[0].attributes.getNamedItem('name').value;
                    typeFlag = 'var';
                }
                else
                {
                    var variableType = placeNode[placeNode.length - 1].childNodes[0].childNodes[0].nodeValue;
                }
                // End by Liu Apr.02.2011
                if (placeNode.length > 1 && placeNode[placeNode.length - 2].attributes.getNamedItem('name').value == 'size')
                var variableSize = placeNode[placeNode.length - 2].childNodes[0].childNodes[0].nodeValue;
                else
                var variableSize = '1';
            }

            // Add by liu Apr.01.2011
            /* else if(placeNode[placeNode.length-1].attributes.getNamedItem('name').value=='Declaration')
		{
			var variableType=placeNode[placeNode.length-1].childNodes[0].childNodes[0].attributes.getNamedItem('name').value;
			alert(variableType)
					
		}
		// End by liu Apr.01.2011 */

            else
            {
                var variableType = '';
                if (placeNode[placeNode.length - 1].attributes.getNamedItem('name').value == 'size')
                var variableSize = placeNode[placeNode.length - 1].childNodes[0].childNodes[0].nodeValue;
                else
                var variableSize = '1';
            }

            this.type = variableType;


            if (variable != undefined)
            //named composed variable, may be vector variable
            {

                this.value[0] = variable.value;

                if (variableSize.indexOf(',') == -1)
                {

                    this.size[0] = variableSize;
                    this.dimension = 1;
                }
                else
                {

                    this.dimension = 0;
                    var size_index = 0;
                    while (variableSize.indexOf(',') > -1)
                    {
                        this.size[size_index] = variableSize.slice(0, variableSize.indexOf(','));
                        variableSize = variableSize.slice(variableSize.indexOf(',') + 1);
                        size_index += 1;
                        this.dimension += 1;
                    }
                    this.size[size_index] = variableSize;
                    this.dimension += 1;
                }

                this.isComposed = 0;
                this.isElement = 0;

            }

            else
            //anonymous composed thing, which maybe vector or element of vector
            {

                variableSize = parseInt(variableSize);
                if (placeNode[0].childNodes[0].nodeName == 'Thing' && placeNode[0].attributes.getNamedItem('name').value == '0' && placeNode[0].childNodes[1].childNodes[0].nodeValue == 'SET')
                {
                    this.isElement = 0;

                    var Sub_thingNode = placeNode[0].childNodes[0];

                    var Sub_thing = new read_thingClasscpp(Sub_thingNode, typeFlag);
                    //change by liu Apr.02.2011
                    this.subthings = new Array();
                    this.subthings[0] = Sub_thing;

                    this.type = Sub_thing.type;
                    if (Sub_thing.isComposed == 0 && variableSize == 1)
                    {
                        this.value[0] = Sub_thing.value[0];
                        this.dimension = 1;
                        this.size[0] = 1;
                        this.isComposed = 0;
                    }
                    else
                    {

                        this.size[0] = variableSize;
                        this.size = this.size.concat(Sub_thing.size);

                        this.isComposed = 1;
                        this.dimension = Sub_thing.dimension + 1;


                        this.value[0] = Sub_thing.value;

                        for (var i = 1; i < variableSize; i++)
                        {

                            if (placeNode[i].childNodes[1].childNodes[0].nodeValue == 'SET')
                            {

                                var Sub_thingNode = placeNode[i].childNodes[0];

                                if (Sub_thingNode.nodeName == 'Thing')
                                {
                                    var Sub_thing = new read_thingClasscpp(Sub_thingNode, typeFlag);
                                    //change by liu Apr.02.2011
                                    this.subthings[i] = Sub_thing;
                                    this.value[i] = Sub_thing.value;
                                }
                                else
                                alert('This is not a Thing node')
                            }
                            else if (placeNode[i].childNodes[1].childNodes[0].nodeValue == 'INCREMENT')
                            {
                                var Sub_thingNode = placeNode[i].childNodes[0];
                                var region = placeNode[i].attributes.getNamedItem('name').value;

                                var ini_value = parseInt(region.slice(0, region.indexOf('~')));
                                var end_value = parseInt(region.slice(region.indexOf('~') + 1));


                                if (Sub_thingNode.nodeName == 'Thing')
                                {
                                    var Sub_thing = new read_thingClasscpp(Sub_thingNode, typeFlag);
                                    //change by liu Apr.02.2011
                                    for (k = ini_value; k < end_value; k++)
                                    this.value[i + k - 1] = parseInt(this.value[i + k - 2]) + parseInt(Sub_thing.value[0]) + '';
                                    i = i + end_value - 1;
                                }
                                else
                                alert('This is not a Thing node')

                            }
                        }
                    }
                }


                else if (placeNode[0].childNodes[0].nodeName == 'Thing' && placeNode[0].childNodes[1].childNodes[0].nodeValue == 'GET')
                {
                    this.isComposed = 0;
                    this.isElement = 1;
                    this.size[0] = 1;
                    this.dimension = 1;


                    var Sub_thingNode = placeNode[0].childNodes[0];
                    var Sub_thing = new read_thingClasscpp(Sub_thingNode, typeFlag);
                    //change by liu Apr.02.2011


                    this.value = Sub_thing.value.concat(placeNode[0].attributes.getNamedItem('name').value);


                }

                else
                {
                    alert('This node is not a Thing node');
                }

            }

        }
    }

    /*	for(var size_index=0;size_index<this.size.length;size_index++)
	{
		//if(IsNumeric(this.size[size_index]))
			this.size[size_index]=parseInt(this.size[size_index]);

	}*/



}

function read_variables(place)
/*Read variables from a place node
place: the place node in xml
*/
 {
	
	
    var variables = new Array();
    var p = 0;
    //alert(place.attributes.getNamedItem('name').value)
    var place_child = place.childNodes[0];


    if (place_child.nodeName == 'Thing')
    {
        var thingNode = place_child;
        //	variables[0]=read_things(thingNode);
        if (language == "C++")
        	variables[0] = new read_thingClasscpp(thingNode, typeFlag);
        else
        	variables[0] = new read_thingClass(thingNode);
    }
    else
    {
        for (p = 0; p < place.childNodes.length; p++)
        {
            thingNode = place.childNodes[p].childNodes[0];
            //			variables[p]=read_things(thingNode)
            //variables[p]=new read_thingClass(thingNode);
            if (language == "C++")
            variables[p] = new read_thingClasscpp(thingNode, typeFlag);
            else
            variables[p] = new read_thingClass(thingNode);

        }
    }

	
    return variables;
}

function Vector_code(variable, language)
/*Generate a vector/array in code generation, e.g., [1,2,3]
variable: the class which store all the inforamtion about the array variable
language: the target code language
*/
 {
    if (language == 'Matlab')
    var str = '[';
    if (language == 'C' || language == 'C++')
    var str = '{';
    if (language == 'VHDL')
    var str = '(';

    var dim = variable.dimension;
    var size = variable.size;

    if (dim == 1)
    {
        for (var s = 0; s < size[0]; s++)
        {
            var tempString = '';
            // modified by Yulong Zou
            tempString += variable.value[s];
            if (tempString.indexOf(',') == -1)
            str += tempString;
            else
            str += tempString.replace(',', '(') + ')';

            if (s < size[0] - 1)
            {
                if (language == 'VHDL')
                    str += '&';
                else
                    str += ',';
            }
        }

    }

    if (dim == 2)
    {
        for (var s1 = 0; s1 < size[0]; s1++)
        {
            for (var s2 = 0; s2 < size[1]; s2++)
            {
                str += variable.value[s1][s2];
                if (s2 < size[1] - 1)
                str += ',';
            }
            if (s1 < size[0] - 1)
            {
                if (language == 'Matlab')
                str += ';';
                if (language == 'C' || language == 'C++')
                str += ',';
            }
        }
    }

    if (dim > 2)
    {
        //alert('Multiple-dimension vectors are not supported');
        if (language == 'Matlab')
        str += '<div style=\"color:red\">' + '/*Warning: Multiple-dimension vectors are not supported*/' + '</div><br \>';
        if (language == 'C' || language == 'C++')
        str += '<div style=\"color:red\">' + '/*Warning: Multiple-dimension vectors are not supported*/' + '</div><br \>';
        str += variable.value;

    }


    if (language == 'Matlab')
    str += ']';
    if (language == 'C' || language == 'C++')
    str += '}';
    if (language == 'VHDL')
    str += ')';


    return str;
}

function Element_code(variable, language)
/*Generate an array element in code generation, e.g., a(1) in Matlab
variable: the class which store all the information about the element
language: the target code language
*/
 {

    var str = variable.value[0];


    if (variable.value.length > 1)
    {
        if (language == 'Matlab')
        str = str + '(';
        if (language == 'C' || language == 'C++')
        str = str + '[';
        for (var i = 1; i < variable.value.length; i++)
        {
            if (language == 'Matlab')
            {
                str += variable.value[i];
            }
            else
            {
                if (IsNumeric(variable.value[i]))
                str += parseInt(variable.value[i]) - 1 + '';
                else
                {
                    if (variable.value[i].slice(variable.value[i].length - 2) == '+1')
                    {
                        str += variable.value[i].slice(0, variable.value[i].length - 2);
                    }
                    else
                    {
                        str += variable.value[i] + '-1';
                    }
                }
            }
            if (i < variable.value.length - 1)
            {
                if (language == 'Matlab')
                str += ',';
                if (language == 'C' || language == 'C++')
                str + ']['
            }

        }
        if (language == 'Matlab')
        str = str + ')';
        if (language == 'C' || language == 'C++')
        str = str + ']';
    }

    if (language == 'VHDL')
    {
        str = variable.value[0];
        str += '(';
        if (variable.value[1].indexOf(':') > -1)
        {
            var ini_index = variable.value[1].slice(0, variable.value[1].indexOf(':'));
            var index_temp = variable.value[1].slice(variable.value[1].indexOf(':') + 1);
            if (index_temp.indexOf(':') > -1)
            {
                var inc = index_temp.slice(0, index_temp.indexOf(':'));
                var end_index = index_temp.slice(index_temp.indexOf(':') + 1);
                if (inc == '-1')
                str += ini_index + ' downto ' + end_index;
                else
                alert('VHDL does not support such vector');
            }
            else
            {
                var inc = '1';
                var end_index = index_temp;
                str += ini_index + ' upto ' + end_index;
            }
        }
        else
        {
            str += variable.value[1];
        }
        str += ')'
    }

    return str;
}

function get_variableName(thingClass, language)
/*  Get the name of the variable or the value of a constant from a thing class, 
    which is usually read from a thing node by using the function read_thingClass
    thingClass: the class that store all the information of the variable; 
    It is usually read from a thing node by using the function read_thingClass
    language: the target code language 
*/
{
    console.log(thingClass);
    
    if (thingClass.isComposed == 1)
        variable = Vector_code(thingClass, language);
    else if (thingClass.isElement == 1)
        variable = Element_code(thingClass, language);
    /*else if(thingClass.isPointer==1 && language=='Matlab')
	{
		variable=thingClass.value[0]+'.'+thingClass.value[1];
		if(variable.indexOf('*')==0 || variable.indexOf('&')==0)
			variable=variable.slice(1);
		
	}*/
    else if (thingClass.value)
    {
        variable = thingClass.value[0];
    }
    else {
        variable = "None";
    }
    return variable;
}

function get_type(thingClass)
/*Get the type of the variable from a thing calss, 
    which is usually read from a thing node by using the function read_thingClass
    thingClass: the class that store all the information of the variable; 
    It is usually read from a thing node by using the function read_thingClass
*/
 {
    type = thingClass.type;
    if (type == '')
    // add by liu Apr13.2011 1PM
    {
        if (thingClass.value[0].indexOf(' ') == -1)
        type = DefaultType;
    }
    // end by liu Apr13.2011 1PM
    return type;

}

function IsOperator(func_name)
// this is changed by Ning Han
/*Test if the statement generated by a functional place is a basic operator or not
func_name: the name of the action in the functional place*/
 {
    //alert('func_name: '+func_name)
    var label = 0;
    if (func_name == '+' || func_name == '-' || func_name == '*' || func_name == '/' || func_name == 'and' || func_name == 'or' || func_name == '==' || func_name == '>' || func_name == '<' || func_name == '> =' || func_name == '< =' || func_name == '~=' || func_name == 'LAND' || func_name == '||' || func_name == '~' || func_name == '!' || func_name == '!=')
    label = 1;
    return label;
}

/*****************************W_Fangming He 2011-04-10**********************************/
function memvar(path, ind_level, language)
 {
    var place = path.childNodes;
    if (language == 'Matlab')
    for (var i = 0; i < place.length; i++)
    {
        var place_name = place[i].attributes.getNamedItem("name").value;
        if (place_name == 'malloc')
        {
            memosize.push(place[i].childNodes[0].childNodes[0].nodeValue)
        }
    }
}
/**************************************************************************/

function translation(xml_code, result_id, language)
/* The main function for the inference and code generation.
The target code is generated according to an xml code and displayed in the target field
xml_code: the xml code to be inferenced
result_id: the id of the target field
language: the target code language
*/
 {
    // Load XML
    var xmlDoc;
    xml_code = xmlformat(xml_code);

    if (language == 'C' || language == 'C++')
    {
        xml_code = xml_code.replace(/~/g, "!")
    }
    if (language == 'Matlab')
    {
        xml_code = xml_code.replace(/!/g, "~")
    }

    xmlDoc = load_XML(xml_code);

    //Initialize
    //W_Fangming He 2011-04-12.
    memosize = new Array();
    var output = '<div style="color:#009900"> //This is the ' + language + ' code generated from XML.<br /><br /> </div>';
    ind_level = 0;
    var path_input_variable = new Array();
    var path_output_variable = new Array();
    if (language == 'C' || language == 'C++')
    {
        path_input_variable[0] = '';
        path_output_variable[0] = '';
        str = creat_func(path_input_variable, path_output_variable, 'main', '', language);
        output = insertString(output, str);
        ind_level = ind_level + 1;
    }


    //Main
    var firstnode = xmlDoc.documentElement
    var pathnum = 0;


    if (firstnode.nodeName == "Path")
    {
        var path = firstnode;
    }


    var path_att = path.attributes.getNamedItem("name");

    if (path.nodeName == "Path" && path_att.value != 'main' && language != 'VHDL')
    // This is to add a main function to call the first function if the first path is not 'main'
    {
        path_inputnode = 0;
        //while(path.childNodes[path_inputnode].attributes.getNamedItem("name")=='Declaration') path_inputnode++;
        path_input_variable = read_variables(path.childNodes[path_inputnode]);
        path_output_variable = read_variables(path.childNodes[path.childNodes.length - 1]);



        //Declaration of variables
        if (language == 'C' || language == 'C++')
        {
            output = insertString(output, declare_all(path_output_variable, ind_level));
        }

        func_name = path_att.value;

        if (IsOperator(func_name))
        {
            var str = indent(ind_level) + get_variableName(path_output_variable[0], language) + '=' + get_variableName(path_input_variable[0]) + ' ' + func_name + ' ' + get_variableName(path_input_variable[1], language) + ';<br />';
            output = insertString(output, str);
        }
        else
        {
            class_name = func_name.substring(0, 1).toUpperCase() + func_name.substring(1, func_name.length);
            obj_name = class_name + '_obj';
            if (language == 'C++')
            {
                output = insertString(output, indent(ind_level) + creat_object(class_name, obj_name));
                func_name = 'work';
            }

            output = insertString(output, indent(ind_level) + call_func(path_input_variable, path_output_variable, func_name, obj_name, language));
        }


        if (language == 'C' || language == 'C++')
        {
            ind_level -= 1;
            output = insertString(output, indent(ind_level) + f_end(language, ''));
        }

        output = insertString(output, "<br /><br />")
    }


    //Definition of all Paths
    var path1 = xmlDoc.getElementsByTagName("Path");
    var classes_declaration = new Array();
    // add by liu Apr.04.2011 4PM
    for (var i = 0; i < path1.length; i++)
    {

        if (path1[i].parentNode.nodeName == 'Cause')
            continue;
        else
        {
            var path1_att = path1[i].attributes.getNamedItem("name");

            var place = path1[i].childNodes;

            var path1_input_variable = new Array();
            path1_input_variable[0] = '';
            var path1_output_variable = new Array();
            path1_output_variable[0] = '';
            ind_level = 0;

            var func_name = path1_att.value;
            var classFuncFlag = 0;
            // add by liu Apr16.2011. 1AM
            // Begin: added by Liu	Apr.02.2011 		
            if (func_name.indexOf('_') != -1 && func_name != 'main' && language == 'C++')
            // inference class function definition;
            {

                classFuncFlag = 1;
                // add by liu Apr16.2011. 1AM
                func_name_back = func_name;
                func_name = func_name_back.slice(func_name_back.indexOf('_') + 1, func_name_back.length);
                func_prefix = func_name_back.slice(0, func_name_back.indexOf('_'));

                for (var p = 0; p < classes_declaration.length; p++)
                {
                    if (func_prefix == classes_declaration[p].value[0] && classes_declaration[p].type != null && classes_declaration[p].type != "double" && classes_declaration[p].type != "int")
                    {
                        class_name = classes_declaration[p].type;

                        path1_input_variable = get_pathinput(path1[i]);
                        path1_output_variable = get_pathoutput(path1[i]);
                        if (func_name != 'main' && (path1[i].parentNode.nodeName != 'Cause'))
                        {
                            // var class_name=func_name.substring(0,1).toUpperCase()+func_name.substring(1,func_name.length);
                            //if(language=='C++')
                            //{
                            private_v = new Array();
                            public_v = new Array();
                            // output=insertString(output,creat_class(class_name,private_v,public_v,path1_input_variable,path1_output_variable)); //comment by liu, Apr.02.2011
                            output = insertString(output, creat_func(path1_input_variable, path1_output_variable, func_name, class_name, language));
                            // Add by liu Apr.02.2011.9PM
                            //func_name='work';
                            //}
                            //cppOutput=insertString(output,creat_func(path1_input_variable,path1_output_variable,func_name,class_name,language));
                            cppOutput = creat_func(path1_input_variable, path1_output_variable, func_name, class_name, language);
                        }
                    }
                }
                //alert(cppOutput)
                //continue; // comment by liu Apr.02.2011
            }
            // End: added by Liu; */
            path1_input_variable = get_pathinput(path1[i]);
            path1_output_variable = get_pathoutput(path1[i]);


            if (func_name != 'main' && (path1[i].parentNode.nodeName != 'Cause'))
            {

                var class_name = func_name.substring(0, 1).toUpperCase() + func_name.substring(1, func_name.length);
                if (language == 'C++' && classFuncFlag == 0)
                {
                    private_v = new Array();
                    public_v = new Array();
                    //output=insertString(output,creat_class(class_name,private_v,public_v,path1_input_variable,path1_output_variable));
                    class_name = "";
                    output = insertString(output, creat_func(path1_input_variable, path1_output_variable, func_name, class_name, language));
                }
                else
                {
                    if (classFuncFlag == 0)
                    // add by liu Apr16.2011 1AM
                    output = insertString(output, creat_func(path1_input_variable, path1_output_variable, func_name, class_name, language));
                }
            }

            ind_level = ind_level + 1;
            //Search all the variables to be declared
            var variables_declaration = new Array();
            var dec_num = 0;
            var str_declare = '';

            if (language == 'C')
            {

                variables_declaration = search_varDec(path1[i]);

                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {
                    if (get_type(variables_declaration[dec_num]) != null)
                    //added by liu
                    {
                        str_declare += indent(ind_level) + declare(variables_declaration[dec_num], language);
                    }

                }
            }


            if (language == 'C++')
            {

                // Add by Liu Apr.02.2011.10PM
                if (func_name == 'main')
                {
                    allClassStr = '';
                    for (var p = 0; p < path1[i].childNodes.length; p++)
                    {
                        classNode = path1[i].childNodes[p];
                        if (classNode.attributes.getNamedItem("name").value == "CDeclaration")
                        // Declaration of Class;
                        {

                            var classStr = '';
                            class_name = classNode.childNodes[0].childNodes[0].childNodes[0].attributes.getNamedItem("name").value;
                            classStr = classStr + 'Class&nbsp;' + class_name;

                            // add by liu Apr.05.2011.1PM
                            var inheritInd = 0;
                            var classComp = classNode.childNodes[0].childNodes[0].childNodes[0];
                            if (classComp.lastChild.attributes.getNamedItem("name").value == "Inheritance")
                            {
                                classStr = classStr + ':' + classComp.lastChild.childNodes[0].childNodes[0].nodeValue + '&nbsp;{ <br \>'
                                inheritInd = 1;
                            }
                            else
                            {
                                classStr = classStr + '&nbsp;{ <br \> ';
                                inheritInd = 0;
                            }
                            // end by liu Apr.05.2011.1PM
                            classThing = classNode.childNodes[0].childNodes[0].childNodes[0];
                            // Class Content;
                            placeIndex = 0;
                            for (var q = 0; q < classThing.childNodes.length - inheritInd; q++)
                            {
                                classPlaceName = classThing.childNodes[q].attributes.getNamedItem("name").value;
                                if (classPlaceName == "Declaration")
                                // inference variables
                                {
                                    classVariableName = classThing.childNodes[q].childNodes[0].attributes.getNamedItem("name").value;
                                    classVariableType = classThing.childNodes[q].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue;
                                    classStr = classStr + classVariableType + '&nbsp;' + classVariableName + ';<br \> ';
                                    placeIndex = q;
                                }
                                // add by liu Apr12.2011 12PM
                                // childNodes[q-1] is the input place of childNodes[q], which is the function declaration.
                                else if (classPlaceName == "Input")
                                {
                                    var inputStr = '';
                                    var inputNum = classThing.childNodes[q].childNodes.length;
                                    if (classThing.childNodes[q].childNodes[0].nodeName == "Place")
                                    {
                                        for (var qq = 0; qq < inputNum; qq++)
                                        {
                                            inputStr = inputStr + classThing.childNodes[q].childNodes[qq].childNodes[0].childNodes[0].nodeValue;
                                            if (qq != inputNum - 1)
                                            {
                                                inputStr = inputStr + ",";
                                            }
                                        }
                                    }
                                    else
                                    {
                                        inputStr = inputStr + classThing.childNodes[q].childNodes[0].childNodes[0].nodeValue;
                                    }
                                }
                                // end by liu Apr12.2011 12PM
                                else if (classPlaceName != "Input" && classPlaceName != "Output")
                                // inference functions;
                                {
                                    classFuncName = classThing.childNodes[q].attributes.getNamedItem("name").value;
                                    classStr = classStr + classFuncName + '(';
                                    // comment by liu Apr13.2011 1PM
                                    /* for(k=placeIndex+1;k<q;k++)                              // inference function input;
									{
										// classFuncInputType=classThing.childNodes[k].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue;
										classFuncInputType="double"; // change by liu Apr.08.2011 11PM

										//classFuncInputName=classThing.childNodes[k].childNodes[0].attributes.getNamedItem("name").value;
										classFuncInputName=classThing.childNodes[k].childNodes[0].childNodes[0].nodeValue; // change by Liu Apr.08.2011 11PM

										classStr=classStr+classFuncInputType+'&nbsp;'+classFuncInputName;
										if((q-k)!=1)
										{
											classStr=classStr+';';
										}
									} */
                                    // comment by liu Apr13.2011 1PM
                                    // add by liu Apr12.2011 12PM
                                    if (inputStr != '')
                                    {
                                        classStr = classStr + inputStr;
                                    }
                                    // end by liu Apr12.2011 12PM									
                                    //classStr=classStr+');<br \> } <br \>'; // comment by liu Apr12.2011 12PM
                                    classStr = classStr + ');<br \>';
                                    // add by liu Apr12.2011. 12PM
                                    placeIndex = q;
                                }
                            }
                            allClassStr = allClassStr + classStr + '} <br \>';
                            // changed by liu Apr12.2011 12PM							
                        }
                    }

                }
                // add by liu Apr15.2011 12PM
                //else		
                //{
                //    if(classFuncFlag==1)
                //    {
                //        class_name='null';
                //        output=insertString(output,creat_func(path1_input_variable,path1_output_variable,func_name,class_name,language));
                //    }			
                //}
                // end by liu Apr15.2011 12PM				
                // End by Liu Apr.02.2011.10PM					
                variables_declaration = search_varDeccpp(path1[i], language);
                // Change by Liu Apr.02.2011
                //if(func_name=='main')                                   // add by liu Apr.04.2011. 4PM
                //{
                //	class_declaration=search_clsDec(pathl[i],language);
                //}
                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {

                    if (get_type(variables_declaration[dec_num]) != null)
                    //added by liu
                    {
                        //added by liu
                        //alert(get_type(variables_declaration[dec_num]))
                        str_declare += indent(ind_level) + declare(variables_declaration[dec_num], language);
                    }
                    //added by liu														
                }

                // Add by liu Apr.04.2011 4PM  // Extract the declared classes;
                classInd = 0;
                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {
                    tmpType = get_type(variables_declaration[dec_num]);
                    if (tmpType != null && tmpType != 'double' && tmpType != 'int' && tmpType != 'bool' && func_name == 'main')
                    {
                        classes_declaration[classInd] = variables_declaration[dec_num];
                        classInd++;
                    }
                }
                // End by liu Apr.04.2011 4PM

            }
            // End by Liu Apr.02.2011
            if (language == 'VHDL')

            {

                components = search_components(path1[i]);
                str_declare += components_declare(ind_level, components);

                variables_declaration = search_varDec(path1[i]);


                for (var dec_num = 0; dec_num < variables_declaration.length; dec_num++)
                {
                    var flag_exist = 0;
                    for (var output_i = 0; output_i < path1_output_variable.length; output_i++)
                    if (get_variableName(variables_declaration[dec_num]) == get_variableName(path1_output_variable[output_i]))
                    flag_exist = 1;
                    if (flag_exist == 0)
                    str_declare += indent(ind_level) + declare(variables_declaration[dec_num], language) + '<br \>';
                }
                str_declare = str_declare + '<br />begin<br />';
            }

            //W_Fangming He added in 2011-04-12
            memvar(path1[i], ind_level, language);

            //search all the places
            var str_places = search_places(path1[i], ind_level, language);
            output = insertString(output, str_declare + str_places);
            if (path1[i].parentNode.nodeName != 'Cause')
            {
                if ((language == 'C' || language == 'C++') && path1_output_variable[0] != '')
                output = insertString(output, indent(ind_level) + return_out(get_variableName(path1_output_variable[0], language)));
                if (! (i == 0 && language == 'Matlab'))
                {
                    ind_level -= 1;
                    output = insertString(output, indent(ind_level) + f_end(language, func_name));
                }
            }
            output = insertString(output, "<br /><br />")
        }
    }
    if (language == "C++")
    // Add by Liu, Apr.02.2011. 12PM
    {
        output = insertString(output, allClassStr);
        // Add by Liu, Apr.02.2011. 12PM
    }

    Display_txt_html(document.getElementById(result_id), output);
    return false;
}

function get_pathinput(path)
/*get the input variables of a path node in code generation
path: the path node
*/
 {
    var place = path.childNodes;
    var path_input_variable = new Array();
    path_input_variable[0] = '';

    if (path.attributes.getNamedItem("name").value != 'main' && (path.parentNode.nodeName != 'Cause'))
    {
        path_input_variable = read_variables(place[0]);
    }
    return path_input_variable;
}

function get_pathoutput(path)
/*get the output variables of a path node in code generation
path: the path node
*/
 {

    var place = path.childNodes;
    var path_output_variable = new Array();
    path_output_variable[0] = '';
    if (path.attributes.getNamedItem("name").value != 'main' && (path.parentNode.nodeName != 'Cause'))
    {
        path_output_variable = read_variables(place[place.length - 1]); //seems locate the last place as output
    }

    //Remove the vector representation in the ouptut variables
    /*
	for (k=0;k<path_output_variable.length;k++)
		if(path_output_variable[k].indexOf('(')>-1)
			path_output_variable[k]=path_output_variable[k].slice(0,path_output_variable[k].indexOf('('));*/
    return path_output_variable;
}

function search_components(path)
/* Search all the components to be declared in a path for VHDL code generation
path: the path node*/
 {
    var place = path.childNodes;
    var components = new Array();
    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;
        if (place[l].nodeName == 'Place' && place_name.indexOf('VHDL_component') == 0)
        {

            components = components.concat(place[l]);
        }
    }
    return components;
}

function read_component(component)
/* Read all the attributs of a component node into a class
component: the component node*/
 {
    this.name = component.attributes.getNamedItem("name").value;
    this.name = this.name.slice(15);
    this.name = this.name.slice(this.name.indexOf('_') + 1);
    var path = component.childNodes[0];
    this.inputports = get_pathinput(path);
    this.outputports = get_pathoutput(path);
    return false;
}

function components_declare(ind_level, components)
/*Generate the component declaration statements for multiple components in VHDL code generation
This function can be integrated into the function declare_func
ind_level: the indent level (to format the code display)
components: the array of component class
*/
 {
    var xml = '';
    for (var i = 0; i < components.length; i++)
    {
        component = new read_component(components[i]);
        xml += indent(ind_level) + 'component ' + component.name + '<br />';
        xml += indent(ind_level) + 'port(<br />'

        for (var k = 0; k < component.inputports.length; k++)
        {
            xml += indent(ind_level) + component.inputports[k].value + ': in ' + component.inputports[k].type + ';' + '<br />';
        }

        for (var k = 0; k < component.outputports.length; k++)
        {
            if (k < component.outputports.length - 1)
            xml += indent(ind_level) + component.outputports[k].value + ': out ' + component.outputports[k].type + ';' + '<br />';
            else
            xml += indent(ind_level) + component.outputports[k].value + ': out ' + component.outputports[k].type + ');' + '<br />';
        }

        xml += indent(ind_level) + 'end component <br />';
    }
    return xml;
}

function search_varDec(path)
/* Search all the variables to be declared in a path for code generation
path: the path node*/
 {
    var place = path.childNodes;
    var variables_declaration = new Array();
    var dec_num = 0;
    var str_declare = '';
    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);
	console.log(path_input_variable);
	console.log(path_output_variable);
	 //xingzhong added for pointer return
    {
		var outputs = new Array();
        for (var idx = 0; idx < path_output_variable.length; idx++){
			if (path_output_variable[idx].isPointer == 0 && path_output_variable[idx].isElement == 0){
				outputs.push(path_output_variable[idx]);
			}
			else{
				path_input_variable.push(path_output_variable[idx]);
			}
		}
		path_output_variable = outputs;
    }
	console.log(path_input_variable);
	console.log(path_output_variable);
    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;
        var variables = new Array();
        if (place_name == "Declaration")
        {
            //variables[0]=new read_thingClass(place[l].childNodes[0]);
            if (language == "C++")
            variables[0] = new read_thingClasscpp(place[l].childNodes[0], typeFlag);
            else
            variables[0] = new read_thingClass(place[l].childNodes[0]);
        }
        if (place_name == 'Output')
        //place_name=="Input" || place_name=="Output")
        {
            //variables=read_variables(place[l]);
            var variable_temp = read_variables(place[l]);
            //modified by yulong zou
            for (var i = 0; i < variable_temp.length; i = i + 1)
            {
                var value_temp = variable_temp[i].value.toString();
                if ((!IsNumeric(value_temp)) && (value_temp.indexOf(',') == -1) && (value_temp.indexOf('[') == -1) && (value_temp.indexOf(']') == -1))
                variables = variables.concat(variable_temp[i]);
            }
        }

        if (place[l].nodeName == "Cause")
        {
            var path_cause = place[l].childNodes;
            for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
            {
                variables = variables.concat(search_varDec(path_cause[pathindex_cause]));
            }
        }

        for (var p = 0; p < variables.length; p++)
        {
            var flag_exist = 0;
            var var_name1 = ''
            if (variables[p].isElement == 1)
            {
                var_name1 = variables[p].value[0];
                var var_size = variables[p].value[1];
            }
            else
                var_name1 = variables[p].value[0];

            for (var ss = 0; ss < path_input_variable.length; ss++)
            {
                //if(path_input_variable[ss].isElement==1)
                //	var var_name2=path_input_variable[ss].value[0];
                //else
                if (path_input_variable[ss] != '')
                {
                    var var_name2 = path_input_variable[ss].value[0];

                    if (var_name1 == var_name2 || var_name1 == var_name2.slice(var_name2.indexOf('*') + 1))
                    {
                        flag_exist = 1;
                        break;
                    }
                }

            }

            if (flag_exist == 0)
            {
                //alert('dec_num:'+dec_num)
                for (var ind = 0; ind < dec_num; ind++)
                {
                    //	alert('abc:'+variables_declaration[ind].value)
                    //	alert('var_name1:'+var_name1);
                    var var_name2 = variables_declaration[ind].value[0];
                    if (var_name1 == var_name2 || var_name1 == var_name2.slice(var_name2.indexOf('*') + 1))
                    {
                        flag_exist = 1;
                        break;
                    }
                }
            }
            
            if (flag_exist == 0)
            {
                variables_declaration[dec_num] = variables[p];
                if (variables[p].isElement == 1)
                {
                    variables_declaration[dec_num].value[0] = var_name1;
                    variables_declaration[dec_num].size[0] = var_size;
                }
                variables_declaration[dec_num].isElement = 0;
                dec_num += 1;
            }
        }
    }
    return variables_declaration;
}

function search_varDeccpp(path, language)
//search all the variables to be declared // Change by Liu Apr.02.2011
 {
    var place = path.childNodes;
    var variables_declaration = new Array();
    var dec_num = 0;
    var str_declare = '';
    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);

    for (var l = 0; l < place.length; l++)
    {
        var typeFlag = 'var';
        // add by liu Apr.02.2011
        var place_name = place[l].attributes.getNamedItem("name").value;
        var variables = new Array();
        
        if (place_name == "Declaration")
        {
            variables[0] = new read_thingClasscpp(place[l].childNodes[0], typeFlag);
            //change by liu Apr.02.2011
        }

        // Add by Liu Apr.02.2011
        if (place_name == "CDeclaration" && language == 'C++')
        {
            typeFlag = 'class';
            variables[0] = new read_thingClasscpp(place[l].childNodes[0], typeFlag);
            //change by liu Apr.02.2011
        }
        // End by Liu Apr.02.2011
        if (place_name == 'Output')
        //place_name=="Input" || place_name=="Output")
        {
            variables = read_variables(place[l]);

        }

        if (place[l].nodeName == "Cause")
        {
            var path_cause = place[l].childNodes;
            for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
            {
                variables = variables.concat(search_varDec(path_cause[pathindex_cause], language));
                // Change by Liu Apr.02.2011
            }
        }
        //alert(variables.length)
        for (var p = 0; p < variables.length; p++)
        {
            var flag_exist = 0;
            if (variables[p].isElement == 1)
            {
                var var_name1 = variables[p].value[0];
                var var_size = variables[p].value[1];
            }
            else
            var var_name1 = variables[p].value[0];
            for (var ss = 0; ss < path_input_variable.length; ss++)
            {
                //if(path_input_variable[ss].isElement==1)
                //	var var_name2=path_input_variable[ss].value[0];
                //else
                if (path_input_variable[ss] != '')
                {
                    var var_name2 = path_input_variable[ss].value[0];

                    if (var_name1 == var_name2)
                    {
                        flag_exist = 1;
                        break;
                    }
                }

            }

            if (flag_exist == 0)
            {
                //alert('dec_num:'+dec_num)
                for (var ind = 0; ind < dec_num; ind++)
                {
                    //	alert('abc:'+variables_declaration[ind].value)
                    //	alert('var_name1:'+var_name1);
                    if (variables_declaration[ind].value[0] == var_name1)
                    {
                        flag_exist = 1;
                        break;
                    }
                }
            }
            //alert('flag_exist:'+flag_exist)
            if (flag_exist == 0)
            {
                variables_declaration[dec_num] = variables[p];
                if (variables[p].isElement == 1)
                {
                    variables_declaration[dec_num].value[0] = var_name1;
                    variables_declaration[dec_num].size[0] = var_size;
                }
                variables_declaration[dec_num].isElement = 0;
                //str_declare +=indent(ind_level)+declare(variables_declaration[dec_num]);
                dec_num += 1;
            }
        }
    }

    return variables_declaration;
    //	return str_declare;
}

// Add by Liu Apr.01.2011
function search_clsDec(path, language)
//search all class to be declared
 {
    var place = path.childNodes;
    var classes_declaration = new Array();
    var dec_num = 0;
    var str_declare = '';
    var path_input_class = get_pathinput(path);
    var path_output_class = get_pathoutput(path);

    for (var l = 0; l < place.length; l++)
    {
        var typeFlag = 'var';
        // add by liu Apr.02.2011
        var place_name = place[l].attributes.getNamedItem("name").value;

        var classes = new Array();


        // Add by Liu Apr.02.2011
        if (place_name == "CDeclaration" && language == 'C++')
        {
            typeFlag = 'class';
            classes[0] = new read_thingClasscpp(place[l].childNodes[0], typeFlag);
            //change by liu Apr.02.2011
        }
        // End by Liu Apr.02.2011

        //alert(variables.length)
        for (var p = 0; p < classes.length; p++)
        {
            var flag_exist = 0;
            if (classes[p].isElement == 1)
            {
                var cls_name1 = classes[p].value[0];
                var cls_size = classes[p].value[1];
            }
            else
                var cls_name1 = classes[p].value[0];
            for (var ss = 0; ss < path_input_class.length; ss++)
            {
                //if(path_input_variable[ss].isElement==1)
                //	var var_name2=path_input_variable[ss].value[0];
                //else
                if (path_input_class[ss] != '')
                {
                    var cls_name2 = path_input_class[ss].value[0];

                    if (cls_name1 == cls_name2)
                    {
                        flag_exist = 1;
                        break;
                    }
                }

            }

            if (flag_exist == 0)
            {
                //alert('dec_num:'+dec_num)
                for (var ind = 0; ind < dec_num; ind++)
                {
                    //	alert('abc:'+variables_declaration[ind].value)
                    //	alert('var_name1:'+var_name1);
                    if (classes_declaration[ind].value[0] == cls_name1)
                    {
                        flag_exist = 1;
                        break;
                    }
                }

            }
            //alert('flag_exist:'+flag_exist)
            if (flag_exist == 0)
            {
                classes_declaration[dec_num] = classes[p];
                if (variables[p].isElement == 1){
                    classes_declaration[dec_num].value[0] = cls_name1;
                    classes_declaration[dec_num].size[0] = cls_size;
                }
                classes_declaration[dec_num].isElement = 0;
                //str_declare +=indent(ind_level)+declare(variables_declaration[dec_num]);
                dec_num += 1;
            }
        }
    }
    return variables_declaration;
    //	return str_declare;
}

// End by Liu Apr.01.2011

function equal_symbol(language)
/*generate equal symbol in code generation for different languages
language: the target code language*/
 {
    if (language == 'VHDL')
        equal = '<=';
    else
        equal = '=';
    return equal;
}

function Array_operation(ind_level, input_variable, output_variable, eq, operator, language)
/*Generate the basic operator or value assignment statement for array or scalar variables in code generation
ind_level: indent level (to format the code display)
input_variable: the array of the input variables for the operation or value assignment
output_varialbe: the array of the output variables for the operation or value assignment
eq: the equal symbol
operator: the operator to be generated
language: the target code generation
*/

 {
    var str = '';
    var isArrayOp = 0;
    var isComposedOp = 0;

    if (isFixedPointGlobal && (language == 'Matlab'))
    {
        for (var inputn = 0; inputn < input_variable.length; inputn++)
        {
            /*if((input_variable[inputn].dimension==1)&&(IsNumeric(input_variable[inputn].value[0].toString())))
			{			
				input_variable[inputn].value[0]=toInteger(input_variable[inputn].value[0],wordLengthGlobal,fractionLengthGlobal);			
			}*/
            input_variable[inputn].value[0] = input_variable[inputn].value[0];
            if (input_variable[inputn].dimension == 2)
            {
                for (var inputnn = 0; inputnn < input_variable[inputn].value[0].length; inputnn++)
                {
                    //alert(input_variable[inputn].value[0][inputnn]=toInteger(input_variable[inputn].value[0][inputnn],wordLengthGlobal,fractionLengthGlobal));
                    if (IsNumeric(input_variable[inputn].value[0][inputnn].toString()))
                    {
                        input_variable[inputn].value[0][inputnn] = toInteger(input_variable[inputn].value[0][inputnn], wordLengthGlobal, fractionLengthGlobal);
                    }
                }
            }

        }
    }
    //alert('size:'+input_variable[0].size[0])
    for (var inputn = 0; inputn < input_variable.length; inputn++)
    {
        if (input_variable[inputn].size[0] != 1 || input_variable[inputn].dimension > 1)
        {
            isArrayOp = 1;
            var size_Array = new Array();
            size_Array = size_Array.concat(input_variable[inputn].size);
            dimension_Array = input_variable[inputn].dimension;
            if (input_variable[inputn].isComposed == 1)
            {
                isComposedOp = 1;
                break;
            }
        }
    }

    //alert('isarray:'+isArrayOp)

    if (isArrayOp == 1 && isComposedOp == 1 && (language == 'C' || language == 'C++'))
    {

        for (var index = 0; index < size_Array[0]; index++)
        {
            //alert('index:'+index)
            var input_variable_new = new Array();
            //input_variable_new=input_variable_new.concat(input_variable);
            for (var inputn = 0; inputn < input_variable.length; inputn++)
            {

                if (input_variable[inputn].size[0] != 1 || input_variable[inputn].dimension > 1)
                {


                    if (input_variable[inputn].size[0] != size_Array[0])
                    {

                        //alert('The sizes of multiple input does not match.'+input_variable[inputn].size[0]+'vs.'+size_Array[0])	
                        }
                    else
                    {
                        if (input_variable[inputn].isComposed == 1)
                        {
                            input_variable_new[inputn] = input_variable[inputn].subthings[index];
                        }
                        else
                        {
                            input_variable_new[inputn] = new read_thingClass(null);

                            input_variable_new[inputn].value[0] = input_variable[inputn].value[0] + '[' + index + ']';
                            input_variable_new[inputn].dimension = input_variable[inputn].dimension - 1;
                            if (input_variable_new[inputn].dimension > 0)
                            {
                                for (var size_ind = 0; size_ind < input_variable_new[inputn].dimension; size_ind++)
                                {
                                    input_variable_new[inputn].size[size_ind] = input_variable[inputn].size[size_ind + 1];
                                }
                            }
                            else
                            {
                                input_variable_new[inputn].size[0] = 1;
                            }

                        }

                    }

                }
                else
                {
                    input_variable_new[inputn] = input_variable[inputn];
                }

            }

            var output_variable_new = new Array();
            //output_variable_new=output_variable_new.concat(output_variable);
            output_variable_new[0] = new read_thingClass(null);

            if (size_Array[0] > 1)
            //TO remove the dimension whose size equals to 1
            {
                output_variable_new[0].value[0] = output_variable[0].value[0] + '[' + index + ']';
            }
            else
            {
                output_variable_new[0].value[0] = output_variable[0].value[0];
            }

            str += Array_operation(ind_level, input_variable_new, output_variable_new, eq, operator, language);

        }


    }
    else if (isArrayOp == 1 && isComposedOp == 0 && (language == 'C' || language == 'C++'))
    {
        var output = get_variableName(output_variable[0], language);
        //var input1=get_variableName(input_variable[0],language);
        //var input2=get_variableName(input_variable[1],language);
        var var_index = '';

        for (var dim = 0; dim < size_Array.length; dim++)
        {
            var index = output + '_index' + dim;
            if (size_Array[dim] != 1)
            {
                str += indent(ind_level) + 'for(int ' + index + '=0;' + index + '<' + size_Array[dim] + ';' + index + '++)<br />';
                ind_level += 1;
                var_index += '[' + index + ']';
            }
            else
            {
                continue;
            }
        }

        var input_value = new Array();

        for (var inputn = 0; inputn < input_variable.length; inputn++)
        {

            if (input_variable[inputn].size[0] != 1 || input_variable[inputn].dimension > 1)
            {

                if (input_variable[inputn].dimension != size_Array.length)
                {
                    alert('The sizes of multiple input does not match.');
                    break;
                }
                else
                {
                    var flag = 0;
                    for (var dim = 0; dim < size_Array.length; dim++)
                    {
                        if (input_variable[inputn].size[dim] != size_Array[dim])
                        {
                            alert('The sizes of multiple input does not match.');
                            flag = 1;
                            break;

                        }

                    }
                    if (flag == 0)
                    {
                        input_value[inputn] = input_variable[inputn].value[0] + var_index;

                    }
                }

            }
            else
            {
                input_value[inputn] = input_variable[inputn].value[0];
            }

        }

        var output_value = output_variable[0].value[0] + var_index;


        str += indent(ind_level - 1) + '{<br />';
        if (operator == 'Equal')
        {
            str += indent(ind_level) + output_value + eq + input_value[0];
        }
        else
        {
            str += indent(ind_level) + output_value + eq + input_value[0] + ' ' + operator + ' ' + input_value[1] + ';<br />';
        }
        str += indent(ind_level - 1) + '}<br />';

    }
    else
    {
        if (operator == 'Equal')
        {
            //str+=indent(ind_level)+get_variableName(output_variable[0],language)+eq+get_variableName(input_variable[0],language)+';<br />';	
            /***********Replace by Fangming He 2011-04-06**************/
            //alert('output_variable[0]='+output_variable[0]);//fangming test 2011-04-06;
            if (language == 'Matlab')
            {
                //alert('str='+str);//fangming test 2011-04-07
                str += indent(ind_level);
                var flag = 0;
                //alert('getinput_variableName='+get_variableName(input_variable[0],language));//fangming test 2011-04-07
                //alert('getoutput_variableName='+get_variableName(output_variable[0],language));//fangming test 2011-04-07
                for (var i = 0; i < point_list.length; i++) {
                    //alert('point_list='+point_list[i]);//fangming test 2011-04-07
                    //alert('input_variables[0]='+input_variables[0]);//fangming test 2011-04-07
                    //if((get_variableName(input_variable[0],language)==point_list[i]) || (input_variables[0].indexOf('&')>0))
                    if ((get_variableName(input_variable[0], language) == point_list[i]))
                    {
                        //alert('--');//fangming test 2011-04-07
                        str += get_variableName(output_variable[0], language) + '.address =' + point_list[i] + '.address;<br />';
                        str += indent(ind_level);
                        str += get_variableName(output_variable[0], language) + '.value =' + point_list[i] + '.value;<br />';
                        flag = 1;
                        continue;
                    }
                }
                for (var i = 0; i < point_list.length; i++) {
                    //alert('point_list='+point_list[i]);//fangming test 2011-04-07
                    if ((flag == 0) && (get_variableName(output_variable[0], language).slice(1) == point_list[i]))
                    {
                        //alert('++');//fangming test 2011-04-07
                        str += point_list[i] + '.value =' + get_variableName(input_variable[0], language).slice(1) + '.value' + ';<br />';
                        flag = 1;
                        continue;
                    }
                }
                if (flag == 0)
                {
                    //alert('-+-+');//fangming test 2011-04-07
                    str += get_variableName(output_variable[0], language) + eq + get_variableName(input_variable[0], language) + ';<br />';
                }
                point_list = new Array;
            }
            else
            {
                //alert('+-+-');//fangming test 2011-04-07
                str += indent(ind_level) + get_variableName(output_variable[0], language) + eq + get_variableName(input_variable[0], language) + ';<br />';
            }
            /*********************************************************/

        }
        else
        // This is changed by Ning Han to include b=~d with only sigle input.
        {
            if ((isFixedPointGlobal) && (language == 'Matlab'))
            {
                if (operator == '!' || operator == '~')
                {
                    //str+=indent(ind_level)+get_variableName(output_variable[0],language)+eq+' '+'fi('+operator+' '+get_variableName(input_variable[0],language)+',1,'+wordLengthGlobal+','+fractionLengthGlobal+')'+';<br />';
                    //str+=indent(ind_level)+get_variableName(output_variable[0],language)+eq+' '+'double('+get_variableName(output_variable[0],language)+');<br />';		
                    str += indent(ind_level) + get_variableName(output_variable[0], language) + eq + ' ' + operator + ' ' + get_variableName(input_variable[0], language) + ';<br />';


                }
                /*		else if (operator == '*')
				{
					str+=indent(ind_level)+get_variableName(output_variable[0],language)+eq+get_variableName(input_variable[0],language)+' '+operator+' '+get_variableName(input_variable[1],language)+';<br />';
					
				}*/

                else
                {
                    //str+=indent(ind_level)+get_variableName(output_variable[0],language)+eq+'fi('+get_variableName(input_variable[0],language)+' '+operator+' '+get_variableName(input_variable[1],language)+',1,'+wordLengthGlobal+','+fractionLengthGlobal+')'+';<br />';
                    //str+=indent(ind_level)+get_variableName(output_variable[0],language)+eq+'double('+get_variableName(output_variable[0],language)+');<br />';
                    str += indent(ind_level) + get_variableName(output_variable[0], language) + eq + get_variableName(input_variable[0], language) + ' ' + operator + ' ' + get_variableName(input_variable[1], language) + ';<br />';

                }

            }
            else
            {
                if (operator == '!' || operator == '~')
                str += indent(ind_level) + get_variableName(output_variable[0], language) + eq + ' ' + operator + ' ' + get_variableName(input_variable[0], language) + ';<br />';
                else
                str += indent(ind_level) + get_variableName(output_variable[0], language) + eq + get_variableName(input_variable[0], language) + ' ' + operator + ' ' + get_variableName(input_variable[1], language) + ';<br />';

            }

        }
    }

    return str;
}


////////////////////////////////////////////////////////////////////////////////
function search_places(path, ind_level, language)
/*Search all the places in a path and generate corresponding statement according to the type of the places
path: the path node
ind_level: the indent level (to format code display)
language: the target code language*/
 {
    if (language == 'VHDL')
    var components = search_components(path);

    var place = path.childNodes;
    var str_places = '';

    var path_input_variable = get_pathinput(path);
    var path_output_variable = get_pathoutput(path);

    for (var l = 0; l < place.length; l++)
    {
        var place_name = place[l].attributes.getNamedItem("name").value;

        /*************************************W_Fangming He 2011-04-07******************************************/
        var flag = 0;
        if (((place_name == 'malloc') || (place_name == 'memset') || (place_name == 'sizeof')) && (language == 'Matlab'))
        {
            continue;
        }
        /****************************************************************************************************/


        if (place[l].nodeName == "Cause")
        {
            if (place[l].attributes.getNamedItem("type") == null)
            var place_cause_type = 'once';
            else
            var place_cause_type = place[l].attributes.getNamedItem("type").value;

            if (place_cause_type == 'loop')
            var end_key = 'loop';
            else
            var end_key = 'if';

            if (place_name.indexOf('VHDL_Process') == 0)
            end_key = 'process';

            str_places += indent(ind_level) + creat_cause(place_name, language, place_cause_type);
            ind_level += 1;

            var path_cause = place[l].childNodes;
            for (var pathindex_cause = 0; pathindex_cause < path_cause.length; pathindex_cause++)
            {
                //alert(search_places(path_cause[pathindex_cause],ind_level))
                str_places += search_places(path_cause[pathindex_cause], ind_level, language);
            }
            ind_level -= 1;
            if (l < place.length - 1)
            {
                if (place[l + 1].attributes.getNamedItem("name").value != 'else' || language != 'Matlab')
                {
                    str_places += indent(ind_level) + f_end(language, end_key);
                }
            }
            else
            {
                str_places += indent(ind_level) + f_end(language, end_key);
            }

        }

        else if (place[l].nodeName == "Place")
        {

            if (place_name == 'Return')
            {
                var variable = place[l].childNodes[0].childNodes[0].nodeValue;
                if (variable != get_variableName(path_output_variable[0], language))
                str_places += get_variableName(path_output_variable[0], language) + '=' + variable + '\n';
                continue;
            }

            if (place_name != "Output" && place_name != "Input" && place_name != 'Declaration' && place_name != 'Return' && place_name != 'CDeclaration')
            {

                var place_input_variable = read_variables(place[l - 1]);
                /************************W_Fangming He added in 2011-04-12**********************************/
                var flag2 = 0;
                var flag1 = 0;
                for (var i = 0; i < memosize.length; i++)
                {
                    if ((memosize[i] == place[l + 1].childNodes[0].childNodes[0].nodeValue) && (language == 'Matlab'))
                    {
                        flag1 = 1;
                        break;
                    }
                }
                if (flag1 == 1) {
                    continue;
                }
                /***************************************************************************************/

                if (l < place.length - 1 && place[l + 1].attributes.getNamedItem("name").value == 'Output')
                var place_output_variable = read_variables(place[l + 1]);
                else
                var place_output_variable = new Array();
                place_outputn = 1;


                if (place[l].childNodes[0].nodeName == "Path")
                {
                    var place_func_name = place_name;
                }
                else
                {
                    var place_func_name = place[l].childNodes[1].childNodes[0].nodeValue;
                    /****************************W_Fangming He Inserted 2011-04-14************************************/
                    //also changed by Ning Han
                    for (var i = 0; i < SigBase[1].length; i++)
                    {
                        if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 1))
                        {
                            place_input_variable = place_input_variable.concat(place_output_variable);
                            place_output_variable = new Array;
                        }
                        else if (((place_name == SigBase[1][i]) || (place_name == SigBase[0][i])) && (language == 'C') && (IndSize[i] == 0)) {
                            place_output_variable = new Array;
                        }
                        if ((place_name == SigBase[1][i]) && (language == 'Matlab'))
                        {
                            place_func_name = SigBase[0][i];
                            flag = 1;
                            //break;
                        }
                        else if ((place_name == SigBase[0][i]) && (language == 'C'))
                        {
                            place_func_name = SigBase[1][i];
                            flag = 1;
                            break;
                        }
                    }
                    /***********************************************************************************************/
                }


                if (IsOperator(place_func_name))
                {
                    place_func_name = place_func_name.replace('LAND', '&&');
                    // add by Ning Han
                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+place_func_name+get_variableName(place_input_variable[1],language)+';<br />';
                    str_places += Array_operation(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);
                    continue;
                }

                if (place_func_name == 'Equal')
                {
                    //str_places+=inference_assign(ind_level,place_input_variable,place_output_variable,language);
                    str_places += Array_operation(ind_level, place_input_variable, place_output_variable, equal_symbol(language), place_func_name, language);

                    //str_places+=indent(ind_level)+get_variableName(place_output_variable[0],language)+equal_symbol(language)+get_variableName(place_input_variable[0],language)+';<br />';
                    continue;
                }

                /*	if (place[l].childNodes[0].nodeName != "Path")
					place_func_name=place_func_name+'_'+language;*/

                //class_name=place_func_name.substring(0,1).toUpperCase()+place_func_name.substring(1,place_func_name.length);
                class_name = place_func_name.substring(0, place_func_name.length);
                //obj_name=class_name+'_obj';
                if (language == 'C++')
                {
                    //str_places+=indent(ind_level)+creat_object(class_name,obj_name); // comment by liu Apr.03.2011.1AM
                    // add by liu Apr.04.2011 6PM
                    if (class_name.indexOf("_") != -1)
                    {
                        obj_name = class_name.slice(0, class_name.indexOf("_") - 1);
                        place_func_name = class_name.slice(class_name.indexOf("_") + 1, class_name.length);
                    }
                    else
                    {
                        obj_name = "";
                        place_func_name = class_name;
                    }
                    //end by liu Apr.04.2011. 6PM
                    // place_func_name='work'; // comment by liu Apr.04.2011 6PM
                }
                else
                {
                    obj_name = class_name;
                    //add by liu Apr.03.2011.1AM
                }

                if (language == 'VHDL' && place_func_name.indexOf('VHDL_component') == 0)
                {
                    place_func_name = place_func_name.slice(15);
                    obj_name = place_func_name.slice(place_func_name.indexOf('_') + 1);
                    place_func_name = place_func_name.slice(0, place_func_name.indexOf('_'));

                    for (var comp_ind = 0; comp_ind < components.length; comp_ind++)
                    {
                        component = new read_component(components[comp_ind]);
                        if (component.name == obj_name)
                        {
                            if (component.inputports.length != place_input_variable.length || component.outputports.length != place_output_variable.length)
                            {
                                alert('Port number does not match');
                                exit(0);
                            }

                            for (var port_ind = 0; port_ind < component.inputports.length; port_ind++)
                            {
                                //alert(get_variableName(place_input_variable[port_ind])
                                //alert(component.inputports[port_ind].value)
                                place_input_variable[port_ind].value[0] = component.inputports[port_ind].value + ' => ' + place_input_variable[port_ind].value[0];
                                //alert(place_input_variable[port_ind].value)
                            }

                            for (var port_ind = 0; port_ind < component.outputports.length; port_ind++)
                            {
                                place_output_variable[port_ind].value[0] = component.outputports[port_ind].value + ' => ' + place_output_variable[port_ind].value[0];
                            }
                            break;
                        }
                    }

                }


                str_places += indent(ind_level) + call_func(place_input_variable, place_output_variable, place_func_name, obj_name, language);
            }
        }
        else
        {
            alert('XML code is wrong, a path cannot contain a ' + place[l].nodeName);
            str_places = '';
            break;
        }

    }
    return str_places;

}

//XML generation
function indent_xml(n)
/*Return a string with 4n blanks for indent.*/
 {
    var i = 0;
    str = '';
    for (i = 0; i < n; i++)
    str = str + "    ";
    return str;
}
/////////////////
function split_variable(str, language)
/* Split the varialbe name/value from a source code segment
str: the code segment 
language: the source code language
*/

 {
    var variable = deleteblank(str);
    if (language == 'VHDL')
        // added by Yulong Zou
        return variable;
    else if (language == 'C' || language == 'C++')
    {
        variable = variable.replace('&nbsp;', ' ');
        if (variable.indexOf(' ') > -1)
        {
            variable = variable.slice(variable.indexOf(' '), variable.length);
            variable = deleteblank(variable);

            if (variable.indexOf('[') > -1)
            variable = variable.slice(0, variable.indexOf('['));
        }
        return variable;
    }
    else
        return variable;
}

function split_type(str)
/* Split the type of a variable from a source code segment
str: the code segment 
*/

 {
    variable = deleteblank(str);
    variable = variable.replace('&nbsp;', ' ');
    if (variable.length == 0)
        type = 'void';
    else
    {
        if (variable.indexOf(' ') > -1)
        {
            type = variable.slice(0, variable.indexOf(' '));
            type = deleteblank(type);
        }
        else
        {
            type = DefaultType;
        }
    }
    return type;
}

function delblank(str)
/*delete blanks and ';' at the beginning of a string
 str: a string
 */
 {

    var i = 0

    while (str.charAt(i) == " " || str.charAt(i) == ";")
    {
        str = str.slice(1)
        i = 0
    }
    return str
}

var g_comments = new Array();

function code_format(code, language)
/*Format the source code, delete the comments, add ';' to each line and etc.
 code: the source code text
 language: the source language
 */

 {
    var code_f = '';
    code_f = code + ';';
    code_f = code.replace(/\n/g, ";");
    code_f = code_f.replace(/\r/g, ";");
    code_f = code_f.replace(/>/g, "&gt");
    code_f = code_f.replace(/</g, "&lt");
    if (language == 'Matlab')
    {

        while (code_f.lastIndexOf('%{') > -1)
        // delete the comments between %{ %}  add by Ning
        {
            var code_f01 = code_f.slice(0, code_f.indexOf('%{')) + ';';
            var code_f02 = code_f.slice(code_f.indexOf('%') + 1);
            code_f02 = code_f02.slice(code_f02.indexOf('%}'));
            code_f = code_f01 + code_f02;
        }

        while (code_f.indexOf('%') > -1)
        // delete the comments after % in each line
        {
            var code_f1 = code_f.slice(0, code_f.indexOf('%')) + ';';
            var code_f2 = code_f.slice(code_f.indexOf('%') + 1);
            code_f2 = code_f2.slice(code_f2.indexOf(';'));
            code_f = code_f1 + code_f2;
        }

    }

    if (language == 'C' || language == 'C++')
    {
        while (code_f.indexOf('//') > -1)
        {
            var code_f1 = code_f.slice(0, code_f.indexOf('//')) + ';';
            var code_f2 = code_f.slice(code_f.indexOf('//') + 1);
            code_f2 = code_f2.slice(code_f2.indexOf(';'));
            var patt = /\/\/[^;]+;/;
            var res = patt.exec(code_f);
            g_comments.push(res);
            code_f = code_f1 + code_f2;
        }

        while (code_f.indexOf('/*') > -1)
        {
            var code_f1 = code_f.slice(0, code_f.indexOf('/*')) + ';';

            if (code_f.indexOf('*/') > -1)
            var code_f2 = code_f.slice(code_f.indexOf('*/') + 2);
            else
            {
                alert('The comment symbol */ is missed');
                break;
            }
        }
    }
    return code_f;
}

function OperatorIndex(str)
/* Find the index of operators in a code line
str: the code line*/
 {
    var o_index = new Array()
    o_index[0] = -1;
    //var patt1 = /[A-Za-z0-9\]\)]\*/g;
    // to differentiate the * operator with the pointer
	// FIXME: seems not work Xingzhong (now fixed)
	var patt1 = /(float|double|int|char|=)\*/g;
    var patt2 = /[A-Za-z0-9\]\)]\-/g;
    // to differentiate the - operator with the negative sign
    var str2 = str.replace(/\s/g, '');
	//console.log(str2);
    //Get a string without space, to avoid match error of patt1 and patt2
    if (str.indexOf('=') == -1)
    {
        o_index[0] = -1;
        return o_index;
    }

    /**************************************************************************************/
    //Priority 1: logical operators &&, ||, (&,| for array) noted that ~ has the highest priority
    if (o_index[0] < str.lastIndexOf('||'))
    {
        str_front = str.slice(0, str.lastIndexOf('||'));
        if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
        {
            o_index[0] = str.lastIndexOf('||');
            o_index[1] = o_index[0] + 2;
        }
        else
        o_index = OperatorIndex(str_front);
    }

    if (o_index[0] < str.lastIndexOf('&&'))
    {
        str_front = str.slice(0, str.lastIndexOf('&&'));
        if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
        {

            o_index[0] = str.lastIndexOf('&&');
            o_index[1] = o_index[0] + 2;
        }
        else
        o_index = OperatorIndex(str_front);
    }

    /* 	if(o_index[0]<str.lastIndexOf('~')) 
 	{
 		if(str.lastIndexOf('~') == str.lastIndexOf('~='))
 		{
 			o_index[0]=o_index[0];
 		}
 		else
 		{
	 		str_front=str.slice(0,str.lastIndexOf('~'));
	 		if(str_front.lastIndexOf(')')>=str_front.lastIndexOf('(') && str_front.lastIndexOf(']')>=str_front.lastIndexOf('['))
	 		{
	 			o_index[0]=str.lastIndexOf('~')
	 			o_index[1]=o_index[0]+1;
	 		}
	 		else
	 			o_index=OperatorIndex(str_front);	
	 	}		
 	}
*/
    //alert('the index is: '+o_index);

    /**************************************************************************************/
    //Priority 2: relatioal operators <, <=, >, >=, ==, ~=
    //alert('the input str is: '+str);
    if (o_index[0] == -1)
    {
        if (o_index[0] < str.lastIndexOf('&gt='))
        {
            str_front = str.slice(0, str.lastIndexOf('&gt='));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {

                o_index[0] = str.lastIndexOf('&gt=');
                o_index[1] = o_index[0] + 4;
            }
            else
            o_index = OperatorIndex(str_front);
        }

        if (o_index[0] < str.lastIndexOf('&gt'))
        {
            str_front = str.slice(0, str.lastIndexOf('&gt'));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {

                o_index[0] = str.lastIndexOf('&gt');
                o_index[1] = o_index[0] + 3;
            }
            else
            o_index = OperatorIndex(str_front);
        }

        if (o_index[0] < str.lastIndexOf('&lt='))
        {
            str_front = str.slice(0, str.lastIndexOf('&lt='));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {

                o_index[0] = str.lastIndexOf('&lt=');
                o_index[1] = o_index[0] + 4;
            }
            else
            o_index = OperatorIndex(str_front);
        }

        if (o_index[0] < str.lastIndexOf('&lt'))
        {
            str_front = str.slice(0, str.lastIndexOf('&lt'));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {

                o_index[0] = str.lastIndexOf('&lt');
                o_index[1] = o_index[0] + 3;
            }
            else
            o_index = OperatorIndex(str_front);
        }

        if (o_index[0] < str.lastIndexOf('=='))
        {
            str_front = str.slice(0, str.lastIndexOf('=='));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {

                o_index[0] = str.lastIndexOf('==');
                o_index[1] = o_index[0] + 2;
            }
            else
            o_index = OperatorIndex(str_front);
        }

        if (o_index[0] < str.lastIndexOf('~='))
        {
            str_front = str.slice(0, str.lastIndexOf('~='));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {

                o_index[0] = str.lastIndexOf('~=');
                o_index[1] = o_index[0] + 2;
            }
            else
            o_index = OperatorIndex(str_front);
        }
    }
    //alert('the index is: '+o_index);
    /**************************************************************************************/
    //Priority 3: arithmetic opertors +, -
    if (o_index[0] == -1)
    {
        if (o_index[0] < str.lastIndexOf('+'))
        {
            str_front = str.slice(0, str.lastIndexOf('+'));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {
                o_index[0] = str.lastIndexOf('+')
                o_index[1] = o_index[0] + 1;
            }
            else
            o_index = OperatorIndex(str_front);
        }

        if (o_index[0] < str.lastIndexOf('-') && (str2.match(patt2) != null))
        {
            str_front = str.slice(0, str.lastIndexOf('-'));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {
                o_index[0] = str.lastIndexOf('-');
                o_index[1] = o_index[0] + 1;
            }
            else
            o_index = OperatorIndex(str_front);

        }

        //for VHDL, and, or
        if (o_index[0] < str.lastIndexOf(' and '))
        {

            str_front = str.slice(0, str.lastIndexOf(' and '));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {
                o_index[0] = str.lastIndexOf(' and ');
                o_index[1] = o_index[0] + 5;
            }
            else
            o_index = OperatorIndex(str_front);

        }

        if (o_index[0] < str.lastIndexOf(' or '))
        {
            str_front = str.slice(0, str.lastIndexOf(' or '));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {
                o_index[0] = str.lastIndexOf(' or ');
                o_index[1] = o_index[0] + 4;
            }
            else
            o_index = OperatorIndex(str_front);
        }

    }

    /**************************************************************************************/
    if (o_index[0] == -1)
    //Priority 4: arithmetic operators *,/
    {
        if (o_index[0] < str.lastIndexOf('*') && (str2.match(patt1) == null)) // change from != to == to detect there's no pointer but multiply
		// FIXME : the only thing they considered is the empty before *, e.g. * foo ; but 
		// not works for double * i or *i + *j;
        {
            str_front = str.slice(0, str.lastIndexOf('*'));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {
                o_index[0] = str.lastIndexOf('*');
                o_index[1] = o_index[0] + 1;
            }
            else
            o_index = OperatorIndex(str_front);
        }


        if (o_index[0] < str.lastIndexOf('/'))
        {
            str_front = str.slice(0, str.lastIndexOf('/'));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {
                o_index[0] = str.lastIndexOf('/');
                o_index[1] = o_index[0] + 1;
            }
            else
            o_index = OperatorIndex(str_front);
        }
    }

    /**************************************************************************************/
    //alert('current o_index[i]: '+o_index[0])
    if (o_index[0] == -1)
    //Priority 5: logical operators ~/
    {

        if (o_index[0] < str.lastIndexOf('~'))
        {

            str_front = str.slice(0, str.lastIndexOf('~'));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {
                //alert('Im here')	
                o_index[0] = str.lastIndexOf('~');
                o_index[1] = o_index[0] + 1;
            }
            else
            o_index = OperatorIndex(str_front);
        }

    }

    if (o_index[0] == -1)
    //Priority 5: logical operators ~/ changed by Fangming Apr 11
    {

        if (o_index[0] < str.lastIndexOf('!'))
        {

            str_front = str.slice(0, str.lastIndexOf('!'));
            if (str_front.lastIndexOf(')') >= str_front.lastIndexOf('(') && str_front.lastIndexOf(']') >= str_front.lastIndexOf('['))
            {
                //alert('Im here')	
                o_index[0] = str.lastIndexOf('!');
                o_index[1] = o_index[0] + 1;
            }
            else
            o_index = OperatorIndex(str_front);
        }

    }
    //alert('the output of OperatorIndex: '+o_index);
    return o_index;
}

function indexOfwhole(str, word)
/*find the first index of a word in a string
 str: the string
 word: a word
 */
 {
    var index = str.indexOf(word);
    var str_temp = str;

    if (index > -1)
    {
        front_condition = (index != 0 && str.charAt(index - 1) != ';' && str.charAt(index - 1) != ' ' && str.charAt(index - 1) != ':');
        rear_condition = (index != str.length - word.length && str.charAt(index + word.length) != ';' && str.charAt(index + word.length) != ' ' && str.charAt(index + word.length) != '(' && str.charAt(index + word.length) != ':');

        while (front_condition || rear_condition)
        {
            str_temp = str_temp.slice(index + word.length);

            if (str_temp.indexOf(word) > -1)
            {
                index = index + word.length + str_temp.indexOf(word);

                front_condition = (index != 0 && str.charAt(index - 1) != ';' && str.charAt(index - 1) != ' ' && str.charAt(index - 1) != ':');
                rear_condition = (index != str.length - word.length && str.charAt(index + word.length) != ';' && str.charAt(index + word.length) != ' ' && str.charAt(index + word.length) != '(' && str.charAt(index + word.length) != ':');

                //front_condition=((index==0) || (str.charAt(index-1)!=';' && str.charAt(index-1)!=' ') );
                //rear_condition=((index==str.length-word.length) || (str.charAt(index+word.length)!=';' && str.charAt(index+word.length)!=' ' && str.charAt(index+word.length)!='(') );
            }
            else
            {
                //alert('No \"'+word+'\"is found');
                index = -1;
                break;
            }
        }
    }
    else
    {
        //alert('No \"'+word+'\" is found');
        index = -1;

    }

    return index;

}

function indexOfKeywords(str, keywords)
/*Find the first index of any one of the keywords in a string
 str: the string
 keywords: the array of keywords
 */
 {
    var index = -1;
    var keyword = 'None';
    var Index_Keyword = new Array();


    for (i = 0; i < keywords.length; i++)
    {
        if (index == -1 || (indexOfwhole(str, keywords[i]) > -1 && index > indexOfwhole(str, keywords[i])))
        {
            index = indexOfwhole(str, keywords[i]);
            keyword = keywords[i];
        }
    }

    Index_Keyword[0] = index;
    Index_Keyword[1] = keyword;
    return Index_Keyword;
}

function line_type(str, keywords)
/*Dertermin the type of a code line
str: the codeline
keywords: the array of keywords that have to be identified

Xingzhong's note, this function have bug due to the ambiguity of *
e.g. var double xx = double *xx should return assign not oper 

FIXME
*/
 {
     console.log("check line type");
     console.log(str);
    var type;
    if (str.length == 0)
    type = 'null';
    //Blank line
    else
    {
        key = indexOfKeywords(str, keywords);
        if (key[0] > -1)
        {
            type = key[1];
            //with keyword
        }
        else
        {
            if (indexOfwhole(str, 'port map') > -1)
            {
                type = 'funcCall';
                return type;
            }
            var o_index = OperatorIndex(str);
            if (o_index > 0 || o_index[0] > 0)
                type = 'oper';
            //Basic operation
            else
            {
                if (str.indexOf("=") > 0)
                {
                    if (str.indexOf('<=') > -1)
                    type = 'assign';
                    //value assignment; ???? need to modify to support more VHDL code
                    else
                    {


                        if (str.indexOf("(") > str.indexOf("=") + 1 && str.indexOf(")") > str.indexOf("="))
                        // a = b(1,2) is not a function call.
                        {

                            type = 'funcCall';

                        }
                        else
                            type = 'assign';
                        //value assignment;	
                    }
                }
                else
                {
                    if (indexOfwhole(str, 'return') == 0)
                        type = 'return';
                    else
                    {
                        if (str.indexOf("(") > 0 && str.indexOf(")") > str.indexOf("("))
                        {

                            if (str.indexOf(" ") > -1 && str.indexOf(" ") < str.indexOf("("))
                            type = 'funcDec';
                            //function declaration/definition
                            else
                            type = 'funcCall';

                        }

                        else if (str.indexOf(' ') > 0){   
                            type = 'varDec' ; 
                        }
                        //variable declaration
                        else
                        {
                            
                            if (indexOfwhole(str, 'end') == 0){
                                type = 'end';
                            }
                            else
                            {
                                type = 'undefined';
                                console.log(str);
                                console.log(type);
                                throw("found undefined " + str);
                            }
                        }
                    }
                }
            }
        }
    }

    if (type == 'funcCall')
        type = vector_func_Matlab(str, var_list);
    console.log(type);
    return type;

}

function search_var_list(var_name, var_list)
 {
    var index = -1;
    for (var iii = 0; iii < var_list[0].length; iii++)
    {
        if (delblank(var_name) == var_list[0][iii])
        {
            index = iii;
            break;
        }
    }
    return index;
}

function vector_func_Matlab(str, var_list)
/*created by Ning Han, to differentiate vector element and function call in Matlab
For example, a(1). If a is a variable that has been used before, this is a array element. Otherwise it's a function call. 
str: the code line;
var_list: the array of variables that has been used before   
*/
 {
    var name = str.slice(str.indexOf("=") + 1, str.indexOf("("));
    var flag = search_var_list(name, var_list);
    if (flag > -1)
        type = 'assign';
    //value assignment;	
    else
        type = 'funcCall';
    //function call
    return type;
}

//XML Generation
function placeOp(str, ind_level, language)
/*Xml code generation for a source code line with basic operators
 str: the code line
 ind_level: the indent level (to format the code display)
 language: the source code language*/

 {
    var o_index = OperatorIndex(str);
    if (o_index[1] != null)
    {
        var o_index_end = o_index[1];
        var o_index = o_index[0];

    }
    else
    {
        var o_index_end = o_index + 1;
    }
    if (o_index == -1)
    {
        alert('no operator found');
        return false;
    }
    var output = new Array();
    var input = new Array();

    if (language == 'VHDL')
    {
        var Eq_index = str.indexOf('<=');
        var L_eq = 2;
        //length of the equal symbol
        if (Eq_index == -1)
        {
            Eq_index = str.indexOf('=');
            L_eq = 1;
        }
    }
    else
    {
        var Eq_index = str.indexOf('=');
        L_eq = 1;
    }

    if (Eq_index <= o_index - 1 && Eq_index != -1)
    //a=b+c
    {
        output[0] = deleteblank(str.slice(0, Eq_index));
        var action = str.slice(o_index, o_index_end);

        // changed by ning han
        if (deleteblank(str.slice(Eq_index + L_eq, o_index)) == '')
        // set a=~b as a special case and differentiate with a=~=b
        {
            if ((o_index == str.indexOf('~') || o_index == str.indexOf('!')) && o_index_end - o_index == 1)
            // changed by Fangming Apr 11
            //if (o_index==str.indexOf('~')&& o_index_end - o_index==1)
            {
                input[0] = deleteblank(str.slice(o_index_end, str.length));
            }
            else
            {
                alert('wrong statement in placeOp:' + str);
                return false;
            }
        }
        else
        {
            input[0] = deleteblank(str.slice(Eq_index + L_eq, o_index));
            input[1] = deleteblank(str.slice(o_index_end, str.length));
        }
        //changed Ning Han
        if (language == 'Matlab')
        Set_Output_size_type(input, output);

        var place = input_xml(input, ind_level, language) + '\n';
        place += indent_xml(ind_level) + '<Place name=\"' + action + "\"> " + '\n';
        ind_level += 1;

        place += indent_xml(ind_level) + '<Thing>' + 'null' + '</Thing>\n'
        place += indent_xml(ind_level) + '<Action>' + action + '</Action>\n'

        ind_level -= 1;
        place += indent_xml(ind_level) + '</Place>\n' + output_xml(output, ind_level, language);
        return place;
    }
    else if (Eq_index > o_index && deleteblank(str.slice(o_index_end, Eq_index)) == '')
    //a+=b
    {
        output[0] = deleteblank(str.slice(0, o_index));
        var action = str.slice(o_index, o_index_end);
        input[0] = output[0];
        input[1] = deleteblank(str.slice(Eq_index + L_eq, str.length));

        var place = input_xml(input, ind_level, language) + '\n';
        place += indent_xml(ind_level) + '<Place name=\"' + action + "\"> " + '\n';
        ind_level += 1;

        place += indent_xml(ind_level) + '<Thing>' + 'null' + '</Thing>\n'
        place += indent_xml(ind_level) + '<Action>' + action + '</Action>\n'

        ind_level -= 1;
        place += indent_xml(ind_level) + '</Place>\n' + output_xml(output, ind_level, language);
        return place;
    }
    else if (Eq_index == -1 && str.indexOf('++') > 0)
    //a++
    {
        o_index = str.indexOf('++');
        output[0] = deleteblank(str.slice(0, o_index));
        var action = '+';
        input[0] = output[0];
        input[1] = '1';

        var place = input_xml(input, ind_level, language) + '\n';
        place += indent_xml(ind_level) + '<Place name=\"' + action + "\"> " + '\n';
        ind_level += 1;

        place += indent_xml(ind_level) + '<Thing>' + 'null' + '</Thing>\n'
        place += indent_xml(ind_level) + '<Action>' + action + '</Action>\n'

        ind_level -= 1;
        place += indent_xml(ind_level) + '</Place>\n' + output_xml(output, ind_level, language);
        return place;
    }
    else if (Eq_index == -1 && str.indexOf('--') > 0)
    //a--
    {
        o_index = str.indexOf('--');
        output[0] = deleteblank(str.slice(0, o_index));
        var action = '-';
        input[0] = output[0];
        input[1] = '1';

        var place = input_xml(input, ind_level, language) + '\n';
        place += indent_xml(ind_level) + '<Place name=\"' + action + "\"> " + '\n';
        ind_level += 1;

        place += indent_xml(ind_level) + '<Thing>' + 'null' + '</Thing>\n'
        place += indent_xml(ind_level) + '<Action>' + action + '</Action>\n'

        ind_level -= 1;
        place += indent_xml(ind_level) + '</Place>\n' + output_xml(output, ind_level, language);
        return place;
    }
    else
    {

        alert('wrong statement in placeOp:' + str);
        return false;
    }



}

function placeAssign(str, ind_level, language)
/*Xml code generation for a source code line whose type is value assignment
  str: the code line
 ind_level: the indent level (to format the code display)
 language: the source code language
 */

 {

    var output = new Array();
    var input = new Array();
    var place = '';

    if (language == 'VHDL')
    {
        var Eq_index = str.indexOf('<=');
        var L_eq = 2;
        //length of the equal symbol
        if (Eq_index == -1)
        {
            Eq_index = str.indexOf('=');
            L_eq = 1;
        }
    }
    else
    {
        var Eq_index = str.indexOf('=');
        var L_eq = 1;
    }


    var output_s = deleteblank(str.slice(0, Eq_index));
    output[0] = split_variable(output_s, language);

    //alert('output[0]='+output[0]);	
    if (split_type(output_s) != DefaultType && (language == 'C' || language == 'C++'))
    {
        place += cf(output_s + ';');

    }

    var action = 'Equal';
    input[0] = deleteblank(str.slice(Eq_index + L_eq));


    if (language == 'Matlab')
    Set_Output_size_type(input, output);
    place += input_xml(input, ind_level, language) + '\n';

    place += indent_xml(ind_level) + '<Place name=\"' + action + "\"> " + '\n';
    ind_level += 1;

    place += indent_xml(ind_level) + '<Thing>' + 'null' + '</Thing>\n'
    place += indent_xml(ind_level) + '<Action>' + action + '</Action>\n'

    ind_level -= 1;

    place += indent_xml(ind_level) + '</Place>\n' + output_xml(output, ind_level, language);
    return place;
    //return place;
}

function placefunc(str, ind_level)
/*Xml code generation for a source code line in Matlab whose type is function call
  str: the code line
 ind_level: the indent level (to format the code display)
 */
 {
    var place = ""
    if (str.indexOf("(") >= 0 && str.indexOf(")") >= 0)
    {
        place_inputn = read_input(str);
        place += inputfunc(str, ind_level, 'Matlab');
        var place_outputn = read_output(str);
        var act = ""
        var funcname = ""
        funcname = str.slice(str.indexOf("=") + 1, str.indexOf("("))
        funcname = funcname.replace(/\s/g, "")
        var actname = Action_recognize(funcname, 'Matlab');
        var s = func
        var l = 0
        s = delblank(s)
        var k = ""
        while (s.indexOf("function") >= 0 && l == 0)
        {
            k = s.slice(s.indexOf("function"))
            k = k.slice(k.indexOf("function"), k.indexOf(";"))
            var k_act = k.slice(k.indexOf('=') + 1, k.indexOf('('));
            k_act = k_act.replace(/\s/g, "");
            if (k_act == actname)
            {
                l = 1
                k = delblank(k);
                var path_inputn = read_input(k);
                var path_outputn = read_output(k.slice(8, k.length - 1));
                var func_define = k;
            }
            s = s.slice(s.indexOf("function"))
            s = s.slice(s.indexOf(";"))
            s = delblank(s)
            //            alert(s)
        }

        if (l == 0)
        {
            act = indent_xml(ind_level) + "<Place name=\"" + funcname + "\"> " + "\n";
            ind_level += 1;
            act += indent_xml(ind_level) + "<Thing>" + place_inputn[0] + "</Thing>" + "\n";
            act += indent_xml(ind_level) + "<Action>" + actname + "</Action>" + "\n";
            ind_level -= 1;
            act += indent_xml(ind_level) + "</Place>" + "\n";
        }
        else
        {
            var functs = s
            //func.slice(func.indexOf(actname))
            if (functs.indexOf("function") != -1)
            {
                functs = functs.slice(0, functs.indexOf("function"))
            }
            functs = delblank(functs)
            functs = functs.slice(0, functs.lastIndexOf("end"))

            /*******For each new function, need to flush the var_list*****/

            var var_list_temp = new Array();

            var_list_temp = var_list_temp.concat(var_list);

            var_list[0] = new Array();
            //name of varibles
            var_list[1] = new Array();
            //size of varibales
            var_list[2] = new Array();
            //type of varibales
            var_list[0] = var_list[0].concat(path_inputn);
            // store the input variables into the global var list

            for (var input_i = 0; input_i < path_inputn.length; input_i++)
            //modify the size and type of input paramaters according to the input arguments
            {
                var var_i = search_var_list(place_inputn[input_i], var_list_temp);
                if (var_i == -1)
                {
                    var_list[1][input_i] = 1;
                    var_list[2][input_i] = 'undefined';
                }
                else
                {
                    var_list[1][input_i] = var_list_temp[1][var_i];
                    var_list[2][input_i] = var_list_temp[2][var_i];
                }


            }

            //alert(var_list)


            var pathoutput_xml = outputfunc(func_define.slice(8, func_define.length - 1), ind_level, 'Matlab')
            /*******************************************************/

            act = indent_xml(ind_level) + "<Place name=\"" + funcname + "\"> " + "\n";
            ind_level += 1;
            act += indent_xml(ind_level) + "<Path name=\"" + actname + "\"> " + "\n";
            ind_level += 1;

            var pathinput_xml = inputfunc(func_define, ind_level, 'Matlab');
            var pathxml = matlabf(functs, ind_level);
            var pathoutput_xml = outputfunc(func_define.slice(8, func_define.length - 1), ind_level, 'Matlab')


            act += pathinput_xml + "\n" + pathxml + '\n' + pathoutput_xml + "\n";

            ind_level -= 1;
            act += indent_xml(ind_level) + "</Path>" + "\n";
            ind_level -= 1;
            act += indent_xml(ind_level) + "</Place>" + "\n";



            for (var output_i = 0; output_i < path_outputn.length; output_i++)
            ////modify the size and type of output arguments according to the output parameters, size inference, type inference
            {

                var var_i = search_var_list(path_outputn[output_i], var_list);
                var var_i_temp = search_var_list(place_outputn[output_i], var_list_temp);

                if (var_i != -1)
                {
                    if (var_i_temp != -1)
                    {
                        var_list_temp[1][var_i_temp] = var_list[1][var_i];
                        var_list_temp[2][var_i_temp] = var_list[2][var_i];
                    }
                    else
                    {
                        var_list_temp[0] = var_list_temp[0].concat(place_outputn[output_i]);
                        var_list_temp[1] = var_list_temp[1].concat(var_list[1][var_i]);
                        var_list_temp[2] = var_list_temp[2].concat(var_list[2][var_i]);
                    }
                }
            }

            var_list[0] = new Array();
            //name of varibles
            var_list[0] = var_list[0].concat(var_list_temp[0]);
            var_list[1] = new Array();
            //size of varibales
            var_list[1] = var_list[1].concat(var_list_temp[1]);
            var_list[2] = new Array();
            //size of varibales
            var_list[2] = var_list[2].concat(var_list_temp[2]);
            //var_list=var_list_temp;
        }


        // changed by Ning Han for waveform level
        var lib_index = -1;
        for (var ii = 0; ii < LibFun[0].length; ii++)
        {
            if (funcname == LibFun[0][ii])
            // find the function in the library
            lib_index = ii;
        }

        if (lib_index == -1)
        //the function is not in the library
        {
            //alert('This function is not a libarary function')
            placeoutput = outputfunc(str, ind_level, 'Matlab');
        }
        else
        // the function is in the library
        {
            //alert('I am here and the input  is: '+ place_inputn[0])
            var input_signal = place_inputn[0];
            //alert('I am here and the input signal is: '+ input_signal)
            for (var iii = 0; iii < var_list[0].length; iii++)
            {
                if (input_signal == var_list[0][iii])
                // find the function in the library
                var input_index = iii;
            }

            //alert('I am here and the input index is: '+ input_index)
            var in_parameter = new Array();
            // the value of 4,2 should be changed to the real value of the parameters
            in_parameter[0] = 4;
            in_parameter[1] = 2;
            var out_size_lib = output_size_lib(var_list[1][input_index].slice(var_list[1][input_index].indexOf(',') + 1), in_parameter, lib_index);
            // calculate the output size of the library function according to the inputsize and parameter

            var out_type_lib = LibFun[5][lib_index];
            // determine the output type of the library function
            // put the output information into the var_list
            //alert('I am here and the outsize is: '+ out_size_lib)
            var_list[0] = var_list[0].concat(place_outputn);
            // this part can only handle the single output library function
            var_list[1] = var_list[1].concat(out_size_lib);
            var_list[2] = var_list[2].concat(out_type_lib);

            //alert('I am here and the variable list before gnerating the output is: '+ var_list[0])
            placeoutput = outputfunc(str, ind_level, 'Matlab');

            //alert('I am here and the placeoutput is: '+ placeoutput)
        }
        // End of Ning Han's changes
        place = place + act + placeoutput;

    }
    else
    {
        place = indent_xml(ind_level) + "<Place name=\"" + str + "\" >" + "\n";
        place += indent_xml(ind_level) + "</Place>" + "\n";
    }

    return place
}


function output_size_lib(in_size, in_parameter, lib_index)
// added by Ning Han for waveform level
/* determine the size of the output of a communication component
 in_size: size of the input signal
 in_parameter: parameter of the communication component (this can be a vector)
 lib_index: index of library function
 */
 {

    var funname = LibFun[0][lib_index];
    var out_size;

    //alert('haha and the function is: '+ funname )
    if (LibFun[1][lib_index] == 1)
    // check the size change indicator
    {
        out_size = in_size;
    }
    else
    {
        switch (funname)
        {
        case 'qpskmod':
            out_size = in_size / 2;
            break;
        case 'giins':
            out_size = in_parameter[0] + in_parameter[1];
            break;
        case 'girem':
            out_size = in_parameter[0] - in_parameter[1];
            break;
        case 'qpskdemod':
            out_size = in_size * 2;
            break;
        default:
            alert('Can not find the function in the library!');
        }
    }
    //alert('haha and the out_size is: '+ out_size)
    return out_size = '1,' + out_size;


}

///////////////////////////////////Input/output variables//////////////////////
function read_input(str)
/* List all the input variables in a source code line
str: the code line
*/
 {

    var input = '';
    if (OperatorIndex(str) > 0)
    input = str.slice(str.indexOf('=') + 1, OperatorIndex(str)) + ',' + str.slice(OperatorIndex(str) + 1);
    else
    {
        if (str.indexOf("(") > 0 && str.indexOf(")"))
        input = str.slice(str.indexOf("(") + 1, str.indexOf(")"));
        else
        {
            if (str.indexOf('=') > 0)
            input = str.slice(str.indexOf('=') + 1);
        }
    }
    var inputn = new Array();
    var i = 0
    while (input != "")
    {
        if (input.indexOf(",") == -1)
        {
            inputn[i] = deleteblank(input);
            //input.replace(/\s/g,"");
            // comment by liu Apr13.2011. 1PM
            //if ( input.indexOf(" ") != -1)     // used for remove the type of input parameters;
            //{
            //   inputn[i]= input.slice(input.indexOf(" ")+1, input.length)
            //}
            // end comment by liu Apr13.2011. 1PM
            input = "";
        }
        else
        {
            inputn[i] = input.slice(0, input.indexOf(","));
            inputn[i] = deleteblank(inputn[i]);
            //inputn[i].replace(/\s/g,"");
            //if ( input.indexOf(" ") != -1)   // used for remove the type of input parameters;    // coment by Jiadi Yu Apr11.2011 6PM
            //{                                                                       // coment by Jiadi Yu Apr11.2011 6PM
            //    inputn[i]= input.slice(input.indexOf(" ")+1, input.indexOf(","))         // coment by Jiadi Yu Apr11.2011 6PM
            //}                                                                          // coment by Jiadi Yu Apr11.2011 6PM
            input = input.slice(input.indexOf(",") + 1, input.length);
            //input=deleteblank(input);
            // coment by Jiadi Yu Apr11.2011 6PM
            //          alert('inputn[i]'+inputn[i]);//fangming test 2011-04-11
        }
        i = i + 1;
    }
    //    if(i==0)
    //    	inputn[0]='';
    return inputn;

}

function Name_gen(input_str)
// changed by Ning Han
/*Generate a variable name for some operation statement decomposed 
    from a code line with multiple operations, (e.g., b*c decomposed from f=a+b*c)
    input_str: the operation statement
*/
 {
    //console.log(input_str);
    var name = input_str.replace(/\+/g, 'ADD');
    name = name.replace(/\-/g, 'SUB');
    name = name.replace(/\*/g, 'MUL');
    name = name.replace(/\\/g, 'DIV');
    name = name.replace(/\(/g, '_');
    name = name.replace(/\)/g, '');
    name = name.replace(/\./g, '');
    name = name.replace(/\==/g, 'REQ');
    name = name.replace(/\&gt=/g, 'RGTE');
    name = name.replace(/\&gt/g, 'RGT');
    name = name.replace(/\&lt=/g, 'RLTE');
    name = name.replace(/\&lt/g, 'RLT');
    name = name.replace(/\~=/g, 'RNE');
    name = name.replace(/\|\|/g, 'LOR');
    name = name.replace(/\&&/g, 'LAND');
    name = name.replace(/\~/g, 'LNOT');
    name = name.replace(/\!/g, 'CNOT');
    name = 'var_' + name;
    name = delblank(name);
    //console.log(name);
    return name;
}

function input_xml(inputn, ind_level, language)
/* Xml code generation for the input variables
 inputn: the array of input variables
 ind_level: the indent level (to format the code display)
 language: the source code language
 */
 {
    var place = '';
    for (var i = 0; i < inputn.length; i++)
    {

        if (inputn[i] != '')
        {
            //console.log("***START");
            //console.log(inputn[i]);
            if (inputn[i].indexOf('(') == 0 && bracket_match(inputn[i], '(') == inputn[i].length)
                inputn[i] = inputn[i].slice(1, inputn[i].length - 1);
            var new_input = Name_gen(inputn[i]);
            
            if (language == 'VHDL')
                var line_add = new_input + '<=' + inputn[i] + ';';
            else
                var line_add = new_input + '=' + inputn[i] + ';';
            //console.log("***MIDDLE");
            if (line_type(line_add, General_Keywords) != 'assign')
            {

                if (language == 'Matlab')
                    place += matlabf(line_add);
                if (language == 'VHDL')
                    place += VHDLf(line_add);
                if (language == 'C')
                    place += cf(line_add);
                inputn[i] = new_input;
                //console.log(inputn[i]);
            }
            //console.log(line_add);
            //console.log("***END");
        }
    }
    //console.log(inputn);
    console.log(place);

    if (inputn.length == 0)
    {}
    else if (inputn.length == 1)
    {
        place += indent_xml(ind_level) + "<Place name=\"Input\"> " + "\n"
        ind_level += 1;
        var thing = variable_abstraction(inputn[0], ind_level, language);

        place += thing + "\n"
        place += indent_xml(ind_level) + "<Action> input </Action>" + "\n"

        ind_level -= 1;
        place += indent_xml(ind_level) + "</Place>" + "\n";

    }
    else
    {

        place += indent_xml(ind_level) + "<Place name=\"Input\"> " + "\n";
        ind_level += 1;
        for (var i = 0; i < inputn.length; i++)
        {
            place += indent_xml(ind_level) + "<Place name=\"Input\"> " + "\n";
            ind_level += 1;

            var thing = variable_abstraction(inputn[i], ind_level, language);
            place += thing + "\n"
            place += indent_xml(ind_level) + "<Action> input </Action>" + "\n"

            ind_level -= 1;
            place += indent_xml(ind_level) + "</Place>" + "\n";

        }

        ind_level -= 1;
        place += indent_xml(ind_level) + "</Place>" + "\n";
    }

    return place;
}

function util_in_array(ele, arr){
    for (var i=0; i<arr.length; i++){
        if (ele == arr[i])
            return true;
    }
    return false;
}

function inputfunc(str, ind_level, language)
/*list the input varaibles and generate xml code for them
 str: the source code line
 ind_level: the indent level (to format code display)
 language: the source code language
 */
 {
     console.log(str);
     console.log(language);
    var inputn = read_input(str);
    if ( language == "C" && IORec && IORec.i){
        /* patched by Xingzhong for IO  */
        console.log("user defined input found!");
        //console.log(inputn);
        //console.log(IORec.i);
        var temp = new Array();
        for (var ind=0; ind<inputn.length; ind++){
            // for each variable declaration 
            var splitTemp = inputn[ind].match(/\w+/g);
            for (var ind2 = 0 ; ind2 < splitTemp.length; ind2++){
                if ( util_in_array( splitTemp[ind2] , IORec.i ) ){
                    //console.log("found:" +  splitTemp[ind2]  );
                    temp.push ( inputn[ind] );
                }
            }   
        }
        console.log(temp);
        inputn = temp;
    }
    var place = input_xml(inputn, ind_level, language);
    console.log(place);
    return place;
}

function read_output(str)
/* List all the output variables in a source code line
str: the code line
*/
 {

    var output = new Array();
    if (str.indexOf("=") > -1)
    {
        var pathoutput = str.slice(0, str.indexOf("="));
        pathoutput = pathoutput.replace(/\s/g, "");

        if (pathoutput.indexOf('[') == -1 && pathoutput.indexOf(']') == -1)
        {
            output[0] = pathoutput.replace(/\s/g, "");
        }
        else
        {
            if (pathoutput.indexOf('[') == 0 && pathoutput.indexOf(']') == pathoutput.length - 1)
            {
                pathoutput = pathoutput.slice(1, pathoutput.length - 1);
                var i = 0;
                while (pathoutput != "")
                {
                    if (pathoutput.indexOf(",") == -1)
                    {
                        output[i] = deleteblank(pathoutput);
                        //pathoutput.replace(/\s/g,"");
                        pathoutput = "";
                    }
                    else
                    {
                        output[i] = pathoutput.slice(0, pathoutput.indexOf(","));
                        output[i] = deleteblank(output[i]);
                        //outputn[i].replace(/\s/g,"");
                        pathoutput = pathoutput.slice(pathoutput.indexOf(",") + 1)
                    }
                    i = i + 1;
                }

            }
            else
            {
                //alert(str)
                //alert(pathoutput)
                output[0] = pathoutput.replace(/\s/g, "");
                //alert(output[0]);	
                //	alert('Please input correct Matlab code');
            }
        }
    }

    return output;

}

function output_xml(outputn, ind_level, language)
/* Xml code generation for the output variables
 outputn: the array of input variables
 ind_level: the indent level (to format the code display)
 language: the source code language
 */
 {
    var pathoutput_xml = '';
    if (outputn.length == 0)
    {}
    else if (outputn.length == 1)
    {
        pathoutput_xml = indent_xml(ind_level) + "<Place name=\"Output\"> " + "\n";
        ind_level += 1;
        var thing = variable_abstraction(outputn[0], ind_level, language)
        pathoutput_xml += thing + "\n"
        pathoutput_xml += indent_xml(ind_level) + "<Action> output </Action>" + "\n"
        ind_level -= 1;
        pathoutput_xml += indent_xml(ind_level) + "</Place>" + "\n";
    }
    else
    {
        var pathoutput_xml = indent_xml(ind_level) + "<Place name=\"Output\"> " + "\n";
        ind_level += 1;
        for (i = 0; i < outputn.length; i++)
        {
            pathoutput_xml += indent_xml(ind_level) + "<Place name=\"Output\"> " + "\n";
            ind_level += 1;

            var thing = variable_abstraction(outputn[i], ind_level, language)
            pathoutput_xml += thing + "\n";
            pathoutput_xml += indent_xml(ind_level) + "<Action> output </Action>" + "\n";

            ind_level -= 1;
            pathoutput_xml += indent_xml(ind_level) + "</Place>" + "\n";

        }
        ind_level -= 1;
        pathoutput_xml += indent_xml(ind_level) + "</Place>";
    }
    return pathoutput_xml;
}

function outputfunc(str, ind_level, language)
/*list the outputput varaibles and generate xml code for them
 str: the source code line
 ind_level: the indent level (to format code display)
 language: the source code language
 */
 {
    var outputn = read_output(str);
    var place = output_xml(outputn, ind_level, language);
    return place;
}

function Action_recognize(funcname, language)
/*Recognize the action of a function; Now we do a simple mapping; will improve later on
 funcname: the name of the function
 language: the source code language
 */
 {
    var actname = '';

    if (funcname.slice(funcname.length - language.length - 1, funcname.length) == ('_' + language))

    actname = funcname.slice(0, funcname.length - language.length - 1);
    else
    actname = funcname;

    return actname;
}

function End_match(str, keywords)
/*find the end statement which maps the first keyword in the code statement
 str: the code statement
 keywords: the array of keywords
 */
 {

    var matlab_temp = str;
    var match_index = 0;
    var Index_Keyword = indexOfKeywords(matlab_temp, keywords);
    var index = Index_Keyword[0];

    if (index == 0)
    {
        var key_toMatch = new Array();
        key_toMatch[0] = Index_Keyword[1];

        var end_index = 1;
        match_index += matlab_temp.indexOf(';');
        matlab_temp = matlab_temp.slice(matlab_temp.indexOf(';'), matlab_temp.length);

        while (end_index > 0)
        {
            Index_Keyword = indexOfKeywords(matlab_temp, keywords);
            index = Index_Keyword[0];
            key_toMatch[end_index] = Index_Keyword[1];


            if (index > -1 && index < indexOfwhole(matlab_temp, 'end'))
            {
                if (key_toMatch[end_index] == 'else' || key_toMatch[end_index] == 'elseif')
                {
                    if (key_toMatch[end_index - 1] == 'if' || key_toMatch[end_index - 1] == 'elseif')
                    {
                        if (end_index == 1)
                        {
                            match_index = match_index + index;
                            break;
                        }
                        else
                        {
                            end_index = end_index - 1;
                        }
                    }
                    else
                    {
                        alert('too many else');
                        break;
                    }
                }
                else
                {
                    end_index += 1;
                }

                match_index = match_index + index + Index_Keyword[1].length;
                matlab_temp = matlab_temp.slice(index + Index_Keyword[1].length, matlab_temp.length);

            }
            else
            {
                if (indexOfwhole(matlab_temp, 'end') > -1)
                {
                    end_index = end_index - 1;
                    match_index = match_index + indexOfwhole(matlab_temp, 'end');
                    matlab_temp = matlab_temp.slice(indexOfwhole(matlab_temp, 'end'), matlab_temp.length);
                    //alert(match_index)
                    match_index += matlab_temp.indexOf(';') + 1;
                    //alert(match_index)
                    matlab_temp = matlab_temp.slice(matlab_temp.indexOf(';') + 1);

                }
                else
                {
                    alert('end is missed in the code');
                    alert(key_toMatch)
                    alert(str)
                    break;
                }
            }
        }
    }
    else
    {
        match_index == -1;
        alert('no keyword to match');
    }

    return match_index;
}

function End_bracket(str)
/* Find the end of the first bracket in the code
str: the code
*/
 {
    var temp = str;
    var lab = 1;
    temp = temp.replace('(', '?');
    var index = -1;
    while (lab > 0)
    {
        if ((temp.indexOf('(') != -1) && (temp.indexOf('(') < temp.indexOf(')')))
        {
            lab = lab + 1;
            temp = temp.replace('(', '?');
        }
        else
        {
            lab = lab - 1;
            index = temp.indexOf(')');
            temp = temp.replace(')', '?');
        }
    }
    if (lab == 0)
    return index;
    else
    {
        alert('miss bracket');
        index == -1;
        return index;
    }
}

function type_inf(value)
/*Inference the type of a variable according to the value 
value: the value of a variable
*/
 {
    var type = 'undefined';


    if (value.indexOf('\'') == 0 || value.indexOf('\"') == 0)
    {
        if (value.length == 3)
        type = 'char';
        else
        type = 'string';
    }
    else if (IsNumeric(value))
    {
        if (value.indexOf('.') > -1)
        type = 'double';
        else
        type = 'int';
    }
    return type;
}

function variable_size_type(str, language)
/* Get the size and type of the variables
str: a variable name or a value
language: the source code language
*/

 {
    if (language == 'Matlab')
    {
        var size = '1';
        var type = 'undefined';
        if (str.indexOf('[') == 0)
        {
            var end_bracket = bracket_match(str, '[');
            var element_all = str.slice(1, end_bracket - 1);
            element_all = deleteblank(element_all);
            var element_index = 0;

            element_all.replace(/\[/g, '');
            element_all.replace(/\]/g, '');
            element_all.replace(/\s\s/g, ' ');
            element_all.replace(/\s/g, ',');

            var row_index = 0;
            var element_index = 0;

            while (element_all != '')
            {
                if (element_all.indexOf(';') == -1)
                {
                    var element_row = element_all;
                    element_all = '';
                }
                else
                {
                    var element_row = element_all.slice(0, element_all.indexOf(';'));
                    element_row = deleteblank(element_row);
                    element_all = element_all.slice(element_all.indexOf(';') + 1);
                    element_all = deleteblank(element_all);
                }

                var col_index = 0;

                while (element_row != '')
                {
                    var col_div = element_row.indexOf(',');

                    if (col_div == -1 || (element_row.indexOf(' ') > -1 && col_div > element_row.indexOf(' ')))
                    col_div = element_row.indexOf(' ');


                    if (col_div == -1)
                    {
                        element = element_row;
                        element_row = '';
                    }
                    else
                    {
                        element = element_row.slice(0, col_div);
                        element_row = element_row.slice(col_div + 1);
                        element_row = deleteblank(element_row);
                    }


                    if (element != '')
                    {
                        col_index += 1;
                        var element_type = type_inf(element);
                        if (type == 'undefined')
                        type = element_type;
                        else if (type == 'int' && element_type == 'double')
                        type = element_type;
                        else if (type == 'char' && element_type == 'string')
                        type = element_type;
                    }
                }
                if (col_index > 0)
                row_index += 1;
            }

            if (col_index == 1)
            size = row_index;
            else
            size = row_index + ',' + col_index;
        }

        else if (str.indexOf('(') > 0)
        {
            var vector_name = str.slice(0, str.indexOf('('));

            var vector_size_type = variable_size_type(vector_name, language);
            var vector_type = vector_size_type[1];
            var type = vector_type;

            var index = str.slice(str.indexOf('('));

            var end_bracket = bracket_match(index, '(');
            index = index.slice(1, end_bracket - 1);
            var index_size_type = variable_size_type(index, language);
            var size = index_size_type[0];
        }

        else if (str.indexOf(':') > -1)
        {


            var ini_value = str.slice(0, str.indexOf(':'));
            str = str.slice(str.indexOf(':') + 1);
            if (str.indexOf(':') > -1)
            {
                var inc_value = str.slice(0, str.indexOf(':'));
                var end_value = str.slice(str.indexOf(':') + 1);
            }
            else
            {
                var inc_value = '1';
                var end_value = str;
            }
            var size = parseInt((parseFloat(end_value) - parseFloat(ini_value)) / parseFloat(inc_value) + '') + 1;
            size = '1,' + size;

            var type_ini = type_inf(ini_value);
            var type_inc = type_inf(inc_value);
            var type_end = type_inf(end_value);
            if (type_ini == 'double' || type_inc == 'double' || type_end == 'double')
            type = 'double';
            else
            type = 'int';
        }

        else
        {
            var tag = 0;
            for (var iii = 0; iii < var_list[0].length; iii++)
            {
                if (str == var_list[0][iii])
                {
                    tag = 1;
                    if (var_list[1][iii] != undefined)
                    size = var_list[1][iii];
                    if (var_list[2][iii] != undefined)
                    type = var_list[2][iii];
                    break;
                }
            }

            if (tag == 0)
            {

                type = type_inf(str);
            }
        }


        var size_type = new Array();
        size_type[0] = size;
        size_type[1] = type;
        return size_type;
    }

    if (language == 'C' || language == 'C++')
    {
        size = '1';
        if (str.indexOf('{') == 0)
        {
            var end_bracket = bracket_match(str, '{');
            var element_all = str.slice(1, end_bracket - 1);
            element_all = deleteblank(element_all);
            var element_index = 0;

            element_all.replace(/\{/g, '');
            element_all.replace(/\}/g, '');
            element_all.replace(/\s\s/g, ' ');
            element_all.replace(/\s/g, ',');

            var row_index = 0;
            var element_index = 0;

            while (element_all != '')
            {
                if (element_all.indexOf('{') == -1)
                {
                    var element_row = element_all;
                    element_all = '';
                }
                else
                {
                    var element_row = element_all.slice(element_all.indexOf('{'), element_all.indexOf('}'));
                    element_row = deleteblank(element_row);
                    element_all = element_all.slice(element_all.indexOf('}') + 1);
                    element_all = deleteblank(element_all);
                }

                var col_index = 0;
                while (element_row != '')
                {
                    var col_div = element_row.indexOf(',');

                    if (col_div == -1)
                    {
                        element = element_row;
                        element_row = '';
                    }
                    else
                    {
                        element = element_row.slice(0, col_div);
                        element_row = element_row.slice(col_div + 1);
                        element_row = deleteblank(element_row);
                    }
                    if (element != '')
                    col_index += 1;
                }
                if (col_index > 0)
                row_index += 1;
                //alert('col_index='+col_index);
            }
            if (col_index == 1)
            size = row_index;
            else
            size = row_index + ',' + col_index;
            //alert('row_index='+row_index)//fangming test.
        }
        else
        {
            //alert('test var_list');//fangming test
            for (var iii = 0; iii < var_list[0].length; iii++)
            {
                if (str == var_list[0][iii])
                {
                    if (var_list[1][iii] != undefined)
                    size = var_list[1][iii];
                    break;
                }
            }
        }
    }
    /********************************************************************/
    return size;
}


function Set_Output_size_type(input, output)
/*Set the type size of output variables according to the input value
input: the array of input variables/values
output: the array of output variables
*/
 {
    var size_output = '1';
    var type_output = 'undefined';
    for (var i = 0; i < input.length; i++)
    {
        size_type = variable_size_type(input[i], 'Matlab');
        var size = size_type[0];
        var type = size_type[1];

        if (size != '1')
        {
            if (size_output < size)
            size_output = size;

        }
        if (type != 'undefined')
        {
            if (type_output == 'undefined')
            type_output = type;
            else if (type_output == 'int' && type == 'double')
            type_output = type;
            else if (type_output == 'char' && type == 'string')
            type_output = type;
        }
    }

    if (output[0].indexOf('(') > 0)
    {
        output_name = output[0].slice(0, output[0].indexOf('('));
        if (size_output == 1)
        size_output = output[0].slice(output[0].indexOf('(') + 1, output[0].indexOf(')'));

    }
    else
    output_name = output[0];

    var tag = 0;
    for (var iii = 0; iii < var_list[0].length; iii++)
    {
        if (output_name == var_list[0][iii])
        {
            var_list[1][iii] = size_output;
            var_list[2][iii] = type_output;
            tag = 1;
            break;
        }
    }
    if (tag == 0);
    {
        var_list[0] = var_list[0].concat(output_name);
        var_list[1] = var_list[1].concat(size_output);
        var_list[2] = var_list[2].concat(type_output);
    }

    return false;

}



///////////////////////////////////////////////////Global variable
var func;
//var seq;
var lab;

var General_Keywords = ['if', 'for', 'while', 'function', 'switch', 'else', 'elseif'];
//GLobal Constant
var General_Type_Keywords = ['int', 'double', 'float', 'unsigned int', 'boolet', 'cvec'];

var var_list = new Array();
//global
var_list[0] = new Array();
//name of varibles
var_list[1] = new Array();
//size of varibales
var_list[2] = new Array();
//type of varibales
point_list = new Array();
// fangming define it for seach all pointer;
////////////////////////////////////////////////////
//////////////////////////////////////////////////// Matlab build-in function list (generally used)
// add by Ning Han
var BuildinFun = new Array();
// Matlab Build-in function (output size) and the correpsonding C functions
BuildinFun[0] = new Array();
// store the name of the matlab build-in functions
BuildinFun[1] = new Array();
// store the output size of each function  (functions with single output are considered)
BuildinFun[2] = new Array();
// corresponding C functions
BuildinFun[0] = ['rand', 'sqrt'];


//////////////////////////////////////////////////// Library of communication module (basic OFDM for now)
//////////////////////////////////////////////////// Library of communication module (basic OFDM for now)
// add by Ning Han for waveform level
var LibFun = new Array();
// Library functions of communication module (basic OFDM for now)
LibFun[0] = new Array();
// store the names of the library functions
LibFun[1] = new Array();
// store the output/input signal size change indicator (0: size change; 1: no size change)
LibFun[2] = new Array();
// store the input signal type of each function (this may be needed in a later version)
LibFun[3] = new Array();
// store the input parameter value of each function (this will be abstract from the source code) (current version support at most two input parameters in giins and girem)
LibFun[4] = new Array();
// store the output signal size of each function (communication module functions are considered with single output (signal stream))
LibFun[5] = new Array();
// store the output signal type of each function (communication module functions are considered with single output (signal stream))
LibFun[6] = new Array();
// store the name of each function in C
LibFun[0] = ['qpskmod', 'ifft', 'giins', 'girem', 'fft', 'qpskdemod'];
LibFun[1] = [0, 1, 0, 0, 1, 0, ];
LibFun[5] = ['Complex', 'Complex', 'Complex', 'Complex', 'Complex', 'int'];
LibFun[6] = ['Modulator_QPSK', 'SRIFFT', 'InsertCP', 'RemCP', 'SRFFT', 'DeModulator_QPSK'];


//////////////////////////////////////////////////// Library of communication module (basic OFDM for now)


//////////////////////////////////////////////////// Library of communication module (basic OFDM for now)
// add by W_Fangming He 2011-04-12
SigBase = new Array();
Indsize = new Array();

IndSize = [1, 1, 0, 1, 1, 0, 1, 1];

SigBase[0] = ['qpskmod', 'QAMXXX', 'ifft', 'giins', 'girem', 'fft', 'qpskdemod', 'DeQAMXXX'];
SigBase[1] = ['Modulator_QPSK', 'Modulator_16QAM', 'SRIFFT', 'InsertCP', 'RemCP', 'SRFFT', 'DeModulator_QPSK', 'DeModulator_16QAM'];
CBase = new Array();
CBase[0] = ['Modulator_QPSK', 'source', 'Output2'];
CBase[1] = ['Modulator_16QAM', 'source', 'Output2'];
CBase[2] = ['SRIFFT', 'Output2', 'Output2'];
CBase[3] = ['InsertCP', 'Output2', 'Output'];
CBase[4] = ['RemCP', 'Output', 'Output2'];
CBase[5] = ['SRFFT', 'Output2', 'Output2'];
CBase[6] = ['DeModulator_QPSK', 'Output2', 'Dest'];
CBase[7] = ['DeModulator_16QAM', 'Output2', 'Dest'];

/////////////////////////////////////////// VHDL ---->xml
//Contributed by Yulong Zou

var VHDL_Keywords = ['entity', 'architecture', 'process', 'component'];
var VHDL_Type_Keywords = ['in', 'out', 'signal', 'variable'];


function VHDL_code_format(code)
/* format the VHDL code, remove the comments, rewrite some codes, etc.
 code: the VHDL code
 */
 {
    var code_f = '';
    code_f = code.replace(/\r/g, ";");
    code_f = code_f.replace(/\n/g, ";");
    code_f = code_f.replace(/\t/g, " ");
    //code_f=code_f.replace(/<=/g,"=");
    //code_f=code_f.replace(/</g,"&lt");
    //code_f=code_f.replace(/>/g,"&gt");
    code_f = delblank(code_f);
    while (code_f.indexOf('--') != -1)
    {
        if (code_f.indexOf('--') == 0)
        {
            code_f = code_f.slice(code_f.indexOf(';') + 1);
            code_f = delblank(code_f);
        }
        else
        {
            var str1 = '';
            var str2 = '';
            str1 = code_f.slice(0, code_f.indexOf('--'));
            str2 = code_f.slice(code_f.indexOf('--'));
            str2 = str2.slice(str2.indexOf(';') + 1);
            code_f = str1 + delblank(str2);
        }
        code_f = delblank(code_f);
    }
    while (code_f.indexOf('end process') != -1)
    {
        code_f = code_f.replace('end process', 'end');
    }
    while (code_f.indexOf('end loop') != -1)
    {
        code_f = code_f.replace('end loop', 'end');
    }
    while (code_f.indexOf('end if') != -1)
    {
        code_f = code_f.replace('end if', 'end');
    }
    while (indexOfwhole(code_f, 'loop') != -1)
    {
        code_f = code_f.replace('loop', '');
    }
    while (indexOfwhole(code_f, 'then') != -1)
    {
        code_f = code_f.replace('then', '');
    }
    while (code_f.indexOf('  ') != -1)
    {
        code_f = code_f.replace('  ', ' ');
    }
    var str = '';
    var i = 0;
    str = code_f;
    while (str.indexOf('architecture ') != -1)
    {
        i = i + 1;
        if (str.indexOf('architecture ') == 0)
        {
            var NameOfEntity = '';
            NameOfEntity = code_f.slice(str.indexOf(' of ') + 4, str.indexOf(' is;'));
            var PortDefinition = '';
            PortDefinition = code_f.slice(str.indexOf('entity ' + NameOfEntity + ' is;') + 11 + NameOfEntity.length, str.indexOf('end ' + NameOfEntity + ';'));
            PortDefinition = delblank(PortDefinition);
            var str1 = '';
            var str2 = '';
            str1 = code_f.slice(0, str.indexOf(';') + 1) + PortDefinition;
            str2 = code_f.slice(str.indexOf(';') + 1);
            str2 = delblank(str2);
            code_f = str1 + str2;

        }
        else
        {
            var str1 = '';
            var str2 = '';
            var str3 = '';
            str1 = code_f.slice(0, str.indexOf('architecture '));
            str2 = code_f.slice(str.indexOf('architecture '));
            str3 = str2.slice(str2.indexOf(';') + 1);
            str2 = str2.slice(str2.indexOf('architecture '), str2.indexOf(';') + 1);
            str1 = delblank(str1);
            str2 = delblank(str2);
            var NameOfEntity = '';
            NameOfEntity = str2.slice(str2.indexOf(' of ') + 4, str2.indexOf(' is;'));
            var PortDefinition = '';
            PortDefinition = code_f.slice(code_f.indexOf('entity ' + NameOfEntity + ' is;') + 11 + NameOfEntity.length, code_f.indexOf('end ' + NameOfEntity + ';'));
            PortDefinition = delblank(PortDefinition);
            str2 = str2 + PortDefinition;
            str3 = delblank(str3);
            code_f = str1 + str2 + str3;
        }
        str = code_f;
        for (j = 0; j < i; j++)
        {
            str = str.replace('architecture ', '?????????????');
        }

    }

    while ((indexOfwhole(code_f, 'begin') != -1))
    {
        var str1 = '';
        var str2 = '';
        str1 = code_f.slice(0, indexOfwhole(code_f, 'begin'));
        str2 = code_f.slice(indexOfwhole(code_f, 'begin') + 5, code_f.length);
        code_f = str1 + str2;
    }

    while ((code_f.indexOf(';;') != -1) | (code_f.indexOf('  ') != -1) | (code_f.indexOf('( ') != -1) | (code_f.indexOf(' (') != -1) | (code_f.indexOf(' )') != -1) | (code_f.indexOf(') ') != -1) | (code_f.indexOf(' =') != -1) | (code_f.indexOf('= ') != -1) | (code_f.indexOf(' ;') != -1) | (code_f.indexOf('; ') != -1) | (code_f.indexOf(' :') != -1) | (code_f.indexOf(': ') != -1) | (code_f.indexOf('< ') != -1) | (code_f.indexOf(' <') != -1) | (code_f.indexOf(' &') != -1) | (code_f.indexOf('& ') != -1))
    {
        code_f = code_f.replace(';;', ';');
        code_f = code_f.replace('  ', ' ');
        code_f = code_f.replace('( ', '(');
        code_f = code_f.replace(' (', '(');
        code_f = code_f.replace(') ', ')');
        code_f = code_f.replace(' )', ')');
        code_f = code_f.replace(' =', '=');
        code_f = code_f.replace('= ', '=');
        code_f = code_f.replace(' ;', ';');
        code_f = code_f.replace('; ', ';');
        code_f = code_f.replace(' :', ':');
        code_f = code_f.replace(': ', ':');
        code_f = code_f.replace('< ', '<');
        code_f = code_f.replace(' <', '<');
        code_f = code_f.replace('& ', '&');
        code_f = code_f.replace(' &', '&');


    }
    return code_f;
}

function variable_abstraction(str, ind_level, language)
/* Abstract variable statement and generate XML code for it
str: the variable statement
ind_level: the indent lvel (to format xml code display)
language: the source code language
*/
 {
    var thing = '';
    str = deleteblank(str);

    if (language == 'VHDL')
    {
        if (str.indexOf(':') > -1)
        {
            var var_name = str.slice(0, str.indexOf(':'));
            if (str.indexOf('std_logic_vector') > -1)
            {
                if (str.indexOf('downto') > -1)
                {
                    var index_start = str.slice(str.indexOf('(') + 1, str.indexOf(' downto '));
                    var index_end = str.slice(str.indexOf(' downto ') + 8, str.indexOf(')'));
                    var index = index_start + ':-1:' + index_end;
                    var size = parseInt(index_start) - parseInt(index_end) + 1;
                }
                thing += indent_xml(ind_level) + '<Thing name=\"' + var_name + '\">\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Place name=\"size\">\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>' + size + '</Thing>\n';
                thing + indent_xml(ind_level) + '<Action>set</Action>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';
                thing += indent_xml(ind_level) + '<Place name=\"type\">\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>' + 'std_logic_vector' + '</Thing>\n';
                thing += indent_xml(ind_level) + '<Action>set</Action>\n'
                ind_level -= 1
                thing += indent_xml(ind_level) + '</Place>\n'
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';

            }
            else if (str.indexOf('std_logic') > -1)
            {
                thing += indent_xml(ind_level) + '<Thing name=\"' + var_name + '\">\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Place name=\"type\">\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>' + 'std_logic' + '</Thing>\n'
                thing + indent_xml(ind_level) + '<Action>set</Action>\n';

                ind_level -= 1
                thing += indent_xml(ind_level) + '</Place>\n'
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';
            }
        }

        else
        {
            if (str.indexOf('&') > -1)
            {
                if (str.indexOf('(') == 0 && str.indexOf(')') == str.length - 1)
                {
                    str = str.slice(1, str.length - 1);
                }
                thing += indent_xml(ind_level) + '<Thing>\n';
                ind_level += 1;
                var str_temp = str;
                var index = 0;
                while (str_temp.indexOf('&') > -1)
                {
                    var element = str_temp.slice(0, str_temp.indexOf('&'));

                    thing += indent_xml(ind_level) + '<Place name=\"' + index + '\">' + '\n'
                    ind_level += 1;

                    var thing_element = variable_abstraction(element, ind_level, language);

                    thing += thing_element + '\n';
                    thing += indent_xml(ind_level) + '<Action>SET</Action>\n';

                    ind_level -= 1;
                    thing += indent_xml(ind_level) + '</Place>\n';

                    index += 1;
                    str_temp = str_temp.slice(str_temp.indexOf('&') + 1);
                }

                thing += indent_xml(ind_level) + '<Place name=\"' + index + '\">' + '\n'
                ind_level += 1;

                var thing_element = variable_abstraction(str_temp, ind_level, language);

                thing += thing_element + '\n';
                thing += indent_xml(ind_level) + '<Action>SET</Action>\n';

                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';

                var size = index + 1;
                thing += indent_xml(ind_level) + '<Place name=\"size\">' + '\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + size + '\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';

                thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';
            }
            else if (str.indexOf('downto') > -1)
            {
                thing += indent_xml(ind_level) + '<Thing>\n';
                ind_level += 1;
                var var_name = str.slice(0, str.indexOf('('));
                var_name = deleteblank(var_name);
                var index_start = str.slice(str.indexOf('(') + 1, str.indexOf(' downto '));
                var index_end = str.slice(str.indexOf(' downto ') + 8, str.indexOf(')'));
                var index = index_start + ':-1:' + index_end;
                thing += indent_xml(ind_level) + '<Place name=\"' + index + '\">\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>' + var_name + '</Thing>\n'
                thing += indent_xml(ind_level) + '<Action>GET</Action>\n'
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';

            }
            else
            {
                thing += indent_xml(ind_level) + '<Thing>\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + str + '\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';
            }
        }


        return thing;
    }

    if (language == 'Matlab')
    {
        var thing = indent_xml(ind_level) + '<Thing'
        if (str.indexOf('[') == 0)
        {
            thing += '>\n';
            ind_level += 1;
            var end_bracket = bracket_match(str, '[');
            var element_all = str.slice(1, end_bracket - 1);
            element_all = deleteblank(element_all);
            var element_index = 0;

            element_all.replace(/\[/g, '');
            element_all.replace(/\]/g, '');
            element_all.replace(/\s\s/g, ' ');

            var row_index = 0;
            var element_index = 0;

            while (element_all != '')
            {
                if (element_all.indexOf(';') == -1)
                {
                    var element_row = element_all;
                    element_all = '';
                }
                else
                {
                    var element_row = element_all.slice(0, element_all.indexOf(';'));
                    element_row = deleteblank(element_row);
                    element_all = element_all.slice(element_all.indexOf(';') + 1);
                    element_all = deleteblank(element_all);
                }

                thing += indent_xml(ind_level) + '<Place name=\"' + row_index + '\">' + '\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>\n';
                ind_level += 1;


                var col_index = 0;

                while (element_row != '')
                {
                    var col_div = element_row.indexOf(',');

                    if (col_div == -1 || (element_row.indexOf(' ') > -1 && col_div > element_row.indexOf(' ')))
                    col_div = element_row.indexOf(' ');

                    if (col_div == -1)
                    {
                        element = element_row;
                        element_row = '';
                    }
                    else
                    {
                        element = element_row.slice(0, col_div);
                        element_row = element_row.slice(col_div + 1);
                        element_row = deleteblank(element_row);
                    }

                    thing += indent_xml(ind_level) + '<Place name=\"' + col_index + '\">' + '\n';
                    ind_level += 1;
                    thing += indent_xml(ind_level) + '<Thing>\n';
                    ind_level += 1;
                    thing += indent_xml(ind_level) + element + '\n';
                    ind_level -= 1;
                    thing += indent_xml(ind_level) + '</Thing>\n';
                    thing += indent_xml(ind_level) + '<Action>SET</Action>\n'
                    ind_level -= 1;
                    thing += indent_xml(ind_level) + '</Place>\n';
                    col_index += 1;
                    element_index += 1;
                }
                thing += indent_xml(ind_level) + '<Place name=\"size\">' + '\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>\n'
                ind_level += 1;
                thing += indent_xml(ind_level) + col_index + '\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';

                thing += indent_xml(ind_level) + '<Action>SET</Action>\n'
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>' + '\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';
                thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';
                row_index += 1;
            }

            thing += indent_xml(ind_level) + '<Place name=\"size\">' + '\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + '<Thing>\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + row_index + '\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Thing>\n';
            thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Place>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Thing>';
        }
        else if (str.indexOf('(') > -1)
        {
            thing += '>\n';
            ind_level += 1;
            var vector_name = deleteblank(str.slice(0, str.indexOf('(')));
            var index = str.slice(str.indexOf('(') + 1, str.indexOf(')'));

            /*To modify the size of the vector according to the index, size inference*/
            var tag = 0;

            for (var iii = 0; iii < var_list[0].length; iii++)
            {
                if (vector_name == var_list[0][iii])
                {

                    if (var_list[1][iii] == '1')
                    var_list[1][iii] = index;
                    tag = 1;
                    break;
                }
            }

            if (tag == 0);
            {
                var_list[0] = var_list[0].concat(vector_name);
                var_list[1] = var_list[1].concat(index);
                var_list[2] = var_list[2].concat('undefined');
            }

            if (index.indexOf(',') > -1)
            {
                var index_num = index.slice(index.lastIndexOf(',') + 1);
                vector_name = vector_name + '(' + index.slice(0, index.lastIndexOf(',')) + ')';
                /*if(IsNumeric(index_num)==true)
    			{
    				index_num=parse(index_num)-1;
    				index_num=index_num+'';
    			}
    			else
    				index_num=index_num+'-1';*/
                thing += indent_xml(ind_level) + '<Place name=\"' + index_num + '\">' + '\n';
                ind_level += 1;
                thing += variable_abstraction(vector_name, ind_level, language) + '\n';
                thing += indent_xml(ind_level) + '<Action>GET</Action>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';
            }
            else
            {
                /*if(IsNumeric(index)==true)
    			{
    				index=parse(index)-1;
    				index=index+'';
    			}
    			else
    				index+='-1';*/
                thing += '<Place name=\"' + index + '\">' + '\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + vector_name + '\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';
                thing += indent_xml(ind_level) + '<Action>GET</Action>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';
            }
            thing += '\n</Thing>';
        }
        else if (str.indexOf(':') > -1)
        {
            thing += '>\n';
            ind_level += 1;
            var ini_value = str.slice(0, str.indexOf(':'));
            str = str.slice(str.indexOf(':') + 1);
            if (str.indexOf(':') > -1)
            {
                var inc_value = str.slice(0, str.indexOf(':'));
                var end_value = str.slice(str.indexOf(':') + 1);
            }
            else
            {
                var inc_value = '1';
                var end_value = str;
            }
            var size = (parseInt(end_value) - parseInt(ini_value)) / parseInt(inc_value) + 1;
            thing += indent_xml(ind_level) + '<Place name=\"0\">' + '\n';
            ind_level += 1;

            thing += indent_xml(ind_level) + '<Thing>\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + ini_value + '\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Thing>\n';
            thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Place>\n';
            thing += indent_xml(ind_level) + '<Place name=\"1~' + size + '\">' + '\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + '<Thing>' + inc_value + '</Thing>\n';
            thing += indent_xml(ind_level) + '<Action>INCREMENT</Action>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Place>\n';
            thing += indent_xml(ind_level) + '<Place name=\"size\">' + '\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + '<Thing>' + size + '</Thing>\n';
            thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Place>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Thing>';


        }

        else
        {
            var variable_name = str;

            var size_type_v = variable_size_type(variable_name, language);
            var size_v = size_type_v[0];
            var type_v = size_type_v[1];




            if (size_v == '1')
            {
                if (type_v == 'undefined')
                thing += '>' + str + '</Thing>';
                else
                {
                    thing += ' name=\"' + str + '\">\n';
                    ind_level += 1;

                    thing += indent_xml(ind_level) + '<Place name=\"type\">' + '\n';
                    ind_level += 1;
                    thing += indent_xml(ind_level) + '<Thing>' + type_v + '</Thing>\n';
                    thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
                    ind_level -= 1;
                    thing += indent_xml(ind_level) + '</Place>\n';

                    ind_level -= 1;
                    thing += indent_xml(ind_level) + '</Thing>';
                }
            }

            else
            {
                thing += ' name=\"' + variable_name + '\">\n';
                ind_level += 1;

                thing += indent_xml(ind_level) + '<Place name=\"size\">' + '\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>' + size_v + '</Thing>\n';
                thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';



                thing += indent_xml(ind_level) + '<Place name=\"type\">' + '\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>' + type_v + '</Thing>\n';
                thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';



                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>';

            }
        }
        return thing;
    }

    if (language == 'C' || language == 'C++')
    {

        str = deleteblank(str);
        var thing = '<Thing';
        if (str.indexOf('{') > -1)
        //Initialize the space of array
        {
            thing += '>\n';
            ind_level += 1;
            var end_bracket = bracket_match(str, '{');
            var element_all = str.slice(1, end_bracket - 1);
            element_all = deleteblank(element_all);

            //element_all.replace(/\{/g,'');
            //element_all.replace(/\}/g,'');
            element_all.replace(/\s\s/g, ' ');

            var row_index = 0;
            var element_index = 0;

            while (element_all != '')
            {
                if (element_all.indexOf('{') == -1)
                {
                    var element_row = element_all;
                    element_all = '';
                }
                else
                {
                    var element_row = element_all.slice(1, element_all.indexOf('}'));
                    element_row = deleteblank(element_row);
                    element_all = element_all.slice(element_all.indexOf('{'));
                    element_all = deleteblank(element_all);
                }

                thing += indent_xml(ind_level) + '<Place name=\"' + row_index + '\">' + '\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>\n';
                ind_level += 1;

                var col_index = 0;

                while (element_row != '')
                {
                    var col_div = element_row.indexOf(',');
                    //alert(col_div);//fangming test
                    if (col_div == -1)
                    {
                        element = element_row;
                        element_row = '';
                    }
                    else
                    {
                        element = element_row.slice(0, col_div);
                        element_row = element_row.slice(col_div + 1);
                        element_row = deleteblank(element_row);
                    }

                    thing += indent_xml(ind_level) + '<Place name=\"' + col_index + '\">' + '\n';
                    ind_level += 1;
                    thing += indent_xml(ind_level) + '<Thing>' + element + '</Thing>\n';
                    thing += indent_xml(ind_level) + '<Action>SET</Action>\n'
                    ind_level -= 1;
                    thing += indent_xml(ind_level) + '</Place>\n';
                    col_index += 1;
                    element_index += 1;
                }
                thing += indent_xml(ind_level) + '<Place name=\"size\">' + '\n';
                ind_level += 1;
                thing += indent_xml(ind_level) + '<Thing>' + col_index + '</Thing>\n'

                thing += indent_xml(ind_level) + '<Action>SET</Action>\n'
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>' + '\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Thing>\n';
                thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
                ind_level -= 1;
                thing += indent_xml(ind_level) + '</Place>\n';
                row_index += 1;

            }
            thing += indent_xml(ind_level) + '<Place name=\"size\">' + '\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + '<Thing>' + row_index + '</Thing>\n';
            thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Place>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Thing>';

        }

        else if (str.indexOf('[') > -1)
        {
            thing += '>\n';
            ind_level += 1;
            var vector_name = deleteblank(str.slice(0, str.indexOf('[')));
            var index = str.slice(str.indexOf('[') + 1, str.indexOf(']'));

            //add index by 1, to consistent with Matlab index
            if (IsNumeric(index))
            index = parseInt(index) + 1 + '';
            else
            {
                if (index.slice(index.length - 2) == '-1')
                {
                    index = index.slice(0, index.length - 2);
                }
                else
                index = index + '+1';
            }

            thing += '<Place name=\"' + index + '\">' + '\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + '<Thing>' + vector_name + '</Thing>\n';
            thing += indent_xml(ind_level) + '<Action>GET</Action>\n';
            thing += '</Place>\n';
            thing += '</Thing>';
        }

        else if (str.indexOf('*') == 0)
        //For *q pointer, Fangming
        {
            var variable_name = str;
            //=deleteblank(str.slice(str.indexOf('*'),str.length));
            var address = deleteblank(str.slice(str.indexOf('*') + 1, str.length));

            thing += ' name=\"' + variable_name + '\">\n';
            ind_level += 1;

            thing += indent_xml(ind_level) + '<Place name=\"address\">' + '\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + '<Thing>' + address + '</Thing>\n';
            thing += indent_xml(ind_level) + '<Action>SET</Action>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Place>\n';

            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Thing>';
        }

        else if (str.indexOf('&') == 0)
        {
            var variable_name = str;
            //deleteblank(str.slice(str.indexOf('&'),str.length));
            var address = deleteblank(str.slice(str.indexOf('&') + 1, str.length));

            thing += '>\n';
            ind_level += 1;

            thing += indent_xml(ind_level) + '<Place name=\"address\">' + '\n';
            ind_level += 1;
            thing += indent_xml(ind_level) + '<Thing>' + address + '</Thing>\n';
            thing += indent_xml(ind_level) + '<Action>GET</Action>\n';
            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Place>\n';

            ind_level -= 1;
            thing += indent_xml(ind_level) + '</Thing>';
        }



        else
        {
            var variable_name = str;
            //alert('str0='+str);
            //var size_v=variable_size_type(variable_name,language);
            //alert('str0_size='+size_v);
            //if(size_v=='1'){
            var tag = 0;
            var address = variable_name.slice(variable_name.indexOf('*') + 1, variable_name.length);
            //alert('str1='+str);
            for (var i = 0; i < point_list.length; i++)
            {
                //alert('ahahah');
                if (address == point_list[i])
                {
                    tag = 1;
                    //alert("hahaha");
                    //thing+=' name=\"'+variable_name+'\"'
                    thing += '>\n';
                    ind_level += 1;
                    thing += indent_xml(ind_level) + '<Place name=\"address\">' + '\n';
                    ind_level += 1;
                    thing += indent_xml(ind_level) + '<Thing>' + address + '</Thing>\n';
                    thing += indent_xml(ind_level) + '<Action>GET</Action>\n';
                    ind_level -= 1;
                    thing += indent_xml(ind_level) + '</Place>\n';
                    ind_level -= 1;
                    thing += indent_xml(ind_level) + '</Thing>';
                    break;
                }
            }

            if (tag == 0)
            thing += '>' + str + '</Thing>';

        }
        return thing;

    }
}

function placefunc_VHDL(VHDLline, VHDL)
/*Xml code generation for a source code line in VHDL whose type is function call
  VHDLline: the VHDL code line
 VHDL: the whole VHDL code
 */

 {
    var component_name = VHDLline.slice(0, VHDLline.indexOf(':'));
    var entity_name = VHDLline.slice(VHDLline.indexOf(':') + 1, VHDLline.indexOf(' port map'));

    var func_name = 'VHDL_component_' + component_name + '_' + entity_name;
    var path_name = 'VHDL_architecture_' + component_name + '_' + entity_name;
    var place_xml = '<Place name=\"' + func_name + '\">\n';

    var path_xml = '';

    var architecturefinition = VHDL.slice(VHDL.indexOf('archdef_start;') + 14, VHDL.indexOf('archdef_end;'));
    arch_begin = 'architecture ' + component_name + ' of ' + entity_name + ' is;begin;';
    arch_end = ';end ' + component_name + ';';
    architecturefinition = arch_begin + architecturefinition + arch_end;
    //alert('architecturefinition:'+architecturefinition);
    path_xml += VHDLf(architecturefinition);

    place_xml += path_xml + '</Place>\n';

    var ports_arch = architecturefinition.slice(architecturefinition.indexOf('port(') + 4);
    var ports_arch_end = bracket_match(ports_arch, '(');
    ports_arch = ports_arch.slice(1, ports_arch_end - 1) + ';';
    //	alert(ports_arch)
    inputports = new Array();
    outputports = new Array();

    var ports = VHDL.slice(VHDLline.indexOf('('));
    var ports_end = bracket_match(ports, '(');
    ports = ports.slice(1, ports_end - 1);

    while (ports.indexOf('=>') > -1)
    {

        formal_port = delblank(ports.slice(0, ports.indexOf('=>')));
        ports = ports.slice(ports.indexOf('=>') + 2);

        if (ports.indexOf(',') > -1)
        {
            actual_port = delblank(ports.slice(0, ports.indexOf(',')));
            ports = delblank(ports.slice(ports.indexOf(',') + 1));
        }
        else
        {
            actual_port = delblank(ports);
            ports = '';
        }

        port_position = indexOfwhole(ports_arch, formal_port);
        if (port_position > -1)
        {
            var port_def = ports_arch.slice(port_position);
            port_def = port_def.slice(0, port_def.indexOf(';'));
            if (line_type(port_def, VHDL_Type_Keywords) == 'in')
            inputports = inputports.concat(actual_port);
            else if (line_type(port_def, VHDL_Type_Keywords) == 'out')
            outputports = outputports.concat(actual_port);
            else
            alert(line_type(port_def, VHDL_Type_Keywords));

        }
        else
        alert('no port definition:' + formal_port);

    }

    var xml = input_xml(inputports, 0, 'VHDL') + place_xml + output_xml(outputports, 0, 'VHDL');
    return xml;


}

function VHDLf(VHDL)
/* The core function to abstract VHDL code
 VHDL: the VHDL source code
 */
 {
    var lab = 0;
    var proc = 1;
    var fun = "";
    VHDL = delblank(VHDL);
    var keywords = General_Keywords.concat(VHDL_Keywords);
    keywords_all = keywords.concat(VHDL_Type_Keywords);

    /************************/
    var EntityList = new Array();
    EntityList[0] = new Array();
    //Name of entity
    EntityList[1] = new Array();
    // 1: is main function; 0: sub function
    /*************************/


    while (VHDL.length != 0)
    {
        //alert(VHDL)
        var VHDLline = read_line(VHDL);
        //VHDL.slice(0,VHDL.indexOf(";")+1)
        //    VHDLline=VHDLline.replace(/;/g,"")
        //       alert(VHDLline)
        var type_line = line_type(VHDLline, keywords_all);
        //	alert(type_line)
        switch (type_line)
        {
        case 'entity':
            var entityname = VHDLline.slice(VHDLline.indexOf('entity ') + 7, VHDLline.indexOf(' is'));
            //fun+='<Place name=\"'+entityname+'\">\n';
            EntityList[0] = EntityList[0].concat(entityname);
            if (indexOfwhole(VHDL, 'component ' + entityname) > -1)
            EntityList[1] = EntityList[1].concat(0);
            else
            EntityList[1] = EntityList[1].concat(1);

            var end_entity = End_match(VHDL, keywords);

            VHDL = VHDL.slice(end_entity);
            //  VHDL=VHDL.slice(VHDL.indexOf(';')+1);
            VHDL = delblank(VHDL);
            break;


            /*  case 'varDec':

            	var varType=indexOfKeywords(VHDLline,VHDL_Type_Keywords);
            	var varType_index=varType[0];
            	if(varType_index>-1)
            		var varType_name=varType[1];
            	else
            		var varType_name='None';
            	
        		alert(varType_name)
            	switch(varType_name)
            	{*/
        case 'in':
            var action_name = 'input';
            var place_name = 'Input';
            var var_dec = VHDLline.replace('in ', '');

            fun += '<Place name=\"' + place_name + '\">\n' + variable_abstraction(var_dec, 0, 'VHDL') + '<Action>' + action_name + '</Action>\n' + '</Place>\n';
            VHDL = VHDL.slice(VHDLline.length);
            break;
        case 'out':
            var action_name = 'output';
            var place_name = 'Output';
            var var_dec = VHDLline.replace('out ', '');
            fun += '<Place name=\"' + place_name + '\">\n' + variable_abstraction(var_dec, 0, 'VHDL') + '<Action>' + action_name + '</Action>\n' + '</Place>\n';
            VHDL = VHDL.slice(VHDLline.length);
            break;

        case 'signal':
            var action_name = 'Declaration';
            var place_name = 'Declaration';
            var var_dec = VHDLline.replace('signal ', '');
            fun += '<Place name=\"' + place_name + '\">\n' + variable_abstraction(var_dec, 0, 'VHDL') + '<Action>' + action_name + '</Action>\n' + '</Place>\n';
            VHDL = VHDL.slice(VHDLline.length);
            break;

        case 'variable':
            var action_name = 'Declaration';
            var place_name = 'Declaration';
            var var_dec = VHDLline.replace('variable ', '');
            fun += '<Place name=\"' + place_name + '\">\n' + variable_abstraction(var_dec, 0, 'VHDL') + '<Action>' + action_name + '</Action>\n' + '</Place>\n';
            VHDL = VHDL.slice(VHDLline.length);
            break;
            /*            		Default:
            			alert('wrong code in VHDL:'+VHDLline);
            			
            			
            	}
            	fun+='<Place name=\"'+place_name+'\">\n'+variable_abstraction(var_dec,'VHDL')+'<Action>'+action_name+'</Action>\n'+'</Place>\n';
            	
				
                VHDL=VHDL.slice(VHDLline.length);
                VHDL=delblank(VHDL);
                break;*/


        case 'architecture':
            var architecturename = VHDLline.slice(VHDLline.indexOf('architecture ') + 13, VHDLline.indexOf(' is'));
            //  architecturename=architecturename.replace(/\s/g,'_');
            var arch_name = architecturename.slice(0, architecturename.indexOf(' of '));
            var entity_name = architecturename.slice(architecturename.indexOf(' of ') + 4);
            var isMain = 1;
            for (var ent_i = 0; ent_i < EntityList[0].length; ent_i++)
            {
                if (EntityList[0][ent_i] == entity_name)
                {
                    isMain = EntityList[1][ent_i];
                    break;
                }

            }

            var end_architecture = End_match(VHDL, keywords);
            var architecturefinition = VHDL.slice(VHDLline.length, end_architecture);
            architecturefinition = architecturefinition.slice(0, architecturefinition.lastIndexOf('end'));
            architecturefinition = delblank(architecturefinition);

            //alert('architecturefinition:'+architecturefinition)
            if (isMain == 1)

            {
                architecturename = 'VHDL_Architecture_' + arch_name + '_' + entity_name;
                //modified by Yulong Zou
                fun += '<Path name=\"' + architecturename + '\">\n';

                // abstraction of input ports
                var endbracket = End_bracket(architecturefinition);
                var portdefinition = architecturefinition.slice(architecturefinition.indexOf('port(') + 5, endbracket);
                var temp = portdefinition;
                var outputindex = -1;
                var templine = temp.slice(0, temp.indexOf(';') + 1);
                while (line_type(templine, VHDL_Type_Keywords) == 'in')
                {
                    if (outputindex == -1)
                    outputindex = 0;
                    outputindex += templine.length;
                    temp = temp.slice(templine.length);
                    templine = temp.slice(0, temp.indexOf(';') + 1);
                }
                fun += '<Place name=\"Input\">\n';
                var inputport = portdefinition.slice(0, outputindex);
                fun += VHDLf(inputport + ';');
                fun += '</Place>\n';
                //abstraction of architecture implementation
                implementation = architecturefinition.slice(endbracket + 1);
                implementation = delblank(implementation);
                fun += VHDLf(implementation);
                //abstraction of output ports
                fun += '<Place name=\"Output\">\n';
                var outputport = portdefinition.slice(outputindex);
                fun += VHDLf(outputport + ';');
                fun += '</Place>\n';
                //architecture ends
                fun += '</Path>\n';

            }
            else
            //Add the architecture definition next to the funcdtion call
            {

                //architecturefinition=architecturefinition+';';
                //alert(architecturefinition);
                //alert(VHDL);
                var str1 = VHDL.slice(0, VHDL.indexOf(entity_name + ' port map'));
                var str2 = VHDL.slice(VHDL.indexOf(entity_name + ' port map'));
                var str3 = str2.slice(0, str2.indexOf(';') + 1);
                var str4 = str2.slice(str2.indexOf(';') + 1);
                //rewrite VHDL = str1 + str3 + architecturefinition + str4
                VHDL = str1 + str3 + 'archdef_start;' + architecturefinition + 'archdef_end;' + str4;
            }

            VHDL = VHDL.slice(end_architecture);
            //VHDL=VHDL.slice(VHDL.indexOf(';')+1);
            VHDL = delblank(VHDL);
            break;



        case 'process':
            //Jie's code: Represent process as a path caused by a cause (sensitive list)
            var causename = VHDL.slice(VHDL.indexOf("(") + 1, VHDL.indexOf(")"))
            causename = causename.replace(/\s/g, "");
            var processname = 'VHDL_Process_' + causename;
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");
            //fun+='<Place name=\"'+processname+'\">\n'+'<Path name=\"'+processname+'\">\n';
            fun += '<Cause name=\"' + processname + '\" >\n';
            fun += '<Path name=\"process_' + pathname + '\" >\n';
            //alert(processname);
            var end_process = End_match(VHDL, keywords);
            var processdefinition = VHDL.slice(VHDLline.length, end_process - 4);
            processdefinition = delblank(processdefinition);

            //alert(processdefinition);
            // abstraction of implementation
            delblank(processdefinition);
            fun += VHDLf(processdefinition + ';');

            fun += '</Path>\n';
            fun += '</Cause>\n';

            var end_process = End_match(VHDL, keywords);

            VHDL = VHDL.slice(end_process);
            //VHDL=VHDL.slice(VHDL.indexOf('end process'));
            //VHDL=VHDL.slice(VHDL.indexOf(';')+1);
            //fun+=VHDLf(VHDL);
            //alert(VHDL);
            //VHDL=VHDL.slice(VHDL.indexOf('end'));
            //VHDL=VHDL.slice(VHDL.indexOf(';')+1);
            //VHDL=delblank(VHDL);	
            //alert(VHDL);
            break;




        case 'oper':

            fun += placeOp(VHDLline, 0, 'VHDL');



            VHDL = VHDL.slice(VHDLline.length);
            VHDL = delblank(VHDL);
            break;

        case 'assign':

            fun += placeAssign(VHDLline, 0, 'VHDL');


            VHDL = VHDL.slice(VHDLline.length)
            VHDL = delblank(VHDL);
            break;

        case 'if':
            var causename = VHDLline.slice(VHDLline.indexOf("if ") + 3);
            causename = causename.replace(/\s/g, "");
            causename = causename.replace(/\=/g, "==");
            causename = causename.replace(/\'/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += "<Cause name=\"" + causename + "\" >" + "\n";
            fun += "<Path name=\" f_" + pathname + "\" >" + "\n";

            var end_cause = End_match(VHDL, keywords);
            if (end_cause == -1)
            break;

            var cause_func = VHDL.slice(VHDLline.length, end_cause);

            fun += VHDLf(cause_func + ';');

            fun += "</Path>\n</Cause>" + "\n";

            VHDL = VHDL.slice(end_cause)
            VHDL = delblank(VHDL);
            break;

        case 'else':
            fun += "<Cause name=\"else\">" + "\n"
            fun += "<Path name=\" f_N_" + pathname + "\" >" + "\n";

            VHDL = delblank(VHDL);
            end_cause = End_match(VHDL, keywords);
            if (end_cause == -1)
            break;
            cause_func = VHDL.slice(VHDLline.length, end_cause);
            fun += VHDLf(cause_func + ';');

            fun += "</Path>\n </Cause>" + "\n";

            VHDL = VHDL.slice(end_cause)
            VHDL = delblank(VHDL);
            break;




        case 'for':
            VHDLline = VHDL.slice(0, VHDL.indexOf(';'));
            Templine1 = VHDLline.slice(0, VHDLline.indexOf('for ') + 4) + '(';
            Tempvariable = VHDLline.slice(VHDLline.indexOf('for ') + 4, VHDLline.indexOf(' in '));
            Lower = VHDLline.slice(VHDLline.indexOf(' in ') + 4, VHDLline.indexOf(' to '));
            Upper = VHDLline.slice(VHDLline.indexOf(' to ') + 4);
            while (Upper.indexOf(' ') != -1)
            {
                Upper = Upper.replace(' ', '');
            }
            VHDLlineTemp = 'for(' + Tempvariable + '=' + Lower + ';' + Tempvariable + '&lt' + Upper + ';' + Tempvariable + '=' + Tempvariable + '+1' + ')';


            var state_for = VHDLlineTemp.slice(VHDLlineTemp.indexOf("(") + 1, VHDLlineTemp.indexOf(")"));
            state_for = delblank(state_for);

            var ini_for = state_for.slice(0, state_for.indexOf(';'));
            var ini_var = ini_for.slice(0, ini_for.indexOf('='));
            fun += placeAssign(ini_for, 0, 'VHDL');

            state_for = state_for.slice(state_for.indexOf(';') + 1, state_for.length);
            state_for = delblank(state_for);


            var cause_for = state_for.slice(0, state_for.indexOf(';'));


            state_for = state_for.slice(state_for.indexOf(';') + 1);
            state_for = delblank(state_for);

            var for_end = state_for;

            causename = cause_for.replace(/\s/g, "");

            var pathname = cause_path(causename);

            pathname = pathname.replace(/\s/g, "");

            fun += "<Cause name=\"" + causename + "\" type=\"loop\">" + "\n";
            fun += "<Path name=\" f_" + pathname + "\" >" + "\n";

            end_cause = End_match(VHDL, keywords);
            if (end_cause == -1)
            break;

            cause_func = VHDL.slice(VHDLline.length, end_cause);


            fun += VHDLf(cause_func + ';');


            var inputn_cause_func = new Array();
            var outputn_cause_func = new Array();

            ini_var = ini_var.replace('&nbsp;', ' ');
            if (ini_var.indexOf(' ') > 0)
            {
                var ini_var_type = split_type(ini_var);
                ini_var = split_variable(ini_var);
                inputn_cause_func[0] = ini_var_type + ' ' + ini_var;
                outputn_cause_func[0] = ini_var_type + ' ' + ini_var;
            }
            else
            {
                var ini_var_type = DefaultType;
                inputn_cause_func[0] = ini_var_type + ' ' + ini_var;
                outputn_cause_func[0] = ini_var_type + ' ' + ini_var;
            }


            fun += "</Path>\n";

            fun += "<Path name=\"" + ini_var + "_update" + "\" >" + "\n" + input_xml(inputn_cause_func, 0, 'VHDL');

            fun += VHDLf(for_end + ';');
            fun += output_xml(outputn_cause_func, 0, 'VHDL')
            fun += "</Path>\n";

            fun += "</Cause>" + "\n";


            VHDL = VHDL.slice(end_cause)
            VHDL = delblank(VHDL);
            break;


        case 'funcCall':
            place = placefunc_VHDL(VHDLline, VHDL)
            fun += place
            VHDL = VHDL.slice(VHDLline.length);
            VHDL = VHDL.slice(VHDL.indexOf('archdef_end;') + 12);
            VHDL = delblank(VHDL);
            break;

        case 'component':
            var end_component = End_match(VHDL, keywords);

            VHDL = VHDL.slice(end_component);
            //VHDL=VHDL.slice(VHDL.indexOf(';')+1);
            VHDL = delblank(VHDL);
            break;

        case 'end':
            VHDL = VHDL.slice(VHDLline.length)
            VHDL = delblank(VHDL);
            break;

        case 'null':
            VHDL = VHDL.slice(VHDLline.length)
            VHDL = delblank(VHDL);
            break;
        default:
            VHDL = VHDL.slice(VHDLline.length)
            VHDL = delblank(VHDL);
            alert('wrong code in VHDL:' + VHDLline);
            alert('VHDL is ' + VHDL)

        }
    }
    return fun;
}



function VHDL_XML()
/*The main function to abstract VHDL and generate corresponding XML code*/
 {
    VHDL = Source_input.value + ';';
    VHDL = VHDL_code_format(VHDL);
    //VHDL=code_format(VHDL);
    TempVariable = VHDL;
    i = 0;
    while (indexOfwhole(TempVariable, 'entity') != -1)
    {
        i = i + 1;
        TempVariable = TempVariable.slice(TempVariable.indexOf('entity') + 6, TempVariable.length);
    }
    /*if (i<2)
    	xml=VHDLf(VHDL);
    else
    {
    	xml='<Path name=\"main\">\n';
    	xml+=VHDLf(VHDL);
    	xml+='</Path>';
    }*/
    xml = VHDLf(VHDL);
    xml = xml.replace(/&gt/g, "&gt; ");
    xml = xml.replace(/&lt/g, "&lt; ")
    //xml_input.value=xml;	
    return xml;

}


///////////////////////////////////////Matlab---->xml
function read_line(matlabmain)
/*Read a line from the top of the matlab code;
Usually we use ';' to seperate each line; However, if a line has an un-balanced bracket, we need to read forward until the bracket is balanced
matlabmain: the matlab code
*/

 {
    console.log(matlabmain);
    if (matlabmain.indexOf(";") == -1){
        //added by Xingzhong 
        var matlabline = matlabmain;
    }
    else{
        var matlabline = matlabmain.slice(0, matlabmain.indexOf(";"));
    }
    if (matlabline.indexOf('[') > -1)
    //read all the contents in []
    {
        matlabline = matlabline.slice(0, matlabmain.indexOf('['));
        var matlabmain_temp = matlabmain.slice(matlabmain.indexOf('['))
        var end_vector = bracket_match(matlabmain_temp, '[');
        matlabline = matlabline + matlabmain_temp.slice(0, end_vector);

        matlabmain_temp = matlabmain_temp.slice(end_vector);
        matlabline = matlabline + read_line(matlabmain_temp);
    }

    if (matlabline.indexOf('(') > -1)
    // read all the contents in ()
    {
        matlabline = matlabline.slice(0, matlabmain.indexOf('('));
        var matlabmain_temp = matlabmain.slice(matlabmain.indexOf('('))
        var end_vector = bracket_match(matlabmain_temp, '(');

        matlabline = matlabline + matlabmain_temp.slice(0, end_vector);

        matlabmain_temp = matlabmain_temp.slice(end_vector);
        matlabline = matlabline + read_line(matlabmain_temp);

    }
    console.log(matlabline);
    return matlabline;
}

function line_preprocess(matlabline)
/*Pre-Process the operation embedded in () or []
Basically, this is to handle the operations inside () or []
matlabline: a code line
*/
 {


    var matlabline_temp = matlabline;
    var regex1 = new RegExp(/(\(|\[)/);

    var result = regex1.exec(matlabline_temp);
    while (result != null)

    {
        if (result[0] == '(')
        {

            var index_bracket = matlabline_temp.indexOf('(');
            var bracket = '(';
        }
        else
        {
            var index_bracket = matlabline_temp.indexOf('[');
            var bracket = '[';
        }


        var code_inside = matlabline_temp.slice(index_bracket);

        var end_bracket = bracket_match(code_inside, bracket);
        code_inside = code_inside.slice(1, end_bracket - 1);

        //alert('The matlab line is:'+matlabline)
        //alert('The code inside is:'+code_inside)
        while (code_inside != '')
        {


            var split_index = code_inside.indexOf(',');
            if (split_index == -1 || (code_inside.indexOf(';') > -1 && split_index > code_inside.indexOf(';')))
            split_index = code_inside.indexOf(';');

            if (split_index == -1)
            {
                var code_process = code_inside;
                code_inside = '';
            }
            else
            {
                var code_process = code_inside.slice(0, split_index);
                code_inside = code_inside.slice(split_index + 1);
            }



            var new_var = Name_gen(code_process);
            var line_add = new_var + '=' + code_process + ';';

            //alert('The line add is:'+line_add);
            if (line_type(line_add, General_Keywords) != 'assign')
            {
                line_add = line_preprocess(line_add);

                //alert('The line add is:'+line_add);
                //alert('The code process is:'+code_process);
                matlabline = line_add + ';' + matlabline.replace(code_process, new_var);

            }
        }

        matlabline_temp = matlabline_temp.slice(index_bracket + end_bracket);

        result = regex1.exec(matlabline_temp);

    }



    return matlabline;
}

function matlabf(matlabmain, ind_level)
/*The core function of Matlab abstraction and XML generation
  matlabmain: the matlab code
  ind_level: the indent level (to format the code display)
  */
 {
    var lab = 0
    var fun = ""
    matlabmain = delblank(matlabmain);


    while (matlabmain.length != 0)
    {

        var matlabline = read_line(matlabmain);
        
        var type_line = line_type(matlabline, General_Keywords);

        if (type_line == 'assign' || type_line == 'oper' || type_line == 'funcCall')
        // Preprocess each line of the Matlab, If composit operation is included in () or [], add some lines to matlabmain
        {
            matlabmain = matlabmain.slice(matlabline.length);
            matlabline = line_preprocess(matlabline);

            matlabmain = matlabline + matlabmain;
            matlabline = read_line(matlabmain);
            type_line = line_type(matlabline, General_Keywords);
        }


        //     matlabline=matlabline.replace(/;/g,"")
        //alert(matlabline)


        switch (type_line)
        {
        case 'null':
            matlabmain = matlabmain.slice(matlabline.length);
            matlabmain = delblank(matlabmain);
            break;
        case 'oper':

            place = placeOp(matlabline, ind_level, 'Matlab');
            fun += place;
            matlabmain = matlabmain.slice(matlabline.length)
            matlabmain = delblank(matlabmain);
            break;

        case 'assign':


            place = placeAssign(matlabline, ind_level, 'Matlab');

            fun += place;
            matlabmain = matlabmain.slice(matlabline.length)
            matlabmain = delblank(matlabmain);
            break;

        case 'if':
            var causename = matlabline.slice(matlabline.indexOf("(") + 1, matlabline.lastIndexOf(")"))
            causename = causename.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += indent_xml(ind_level) + "<Cause name=\"" + causename + "\" >" + "\n";
            ind_level += 1;
            fun += indent_xml(ind_level) + "<Path name=\" f_" + pathname + "\" >" + "\n";
            ind_level += 1;

            var end_cause = End_match(matlabmain, General_Keywords);
            if (end_cause == -1)
            break;

            var cause_func = matlabmain.slice(matlabline.length, end_cause);

            fun += matlabf(cause_func, ind_level);

            ind_level -= 1
            fun += indent_xml(ind_level) + "</Path>\n";
            ind_level -= 1;
            fun += indent_xml(ind_level) + "</Cause>" + "\n";

            matlabmain = matlabmain.slice(end_cause)
            matlabmain = delblank(matlabmain);
            break;

        case 'else':
            fun += indent_xml(ind_level) + "<Cause name=\"else\">" + "\n"
            ind_level += 1;
            fun += indent_xml(ind_level) + "<Path name=\" f_N_" + pathname + "\" >" + "\n";
            ind_level += 1;




            matlabmain = delblank(matlabmain);
            end_cause = End_match(matlabmain, General_Keywords);
            if (end_cause == -1)
            break;
            cause_func = matlabmain.slice(matlabline.length, end_cause);
            fun += matlabf(cause_func, ind_level);

            ind_level -= 1
            fun += indent_xml(ind_level) + "</Path>\n";
            ind_level -= 1;
            fun += indent_xml(ind_level) + "</Cause>" + "\n";

            matlabmain = matlabmain.slice(end_cause)
            matlabmain = delblank(matlabmain);
            break;
        case 'elseif':
            fun += indent_xml(ind_level) + "<Cause name=\"else\">" + "\n"
            ind_level += 1;
            fun += indent_xml(ind_level) + "<Path name=\" f_N_" + pathname + "\" >" + "\n";
            ind_level += 1;

            matlabmain = matlabmain.replace('elseif', "if");

            var cause_func = '';

            do {
                end_cause = End_match(matlabmain, General_Keywords);
                cause_func += matlabmain.slice(0, end_cause);
                matlabmain = matlabmain.slice(end_cause);
                matlabmain = delblank(matlabmain);
            }
            while (matlabmain.indexOf('else') == 0);

            fun += indent_xml(ind_level) + matlabf(cause_func + ';');

            ind_level -= 1
            fun += indent_xml(ind_level) + "</Path>\n";
            ind_level -= 1;
            fun += indent_xml(ind_level) + "</Cause>" + "\n";

            break;




        case 'for':
            //			matlabline=matlabmain.slice(0,matlabmain.indexOf(')')+1);
            matlabline = deleteblank(matlabline);
            var state_for = deleteblank(matlabline.slice(3));

            if (state_for.indexOf('(') == 0)
            {
                var end_bracket = bracket_match(state_for, '(');
                state_for = state_for.slice(1, end_bracket - 1);
            }

            state_for = delblank(state_for);


            var var_for = state_for.slice(0, state_for.indexOf('='));
            var var_value = deleteblank(state_for.slice(state_for.indexOf('=') + 1));


            if (var_value.indexOf('[') == 0)
            {
                var set_register = 'register_' + var_for + '=' + var_value + ';';
                //Save all the values of index to a register
                fun += placeAssign(set_register, ind_level, 'Matlab');
                var ini_for = var_for + '_i=1'
                var cause_for = var_for + '_i&ltregister_' + var_for + '.length+1';
                var for_end = var_for + '_i++;'
                var cause_func = var_for + '=' + 'register_' + var_for + '(' + var_for + '_i);';
            }
            else
            {
                if (var_value.indexOf(':') > -1)
                {
                    var ini_for = var_for + '=' + var_value.slice(0, var_value.indexOf(':'));
                    var_value = var_value.slice(var_value.indexOf(':') + 1);
                    if (var_value.indexOf(':') > -1)
                    {
                        var for_end = var_for + '+=' + var_value.slice(0, var_value.indexOf(':')) + ';';
                        var_value = var_value.slice(var_value.indexOf(':') + 1);

                    }
                    else
                    {
                        var for_end = var_for + '+=1;'
                    }

                    if (IsNumeric(var_value) == true)
                    var var_size = parseInt(var_value) + 1;
                    else
                    var var_size = var_value + '+1';
                    var cause_for = var_for + '&lt' + var_size;
                    var cause_func = '';
                }
                else
                {
                    alert('wrong code:' + state_for);
                    break;
                }
            }



            fun += placeAssign(ini_for, ind_level, 'Matlab');



            causename = cause_for.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += indent_xml(ind_level) + "<Cause name=\"" + causename + "\" type=\"loop\">" + "\n";
            ind_level += 1;
            fun += indent_xml(ind_level) + "<Path name=\" f_" + pathname + "\" >" + "\n";
            ind_level += 1;



            var end_cause = End_match(matlabmain, General_Keywords);
            if (end_cause == -1)
            break;
            cause_func += matlabmain.slice(matlabline.length + 1, end_cause);
            cause_func += for_end;

            fun += matlabf(cause_func, ind_level);


            ind_level -= 1
            fun += indent_xml(ind_level) + "</Path>\n";
            ind_level -= 1;
            fun += indent_xml(ind_level) + "</Cause>" + "\n";


            matlabmain = matlabmain.slice(end_cause)
            matlabmain = delblank(matlabmain);

            break;


        case 'funcCall':
            // changed by Ning Han for waveform level: the chages are inside placefunc function
            //alert('i am here funccall')
            place = placefunc(matlabline, ind_level)
            fun += place
            matlabmain = matlabmain.slice(matlabline.length)
            matlabmain = delblank(matlabmain);
            //alert('the matlab code is '+matlabmain)
            break;

        case 'end':
            matlabmain = matlabmain.slice(matlabline.length)
            matlabmain = delblank(matlabmain);
            break;

            /*while and switch case added by Fangming and Xingzong******************************/
        case 'while':
            //matlabline=matlabmain.slice(0,matlabmain.indexOf(')')+1);//
            var cause_while = matlabline.slice(matlabline.indexOf("(") + 1, matlabline.indexOf(")"))
            cause_while = delblank(cause_while);
            //fun +="<Cause name =\""+causename+"\">"+"\n";
            causename = cause_while.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += indent_xml(ind_level) + "<Cause name=\"" + causename + "\" type=\"loop\">" + "\n";
            ind_level += 1;
            fun += indent_xml(ind_level) + "<Path name=\" f_" + pathname + "\" >" + "\n";
            ind_level += 1;

            //matlabmain=matlabmain.slice(c_main.indexOf('{'));
            //matlabmain=delblank(matlabmain);
            var end_cause = End_match(matlabmain, General_Keywords);
            if (end_cause == -1)
            break;
            var cause_func = matlabmain.slice(matlabline.length + 1, end_cause);

            fun += matlabf(cause_func, ind_level);

            ind_level -= 1
            fun += indent_xml(ind_level) + "</Path>\n";
            ind_level -= 1;
            fun += indent_xml(ind_level) + "</Cause>" + "\n";

            matlabmain = matlabmain.slice(end_cause);
            matlabmain = delblank(matlabmain);
            break;
        case 'switch':
            var sw_code = new switchclass(matlabmain);
            matlabmain = sw_code.next;
            fun += sw_code.xml;
            matlabmain = delblank(matlabmain);
            break;


        default:
            matlabmain = matlabmain.slice(matlabline.length)
            matlabmain = delblank(matlabmain);
            //alert('wrong code in Matlab:'+type_line+matlabline);
            break;

        }

    }
    return fun
}

function Matlab_XML()
/*The main function for Matlab abstraction and XML generation*/
 {

    var_list[0] = new Array();
    //name of varibles
    var_list[1] = new Array();
    //size of varibales
    var_list[2] = new Array();
    //type of varibales

    var matlab = Source_input.value + ";";

    matlab = code_format(matlab, 'Matlab');
    //matlab=matlabcode_format(matlab);// Added by Ning
    if (matlab.indexOf("function ") != -1)
    {
        var matlabmain = matlab.slice(0, matlab.indexOf("function "))
        func = matlab.slice(matlab.indexOf("function "))
    }
    else
    {
        var matlabmain = matlab;
        func = "";
    }
    matlabmain = delblank(matlabmain);

    //seq=0
    var xml = ""
    //lab=0
    var ind_level = 0;

    if (matlabmain.length == 0)
    {
        matlabmain = matlab.slice(matlab.indexOf('function') + 8, matlab.indexOf(";") + 1);
    }



    var matlabline = matlabmain.slice(0, matlabmain.indexOf(";"));
    var lab0 = 0
    if (matlabmain.length != 0)
    {

        xml += "<Path name=\"" + "main\" >" + "\n"
        ind_level += 1;
        lab0 = 1

    }
    xml += matlabf(matlabmain, ind_level);
    if (lab0 == 1)
    {

        xml += "</Path>"
    }
    lab0 = 0

    //lab=0
    xml = xml.replace(/&gt/g, "&gt; ");
    xml = xml.replace(/&lt/g, "&lt; ")
    // xml_input.value=xml;
    return xml;
}


/////////////////////////////////////////////////////////////C--> XML
//Global Variable
var funcs_all;
//List of all the functions in C code
////////////////////////////////
function bracket_match(str, bracket)
/*Match the bracket in a code (Find the closing bracket matched to the current bracket)
str: The code string
bracket: '(', '[' or '{'
*/
 {
    var c_temp = delblank(str);
    var match_index = 0;

    if (bracket == '{')
    var match_bracket = '}';
    if (bracket == '[')
    var match_bracket = ']';
    if (bracket == '(')
    var match_bracket = ')';

    if (c_temp.indexOf(bracket) == 0)
    {
        var bracket_index = 1;
        c_temp = c_temp.slice(1, c_temp.length);
        match_index += 1;
        while (bracket_index > 0)
        {

            if (c_temp.indexOf(bracket) > -1 && c_temp.indexOf(bracket) < c_temp.indexOf(match_bracket))
            {
                bracket_index += 1;
                match_index = match_index + c_temp.indexOf(bracket) + 1;
                c_temp = c_temp.slice(c_temp.indexOf(bracket) + 1, c_temp.length);

            }
            else
            {
                if (c_temp.indexOf(match_bracket) > -1)
                {
                    bracket_index = bracket_index - 1;
                    match_index = match_index + c_temp.indexOf(match_bracket) + 1;
                    c_temp = c_temp.slice(c_temp.indexOf(match_bracket) + 1, c_temp.length);

                }
                else
                {
                    alert(match_bracket + ' is missed in the code');
                    alert(str)
                    break;
                }
            }
        }
    }
    else
    {
        alert('no ' + bracket + ' to match');
        alert(str);

    }
    return match_index;
}

function search_func(str)
/*Search all the functions in the source code for C/C++
str: the source code
*/
 {
    var funcs = new Array();
    funcs[0] = new Array();
    //name of function
    funcs[1] = new Array();
    //definition of funciton
    funcs[2] = new Array();
    //content of function
    funcs[3] = new Array();
    //added by liu
    var i = 0;
    var str_temp = delblank(str);
    var classFlag = -1;
    //added by liu; for C++
    while (str_temp.length > 0)
    {

        //Begin: added by Liu;
        tempFunc = delblank(str_temp.slice(str_temp.indexOf(' ') + 1, str_temp.indexOf('(')));
        bracketInd = tempFunc.indexOf('{');
        //alert('tempFunc:'+tempFunc)
        //alert(bracketInd)
        //alert('str_temp:'+str_temp)
        if (bracketInd > -1)
        {
            str_temp = str_temp.slice(str_temp.indexOf('{'), str_temp.length);
            matchBracketInd = bracket_match(str_temp, '{');
            str_temp = str_temp.slice(matchBracketInd, str_temp.length);
            //alert(str_temp)
            continue;
        }
        if (tempFunc.indexOf('::') > -1)
        {
            funcs[0][i] = delblank(tempFunc.slice(tempFunc.indexOf('::') + 2, tempFunc.length));
            funcs[3][i] = delblank(tempFunc.slice(tempFunc.indexOf(' ') + 1, tempFunc.indexOf('::')));
        }
        else
        {
            funcs[0][i] = delblank(tempFunc)
            funcs[3][i] = 'main';
        }
        //alert(funcs[0][i])
        //alert(funcs[3][i])
        //End: added by Liu;
        //funcs[0][i]=delblank(str_temp.slice(str_temp.indexOf(' ')+1,str_temp.indexOf('(')));		
        //alert(funcs[0][i])
        funcs[1][i] = delblank(str_temp.slice(0, str_temp.indexOf(';')));
        //alert(funcs[1][i])
        //alert(str_temp)
        str_temp = str_temp.slice(str_temp.indexOf('{'), str_temp.length);
        var match_index = bracket_match(str_temp, '{');

        funcs[2][i] = str_temp.slice(1, match_index - 1);
        //alert(funcs[2][i])
        str_temp = str_temp.slice(match_index, str_temp.length);
        str_temp = delblank(str_temp);
        //alert(str_temp.length)
        i += 1;
    }
    return funcs;
}

function read_pathoutput_c(path_def, path_content)
/*Read the output variable for a path (function defintion) in C
 path_def: the function declaration statement (the head of the function definition
 path_content: the body of the function definition
 */
 {
    path_def = deleteblank(path_def);

    var type = path_def.slice(0, path_def.indexOf(' '));

    var func_name = deleteblank(path_def.slice(path_def.indexOf(' '), path_def.indexOf('(')));
    var variable = '';
    var outputn = new Array();

    var i = path_content.indexOf('return ');
    var label = 0;
    if (i == -1 || i < path_content.indexOf('return('))
    {
        i = path_content.indexOf('return(');
        label = 1;
    }
    if (i == -1)
    {
        variable = '';
        //alert('no return is found in the function '+func_name);
        //break;
    }
    else
    {
        var str1 = path_content.slice(0, i);
        if (str1.indexOf('return ') > -1 || str1.indexOf('return(') > -1)
        varaible = func_name + '_output';
        else
        {
            variable = path_content.slice(i, path_content.length);
            variable = variable.slice(0, variable.indexOf(';'));
            variable = deleteblank(variable);
            if (label == 0)
            {
                variable = variable.slice(variable.indexOf(' '), variable.length);
                variable = deleteblank(variable);
            }
            else
            {
                variable = variable.slice(variable.indexOf('(') + 1, variable.indexOf(')'));
                variable = deleteblank(variable);
            }
        }
    }

    if (type == 'void' || variable == '')
    {}
    else
    outputn[0] = type + ' ' + variable;

    return outputn;

}

function pathoutputfunc_c(path_def, path_content)
/*Read the output variable for a path (function defintion) in C and generate XML code for it
 path_def: the function declaration statement (the head of the function definition
 path_content: the body of the function definition
 */
{
    var outputn = read_pathoutput_c(path_def, path_content);
    var inputn = read_input(path_def);
    if (IORec && IORec.o){
        console.log("user defined output");
        console.log(IORec.o);
        var temp = new Array();
        for (var ind=0; ind<inputn.length; ind++){
            // for each variable declaration 
            var splitTemp = inputn[ind].match(/\w+/g);
            for (var ind2 = 0 ; ind2 < splitTemp.length; ind2++){
                if ( util_in_array( splitTemp[ind2] , IORec.o ) ){
                    //console.log("found:" +  splitTemp[ind2]  );
                    temp.push ( inputn[ind] );
                }
            }   
        }
        console.log(temp);
        outputn = temp;
    }
    var pathoutput_xml = output_xml(outputn, 0, 'C');
    //console.log(pathoutput_xml);
    return pathoutput_xml;
}


function placefunc_c(str)
/*Xml code generation for a source code line in C whose type is function call
  str: the code line
*/
 {
    // output=insertString(output,"<br />")
    //output=insertString(output,str)
    var place = ""
    var placeoutput2 = "";
    // W_Fangming He 2011-04-14
    if (str.indexOf("(") >= 0 && str.indexOf(")") >= 0)
    {

        place_inputn = read_input(str);
        //place += inputfunc(str,0,'C');
        var act = ""
        var funcname = ""
        funcname = str.slice(str.indexOf("=") + 1, str.indexOf("("))
        funcname = funcname.replace(/\s/g, "")
        var actname = Action_recognize(funcname, 'C');

        if (language != 'C++') {
            // add by liu Apr15.2011 11PM
            /******************************W_Fangming He 2011-04-14***************************************/
            for (var m = 0; m < SigBase[1].length; m++)
            {
                if ((SigBase[1][m] == funcname) && (IndSize[m] == 1))
                {
                    var outhing = place_inputn.pop();
                    placeoutput2 += "<Place name = \"Output\"> \n";
                    placeoutput2 += "<Thing>" + outhing + "</Thing>\n";
                    placeoutput2 += "<Action>output</Action>\n";
                    placeoutput2 += "</Place>\n"
                    break
                }
                else if ((SigBase[1][m] == funcname) && (IndSize[m] == 0))
                {
                    var outhing = place_inputn[0];
                    placeoutput2 += "<Place name = \"Output\"> \n";
                    placeoutput2 += "<Thing>" + outhing + "</Thing>\n";
                    placeoutput2 += "<Action>output</Action>\n";
                    placeoutput2 += "</Place>\n"
                }
            }
            place += input_xml(place_inputn, 0, 'C');
            /*******************************************************************************************/
        }
        // add by liu Apr15.2011 11PM
        var l = 0


        for (var i = 1; i < funcs_all[0].length; i++)
        {
            if (funcs_all[0][i] == actname)
            {
                l = 1;

                var pathinput_xml = inputfunc(funcs_all[1][i], 0, 'C')

                var pathoutput_xml = pathoutputfunc_c(funcs_all[1][i], funcs_all[2][i]);
                break;
            }
        }


        if (l == 0)
        {
            act = "<Place name=\"" + funcname + "\"> " + "\n" + "<Thing>" + place_inputn[0] + "</Thing>" + "\n" + "<Action>" + actname + "</Action>" + "\n" + "</Place>" + "\n";
        }
        else
        {
            //act="<Place name=\""+funcname+"\"> "+"\n"+"<Path name=\""+actname+"\"> "+"\n"+pathinput_xml+"\n"+cf(funcs_all[2][i])+pathoutput_xml+"</Path>"+"\n"+"</Place>"+"\n";
            act = "<Place name=\"" + funcname + "\"> " + "\n" + "<Path name=\"" + actname + "\"> " + "\n" + pathinput_xml + "\n" + cf(funcs_all[2][i]) + "</Path>" + "\n" + "</Place>" + "\n";
        }
        placeoutput = outputfunc(str, 0, 'C');
        //place=place+"\n"+act+placeoutput;
        place = place + "\n" + act + placeoutput + placeoutput2;
        //Fangming He 2011-04-13

    }
    else
    {
        place = "<Place name=\"" + str + "\" >" + "\n" + "</Place>" + "\n"
    }

    return place
}

function cause_path(causename)
/*Generate the name of the path initiated by a cause
causename: the name of the cause*/
 {
    var pathname = causename.replace(/==/g, 'E');
    pathname = pathname.replace(/&gt/g, 'L');
    pathname = pathname.replace(/&lt/g, 'S');
    //pathname='f_'+pathname;
    return pathname;
}

function IsNumeric(sText)
/*Test if a string is a numeric value or not
sText: the string
*/
 {
    var ValidChars = "0123456789.-";
    var IsNumber = true;
    var Char;
    for (i = 0; i < sText.length && IsNumber == true; i++)
    {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1)
        {
            IsNumber = false;
        }
    }
    return IsNumber;

}

/**************************Xingzhong Added function******************/
/* Function splitit() sepreate the code by pairs of the { and }.
    ** Input: code string format 
    ** Output: first {} substing 
    */
function splitit(data) {
    var regex1 = new RegExp("\{|\}", "g");
    //matching { or } symbol
    var stack = new Array;
    var start;
    var end;
    var stack2 = new Array;
    while ((result = regex1.exec(data)) != null) {
        if (result == "\{") {
            stack.push(regex1.lastIndex);
        }
        else {
            start = stack.pop();
            if (stack.length == 0) {
                end = regex1.lastIndex;
                break;
            }
        }
    }
    stack2.push(data.substring(start, end - 1));
    stack2.push(start);
    stack2.push(end);
    return stack2;
}

/* function replaceAt is method which belong to the String Class replace one data by 
    ** given index number
    ** Input: index the string postion which you want to replaced. char the changed character
     */
function caseandpath(data, name) {
    //extract all the case and followed information in stack, Xingzhong add for switch
    //var regex = new RegExp("(case|default)([^:]*):","g");
    var regex = new RegExp(/(case|default)\s*([^:]*):/g);
    //matching case whatever : or default whatever :
    var stack = new Array;
    var index;
    var statement = "!(";
    while ((result = regex.exec(data)) != null) {
        if (result[1] == "case") {
            //if meet case, generate "variable == statement"
            stack.push(name + "==" + result[2]);
            statement += "(" + name + "==" + result[2] + ")||";
        }
        else {
            stack.push(statement.slice(0, -2) + ")");
        }
        index = regex.lastIndex;
        path = splitit(data.substring(index));
        stack.push(path[0]);
        index = path[0].length;
        regex.lastIndex = regex.lastIndex + index;
    }
    for (i = 1; i < stack.length; i += 2) {
        //add all the other statement followed by one case
        for (j = i + 2; j < stack.length; j += 2) {
            stack[i] += stack[j];
        }
    }
    for (i = 1; i < stack.length; i += 2) {
        //delete the statement followed by first break
        stack[i] = stack[i].replace(/break.+/, "");
    }
    alert(stack);
    return stack;
}

function makecause(data) {
    var output = new String;
    var number;
    output = "";
    for (number = 0; number < data.length; number = number + 2) {
        output += "<Cause name=\"" + data[number] + "\" type=\"once\">\n";
        output += "<Path name=\"" + "P_" + data[number].replace(/==/, "EQ") + "\">\n";
        output += cf(data[number + 1]);
        output += "</Path>\n";
        output += "</Cause>\n";
    }
    return output;
}

function getvar(data) {
    var regex = new RegExp(/\(([^\(\)]+)\)/);
    //matching the string that in the ()
    return regex.exec(data)[1];
}

String.prototype.replaceAt = function(index, char) {
    return this.substr(0, index) + char + this.substr(index + char.length);
}

function switchclass(data) {
    this.code = data;
    this.variable = getvar(this.code);
    this.casecode = splitit(this.code)[0];
    this.eachcase = caseandpath(this.casecode, this.variable);
    this.xml = makecause(this.eachcase);
    this.next = this.code.slice(splitit(this.code)[2]);
}

function ifandpath(DATA) {
    var output = new String;
    output = "";
    function recause(data) {
        //recurisivly estabilish the if, else, else if structure
        if (data.length > 0) {
            if (data[0] == "else if") {
                output += "<Cause name=\"else\" type=\"once\">";
                output += "<Path name=\"P_" + data.length + "\">";
                data[0] = "if";
                recause(data);
                output += "</Path>";
                output += "</Cause>";
            }
            else {
                output += makecause(data.slice(1, 3));
                data.shift();
                data.shift();
                data.shift();
                recause(data);
            }
        }
    }
    recause(DATA);
    return output;
}

function eachif(data) {
    var regex = new RegExp(/if|else\s+if|else/g);
    //matching if, else, else if
    var stack = new Array;
    while ((result = regex.exec(data)) != null) {
        stack.push(result);
        index = regex.lastIndex;
        if (result == "else")
        stack.push("else");
        else
        stack.push(getvar(data.substring(index)));
        path = splitit(data.substring(index));
        stack.push(path[0]);
        index = path[0].length;
        regex.lastIndex = index + regex.lastIndex;
    }
    return stack;
}

function ifclass(data) {
    this.code = data;
    this.autocode = autocomplete(this.code);
    this.current = ifnext(this.autocode)[0];
    this.next = ifnext(this.autocode)[1];
    this.ifcode = eachif(this.current);
    this.xml = ifandpath(this.ifcode);
}

function ifnext(data) {
    regex = new RegExp(/(\w+)\b/g);
    //matching the next word
    head = "";
    tail = data;
    stack = new Array;
    while (1) {
        result = splitit(tail);
        head = head + tail.substring(0, result[2]);
        tail = tail.substring(result[2]);
        regex.lastIndex = 0;
        str = regex.exec(tail);
        if (str == null || str[1] != "else") {
            stack.push(head);
            stack.push(tail);
            return stack;
        }
    }
}

function autocomplete(data) {
    regex1 = new RegExp(/((if\([^\(\)]+\))|(else\s*(if\([^\(\)]+\))?))\s*(\{)?/g);
    //matching the first { which followed the if or else if
    regex2 = new RegExp(/;/g);
    //matching the statement ;
    data = data.replace(/\s;/g, "  ");
    //replace the unuseful ;
    while ((result = regex1.exec(data)) != null) {
        if (result[5] != "{") {
            index = regex1.lastIndex;
            data = data.substring(0, index) + "{" + data.substring(index);
            regex2.lastIndex = index;
            result = regex2.exec(data);
            if (result == ";") {
                index = regex2.lastIndex;
                data = data.substring(0, index) + "}" + data.substring(index);
            }
        }
    }
    return data;
}

function replaceplus2(str){
	// replace the double plus to normal expr eg. i++ => i=i+1
	// Xingzhong
	var patt1 = /(\w+)\s*\+\+/g;
	var patt2 = /(\w+)\s*--/g;
	console.log(str);
	str = str.replace(patt1, "$1 = $1 + 1");
	str = str.replace(patt2, "$1 = $1 - 1");
	console.log(str);
	return str;
}
/********************************************************************/

function cf(c_main)
/* The core function for C abstraction and XML generation
 c_main: the C code
 */
 {
	
    var fun = ""
    var variables_declared = new Array();
    c_main = replaceplus2(c_main);
    variables_declared[0] = new Array();
    variables_declared[1] = new Array();
    ind_dec = 0;

    while (c_main.length != 0)
    {
        var c_line = c_main.slice(0, c_main.indexOf(";"))
        c_line = deleteblank(c_line);

        c_line = c_line.replace(/;/g, "")
        var type_line = line_type(c_line, General_Keywords);

        switch (type_line)
        {
        case 'null':
            //blank
            c_main = c_main.slice(c_line.length)
            c_main = delblank(c_main);
            break;
        case 'varDec':
            // variable declaration
            /*
	     		
	     		
	     		/********************************Fangming He Inserted******************************/
            var type = c_line.slice(0, c_line.indexOf(' '));
            //var size=1;
            if (c_line.indexOf('[') > -1)
            {
                var variable = c_line.slice(c_line.indexOf(' '), c_line.indexOf('['));
                //alert('hahahha')
                //var size=c_line.slice(c_line.indexOf('[')+1,c_line.indexOf(']'));
                var patt1 = /[0-9]{1,5}/g;
                //alert(patt1);//fangming test
                var size = c_line.match(patt1);
                //alert(size);//fangming test
                //var address = '&' + variable;
            }
            else if (c_line.indexOf('*') > -1)
            {
                var variable = c_line.slice(c_line.indexOf(' '), c_line.length);
                var address = c_line.slice(c_line.indexOf('*') + 1, c_line.length);
                point_list.push(address);
                //alert('point_list:'+point_list)
            }
            else
            {
                var variable = c_line.slice(c_line.indexOf(' '), c_line.length);
                var size = 1;
                //var address = '&'+ variable;
            }
            //variables_declared[0][ind_dec]=type;
            //variables_declared[1][ind_dec]=variable;
            ind_dec += 1;

            variable = deleteblank(variable);

            fun += '<Place name=\"Declaration\">\n';
            fun += '<Thing name=\"' + variable + '\">\n';

            if (c_line.indexOf('*') > -1) {
                fun += '<Place name=\"address">\n';
                fun += '<Thing>' + address + '</Thing>\n';
                fun += '<Action>SET</Action>\n';
                fun += '</Place>\n';
            }

            if (c_line.indexOf('[') > -1) {
                fun += '<Place name=\"size\">\n';
                fun += '<Thing>' + size + '</Thing>\n';
                fun += '</Place>\n';
            }

            fun += '<Place name=\"type">\n';
            fun += '<Thing>' + type + '</Thing>\n';
            fun += '<Action>SET</Action>\n';
            fun += '</Place>\n';

            //It may should be excluded from non pointer. Fangming Comments.

            fun += '</Thing>\n';
            fun += '</Place>\n';
            /**********************************************************************************/

            c_main = c_main.slice(c_line.length)
            c_main = delblank(c_main);
            break;
        case 'return':
            //return
            if (c_line.indexOf('(') == -1)
            {
                var variable = c_line.slice(c_line.indexOf(' ') + 1, c_line.length);
                variable = deleteblank(variable);
            }
            else
            {
                var variable = c_line.slice(c_line.indexOf('(') + 1, c_line.indexOf(')'));
                variable = deleteblank(variable);
            }
            fun += '<Place name=\"Return\">\n<Thing>' + variable + '</Thing>' + '\n<Action>' + 'return' + '</Action>\n</Place>\n';
            c_main = c_main.slice(c_line.length)
            c_main = delblank(c_main);
            break;
        case 'oper':
            //Operator
            fun += placeOp(c_line, 0, 'C');
            c_main = c_main.slice(c_line.length)
            c_main = delblank(c_main);
            break;
        case 'assign':
            // value assignment
            fun += placeAssign(c_line, 0, 'C');
            c_main = c_main.slice(c_line.length)
            c_main = delblank(c_main);
            break;
        case 'for':
            c_line = c_main.slice(0, c_main.indexOf(')') + 1);
            var state_for = c_line.slice(c_line.indexOf("(") + 1, c_line.indexOf(")"))
            state_for = delblank(state_for);

            var ini_for = state_for.slice(0, state_for.indexOf(';'));
            //initialization of for
            var ini_var = ini_for.slice(0, ini_for.indexOf('='));

            fun += placeAssign(ini_for, 0, 'C');

            state_for = state_for.slice(state_for.indexOf(';') + 1, state_for.length);
            state_for = delblank(state_for);

            var cause_for = state_for.slice(0, state_for.indexOf(';'));
            //cause of for
            state_for = state_for.slice(state_for.indexOf(';') + 1);
            state_for = delblank(state_for);
            var for_end = state_for;
            //end of for, update the index
            causename = cause_for.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += "<Cause name=\"" + causename + "\" type=\"loop\">" + "\n";
            fun += "<Path name=\" f_" + pathname + "\" >" + "\n";

            c_main = c_main.slice(c_main.indexOf('{'));
            c_main = delblank(c_main);
            var end_cause = bracket_match(c_main, '{');
            var cause_func = c_main.slice(1, end_cause - 1);

            fun += cf(cause_func);

            var inputn_cause_func = new Array();
            var outputn_cause_func = new Array();

            ini_var = ini_var.replace('&nbsp;', ' ');
            if (ini_var.indexOf(' ') > 0)
            {
                var ini_var_type = split_type(ini_var);
                ini_var = split_variable(ini_var);
                inputn_cause_func[0] = ini_var_type + ' ' + ini_var;
                outputn_cause_func[0] = ini_var_type + ' ' + ini_var;
            }
            else
            {
                var label = 0;
                for (var ind = 0; ind < variables_declared[1].length; ind++)
                if (ini_var == variables_declared[1][ind])
                {
                    var ini_var_type = variables_declared[0][ind];
                    label = 1;
                    break;
                }
                if (label == 0)
                var ini_var_type = DefaultType;
                inputn_cause_func[0] = ini_var_type + ' ' + ini_var;
                outputn_cause_func[0] = ini_var_type + ' ' + ini_var;
            }

            fun += cf(for_end + ';');

            fun += "</Path>\n";
            /*
		        fun+= "<Path name=\""+ini_var+"_update"+"\" >"+"\n"+input_xml(inputn_cause_func);

	            fun+=cf(for_end+';');
	            fun+=output_xml(outputn_cause_func)
             	fun+="</Path>\n";*/

            fun += "</Cause>" + "\n";


            c_main = c_main.slice(end_cause + 1);
            c_main = delblank(c_main);
            break;
        case 'if':
            var causename = c_line.slice(c_line.indexOf("(") + 1, c_line.indexOf(")"))
            causename = causename.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += "<Cause name=\"" + causename + "\" type=\"once\">" + "\n";
            fun += "<Path name=\" f_" + pathname + "\" >" + "\n";

            c_main = c_main.slice(c_main.indexOf('{'));
            c_main = delblank(c_main);
            var end_cause = bracket_match(c_main, '{');
            var cause_func = c_main.slice(1, end_cause - 1);


            fun += cf(cause_func);


            fun += "</Path>\n </Cause>" + "\n";


            c_main = c_main.slice(end_cause + 1);
            c_main = delblank(c_main);
            break;
        case 'else':
            fun += "<Cause name=\"else\"" + " type=\"once\">" + "\n";
            fun += "<Path name=\" f_N_" + pathname + "\" >" + "\n";

            if (c_line.search(/else\s+if/) != -1) {
                //else if has been found
                c_main = c_main.replace(/else\s+/, "");
                nextif = ifnext(c_main);
                fun += cf(nextif[0]);
                fun += "</Path>\n </Cause>" + "\n";
                c_main = nextif[1];
            }
            else
            {
                c_main = c_main.slice(c_main.indexOf('{'));
                c_main = delblank(c_main);
                end_cause = bracket_match(c_main, '{');
                cause_func = c_main.slice(1, end_cause - 1);
                fun += cf(cause_func);

                fun += "</Path>\n </Cause>" + "\n";

                c_main = c_main.slice(end_cause + 1);
                c_main = delblank(c_main);
            }
            break;
        case 'funcCall':

            place = placefunc_c(c_line);
            fun += place;
            c_main = c_main.slice(c_line.length)
            c_main = delblank(c_main);
            break;

            /*while and switch case added by Fangming and Xingzong******************************/
        case 'while':
            c_line = c_main.slice(0, c_main.indexOf(')') + 1);
            //
            var cause_while = c_line.slice(c_line.indexOf("(") + 1, c_line.indexOf(")"))
            cause_while = delblank(cause_while);
            //fun +="<Cause name =\""+causename+"\">"+"\n";
            causename = cause_while.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += "<Cause name=\"" + causename + "\" type=\"loop\">" + "\n";
            fun += "<Path name=\" f_" + pathname + "\" >" + "\n";

            c_main = c_main.slice(c_main.indexOf('{'));
            c_main = delblank(c_main);
            var end_cause = bracket_match(c_main, '{');
            //return matched index. Fangming Comments.
            var cause_func = c_main.slice(1, end_cause - 1);
            fun += cf(cause_func);

            fun += "</Path>\n";
            fun += "</Cause>" + "\n"

            c_main = c_main.slice(end_cause + 1)
            c_main = delblank(c_main);
            break;
        case 'switch':
            var sw_code = new switchclass(c_main);
            c_main = sw_code.next;
            fun += sw_code.xml;
            c_main = delblank(c_main);
            break;

            Default:
            alert("Pleast input a correct C code:\n" + c_line);
            break;
        }
    }
    //fun +="</Path>\n </Cause>"+"\n"
    //console.log(fun);
    return fun
}

function C_XML()
/*The main function for C abstraction and xml generation*/
 {
    var c_code = Source_input.value + ";";
    c_code = code_format(c_code, 'C');
    c_code = delblank(c_code);
    //	var lab0=0;
    //seq=0
    var xml = ""
    lab = 0

    funcs_all = search_func(c_code);



    var c_main = funcs_all[2][0];
    var pathname = funcs_all[0][0];
    pathname = pathname.replace(/\s/g, "");
    xml += "<Path name=\"" + pathname + "\" >" + "\n" + inputfunc(funcs_all[1][0], 0, 'C');

    c_main = delblank(c_main);


    xml += cf(c_main);
    xml += pathoutputfunc_c(funcs_all[1][0], funcs_all[2][0]) + "</Path>\n"

    lab = 0
    xml = xml.replace(/&gt/g, "&gt; ");
    xml = xml.replace(/&lt/g, "&lt; ")
    //xml_input.value=xml;
    return xml;


}
///////////////////////////////////////////
//C++ abstraction
////////////////////////////////////////////
// Added by Liu begin:  search class -----------------------------------------------------
// Added by Liu begin:  search class -----------------------------------------------------
function search_class(str)
 {
    var classes = new Array();
    var exceptClass = ['if', 'while', 'else', 'elseif', 'for'];
    var flag = -1;
    classes[0] = new Array();
    //name of class
    classes[1] = new Array();
    //definition of class
    classes[2] = new Array();
    //content of class
    classes[3] = new Array();
    //inherit of class
    var i = 0;
    var str_temp = delblank(str);
    while (str_temp.length > 0)
    {

        class_name = str_temp.slice(str_temp.indexOf(' ') + 1, str_temp.indexOf('{'));
        // alert(class_name)
        if (class_name.indexOf('(') >= 0)
        {
            for (j = 0; j <= exceptClass.length - 1; j++)
            {
                if (delblank(str_temp.slice(str_temp.indexOf(' ') + 1, str_temp.indexOf('('))) == exceptClass[j])
                {
                    flag = 1;
                    //document.write(flag);
                }
            }
            if (flag == 1)
            {
                break;
            }
            //document.write(flag);
            classes[0][i] = delblank(str_temp.slice(str_temp.indexOf(' ') + 1, str_temp.indexOf('(')));

            //document.write(str_temp.slice(str_temp.indexOf(' ')+1,str_temp.indexOf('(')) + "<br />");			
        }
        else
        {
            for (j = 0; j <= exceptClass.length - 1; j++)
            {
                if (deleteblank(delblank(str_temp.slice(str_temp.indexOf(' ') + 1, str_temp.indexOf('{')))) == exceptClass[j])
                {
                    flag = 1;
                }
            }
            if (flag == 1)
            {
                break;
            }
            classes[0][i] = deleteblank(delblank(str_temp.slice(str_temp.indexOf(' ') + 1, str_temp.indexOf('{'))));
            // add by liu Apr.04.2011 12PM
            if (classes[0][i].indexOf(':') != -1 && classes[0][i].indexOf('::') == -1)
            {
                classes[3][i] = classes[0][i].slice(classes[0][i].indexOf(':') + 1, classes[0][i].length);
                classes[0][i] = classes[0][i].slice(0, classes[0][i].indexOf(':'));
            }
            else
            {
                classes[3][i] = "root";
            }
            // end by liu Apr.04.2011.12PM
            //document.write(str_temp.slice(str_temp.indexOf(' ')+1,str_temp.indexOf('{')) + "<br />");
            //document.write(classes[0][i] + "<br />")
        }
        classes[1][i] = delblank(str_temp.slice(0, str_temp.indexOf(';')));
        //document.write(str_temp.slice(0,str_temp.indexOf(';')) + "<br />");
        str_temp = str_temp.slice(str_temp.indexOf('{'), str_temp.length);
        var match_index = bracket_match(str_temp, '{');

        classes[2][i] = str_temp.slice(1, match_index - 1);

        //document.write(str_temp.slice(1,match_index-1) + "<br />");
        str_temp = str_temp.slice(match_index, str_temp.length);
        str_temp = delblank(str_temp);
        i += 1;

    }
    return classes;
}
// Added by Liu ends:
// Added by Liu Start;
function classPlaceFunc_cpp(str, funcs, instance_name)
/*  Xml code generation for a source code line in C++ which calls a member function of a class
  str: the code line
 funcs: the function list
 instance_name: the object name
 */


 {
    // output=insertString(output,"<br />")
    //output=insertString(output,str)
    var place = ""
    if (str.indexOf("(") >= 0 && str.indexOf(")") >= 0)
    {

        place_inputn = read_input(str);
        place += inputfunc(str, 0, 'C');
        var act = ""
        var funcname = ""
        funcname = str.slice(str.indexOf(" ") + 1, str.indexOf("("))
        funcname = funcname.replace(/\s/g, "")
        var actname = Action_recognize(funcname, 'C');
        //actname = instance_name+'_'+actname;
        //var l=0
        for (var i = 0; i < funcs[0].length; i++)
        {
            if (funcs[0][i] == actname)
            {
                //l=1;
                var pathinput_xml = inputfunc(funcs[1][i], 0, 'C')
                var pathoutput_xml = pathoutputfunc_c(funcs[1][i], funcs[2][i]);
                //alert(funcs[1][i])
                //alert(pathinput_xml)
                //alert(pathoutput_xml)
                break;
            }
        }

        //if (l==0)
        //{
        act = "<Place name=\"" + funcname + "\"> " + "\n" + "<Thing>" + place_inputn[0] + "</Thing>" + "\n" + "<Action>" + actname + "</Action>" + "\n" + "</Place>" + "\n";
        //}
        //else
        //{
        //	act="<Place name=\""+funcname+"\"> "+"\n"+"<Path name=\""+actname+"\"> "+"\n"+pathinput_xml+"\n"+cf(funcs[2][i])+pathoutput_xml+"</Path>"+"\n"+"</Place>"+"\n";
        //}
        //placeoutput=outputfunc(place_inputn+'='+str, 0, 'C');
        // //placeoutput=read_input(str);
        //place=place+"\n"+act+placeoutput;
        place = place + "\n" + act;
        //alert(act)
    }
    else
    {
        place = "<Place name=\"" + str + "\" >" + "\n" + "</Place>" + "\n"
    }

    //alert(place)
    return place
}

// Added by Liu End;
function isdec(str)
 {
    var lab_dec = 0;
    str = deleteblank(str);
    if (str.indexOf('(') == -1 && str.indexOf('=') == -1 && str.indexOf('{') == -1 && str.indexOf(' ') > -1)
    lab_dec = 1;
    return lab_dec;
}

function isFunc(str)
 {
    str = delblank(str);
    var label = 0;
    if (OperatorIndex(str) == -1 && str.indexOf('(') > 0 && str.indexOf('if ') == -1 && str.indexOf('if(') == -1 && str.indexOf('for ') == -1 && str.indexOf('for(') == -1 && str.indexOf('while ') == -1 && str.indexOf('while(') == -1 && str.indexOf('elseif ') == -1 && str.indexOf('elseif(') == -1)
    label = 1;
    return label;
}

// add by liu Apr11.2011.9PM
function search_func_cpp(str)
/*Search all the functions in the source code for C/C++
str: the source code
*/
 {
    var funcs = new Array();
    funcs[0] = new Array();
    //name of function
    funcs[1] = new Array();
    //definition of funciton
    funcs[2] = new Array();
    //content of function
    funcs[3] = new Array();
    //added by liu
    funcs[4] = new Array();
    // belong to which class;
    funcs[5] = new Array();
    // parameter type;
    var i = 0;
    var str_temp = delblank(str);
    var classFlag = -1;
    //added by liu; for C++
    while (str_temp.length > 0)
    {

        //Begin: added by Liu;
        tempFunc = delblank(str_temp.slice(str_temp.indexOf(' ') + 1, str_temp.indexOf('(')));
        bracketInd = tempFunc.indexOf('{');

        if (bracketInd > -1)
        {
            str_temp = str_temp.slice(str_temp.indexOf('{'), str_temp.length);
            matchBracketInd = bracket_match(str_temp, '{');
            str_temp = str_temp.slice(matchBracketInd + 1, str_temp.length);
            continue;
            // continue for classes;
        }

        if (tempFunc.indexOf('::') != -1)
        {
            funcs[0][i] = delblank(tempFunc.slice(tempFunc.indexOf('::') + 2, tempFunc.length));
            funcs[3][i] = delblank(tempFunc.slice(tempFunc.indexOf(' ') + 1, tempFunc.indexOf('::')));

            //funcs[4][i]=delblank(tempFunc.slice(tempFunc.indexOf(' '),tempFunc.indexOf('::')));
        }
        else
        {
            funcs[0][i] = delblank(tempFunc)
            funcs[3][i] = 'main';
        }
        //End: added by Liu;
        funcs[1][i] = delblank(str_temp.slice(0, str_temp.indexOf(';')));

        // function parameters extraction;
        if (funcs[1][i].indexOf('::') != -1)
        {
            funcDef = funcs[1][i];
            var cBracketInd = funcDef.indexOf('(');
            match_cBracketInd = funcDef.indexOf(')');;

            var funcPara = delblank(funcDef.slice(cBracketInd + 1, match_cBracketInd));
            var commaInd = funcPara.indexOf(',');
            if (commaInd == -1)
            {
                var paraBlankInd = funcPara.indexOf(' ');
                funcs[5][i] = delblank(funcPara.slice(0, paraBlankInd));
            }
            else
            {
                var tempFuncPara = '';
                while (funcPara.length != 0)
                {
                    if (commaInd != -1)
                    {
                        var tmp1 = funcPara.slice(0, commaInd);
                        var tmp2 = tmp1.slice(0, tmp1.indexOf(' '));
                        tempFuncPara = tempFuncPara + tmp2 + '#';

                        funcPara = delblank(funcPara.slice(commaInd + 1, funcPara.length));
                        commaInd = funcPara.indexOf(',');
                    }
                    else
                    {
                        spaceInd = funcPara.indexOf(' ');
                        tempFuncPara = tempFuncPara + delblank(funcPara.slice(0, spaceInd));
                        break;
                    }
                }

                funcs[5][i] = tempFuncPara;
            }
        }
        // end function parameters extraction;

        str_temp = str_temp.slice(str_temp.indexOf('{'), str_temp.length);
        var match_index = bracket_match(str_temp, '{');

        funcs[2][i] = str_temp.slice(1, match_index - 1);

        str_temp = str_temp.slice(match_index, str_temp.length);
        str_temp = delblank(str_temp);

        i += 1;
    }
    return funcs;
}

function cppf(cpp_main)
/*The core function for C++ abstraction and XML generation
cpp_main: the C++ code
*/

 {

    var fun = ""
    var variables_declared = new Array();
    var class_declared = new Array();
    // added by Liu;
    var classFunc_declared = new Array();
    // added by Liu;
    variables_declared[0] = new Array();
    variables_declared[1] = new Array();
    ind_dec = 0;

    class_declared[0] = new Array();
    // added by Liu;
    class_declared[1] = new Array();
    // added by Liu;
    ind_class = 0;
    // added by Liu;
    while (cpp_main.length != 0)
    {
        var cpp_line = cpp_main.slice(0, cpp_main.indexOf(";"))
        cpp_line = deleteblank(cpp_line);

        cpp_line = cpp_line.replace(/;/g, "");
        cpp_line = cpp_line.replace(/\./g, "_")
        // added by liu;
        var type_line = line_type(cpp_line, General_Keywords);

        /**********************************Add by Liu Apr11.2011. 5PM**************************************/
        if (type_line == 'assign' || type_line == 'oper' || type_line == 'funcCall')
        {
            cpp_main = cpp_main.slice(cpp_line.length);
            cpp_line = line_preprocess(cpp_line);
            cpp_main = cpp_line + cpp_main;

            cpp_line = cpp_main.slice(0, cpp_main.indexOf(";"))
            cpp_line = deleteblank(cpp_line);
            cpp_line = cpp_line.replace(/;/g, "")
            //alert('c_line='+c_line);//fangming 2011-04-03;
            type_line = line_type(cpp_line, General_Keywords);
        }
        //End by liu Apr11.2011. 5PM

        switch (type_line)
        {
        case 'null':
            //blank
            cpp_main = cpp_main.slice(cpp_line.length)
            cpp_main = delblank(cpp_main);
            break;
        case 'varDec':
            // variable declaration
            /*
	     		var type=cpp_line.slice(0,cpp_line.indexOf(' '));
	        	var variable=cpp_line.slice(cpp_line.indexOf(' '),cpp_line.length);
        	
	        	variables_declared[0][ind_dec]=type;
	        	variables_declared[1][ind_dec]=variable;
	        	ind_dec+=1;
        	
	     		variable=deleteblank(variable);
	     		//fun+='<Place name=\"Declaration\">\n<Thing>'+variable+'</Thing>'+'\n<Action>'+type+'</Action>\n</Place>\n';
	     		fun+='<Place name=\"Declaration\">\n<Thing name=\"'+variable+'\">\n'+'<Place name=\"type\">\n'+'<Thing>'+type+'</Thing>\n<Action>set</Action>\n</Place>\n'+'</Thing>'+'\n<Action>Declaration</Action>\n</Place>\n';
	     		cpp_main=cpp_main.slice(cpp_line.length)
	 			cpp_main=delblank(cpp_main);
	     		break;
	     		*/

            // Added by Liu begin
            var class_name = cpp_line.slice(0, cpp_line.indexOf(' '));
            class_name = deleteblank(class_name);
            //document.write(class_name)
            //var flagVec=new Array();
            var flagVec = -1;
            var p = 0;
            for (p = 0; p <= classes_all[0].length - 1; p++)
            {
                //document.write(classes_all[0][i])
                //flagVec[i]=-1;
                if (class_name == classes_all[0][p])
                {
                    //flagVec[i]=i;
                    flagVec = p;
                }
            }

            if (flagVec == -1)
            {
                // Add by Liu Apr09.2011 5PM
                var keywordIndex = indexOfKeywords(cpp_line, General_Type_Keywords);
                var type = cpp_line.slice(0, cpp_line.indexOf(keywordIndex[1]) + keywordIndex[1].length);
                var variable = cpp_line.slice(cpp_line.indexOf(keywordIndex[1]) + keywordIndex[1].length + 1, cpp_line.length);
                // End by Liu Apr09.2011 5PM
                //var type=cpp_line.slice(0,cpp_line.indexOf(' '));
                //var variable=cpp_line.slice(cpp_line.indexOf(' '),cpp_line.length);
                variables_declared[0][ind_dec] = type;
                variables_declared[1][ind_dec] = variable;
                ind_dec += 1;

                variable = deleteblank(variable);
                //fun+='<Place name=\"Declaration\">\n<Thing>'+variable+'</Thing>'+'\n<Action>'+type+'</Action>\n</Place>\n';
                fun += '<Place name=\"Declaration\">\n<Thing name=\"' + variable + '\">\n' + '<Place name=\"type\">\n' + '<Thing>' + type + '</Thing>\n<Action>set</Action>\n</Place>\n' + '</Thing>' + '\n<Action>Declaration</Action>\n</Place>\n';
                cpp_main = cpp_main.slice(cpp_line.length)

            }
            else
            {
                var instance_name = cpp_line.slice(cpp_line.indexOf(' '), cpp_line.length);
                instance_name = deleteblank(instance_name);
                //fun+='<Place name=\"Declaration\">\n<Thing name=\"'+instance_name+'\">\n'+'<Place name=\"type\">\n'+'<Thing>'+class_name+'\n';
                fun += '<Place name=\"CDeclaration\">\n<Thing name=\"' + instance_name + '\">\n' + '<Place name=\"type\">\n' + '<Thing name=\"' + class_name + '">\n';
                // added at Apr.01.2011
                //document.write(instance_name)
                class_declared[0][ind_class] = class_name;
                class_declared[1][ind_class] = instance_name;
                ind_dec += 1;

                cpp_main = cpp_main.slice(cpp_line.length);
                // Add instance name on the variable or function in class content;
                var updateClass_content;
                var class_content = classes_all[2][flagVec];
                //document.write(class_content)

                var i = 0;
                // Function in Class index;
                var var_ind = 0;
                // Variables in Class;
                var class_funcs = new Array();
                // add by liu Apr12.2011.8PM
                class_funcs[0] = new Array();
                //name of function // add by liu Apr12.2011.8PM
                class_funcs[1] = new Array();
                //definition of funciton // add by liu Apr12.2011.8PM
                class_funcs[2] = new Array();
                //content of function // add by liu Apr12.2011.8PM
                while (class_content.length != 0)
                {

                    var class_line = class_content.slice(0, class_content.indexOf(";"))
                    class_line = deleteblank(class_line);
                    class_line = class_line.replace(/;/g, "");
                    var type_classline = line_type(class_line, General_Keywords);

                    /**********************************Add by Liu Apr12.2011. 5PM**************************************/
                    if (type_line == 'assign' || type_line == 'oper' || type_line == 'funcCall')
                    {
                        class_content = class_content.slice(class_line.length);
                        class_line = line_preprocess(class_line);
                        class_content = class_line + class_content;

                        class_line = class_content.slice(0, class_main.indexOf(";"))
                        class_line = deleteblank(class_line);
                        class_line = class_line.replace(/;/g, "")
                        type_line = line_type(class_line, General_Keywords);
                    }
                    //End by liu Apr12.2011. 5PM

                    switch (type_classline)
                    {
                    case 'null':
                        class_content = class_content.slice(class_line.length)
                        class_content = delblank(class_content);
                        break;
                    case 'varDec':
                        //variable declaration in class
                        var varClass_type = class_line.slice(0, class_line.indexOf(' '));
                        var varClass_name = class_line.slice(class_line.indexOf(' '), class_line.length);
                        varClass_name = instance_name + '_' + varClass_name;
                        //updateClass_line=varClass_type+' '+varClass_name+';';
                        updateClass_line = varClass_type + ' ' + varClass_name + ';';
                        // add by liu Apr09.2011 5PM
                        // updateClass_line=varClass_type+' '+instance_name+'_'+varClass_name+';'; // comment by liu Apr09.2011 5PM
                        //document.write(updateClass_line)
                        //fun+=
                        var_ind += 1;
                        //
                        varClass_name = deleteblank(varClass_name);
                        //
                        fun += '<Place name=\"Declaration\">\n<Thing name=\"' + varClass_name + '\">\n' + '<Place name=\"type\">\n' + '<Thing>' + varClass_type + '</Thing>\n<Action>set</Action>\n</Place>\n' + '</Thing>' + '\n<Action>Declaration</Action>\n</Place>\n';
                        //
                        //alert(varClass_name)
                        class_content = class_content.slice(class_line.length);
                        // cpp_main=updateClass_line+cpp_main; // comment by liu Apr12.2011 12AM
                        break;
                    case 'funcDec':
                        // var class_funcs=new Array(); // comment by liu Apr12.2011.8PM
                        // class_funcs[0]=new Array();//name of function // comment by liu Apr12.2011.8PM
                        // class_funcs[1]=new Array();//definition of funciton // comment by liu Apr12.2011.8PM
                        // class_funcs[2]=new Array();//content of function // comment by liu Apr12.2011.8PM
                        class_funcs[0][i] = instance_name + '_' + class_content.slice(class_content.indexOf(' ') + 1, class_content.indexOf('('));
                        //alert(class_funcs[0][i])
                        //class_funcs[1][i]=class_content.slice(0,class_content.indexOf(';'));
                        class_funcs[1][i] = class_content.slice(0, class_content.indexOf(' ')) + ' ' + instance_name + '_' + class_content.slice(class_content.indexOf(' ') + 1, class_content.indexOf(';'));




                        /*
								class_content=class_content.slice(class_content.indexOf('{'),class_content.length);
								
								var match_index=bracket_match(class_content, '{');								
							
								class_funcs[2][i]=class_content.slice(1,match_index-1);
								class_content=class_content.slice(match_index,class_content.length);
							
								//********************************************
								funcs_all[0][funcs_all[0].length]=deleteblank(class_funcs[0][i]);
								funcs_all[1][funcs_all[1].length]=deleteblank(class_funcs[1][i]);
								funcs_all[2][funcs_all[2].length]=deleteblank(class_funcs[2][i]);
							
															
								//********************************************
								//alert(class_funcs[0][i])
								//alert(funcs_all[0][funcs_all[0].length])
							
								// construction function;				*/
                        var tmpFuncName = delblank(class_line.slice(class_line.indexOf(' ') + 1, class_line.indexOf('(')));
                        // add by liu Apr12.2011.10PM
                        for (var m = 0; m <= funcs_all[3].length; m++)
                        {
                            if (class_name == funcs_all[3][m] && tmpFuncName == funcs_all[0][m])
                            //add by liu Apr12.2011 10PM
                            // if(class_name==funcs_all[3][m]) // comment by liu Apr12.2011 10PM
                            {
                                class_funcs[2][i] = funcs_all[2][m];
                            }
                        }

                        //class_content=class_content.slice(class_content.indexOf('{'),class_content.length);
                        //var match_index=bracket_match(class_content, '{');
                        //class_funcs[2][i]=class_content.slice(1,match_index-1);								
                        //class_content=class_content.slice(match_index,class_content.length);
                        class_content = class_content.slice(class_content.indexOf(';'), class_content.length);

                        //********************************************
                        funcs_all[0][funcs_all[0].length] = deleteblank(class_funcs[0][i]);
                        funcs_all[1][funcs_all[1].length] = deleteblank(class_funcs[1][i]);
                        funcs_all[2][funcs_all[2].length] = deleteblank(class_funcs[2][i]);

                        //********************************************
                        place = classPlaceFunc_cpp(class_line, class_funcs, instance_name);
                        //alert(place)
                        fun += place;
                        i += 1;
                        break;
                    default:
                        class_content = class_content.slice(class_line.length);
                    }


                }
                if (classes_all[3][flagVec] != null && classes_all[3][flagVec] != "root")
                {
                    fun += '<Place name=\"Inheritance\">\n<Thing>' + classes_all[3][flagVec] + '</Thing>\n<Action>inherit</Action>\n</Place>\n';
                }

                fun += '</Thing>\n<Action>set</Action>\n</Place>\n' + '</Thing>' + '\n<Action>Declaration</Action>\n</Place>\n';
            }


            cpp_main = delblank(cpp_main);
            break;
            // Added by Liu ends;


        case 'return':
            //return
            if (cpp_line.indexOf('(') == -1)
            {
                var variable = cpp_line.slice(cpp_line.indexOf(' ') + 1, cpp_line.length);
                variable = deleteblank(variable);
            }
            else
            {
                var variable = cpp_line.slice(cpp_line.indexOf('(') + 1, cpp_line.indexOf(')'));
                variable = deleteblank(variable);
            }
            fun += '<Place name=\"Return\">\n<Thing>' + variable + '</Thing>' + '\n<Action>' + 'return' + '</Action>\n</Place>\n';
            cpp_main = cpp_main.slice(cpp_line.length)
            cpp_main = delblank(cpp_main);
            break;
        case 'oper':
            //Operator
            fun += placeOp(cpp_line, 0, 'C');
            cpp_main = cpp_main.slice(cpp_line.length)
            cpp_main = delblank(cpp_main);
            break;
        case 'assign':
            // value assignment
            fun += placeAssign(cpp_line, 0, 'C++');
            cpp_main = cpp_main.slice(cpp_line.length)
            cpp_main = delblank(cpp_main);
            break;
        case 'for':
            cpp_line = cpp_main.slice(0, cpp_main.indexOf(')') + 1);
            var state_for = cpp_line.slice(cpp_line.indexOf("(") + 1, cpp_line.indexOf(")"))
            state_for = delblank(state_for);

            var ini_for = state_for.slice(0, state_for.indexOf(';'));
            //initialization of for
            var ini_var = ini_for.slice(0, ini_for.indexOf('='));

            fun += placeAssign(ini_for, 0, 'C++');

            state_for = state_for.slice(state_for.indexOf(';') + 1, state_for.length);
            state_for = delblank(state_for);

            var cause_for = state_for.slice(0, state_for.indexOf(';'));
            //cause of for
            state_for = state_for.slice(state_for.indexOf(';') + 1);
            state_for = delblank(state_for);
            var for_end = state_for;
            //end of for, update the index
            causename = cause_for.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += "<Cause name=\"" + causename + "\" type=\"loop\">" + "\n";
            fun += "<Path name=\" f_" + pathname + "\" >" + "\n";

            cpp_main = cpp_main.slice(cpp_main.indexOf('{'));
            cpp_main = delblank(cpp_main);
            var end_cause = bracket_match(cpp_main, '{');
            var cause_func = cpp_main.slice(1, end_cause - 1);

            fun += cf(cause_func);

            var inputn_cause_func = new Array();
            var outputn_cause_func = new Array();

            ini_var = ini_var.replace('&nbsp;', ' ');
            if (ini_var.indexOf(' ') > 0)
            {
                var ini_var_type = split_type(ini_var);
                ini_var = split_variable(ini_var);
                inputn_cause_func[0] = ini_var_type + ' ' + ini_var;
                outputn_cause_func[0] = ini_var_type + ' ' + ini_var;
            }
            else
            {
                var label = 0;
                for (var ind = 0; ind < variables_declared[1].length; ind++)
                if (ini_var == variables_declared[1][ind])
                {
                    var ini_var_type = variables_declared[0][ind];
                    label = 1;
                    break;
                }
                if (label == 0)
                var ini_var_type = DefaultType;
                inputn_cause_func[0] = ini_var_type + ' ' + ini_var;
                outputn_cause_func[0] = ini_var_type + ' ' + ini_var;
            }

            fun += cf(for_end + ';');

            fun += "</Path>\n";
            /*
		        fun+= "<Path name=\""+ini_var+"_update"+"\" >"+"\n"+input_xml(inputn_cause_func);

	            fun+=cf(for_end+';');
	            fun+=output_xml(outputn_cause_func)
             	fun+="</Path>\n";*/

            fun += "</Cause>" + "\n";


            cpp_main = cpp_main.slice(end_cause + 1);
            cpp_main = delblank(cpp_main);
            break;
        case 'if':
            var causename = cpp_line.slice(cpp_line.indexOf("(") + 1, cpp_line.indexOf(")"))
            causename = causename.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += "<Cause name=\"" + causename + "\" type=\"once\">" + "\n";
            fun += "<Path name=\" f_" + pathname + "\" >" + "\n";

            cpp_main = cpp_main.slice(cpp_main.indexOf('{'));
            cpp_main = delblank(cpp_main);
            var end_cause = bracket_match(cpp_main, '{');
            var cause_func = cpp_main.slice(1, end_cause - 1);

            fun += cf(cause_func);


            fun += "</Path>\n </Cause>" + "\n";


            cpp_main = cpp_main.slice(end_cause + 1);
            cpp_main = delblank(cpp_main);
            break;
        case 'else':
            fun += "<Cause name=\"else\"" + " type=\"once\">" + "\n";
            fun += "<Path name=\" f_N_" + pathname + "\" >" + "\n";


            cpp_main = cpp_main.slice(cpp_main.indexOf('{'));
            cpp_main = delblank(cpp_main);
            end_cause = bracket_match(cpp_main, '{');
            cause_func = cpp_main.slice(1, end_cause - 1);
            fun += cf(cause_func);

            fun += "</Path>\n </Cause>" + "\n";

            cpp_main = cpp_main.slice(end_cause + 1);
            cpp_main = delblank(cpp_main);
            break;
        case 'funcCall':

            place = placefunc_c(cpp_line);
            fun += place;
            cpp_main = cpp_main.slice(cpp_line.length)
            cpp_main = delblank(cpp_main);
            break;

            /*while and switch case added by Fangming and Xingzong******************************/
        case 'while':
            cpp_line = cpp_main.slice(0, cpp_main.indexOf(')') + 1);
            //
            var cause_while = cpp_line.slice(cpp_line.indexOf("(") + 1, cpp_line.indexOf(")"))
            cause_while = delblank(cause_while);
            //fun +="<Cause name =\""+causename+"\">"+"\n";
            causename = cause_while.replace(/\s/g, "");
            var pathname = cause_path(causename);
            pathname = pathname.replace(/\s/g, "");

            fun += "<Cause name=\"" + causename + "\" type=\"loop\">" + "\n";
            fun += "<Path name=\" f_" + pathname + "\" >" + "\n";

            cpp_main = cpp_main.slice(cpp_main.indexOf('{'));
            cpp_main = delblank(cpp_main);
            var end_cause = bracket_match(cpp_main, '{');
            //return matched index. Fangming Comments.
            var cause_func = cpp_main.slice(1, end_cause - 1);
            fun += cf(cause_func);

            fun += "</Path>\n";
            fun += "</Cause>" + "\n"

            cpp_main = cpp_main.slice(end_cause + 1)
            cpp_main = delblank(cpp_main);
            break;
        case 'switch':
            var sw_code = new switchclass(cpp_main);
            cpp_main = sw_code.next;
            fun += sw_code.xml;
            cpp_main = delblank(cpp_main);
            break;

            Default:
            alert("Pleast input a correct C code:\n" + cpp_line);
            break;
        }
    }
    //fun +="</Path>\n </Cause>"+"\n"
    return fun
}

function CPP_XML()
/*The main function for C++ abstraction and XML generation*/
 {
    var cpp_code = Source_input.value + ";";
    cpp_code = code_format(cpp_code, 'C++');
    cpp_code = delblank(cpp_code);

    //	var lab0=0;
    //seq=0
    var xml = ""
    lab = 0


    funcs_all = search_func_cpp(cpp_code);
    // add by liu Apr11.2011
    //funcs_all=search_func(cpp_code);   // comment by liu Apr11. 2011
    classes_all = search_class(cpp_code);
    // added by Liu;

    var cpp_main = funcs_all[2][0];
    var pathname = funcs_all[0][0];
    pathname = pathname.replace(/\s/g, "");
    //xml += "<Path name=\""+pathname+"\" >"+"\n"+inputfunc(funcs_all[1][0],0,'C');
    cpp_main = delblank(cpp_main);

    // Added by Liu begins;
    // Classes Parsing;
    for (i = 0; i <= classes_all[0].length - 1; i++)
    //
    {
        if (classes_all[0][i] == 'main')
        {

            var pathname = classes_all[0][i];
            pathname = pathname.replace(/\s/g, "");

            xml += "<Path name=\"" + pathname + "\" >" + "\n";
            //
            var cpp_class = classes_all[2][i];
            cpp_class = delblank(cpp_class);
            xml += cppf(cpp_class);
            xml += "</Path>\n"
            xml += "\n"
        }
        else
        {
            /*
			var pathname=classes_all[0][i];
		    pathname= pathname.replace(/\s/g,"");
			
			xml += "<Path name=\""+pathname+"\" >"+"\n"; //
			xml += "<Path name=\""+pathname+"\" >"+"\n"; //
			var cpp_class=classes_all[2][i];
			cpp_class=delblank(cpp_class);
			//document.write(cpp_class)
			xml+=cf(cpp_class);
			xml+="</Path>\n"
			xml+="\n"
			*/

        }
    }
    // Added by Liu ends;
    //xml+=cf(c_main);
    //xml+=pathoutputfunc_c(funcs_all[1][0],funcs_all[2][0])+"</Path>\n"	
    lab = 0
    xml = xml.replace(/&gt/g, "&gt; ");
    xml = xml.replace(/&lt/g, "&lt; ")
    //xml_input.value=xml;
    return xml;

}
///////////////////////////////////////////
/////////////////////////////////////////////
/* The main function for the abstraction and representation.
This function is to generate XML code based on the souce code
entered in the webpage*/

function ToXML()
/* The main function for the abstraction and representation.
This function is to generate XML code based on the souce code
entered in the webpage*/

 {
    var source_type = document.getElementById("language").selectedIndex;
    if (source_type == 0)
    var xml = Matlab_XML();
    if (source_type == 1)
    var xml = C_XML();
    if (source_type == 2)
    var xml = CPP_XML();
    if (source_type == 3)
    var xml = VHDL_XML();

    xml_input.value = xml;
    Display_XML(document.getElementById('xml_display'), xml);
    return false;
}

////////////////////////////////////////////////////

function openMatlabExample1()
/*Open the first Matlab example: a simple transmitter*/
 {


    var matlab_code = 'if (Signal_arrival==1)\n Signal_Mod=Transmitter(Signal_Bit);\nend\n\nfunction Signal_Mod=Transmitter(Signal_Bit)\n Signal_Code_Bit=Channel_Coding(Signal_Bit);\n Signal_Mod=Modulation(Signal_Code_Bit);\nend';
    //file.Close();
    document.getElementById("Source_input").value = matlab_code;
    //alert(xml_code)
    //Source_input.appendChild("s");
    return false;

}

function openMatlabExample2()
/*Open the second Matlab example: adaptive modulator*/
 {

    var matlab_code = 'if(Signal_Arrival==1)\n    y=adaptive_mod(x,gamma);\nend\n\nfunction y=adaptive_mod(x, gamma)\nif (gamma>gamma_0)\n     y=mod_16QAM(x);\n  else\n     y=mod_QPSK(x);\nend\nend';
    //file.Close();
    //Source_input.value=matlab_code;     	//alert(xml_code)
    document.getElementById("Source_input").value = matlab_code;
}

function openMatlabExample3()
/*Open the third Matlab example: a FIR filter*/
 {
    var matlab_code = 'function y=FIR_filter(x,A)\n    N_x=length(x);\n    N_A=length(A);\n    for(n=1:N_A+N_x-1)\n        y(n)=0;\n        for(i=1:N_x)\n            if(n>i)\n                y(n)=y(n)+x(i)*A(n-i);\n            end\n        end\n    end\nend';
    document.getElementById("Source_input").value = matlab_code;
}

function openMatlabExample4()
/*Open the fourth Matlab example: a main function calling a FIR filter*/
 {
    var matlab_code = 'signal=[1.1,2.3,0.6];\ncoef=[0.3,0.8,0.4];\noutput=FIR_filter(signal,coef);\n\nfunction y=FIR_filter(x,A)\n    N_x=length(x);\n    N_A=length(A);\n    for(n=1:N_A+N_x-1)\n        y(n)=0;\n        for(i=1:N_x)\n            if(n>i)\n                y(n)=y(n)+x(i)*A(n-i);\n            end\n        end\n    end\nend';
    document.getElementById("Source_input").value = matlab_code;
}

function openMatlabExample5()
/*Open the fourth Matlab example: a main function calling a FIR filter*/
 {
    var matlab_code = '' +
    '% ofdm_example.m \n' +
    '% \n' +
    '% Simulation program to realize OFDM transmission system \n' +
    '% \n' +
    '%==preparation part==% \n' +
    'noc=4;    % Number of carrier \n' +
    'fftlen=noc; % FFT length \n' +
    'ml=2;       % Modulation level : QPSK \n' +
    'gilen=2;   % Length of guard interval (points) \n' +
    'nb = noc*ml; % Number of information bits \n' +


    '%=====transmitter=====% \n' +
    '%==data generation==% \n' +
    '%data=rand(1,nb);  %rand : built in function \n' +
    '%data0 = data>0.5; \n' +
    'data0 = [0,1,1,0]; \n' +

    '%==QPSK modulation==% \n' +
    'data1=qpskmod(data0); \n' +

    '%==IFFT==% \n' +
    'data2=ifft(data1,noc);  %ifft : built in function \n' +

    '%==gurad interval insertion==% \n' +
    'data3=giins(data2,fftlen,gilen); \n' +

    '%=====receiver=====% \n' +
    '%==guard interval removal==% \n' +
    'data4=girem(data3,fftlen,gilen); \n' +

    '%==FFT==% \n' +
    'data5=fft(data4,noc);  %fft : built in function \n' +

    '%==demoduration==% \n' +
    'data6=qpskdemod(data5); \n' +

    '%==end of file==% \n'
    document.getElementById("Source_input").value = matlab_code;
}

function openCExample1()
/*Open the first C example: a simple transmitter*/
 {
    var c_code = 'void main() {\n    double Signal_Bit;\n    double Signal_Mod;\n    if (Signal_arrival==1) {\n        Signal_Mod= Transmitter(Signal_Bit);\n    } \n}\n\ndouble Transmitter(double Signal_Bit) {\n    double Signal_Code_Bit;\n    double Signal_Mod;\n    Signal_Code_Bit=Channel_Coding(Signal_Bit);\n    Signal_Mod=Modulation(Signal_Code_Bit);\n    return(Signal_Mod);\n}';
    //file.Close();
    document.getElementById("Source_input").value = c_code;
    //alert(xml_code)
    //Source_input.appendChild("s");
    return false;

}

function openCExample2()
/*Open the second C example: adaptive modulator*/
 {
    var c_code = 'void main() {\n    double x;\n    double gamma;\n    double y;\n    if (Signal_Arrival==1) {\n        y= adaptive_mod(x,gamma);\n    } \n} \n\ndouble adaptive_mod(double x,double gamma) {\n    double y;\n    if (gamma> gamma_0) {\n        y= mod_16QAM(x);\n    } \n    else {\n        y= mod_QPSK(x);\n    } \n    return(y);\n}';
    //file.Close();
    document.getElementById("Source_input").value = c_code;
    //alert(xml_code)
    //Source_input.appendChild("s");
    return false;

}

function openCExample3()
/*Open the third C example: a main function calling a FIR filter*/
 {


    var c_code =
    'void main() {\n' +
    '    double signal[3]={1.1,2.3,0.6};\n' +
    '    double coef[3]={0.3,0.8,0.4};\n' +
    '    double output[5];\n\n' +
    '    output=FIR_filter(signal,coef);\n' +
    '}\n\n' +

    'double FIR_filter(double x[3],double A[3]) {\n' +
    '    int n;\n' +
    '    double y[5];\n' +
    '    int i;\n\n' +

    '  for(n=0;n<5;n=n+1){\n' +
    '       y[n]=0;\n' +
    '        for(i=0;i<3;i=i+1){\n' +
    '            if (n> i) {\n' +
    '                y[n]+=x[i]*A[n-i];\n' +
    '            } \n' +
    '        }\n' +
    '    }\n' +
    '    return(y);\n' +
    '}';
    //file.Close();
    document.getElementById("Source_input").value = c_code;
    //alert(xml_code)
    //Source_input.appendChild("s");
    return false;

}

function openCExample4()
/*Open the fourth C exmaple: Swap value through pointers*/
 {
    var c_code = 'void main()\n{\n  int *p;\n  int *q;\n   p=q;\n  *p=*q;\n  }';
    //file.Close();
    document.getElementById("Source_input").value = c_code;
    //alert(xml_code)
    //Source_input.appendChild("s");
    return false;
}

function openCExample5()
/*Open the fourth C exmaple: Swap address through pointers*/
 {


    var c_code = 'int main()	\n' +
    '{\n' +
    'int NumData=6; \n' +
    'int *Dest; \n' +
    'int FFT_Size=128; \n' +
    'int CP_Length=16; \n' +
    'int destsize; \n' +
    'int outputsize; \n' +
    'int output2size; \n' +
    'int CFFT_Size; \n' +
    'int source[6]={1,0,1,0,1,0}; \n' +

    'CFFT_Size=FFT_Size+CP_Length; \n' +

    'destsize=NumData*sizeof(int);\n' +
    'outputsize=CFFT_Size*sizeof(struct Complex); \n' +
    'output2size=FFT_Size*sizeof(struct Complex); \n' +

    'Complex *Output; \n' +
    'Complex *Output2; \n' +

    'Dest=malloc(destsize); \n' +
    'memset(Dest,0,destsize); \n' +

    'Output=malloc(outputsize); \n' +
    'memset(Output,0,outputsize); \n' +


    'Output2=malloc(output2size); \n' +
    'memset(Output2,0,output2size); \n' +


    'Modulator_QPSK(source, Output2); \n' +
    'SRIFFT(Output2,FFT_Size); \n' +

    'InsertCP(Output2,FFT_Size,CP_Length,Output); \n' +
    'RemCP(Output,FFT_Size,CP_Length,Output2); \n' +

    'SRFFT(Output2,FFT_Size); \n' +

    'DeModulator_QPSK(Output2,Dest); \n' +

    '} \n'

    //file.Close();
    document.getElementById("Source_input").value = c_code;
    //alert(xml_code)
    //Source_input.appendChild("s");
    return false;

}

function openVHDLADDER()
/*Open the first VHDL exmaple: Adder*/
 {
    var adder_code = '-------------------------------------\n-- VHDL code for 3-bit adder	\n-- by Yulong Zou, May/2010 \n---- function of adder:\n-- A plus B to get 2-bit sum and 1 bit carry	\n------------------------------------- \nentity ADDER is\nport(A:	in std_logic_vector(1 downto 0); \nB:	in std_logic_vector(1 downto 0);\ncarry:	out std_logic; \nsum:	out std_logic_vector(1 downto 0) \n); \n \nend ADDER;\n \n-------------------------------------\narchitecture behv of ADDER is\n-- define a temparary signal to store the result \nsignal result: std_logic_vector(2 downto 0);\nbegin \n-- the 3rd bit should be carry \nresult <= (\'0\'&A)+(\'0\'&B);\nsum <= result(1 downto 0);\ncarry <= result(2); \nend behv; \n-------------------------------------';
    document.getElementById("Source_input").value = adder_code;
    return false;
}

function openVHDLMULTIPLIER()
/*Open the second VHDL exmaple: Multiplier*/
 {
    var multiplier_code = '----------------------------------\n-- Example of doing multiplication showing \n-- (1) how to use variable with in process \n-- (2) how to use for loop statement \n-- (3) algorithm of multiplication \n-- by Yulong Zou, 07/2010 \n----------------------------------\n-- two 2-bit inputs and one 4-bit outputs \nentity multiplier is\nport( num1: in std_logic_vector(1 downto 0); \nnum2: in std_logic_vector(1 downto 0);\nproduct: out std_logic_vector(3 downto 0) \n); \nend multiplier; \narchitecture behv of multiplier is\nbegin \nprocess(num1, num2) \nvariable num1_reg: std_logic_vector(2 downto 0);\nvariable product_reg: std_logic_vector(5 downto 0);\nbegin \nnum1_reg <= \'0\' & num1;\nproduct_reg <= \'0000\' & num2;\n-- use variables doing computation \n-- algorithm is to repeat shifting and adding \nfor i in 1 to 3 loop \nif product_reg(0)=\'1\' then \nproduct_reg(5 downto 3) <= product_reg(5 downto 3) + num1_reg(2 downto 0);\nend if;\nproduct_reg(5 downto 0) <= \'0\' & product_reg(5 downto 1);\nend loop;\n-- assign the result of computation back to output signal\nproduct <= product_reg(3 downto 0);\nend process;\nend behv;';
    document.getElementById("Source_input").value = multiplier_code;
    return false;
}

function openVHDLcomponent()
/*Open the second VHDL exmaple: Gates*/

 {
    var component_code =
    '-----------------------------------------\n' +
    '-- Combinational Logic Design	\n' +
    '-- A simple example of VHDL Structure \n' +
    '-- Modeling\n' +
    '-- we might define two components in \n' +
    '-- two separate files,\n' +
    '-- in main file, we use port map \n' +
    '-- statement to instantiate \n' +
    '-- the mapping relationship between \n' +
    '-- each components \n' +
    '-- and the entire circuit.	\n' +
    '-----------------------------------------\n' +
    '\n' +
    'entity OR_GATE is\n' +
    'port(  	X:	in std_logic;\n' +
    '	Y:	in std_logic;\n' +
    '	F2:	out std_logic\n' +
    ');\n' +
    'end OR_GATE;\n' +
    '\n' +
    'architecture behv of OR_GATE is\n' +
    'begin\n' +
    'process(X,Y)\n' +
    'begin\n' +
    '	F2 <= X or Y;			\n' +
    'end process;\n' +
    'end behv;\n' +
    '\n' +
    '-----------------------------------------\n' +
    '\n' +
    'entity AND_GATE is\n' +
    'port(  	A:	in std_logic;\n' +
    '	B:	in std_logic;\n' +
    '	F1:	out std_logic\n' +
    ');\n' +
    'end AND_GATE;\n' +
    '\n' +
    'architecture behv of AND_GATE is\n' +
    'begin\n' +
    'process(A,B)\n' +
    'begin\n' +
    '	F1 <= A and B;			\n' +
    'end process;\n' +
    'end behv;\n' +
    '\n' +
    '-----------------------------------------\n' +
    '\n' +
    'entity comb_ckt is\n' +
    'port(	input1: in std_logic;\n' +
    '	input2: in std_logic;\n' +
    '	input3: in std_logic;\n' +
    '	output: out std_logic\n' +
    ');\n' +
    'end comb_ckt;\n' +
    '\n' +
    'architecture struct of comb_ckt is\n' +
    '\n' +
    '    component AND_GATE is		\n' +
    '    port(	A:	in std_logic;\n' +
    '    	 B:	in std_logic;\n' +
    '    	 F1:	out std_logic\n' +
    '    );\n' +
    '    end component;\n' +
    '\n' +
    '    component OR_GATE is		\n' +
    '    port(  X:	in std_logic;\n' +
    '              Y:	in std_logic;\n' +
    '              F2:	out std_logic\n' +
    '    );\n' +
    '    end component;\n' +
    '\n' +
    '    signal wire: std_logic;		\n' +
    '\n' +
    'begin\n' +
    '\n' +
    '    -- use sign "=>" to clarify the pin mapping\n' +
    '\n' +
    '    Gate1: AND_GATE port map (A=>input1, B=>input2, F1=>wire);\n' +
    '    Gate2: OR_GATE port map (X=>wire, Y=>input3, F2=>output);\n' +
    '\n' +
    'end behv;\n' +
    '   	 ';

    document.getElementById("Source_input").value = component_code;
    return false;
}

function openVHDLFIR()
/*Open the fourth VHDL exmaple:FIR filter*/

 {
    var FIR_code =
    '-------------------------------------------------------------------------------\n' +
    'entity simpleFIR is\n' +
    //'generic (\n'+
    //'  n : integer := 4;                     -- # of coef\n'+
    //'  m : integer := 4);                    -- # bits of input and coef\n'+
    '  port (\n' +
    '    x           : in  signed(3 downto 0);\n' +
    '    p           : in  signed(3 downto 0);\n' +
    '    clk, rst    : in  std_logic;\n' +
    '    y           : out signed(7 downto 0));\n' +
    'end simpleFIR;\n' +
    '\n' +
    'architecture a of simpleFIR is\n' +
    ' \n' +
    //'  type registers is array (2 downto 0) of signed(3 downto 0);\n'+
    //'  type coefficients is array (3 downto 0) of signed(3 downto 0);\n'+
    '  signal reg1 : registers;\n' +
    //'  constant coef : coefficients := ("0001","0010","0011","0100");\n'+
    ' \n' +
    'begin\n' +
    '  process (rst,clk)\n' +
    '  variable acc,prod : signed(7 downto 0) := (others=>0);\n' +
    '    variable sign : std_logic;\n' +
    '  begin  -- process\n' +
    '    if (rst =1) then\n' +
    '      for i in 2 downto 0 loop\n' +
    '        for j in 3 downto 0 loop\n' +
    '          reg1(i)(j) <= 0;              -- fill array with 0\n' +
    '        end loop;  -- j\n' +
    '      end loop;  -- i\n' +
    ' \n' +
    '    elsif (clk and clk=1) then\n' +
    '      acc := "0001"*x;\n' +
    '      for i in 1 to n-1 loop\n' +
    '        sign := acc(7); \n' +
    '        prod := coef(i)*reg1(3-i); \n' +
    '        acc := acc + prod;\n' +
    '        -- check for overflow\n' +
    '        if (sign=prod(prod)) and (acc(acc) /= sign) then\n' +
    '          -- acc := (acc => sign, others => not sign);\n' +
    '          -- NOTE: GHDL would not allow the above line, so had to hard code it.\n' +
    '          acc(7) := sign;\n' +
    '          acc(6 downto 0) := (others => not sign);\n' +
    '        end if;\n' +
    '      end loop;  -- i\n' +
    '      -- shuffle reg down\n' +
    '      reg1(0) <= reg1(1);\n' +
    '      reg1(1) <= reg1(2);\n' +
    '      reg1(2) <= x;\n' +
    '      \n' +
    '    end if;\n' +
    '    y <= acc;\n' +
    '  end process;\n' +
    '      \n' +
    'end a;\n' +
    ' ';

    document.getElementById("Source_input").value = FIR_code;
    return false;
}

function openCPPExample1()
/*Open the first C++ example: A simple radio system*/

 {
    var cpp_code = 'void main() {\n    channel channel1; \n  awgChannel awgChannel2; \n channelPara= channel1.setPara(channelPara);\n signal=awgChannel2.addNoise(channelPara2);\n }\n class awgChannel:channel{\n  double gNoise;\n double addNoise(double para);\n}\n  class channel{\n    double Noise;\n  double setPara(double para);\n}\n double channel::setPara(double para){\n para=add(para);\n return(para);\n }\n double awgChannel::addNoise(double para){\n para=add(para);\n return(para);\n }';
    
    document.getElementById("Source_input").value = cpp_code;
    return false;
}

function openCPPExample2()
/*Open the second C++ example: Adaptive modulator*/
 {
    var cpp_code = 'void main() {\n    channel channel1; \n         double channelPara;\n  double Signal_Mod;\n channelPara= channel1.setPara(channelPara);\n  if (Signal_arrival==1) {\n  Signal_Mod= Transmitter(Signal_Bit);\n    }\n    if (Signal_arrival==1) {\n     Signal_Bit=Receiver(Signal_Mod,channel1.Noise);\n    }\n }\n class channel{\n    double Noise;\n  double setPara(double para);\n}\n double channel::setPara(double para){\n para=add(para);\n return(para);\n }';

    document.getElementById("Source_input").value = cpp_code;
    return false;
}

function openCPPExample3()
 {
    var cpp_code = '' +
    'void main(){\n' +

    'const int inNfft;\n' +
    'const int inNcp;\n' +
    'const int inNupsample;\n' +
    'OFDM OFDM1;\n' +
    '\n' +
    'cvec input;\n' +
    'cvec output;\n' +
    '\n' +
    'input = OFDM1.setParameters(inNfft, inNcp, inNupsample);\n' +

    'output = OFDM1.modulate(input);\n' +

    'output = OFDM1.demodulate(input);\n' +

    '}\n' +
    '\n' +
    'class OFDM{\n' +
    'void setParameters(int inNfft, int inNcp, int inNupsample);\n' +
    'cvec modulate(cvec input);\n' +
    'cve demodulate(cvec input);\n' +
    '}\n' +
    '\n' +
    '\n' +
    'cvec OFDM::setParameters(int inNfft, int inNcp, int inNupsample)\n' +
    '{\n' +
    '  Nfft = inNfft;\n' +
    '  Ncp = inNcp;\n' +
    '  Nupsample = inNupsample;\n' +
    '\n' +
    '  int para1;\n' +
    '  int para2;\n' +
    ' \n' +
    '  para1 = Nupsample*Nfft*Nfft;\n' +
    '  para1 = staticCast(para1);\n' +
    '  para2 = Nfft + Ncp;\n' +
    '  para1 = para1/para2;\n' +
    '\n' +
    '  norm_factor = sqrt(para1);\n' +
    '  setup_done = true;\n' +
    '}\n' +
    '\n' +
    'cvec OFDM::modulate(cvec input)\n' +
    '{\n' +
    '  cvec output;\n' +
    '  int N;\n' +
    '  int para1;\n' +
    '\n' +
    '  para1=Nupsample*N*(Nfft+Ncp);\n' +
    '  output.setLength(para1);\n' +
    '\n' +
    '  cvec outtemp;\n' +
    '\n' +
    '  for (int i=0; i < N; i=i+1) {\n' +
    '    para2 = i*Nfft;\n' +
    '    vec2 = input.mid(para2);\n' +
    '    para3 = Nfft*(Nupsample-1);\n' +
    '    vec3 = zeros_c(para3);\n' +
    '    para4 = i * Nfft + Nfft / 2;\n' +
    '    vec4 = input.mid(para4);\n' +
    '    vec4 = vec4 * norm_factor;\n' +
    '\n' +
    '    outtemp = ifft(vec2, vec3, vec4);\n' +
    '    outtemp = outtemp*norm_factor;\n' +
    '\n' +
    '    para5 = Nupsample*(Nfft+Ncp)*i;\n' +
    '    para6 = Nupsample*Ncp;\n' +
    '    vec6 = outtemp.right(para6);\n' +
    '    vec7 = concat(vec6, outtemp);\n' +
    '\n' +
    '    output.replaceMid(para5, vec7);\n' +
    '  }\n' +
    '\n' +
    '  return(output);\n' +
    '}\n' +
    '\n' +
    'cvec OFDM::demodulate(cvec input){\n' +

    '  cvec output;\n' +

    '  const int N;\n' +
    '  int para1;\n' +
    '  para1 = (Nfft+Ncp)/Nupsample;\n' +
    '  N = input.length(input);\n' +
    '  N = N/para1;\n' +
    '  \n' +
    '  int para2;\n' +
    '  para2 = N*Nfft;\n' +
    '  output.setLength(para2);\n' +
    '\n' +
    '  for (int i=0; i<N; i=i+1) {\n' +
    '    para2 = i*(Nfft+Ncp)+Ncp; \n' +
    '    para3 = Nupsample*para2;\n' +
    '    para4 = Nupsample*Nfft;\n' +
    '    vec1 = input.mid(para3, para4); \n' +
    '    x = fft(vec1);\n' +
    '    \n' +
    '    para5 = Nfft/2;\n' +
    '    vec5 = x.left(para5);\n' +
    '    vec6 = x.right(para5));\n' +

    '    vec7 = concat(vec5, vec6);\n' +
    '    para7 = Nfft*i;\n' +

    '    output.replaceMid(para7, vec7);\n' +
    '  }\n' +
    '  return(output);\n' +
    '}\n'

    document.getElementById("Source_input").value = cpp_code;

    return false;

}

function openSourceExample()
/*open the exmples of source codes according to the value of the dropbox*/
 {
    var source_type = document.getElementById("language").selectedIndex;
    var source_index = document.getElementById("source").selectedIndex;

    if (source_type == 0)
    {
        var bulk = document.getElementById("source").options;
        bulk[0].text = 'blank';
        bulk[1].text = 'Simple Transmitter';
        bulk[2].text = 'Adaptive Modulator'
        bulk[3].text = 'FIR filter 1'
        bulk[4].text = 'FIR filter 2'
        bulk[5].text = 'Waveform OFDM';
        switch (source_index)
        {
        case 0:
            document.getElementById("Source_input").value = '';
            break;
        case 1:
            openMatlabExample1();
            break;
        case 2:
            openMatlabExample2();
            break;
        case 3:
            openMatlabExample3();
            break;
        case 4:
            openMatlabExample4();
            break;
        case 5:
            openMatlabExample5();

        }
    }
    if (source_type == 1)
    {
        var bulk = document.getElementById("source").options;
        bulk[0].text = 'blank';
        bulk[1].text = 'Simple Transmitter';
        bulk[2].text = 'Adaptive Modulator';
        bulk[3].text = 'FIR filter';
        bulk[4].text = 'Swap Value';
        bulk[5].text = 'Waveform OFDM';
        switch (source_index)
        {
        case 0:
            document.getElementById("Source_input").value = '';
            break;
        case 1:
            openCExample1();
            break;
        case 2:
            openCExample2();
            break;
        case 3:
            openCExample3();
            break;
        case 4:
            openCExample4();
            break;
        case 5:
            openCExample5();
            break;
        }
    }
    if (source_type == 3)
    {
        var bulk = document.getElementById("source").options;
        bulk[0].text = 'blank';
        bulk[1].text = 'Adder';
        bulk[2].text = 'Multiplier';
        bulk[3].text = 'Gates';
        bulk[4].text = 'FIR filter';
        bulk[5].text = 'Waveform OFDM';
        //bulk[3].text='FIR filter'
        switch (source_index)
        {
        case 0:
            document.getElementById("Source_input").value = '';
            break;
        case 1:
            openVHDLADDER();
            break;
        case 2:
            openVHDLMULTIPLIER();
            break;
        case 3:
            openVHDLcomponent();
            break;
        case 4:
            openVHDLFIR();
            break;

        }
    }

    if (source_type == 2)
    {
        var bulk = document.getElementById("source").options;
        bulk[0].text = 'blank';
        bulk[1].text = 'AWGN Channel';
        bulk[2].text = 'Adaptive Modulator';
        bulk[3].text = 'Waveform OFDM';
        bulk[4].text = '';
        bulk[5].text = '';
        switch (source_index)
        {
        case 0:
            document.getElementById("Source_input").value = '';
            break;
        case 1:
            openCPPExample1();
            break;
        case 2:
            openCPPExample2();
            break;
        case 3:
            openCPPExample3();
            break;
        }
    }

}

/////Code Analysis -- higher level abstraction---
var Pattern1 = ['loop cause', 'multiplication', 'addition'];
var Pattern2 = ['selection cause', 'value assignment'];
var Pattern3 = ['selection cause', 'function call'];
var Pattern4 = ['loop cause', 'function call'];
Rec_V = [0, 0];

function xml_analyze(xml_code, target_field)
//top-down
/*The main function for code analysis
xml_code: the xml code to be analyzed
target_field: the field id that will display the analysis result
*/
 {

    Rec_V = [0, 0];

    var analyze_result = '';
    var xmlDoc;
    var xml_code = xmlformat(xml_code);
    xmlDoc = load_XML(xml_code);

    var firstNode = xmlDoc.documentElement;

    analyze_result = path_analyze(firstNode, 0);

    Display_txt_html(document.getElementById(target_field), analyze_result);
}

function check_pattern1(txt)
/*Check if the text matches pattern 1  (FIR filter pattern) or not
txt: the text, which is generated by using code anlaysis
*/
 {
    var ind = 0;

    while (txt != '')
    {
        if (txt.indexOf('Multiplication') != -1 && (txt.indexOf('Multiplication') < txt.indexOf('/*') || txt.indexOf('/*') == -1))
        {
            txt = txt.slice(txt.indexOf('Multiplication') + 14);
            while (txt != '')
            {
                if (txt.indexOf('Addition') != -1 && (txt.indexOf('Addition') < txt.indexOf('/*') || txt.indexOf('/*') == -1))
                {
                    ind = 1;
                    break;
                }
                else if (txt.indexOf('Addition') > txt.indexOf('/*'))
                {
                    txt = txt.slice(txt.indexOf('/*') + 2);
                    //remove begin
                    txt = txt.slice(txt.indexOf('/*') + 2);
                    //remove end
                }
                else
                {
                    ind = 0;
                    break;
                }
            }
            break;
        }
        else if (txt.indexOf('Multiplication') > txt.indexOf('/*'))
        {
            txt = txt.slice(txt.indexOf('/*') + 2);
            //remove begin
            txt = txt.slice(txt.indexOf('/*') + 2);
            //remove end
        }
        else
        {
            ind = 0;
            break;
        }
    }
    return ind;
}

function path_analyze(pathNode, ind_level)
/*Analayze a path node
pathNode: the path node
ind_level: the indent level ( to format the result display)
*/

 {
    var analyze_result = '';
    var actionSet_invalid = ['Declaration', 'input', 'output', 'return'];
    var features = new Array();


    if (pathNode.attributes.getNamedItem("name").value == 'main')
    {
        analyze_result += "The code contains:<br \>"
        ind_level += 1;
    }
    else
    {
        if (pathNode.parentNode.nodeName != 'Cause')
        {
            analyze_result += indent(ind_level) + "<font color=\"red\">Path</font>  \"" + pathNode.attributes.getNamedItem("name").value + "\" containing:<br \>"
            ind_level += 1;
        }
    }

    var places = pathNode.childNodes;
    var cause_number = 0;
    var place_number = 0;

    for (var l = 0; l < places.length; l++)
    {

        var pattern_begin = '';
        var pattern_end = '';

        if (places[l].nodeName == 'Cause')
        {
            if (places[l].attributes.getNamedItem("type") != null)
            var cause_type = places[l].attributes.getNamedItem("type").value;
            else
            var cause_type = 'once';

            var subpath_result = path_analyze(places[l].childNodes[0], ind_level + 1);

            if (cause_type == 'once')
            {
                cause_type = 'selection';
                Rec_V[1] = 1;
            }
            else if (cause_type == 'loop')
            {
                Rec_V[0] = 1;
                if (check_pattern1(subpath_result) == 1)
                {
                    var pattern_begin = indent(ind_level) + '<font color=\"green\">' + "/*This may be the begining of an FIR filter*/</font><br />";
                    var pattern_end = "<br \>" + indent(ind_level) + '<font color=\"green\">' + "/*End: FIR filter*/</font><br />";
                }
                else
                {
                    var pattern_begin = '';
                    var pattern_end = '';
                }

            }

            analyze_result += pattern_begin;
            analyze_result += indent(ind_level) + '<font color=\"red\">' + cause_type + " cause " + '</font>' + cause_number + ":<br />";
            ind_level += 1;
            analyze_result += subpath_result;
            cause_number += 1;
            ind_level -= 1;
            analyze_result += pattern_end;


        }
        else if (places[l].childNodes[0].nodeName == 'Path')
        {
            analyze_result += path_analyze(places[l].childNodes[0], ind_level);
        }
        else if (places[l].childNodes[0].nodeName == 'Place')
        {
            continue;
        }

        else if (places[l].childNodes[1] != null)
        {

            var action = places[l].childNodes[1].childNodes[0].nodeValue;


            var isInvalid = 0;
            for (var i = 0; i < actionSet_invalid.length; i++)
            {
                if (action == actionSet_invalid[i])
                {
                    isInvalid = 1;
                    break;
                }
            }

            if (!isInvalid)
            {
                if (action == 'Equal')
                action = 'Value Assignment';
                else if (action == '+')
                action = 'Addition';
                else if (action == '-')
                action = 'Substraction';
                else if (action == '*')
                action = 'Multiplication';
                else if (action == '/')
                action = 'Division';
                analyze_result += indent(ind_level) + action + '<br \>';
            }
            place_number += 1;
        }
    }
    return analyze_result;
}

//The following javascript functions are to format the display style of xml
function f(e)
 {
    if (e.className == "ci")
    {
        if (e.children(0).innerText.indexOf("\n") > 0)
        fix(e, "cb");
    }
    if (e.className == "di") {
        if (e.children(0).innerText.indexOf("\n") > 0) fix(e, "db");
    }
    e.id = "";
}

function fix(e, cl) {
    e.className = cl;
    e.style.display = "block";
    j = e.parentElement.children(0);
    j.className = "c";
    k = j.children(0);
    k.style.visibility = "visible";
    k.href = "#";
}

function ch(e) {
    mark = e.children(0).children(0);
    if (mark.innerText == "+") {
        mark.innerText = "-";
        for (var i = 1; i < e.children.length; i++)
        e.children(i).style.display = "block";
    }
    else if (mark.innerText == "-") {
        mark.innerText = "+";
        for (var i = 1; i < e.children.length; i++)
        e.children(i).style.display = "none";
    }
}

function ch2(e) {
    mark = e.children(0).children(0);
    contents = e.children(1);
    if (mark.innerText == "+") {
        mark.innerText = "-";
        if (contents.className == "db" || contents.className == "cb")
        contents.style.display = "block";
        else contents.style.display = "inline";
    }
    else if (mark.innerText == "-") {
        mark.innerText = "+";
        contents.style.display = "none";
    }
}

function cl() {
    e = window.event.srcElement;
    if (e.className != "c") {
        e = e.parentElement;
        if (e.className != "c") {
            return;
        }
    }
    e = e.parentElement;
    if (e.className == "e") ch(e);
    if (e.className == "k") ch2(e);
}

function ex() {}

function h() {
    window.status = " ";
}