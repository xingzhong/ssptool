import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.awt.event.*;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;

public class TextOutputDialog extends JDialog implements ActionListener{

    public JTextArea t1;
    JButton Save = null;   
    JButton Close = null;
    public SSP_Main p;
    public JDialog f;
    public String Code = "";
    public boolean MatlabCodeIndicator = false;
    public boolean CCodeIndicator = false;
    public boolean CPlusCodeIndicator = false;
    public boolean CUDACodeIndicator = false;
    public boolean OpenCLCodeIndicator = false;
    public void init()
    {
    	
    }
    
    public TextOutputDialog(JFrame frame, SSP_Main parent) {
        //super(true);
        p = parent;
        t1 = new JTextArea(); 
               
        setBounds(100,100,600,600);      
        if (p.CLBMCodeActive)
        {
        	setTitle("CLBM Code Output");
        	t1.setText(p.CLBMCode);
        	Code = p.CLBMCode;  
        	t1.setEditable(false);
            Container c = this.getContentPane();
            c.setLayout(new BorderLayout());
            
            //JScrollBar hbar = new JScrollBar(
                   // JScrollBar.HORIZONTAL, 30, 20, 0, 300);
            
            String Temp = Code;
        	String TempOutput = "";
        	int Linelength = 0;
        	while(! Temp.isEmpty())
        	{
        		if (Temp.indexOf("\n") > -1)
    			{
        			TempOutput = TempOutput + Temp.substring(0,Temp.indexOf("\n") + 1);    		
    				Temp = Temp.substring(Temp.indexOf("\n") + 1);
    				Linelength = Linelength + 1;
    			}   
        		else
        			Temp = "";   		
        	}
           
            JScrollBar vbar = new JScrollBar(
                    JScrollBar.VERTICAL, 0, 0, 0, Linelength);
            
            //hbar.setUnitIncrement(2);
            //hbar.setBlockIncrement(1);
            
            //hbar.addAdjustmentListener(new MyAdjustmentListener());
            vbar.addAdjustmentListener(new MyAdjustmentListener());
            
            //c.add(hbar, BorderLayout.SOUTH);          
            c.add(vbar, BorderLayout.EAST);
            c.add(t1, BorderLayout.CENTER);
        }
    	if (p.XMLCodeActive)
    	{
    		setTitle("XML Code Output");
    		t1.setText(p.XMLCode);
    		Code = p.XMLCode;   
    		t1.setEditable(false);
            Container c = this.getContentPane();
            c.setLayout(new BorderLayout());
            
            //JScrollBar hbar = new JScrollBar(
                   // JScrollBar.HORIZONTAL, 30, 20, 0, 300);
            
            String Temp = Code;
        	String TempOutput = "";
        	int Linelength = 0;
        	while(! Temp.isEmpty())
        	{
        		if (Temp.indexOf("\n") > -1)
    			{
        			TempOutput = TempOutput + Temp.substring(0,Temp.indexOf("\n") + 1);    		
    				Temp = Temp.substring(Temp.indexOf("\n") + 1);
    				Linelength = Linelength + 1;
    			}   
        		else
        			Temp = "";   		
        	}
           
            JScrollBar vbar = new JScrollBar(
                    JScrollBar.VERTICAL, 0, 0, 0, Linelength);
            
            //hbar.setUnitIncrement(2);
            //hbar.setBlockIncrement(1);
            
            //hbar.addAdjustmentListener(new MyAdjustmentListener());
            vbar.addAdjustmentListener(new MyAdjustmentListener());
            
            //c.add(hbar, BorderLayout.SOUTH);          
            c.add(vbar, BorderLayout.EAST);
            c.add(t1, BorderLayout.CENTER);
    	}
    	if (p.MatlabCodeActive)
        {   		
    		MatlabCodeIndicator = true;
        	setTitle("Matlab Code Output");
        	t1.setText(p.MatlabCode);
        	Code = p.MatlabCode; 
        	Save = new JButton("Save Matlab");  
    		Close = new JButton("Close Window");    		
    		Save.addActionListener(this);
    		Close.addActionListener(this);
        	t1.setEditable(false);
            Container c = this.getContentPane();
            c.setLayout(new BorderLayout());
            
            //JScrollBar hbar = new JScrollBar(
                   // JScrollBar.HORIZONTAL, 30, 20, 0, 300);
            
            String Temp = Code;
        	String TempOutput = "";
        	int Linelength = 0;
        	while(! Temp.isEmpty())
        	{
        		if (Temp.indexOf("\n") > -1)
    			{
        			TempOutput = TempOutput + Temp.substring(0,Temp.indexOf("\n") + 1);    		
    				Temp = Temp.substring(Temp.indexOf("\n") + 1);
    				Linelength = Linelength + 1;
    			}   
        		else
        			Temp = "";   		
        	}
           
            JScrollBar vbar = new JScrollBar(
                    JScrollBar.VERTICAL, 0, 0, 0, Linelength);
            
            //hbar.setUnitIncrement(2);
            //hbar.setBlockIncrement(1);
            
            //hbar.addAdjustmentListener(new MyAdjustmentListener());
            vbar.addAdjustmentListener(new MyAdjustmentListener());
            JPanel panel = new JPanel();            
            panel.setLayout(new GridLayout(1,4));
            Box b1 = Box.createVerticalBox();
            b1.add(Box.createGlue());
            b1.add(new JLabel("  "));
            b1.add(Box.createGlue());            
            Box b2 = Box.createVerticalBox();
            b2.add(Box.createGlue());
            b2.add(new JLabel("  "));
            b2.add(Box.createGlue());
            Box b3 = Box.createVerticalBox();
            b3.add(Box.createGlue());
            b3.add(new JLabel("  "));
            b3.add(Box.createGlue());
            panel.add(b1);
            panel.add(Save);
            panel.add(b2);
            panel.add(Close);
            panel.add(b3);
            //c.add(hbar, BorderLayout.SOUTH);
            c.add(panel, BorderLayout.NORTH);
            c.add(vbar, BorderLayout.EAST);
            c.add(t1, BorderLayout.CENTER);
        }
    	if (p.CCodeActive)
        {
    		CCodeIndicator = true;
        	setTitle("C Code Output");
        	t1.setText(p.CCode);
        	Code = p.CCode;
        	Save = new JButton("Save C");  
    		Close = new JButton("Close Window");
    		Save.addActionListener(this);
    		Close.addActionListener(this);
        	t1.setEditable(false);
            Container c = this.getContentPane();
            c.setLayout(new BorderLayout());
            
            //JScrollBar hbar = new JScrollBar(
                   // JScrollBar.HORIZONTAL, 30, 20, 0, 300);
            
            String Temp = Code;
        	String TempOutput = "";
        	int Linelength = 0;
        	while(! Temp.isEmpty())
        	{
        		if (Temp.indexOf("\n") > -1)
    			{
        			TempOutput = TempOutput + Temp.substring(0,Temp.indexOf("\n") + 1);    		
    				Temp = Temp.substring(Temp.indexOf("\n") + 1);
    				Linelength = Linelength + 1;
    			}   
        		else
        			Temp = "";   		
        	}
           
            JScrollBar vbar = new JScrollBar(
                    JScrollBar.VERTICAL, 0, 0, 0, Linelength);
            
            //hbar.setUnitIncrement(2);
            //hbar.setBlockIncrement(1);
            
            //hbar.addAdjustmentListener(new MyAdjustmentListener());
            vbar.addAdjustmentListener(new MyAdjustmentListener());
            JPanel panel = new JPanel();            
            panel.setLayout(new GridLayout(1,4));
            Box b1 = Box.createVerticalBox();
            b1.add(Box.createGlue());
            b1.add(new JLabel("  "));
            b1.add(Box.createGlue());            
            Box b2 = Box.createVerticalBox();
            b2.add(Box.createGlue());
            b2.add(new JLabel("  "));
            b2.add(Box.createGlue());
            Box b3 = Box.createVerticalBox();
            b3.add(Box.createGlue());
            b3.add(new JLabel("  "));
            b3.add(Box.createGlue());
            panel.add(b1);
            panel.add(Save);
            panel.add(b2);
            panel.add(Close);
            panel.add(b3);
            //c.add(hbar, BorderLayout.SOUTH);
            c.add(panel, BorderLayout.NORTH);
            c.add(vbar, BorderLayout.EAST);
            c.add(t1, BorderLayout.CENTER);
        }
    	if (p.CPlusCodeActive)
        {
    		CPlusCodeIndicator = true;
        	setTitle("C++ Code Output");
        	t1.setText(p.CPlusCode);
        	Code = p.CPlusCode;
        	Save = new JButton("Save C++");         	
    		Close = new JButton("Close Window");
    		Save.addActionListener(this);
    		Close.addActionListener(this);
        	t1.setEditable(false);
            Container c = this.getContentPane();
            c.setLayout(new BorderLayout());
            
            //JScrollBar hbar = new JScrollBar(
                   // JScrollBar.HORIZONTAL, 30, 20, 0, 300);
            
            String Temp = Code;
        	String TempOutput = "";
        	int Linelength = 0;
        	while(! Temp.isEmpty())
        	{
        		if (Temp.indexOf("\n") > -1)
    			{
        			TempOutput = TempOutput + Temp.substring(0,Temp.indexOf("\n") + 1);    		
    				Temp = Temp.substring(Temp.indexOf("\n") + 1);
    				Linelength = Linelength + 1;
    			}   
        		else
        			Temp = "";   		
        	}
           
            JScrollBar vbar = new JScrollBar(
                    JScrollBar.VERTICAL, 0, 0, 0, Linelength);
            
            //hbar.setUnitIncrement(2);
            //hbar.setBlockIncrement(1);
            
            //hbar.addAdjustmentListener(new MyAdjustmentListener());
            vbar.addAdjustmentListener(new MyAdjustmentListener());
            JPanel panel = new JPanel();            
            panel.setLayout(new GridLayout(1,4));
            Box b1 = Box.createVerticalBox();
            b1.add(Box.createGlue());
            b1.add(new JLabel("  "));
            b1.add(Box.createGlue());            
            Box b2 = Box.createVerticalBox();
            b2.add(Box.createGlue());
            b2.add(new JLabel("  "));
            b2.add(Box.createGlue());
            Box b3 = Box.createVerticalBox();
            b3.add(Box.createGlue());
            b3.add(new JLabel("  "));
            b3.add(Box.createGlue());
            panel.add(b1);
            panel.add(Save);
            panel.add(b2);
            panel.add(Close);
            panel.add(b3);
            //c.add(hbar, BorderLayout.SOUTH);
            c.add(panel, BorderLayout.NORTH);
            c.add(vbar, BorderLayout.EAST);
            c.add(t1, BorderLayout.CENTER);
            
            
        }
    	if (p.CUDACodeActiveFlag)
        {
    		CUDACodeIndicator = true;
        	setTitle("CUDA Code Output");
        	t1.setText(p.CUDACode);
        	Code = p.CUDACode;
        	Save = new JButton("Save CUDA");         	
    		Close = new JButton("Close Window");
    		Save.addActionListener(this);
    		Close.addActionListener(this);
        	t1.setEditable(false);
            Container c = this.getContentPane();
            c.setLayout(new BorderLayout());
            
            //JScrollBar hbar = new JScrollBar(
                   // JScrollBar.HORIZONTAL, 30, 20, 0, 300);
            
            String Temp = Code;
        	String TempOutput = "";
        	int Linelength = 0;
        	while(! Temp.isEmpty())
        	{
        		if (Temp.indexOf("\n") > -1)
    			{
        			TempOutput = TempOutput + Temp.substring(0,Temp.indexOf("\n") + 1);    		
    				Temp = Temp.substring(Temp.indexOf("\n") + 1);
    				Linelength = Linelength + 1;
    			}   
        		else
        			Temp = "";   		
        	}
           
            JScrollBar vbar = new JScrollBar(
                    JScrollBar.VERTICAL, 0, 0, 0, Linelength);
            
            //hbar.setUnitIncrement(2);
            //hbar.setBlockIncrement(1);
            
            //hbar.addAdjustmentListener(new MyAdjustmentListener());
            vbar.addAdjustmentListener(new MyAdjustmentListener());
            JPanel panel = new JPanel();            
            panel.setLayout(new GridLayout(1,4));
            Box b1 = Box.createVerticalBox();
            b1.add(Box.createGlue());
            b1.add(new JLabel("  "));
            b1.add(Box.createGlue());            
            Box b2 = Box.createVerticalBox();
            b2.add(Box.createGlue());
            b2.add(new JLabel("  "));
            b2.add(Box.createGlue());
            Box b3 = Box.createVerticalBox();
            b3.add(Box.createGlue());
            b3.add(new JLabel("  "));
            b3.add(Box.createGlue());
            panel.add(b1);
            panel.add(Save);
            panel.add(b2);
            panel.add(Close);
            panel.add(b3);
            //c.add(hbar, BorderLayout.SOUTH);
            c.add(panel, BorderLayout.NORTH);
            c.add(vbar, BorderLayout.EAST);
            c.add(t1, BorderLayout.CENTER);
            
            
        }
    	if (p.OpenCLCodeActive)
        {   		
    		OpenCLCodeIndicator = true;
        	setTitle("OpenCL Code Output");
        	t1.setText(p.OpenCLCode);
        	Code = p.OpenCLCode; 
        	Save = new JButton("Save OpenCL");  
    		Close = new JButton("Close Window");   		
    		Save.addActionListener(this);
    		Close.addActionListener(this);
        	t1.setEditable(false);
            Container c = this.getContentPane();
            c.setLayout(new BorderLayout());
            
            //JScrollBar hbar = new JScrollBar(
                   // JScrollBar.HORIZONTAL, 30, 20, 0, 300);
            
            String Temp = Code;
        	String TempOutput = "";
        	int Linelength = 0;
        	while(! Temp.isEmpty())
        	{
        		if (Temp.indexOf("\n") > -1)
    			{
        			TempOutput = TempOutput + Temp.substring(0,Temp.indexOf("\n") + 1);    		
    				Temp = Temp.substring(Temp.indexOf("\n") + 1);
    				Linelength = Linelength + 1;
    			}   
        		else
        			Temp = "";   		
        	}
           
            JScrollBar vbar = new JScrollBar(
                    JScrollBar.VERTICAL, 0, 0, 0, Linelength);
            
            //hbar.setUnitIncrement(2);
            //hbar.setBlockIncrement(1);
            
            //hbar.addAdjustmentListener(new MyAdjustmentListener());
            vbar.addAdjustmentListener(new MyAdjustmentListener());
            JPanel panel = new JPanel();            
            panel.setLayout(new GridLayout(1,4));
            Box b1 = Box.createVerticalBox();
            b1.add(Box.createGlue());
            b1.add(new JLabel("  "));
            b1.add(Box.createGlue());            
            Box b2 = Box.createVerticalBox();
            b2.add(Box.createGlue());
            b2.add(new JLabel("  "));
            b2.add(Box.createGlue());
            Box b3 = Box.createVerticalBox();
            b3.add(Box.createGlue());
            b3.add(new JLabel("  "));
            b3.add(Box.createGlue());
            panel.add(b1);
            panel.add(Save);
            panel.add(b2);
            panel.add(Close);
            panel.add(b3);
            //c.add(hbar, BorderLayout.SOUTH);
            c.add(panel, BorderLayout.NORTH);
            c.add(vbar, BorderLayout.EAST);
            c.add(t1, BorderLayout.CENTER);
        }
    	if (p.CLBMHardwareCodeActive)
    	{		
    		setTitle("CLBM Hardware Modeling Output");
    		t1.setText(p.CLBMHardwareModelCode);
    		Code = p.CLBMHardwareModelCode;   
    		t1.setEditable(false);   		
            Container c = this.getContentPane();
            c.setLayout(new BorderLayout());
            
            //JScrollBar hbar = new JScrollBar(
                   // JScrollBar.HORIZONTAL, 30, 20, 0, 300);
            
            String Temp = Code;
        	String TempOutput = "";
        	int Linelength = 0;
        	while(! Temp.isEmpty())
        	{
        		if (Temp.indexOf("\n") > -1)
    			{
        			TempOutput = TempOutput + Temp.substring(0,Temp.indexOf("\n") + 1);    		
    				Temp = Temp.substring(Temp.indexOf("\n") + 1);
    				Linelength = Linelength + 1;
    			}   
        		else
        			Temp = "";   		
        	}
           
            JScrollBar vbar = new JScrollBar(
                    JScrollBar.VERTICAL, 0, 0, 0, Linelength);
            
            //hbar.setUnitIncrement(2);
            //hbar.setBlockIncrement(1);
            
            //hbar.addAdjustmentListener(new MyAdjustmentListener());
            vbar.addAdjustmentListener(new MyAdjustmentListener());
            
            //c.add(hbar, BorderLayout.SOUTH);          
            c.add(vbar, BorderLayout.EAST);
            c.add(t1, BorderLayout.CENTER);
    	}
    	
        
    }
    
    class MyAdjustmentListener implements AdjustmentListener {
        public void adjustmentValueChanged(AdjustmentEvent e) {
        	String TempCode = "";        	
        	TempCode = Code;               	
        	String Output = "";       	
        	int i = 1;
        	while(! TempCode.isEmpty())
        	{
        		if (i > e.getValue())
        		{
        			if (TempCode.indexOf("\n") > -1)
        			{
        				Output = Output + TempCode.substring(0,TempCode.indexOf("\n") + 1);    		
        				TempCode = TempCode.substring(TempCode.indexOf("\n") + 1);
        			}
        			else
        			{
        				Output = Output + TempCode;    		
        				TempCode = "";
        			}
        		}
        		else
        		{
        			if (TempCode.indexOf("\n") > -1)
        				TempCode = TempCode.substring(TempCode.indexOf("\n") + 1);
        			else
        				TempCode = "";
        		}        		
        		i = i + 1;
        	}        	
            t1.setText(Output);
            t1.setEditable(false);
            
            repaint();
        }
    }
    
    public void main(String s[]) {
        f = new TextOutputDialog(new JFrame(), new SSP_Main());
        f.show();
    }
    
    public void actionPerformed(ActionEvent evt)
    {
    	
    	if(MatlabCodeIndicator || CCodeIndicator || CPlusCodeIndicator || CUDACodeIndicator || OpenCLCodeIndicator)
    	{
    		if ((evt.getSource() == Close))		  
    		{
    			MatlabCodeIndicator = false;
    			CCodeIndicator = false;
    			CPlusCodeIndicator = false;
    			CUDACodeIndicator = false;
    			OpenCLCodeIndicator = false;
    			setVisible(false);
    		}
    		if ((evt.getSource() == Save) && (MatlabCodeIndicator))
    		{
    			
    			
    			Frame parent = new Frame();
    			FileDialog fd = new FileDialog(parent, "Please choose a directory:", FileDialog.SAVE);
				fd.show();
				String selectedItem = fd.getFile();
				if (selectedItem == null)
				{
					  // no file selected
				}
				else
				{		
					File ffile = null;	
					String fileName = fd.getFile().toString();
					if(fileName.indexOf(".m") > -1)
						ffile = new File(fd.getDirectory() + File.separator + fd.getFile());
					else
						ffile = new File(fd.getDirectory() + File.separator + fd.getFile() + ".m");
					BufferedWriter bufferedWriter = null;
					try 
					{
				          //Construct the BufferedWriter object
						bufferedWriter = new BufferedWriter(new FileWriter(ffile));
						  //Start writing to the output stream						
						String CodeSaveTemp = Code;
						if (Code.indexOf("function ")==-1)
							bufferedWriter.write(Code);
						else
						{
							CodeSaveTemp = Code.substring(0,Code.indexOf("function "));
							bufferedWriter.write(CodeSaveTemp);
							bufferedWriter.flush();
							bufferedWriter.close();
							Code = Code.substring(Code.indexOf("function "));
							CodeSaveTemp = Code.substring(Code.indexOf("function ") + 9);
							String FunctionFileName = "";
							while(CodeSaveTemp.indexOf("function ")>-1)
							{
								FunctionFileName = Code.substring(Code.indexOf("=") + 1, Code.indexOf("("));
								Code = CodeSaveTemp.substring(CodeSaveTemp.indexOf("function "));
								CodeSaveTemp = "function " + CodeSaveTemp.substring(0, CodeSaveTemp.indexOf("function "));	
								//System.out.print("fuck:" + CodeSaveTemp + "\n");
								ffile = new File(fd.getDirectory() + File.separator + FunctionFileName + ".m");
								bufferedWriter = new BufferedWriter(new FileWriter(ffile));																						
								bufferedWriter.write(CodeSaveTemp);
								bufferedWriter.flush();
								bufferedWriter.close();
								CodeSaveTemp = Code.substring(Code.indexOf("function ") + 9);
							}
							FunctionFileName = Code.substring(Code.indexOf("=") + 1, Code.indexOf("("));
							ffile = new File(fd.getDirectory() + File.separator + FunctionFileName + ".m");
							bufferedWriter = new BufferedWriter(new FileWriter(ffile));
							bufferedWriter.write(Code);						
							bufferedWriter.flush();
							bufferedWriter.close();
							//
						}
						
						  						
						  
				     } 
					catch (FileNotFoundException ex) 
					{		            
						ex.printStackTrace();		        
					} 
					catch (IOException ex) 
					{
						ex.printStackTrace();
					} 
					finally 
					{
						  //Close the BufferedWriter
						/*try 
						{
							if (bufferedWriter != null) 
							{
								bufferedWriter.flush();
								bufferedWriter.close();
							 }
				         } 
						catch (IOException ex) 
						{
							ex.printStackTrace();
						 }*/
						
					}
				}
				  
							
    			
    		}
    		
    		if((evt.getSource() == Save) && (CCodeIndicator))
    		{
    			Frame parent = new Frame();
    			FileDialog fd = new FileDialog(parent, "Please choose a directory:", FileDialog.SAVE);
				  fd.show();
				  String selectedItem = fd.getFile();
				  if (selectedItem == null)
				  {
					  // no file selected
				  }
				  else
				  {		
					  File ffile = null;					  
					  String fileName = fd.getFile().toString();
					  if(fileName.indexOf(".c") > -1)
						  ffile = new File(fd.getDirectory() + File.separator + fd.getFile());
					  else
						  ffile = new File(fd.getDirectory() + File.separator + fd.getFile() + ".c");
					  BufferedWriter bufferedWriter = null;
					  try 
					  {
				          //Construct the BufferedWriter object
						  bufferedWriter = new BufferedWriter(new FileWriter(ffile));
						  //Start writing to the output stream
						  bufferedWriter.write(Code);
						  						
						  
				       } 
					  catch (FileNotFoundException ex) 
					  {		            
						  ex.printStackTrace();		        
					  } 
					  catch (IOException ex) 
					  {
						  ex.printStackTrace();
					  } 
					  finally 
					  {
						  //Close the BufferedWriter
						  try 
						  {
							  if (bufferedWriter != null) 
							  {
								  bufferedWriter.flush();
								  bufferedWriter.close();
							   }
				           } 
						  catch (IOException ex) 
						  {
							  ex.printStackTrace();
						   }
					    }
				  }
    		}
    		
    		if((evt.getSource() == Save) && (CPlusCodeIndicator))
    		{
    			Frame parent = new Frame();
    			FileDialog fd = new FileDialog(parent, "Please choose a directory:", FileDialog.SAVE);
				  fd.show();
				  String selectedItem = fd.getFile();
				  if (selectedItem == null)
				  {
					  // no file selected
				  }
				  else
				  {		
					  File ffile = null;					  
					  String fileName = fd.getFile().toString();
					  if(fileName.indexOf(".cc") > -1)
						  ffile = new File(fd.getDirectory() + File.separator + fd.getFile());
					  else
						  ffile = new File(fd.getDirectory() + File.separator + fd.getFile() + ".cc");
					  BufferedWriter bufferedWriter = null;
					  try 
					  {
				          //Construct the BufferedWriter object
						  bufferedWriter = new BufferedWriter(new FileWriter(ffile));
						  //Start writing to the output stream
						  bufferedWriter.write(Code);
						  						
						  
				       } 
					  catch (FileNotFoundException ex) 
					  {		            
						  ex.printStackTrace();		        
					  } 
					  catch (IOException ex) 
					  {
						  ex.printStackTrace();
					  } 
					  finally 
					  {
						  //Close the BufferedWriter
						  try 
						  {
							  if (bufferedWriter != null) 
							  {
								  bufferedWriter.flush();
								  bufferedWriter.close();
							   }
				           } 
						  catch (IOException ex) 
						  {
							  ex.printStackTrace();
						   }
					    }
				  }
    		}
    		
    		if((evt.getSource() == Save) && (CUDACodeIndicator))
    		{
    			Frame parent = new Frame();
    			FileDialog fd = new FileDialog(parent, "Please choose a directory:", FileDialog.SAVE);
				  fd.show();
				  String selectedItem = fd.getFile();
				  if (selectedItem == null)
				  {
					  // no file selected
				  }
				  else
				  {		
					  File ffile = null;					  
					  String fileName = fd.getFile().toString();
					  if(fileName.indexOf(".cuda") > -1)
						  ffile = new File(fd.getDirectory() + File.separator + fd.getFile());
					  else
						  ffile = new File(fd.getDirectory() + File.separator + fd.getFile() + ".cuda");
					  BufferedWriter bufferedWriter = null;
					  try 
					  {
				          //Construct the BufferedWriter object
						  bufferedWriter = new BufferedWriter(new FileWriter(ffile));
						  //Start writing to the output stream
						  bufferedWriter.write(Code);
						  						
						  
				       } 
					  catch (FileNotFoundException ex) 
					  {		            
						  ex.printStackTrace();		        
					  } 
					  catch (IOException ex) 
					  {
						  ex.printStackTrace();
					  } 
					  finally 
					  {
						  //Close the BufferedWriter
						  try 
						  {
							  if (bufferedWriter != null) 
							  {
								  bufferedWriter.flush();
								  bufferedWriter.close();
							   }
				           } 
						  catch (IOException ex) 
						  {
							  ex.printStackTrace();
						   }
					    }
				  }
    		}
    		
    		if((evt.getSource() == Save) && (OpenCLCodeIndicator))
    		{
    			Frame parent = new Frame();
    			FileDialog fd = new FileDialog(parent, "Please choose a directory:", FileDialog.SAVE);
				  fd.show();
				  String selectedItem = fd.getFile();
				  if (selectedItem == null)
				  {
					  // no file selected
				  }
				  else
				  {		
					  File ffile = null;					  
					  String fileName = fd.getFile().toString();
					  if(fileName.indexOf(".cl") > -1)
						  ffile = new File(fd.getDirectory() + File.separator + fd.getFile());
					  else
						  ffile = new File(fd.getDirectory() + File.separator + fd.getFile() + ".cl");
					  BufferedWriter bufferedWriter = null;
					  try 
					  {
				          //Construct the BufferedWriter object
						  bufferedWriter = new BufferedWriter(new FileWriter(ffile));
						  //Start writing to the output stream
						  bufferedWriter.write(Code);
						  						
						  
				       } 
					  catch (FileNotFoundException ex) 
					  {		            
						  ex.printStackTrace();		        
					  } 
					  catch (IOException ex) 
					  {
						  ex.printStackTrace();
					  } 
					  finally 
					  {
						  //Close the BufferedWriter
						  try 
						  {
							  if (bufferedWriter != null) 
							  {
								  bufferedWriter.flush();
								  bufferedWriter.close();
							   }
				           } 
						  catch (IOException ex) 
						  {
							  ex.printStackTrace();
						   }
					    }
				  }
    		}
    		
    		
    	}
  	  
  	  
    }
} 