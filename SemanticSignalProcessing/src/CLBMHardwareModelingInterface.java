import java.awt.event.ActionEvent;
import javax.swing.*;
import java.awt.event.ActionListener;
import java.applet.*;
import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import java.awt.*;
import java.awt.event.KeyEvent;
import javax.swing.JTextField;
import javax.swing.JTextArea;
import java.net.*;  






public class CLBMHardwareModelingInterface extends JDialog implements ActionListener {
	
	
	public String Shape;
	public String Name;
	ClassLoader cldr = this.getClass().getClassLoader();  
	    
    java.net.URL GeForce_GTX_280_URL = cldr.getResource("images/GeForce_GTX_280.gif");
    ImageIcon GeForce_GTX_280 = new ImageIcon(GeForce_GTX_280_URL); 
    JLabel GeForce_GTX_280_Label = new JLabel(GeForce_GTX_280);
    
    java.net.URL GeForce_GTS_450_URL = cldr.getResource("images/GeForce_GTS_450.gif");
    ImageIcon GeForce_GTS_450 = new ImageIcon(GeForce_GTS_450_URL); 
    JLabel GeForce_GTS_450_Label = new JLabel(GeForce_GTS_450);
	
	CheckboxGroup radioGroup; 
	Checkbox radio1; 
	Checkbox radio2; 
	//Checkbox radio3; 
	//Checkbox radio4; 
	
	JButton ok = new JButton("Ok");
	public SSP_Main p;
	
	
	public void init()
	{
		 
		
	}
	
  public CLBMHardwareModelingInterface(JFrame frame, SSP_Main parent) {
    super(frame, true);
    
    //this.frame = frame;
    Name = "hello";
    
    
    p = parent;
    p.CLBMHardwareModelCode = "";
    setBounds(200,150,305,400);
    if (p.CUDACodeActiveFlag)
    	setTitle("Choose GPU Platforms");
    else
    	setTitle("CLBM Hardware Modeling");
    Container c = this.getContentPane();
    c.setLayout(new BorderLayout());      

    Box t1Blank1 = Box.createVerticalBox();
    t1Blank1.add(Box.createGlue());
    t1Blank1.add(new JLabel("Please check any of the following NVIDIA GPUs, i.e.,"));
    t1Blank1.add(Box.createGlue());
    Box t1Blank2 = Box.createVerticalBox();
    t1Blank2.add(Box.createGlue());
    if (p.CUDACodeActiveFlag)
    	t1Blank2.add(new JLabel("GeForce GTS 450 and GTX 280, for code generation."));
    else
    	t1Blank2.add(new JLabel("GeForce GTS 450 and GTX 280, for CLBM modeling."));
    t1Blank2.add(Box.createGlue());
    Box t1Blank3 = Box.createVerticalBox();
    t1Blank3.add(Box.createGlue());
    t1Blank3.add(new JLabel(""));
    t1Blank3.add(Box.createGlue());
    Box t1Blank4 = Box.createVerticalBox();
    t1Blank4.add(Box.createGlue());
    t1Blank4.add(new JLabel(""));
    t1Blank4.add(Box.createGlue());
    JPanel t1_Panel = new JPanel();
    t1_Panel.setLayout(new GridLayout(4,1));   
    t1_Panel.add(t1Blank3);
    t1_Panel.add(t1Blank1);
    t1_Panel.add(t1Blank2);
    t1_Panel.add(t1Blank4);
       
    radioGroup = new CheckboxGroup(); 
    radio1 = new Checkbox("GeForce GTS 450", radioGroup, true); 
    radio2 = new Checkbox("GeForce GTX 280", radioGroup, false); 
    
    Box b1 = Box.createVerticalBox();
	b1.add(Box.createGlue());
    b1.add(GeForce_GTS_450_Label);
    b1.add(Box.createGlue());
    
    
    Box b2 = Box.createVerticalBox();
	b2.add(Box.createGlue());
    b2.add(GeForce_GTX_280_Label);
    b2.add(Box.createGlue());
    Box b2Blank1 = Box.createVerticalBox();
    b2Blank1.add(Box.createGlue());
    
    JPanel GeForce_GTS_450_Panel = new JPanel();
    GeForce_GTS_450_Panel.setLayout(new GridLayout(1,2));
    GeForce_GTS_450_Panel.add(radio1);
    GeForce_GTS_450_Panel.add(b1);
    
    JPanel GeForce_GTX_280_Panel = new JPanel();
    GeForce_GTX_280_Panel.setLayout(new GridLayout(1,2));
    GeForce_GTX_280_Panel.add(radio2);
    GeForce_GTX_280_Panel.add(b2);
    
    JPanel GeForce_Panel = new JPanel();
    GeForce_Panel.setLayout(new GridLayout(2,1));
    GeForce_Panel.add(GeForce_GTS_450_Panel);
    GeForce_Panel.add(GeForce_GTX_280_Panel);
    //radio3 = new Checkbox("1/2", radioGroup,false); 
    //radio4 = new Checkbox("2/3", radioGroup,false); 
            
    Box Blank1 = Box.createVerticalBox();
    Blank1.add(Box.createGlue());
    Blank1.add(new JLabel(""));
    Blank1.add(Box.createGlue());
    Box Blank2 = Box.createVerticalBox();
    Blank2.add(Box.createGlue());
    Blank2.add(new JLabel(""));
    Blank2.add(Box.createGlue());
    Box Blank3 = Box.createVerticalBox();
    Blank3.add(Box.createGlue());
    Blank3.add(new JLabel(""));
    Blank3.add(Box.createGlue());
    Box Blank4 = Box.createVerticalBox();
    Blank4.add(Box.createGlue());
    Blank4.add(new JLabel(""));
    Blank4.add(Box.createGlue());
    JPanel Ok_Panel_1 = new JPanel();
    Ok_Panel_1.setLayout(new GridLayout(1,3));
    Ok_Panel_1.add(Blank1);
    Ok_Panel_1.add(ok);
    Ok_Panel_1.add(Blank2);
    JPanel Ok_Panel = new JPanel();
    Ok_Panel.setLayout(new GridLayout(3,1));
    Ok_Panel.add(Blank3);
    Ok_Panel.add(Ok_Panel_1);
    Ok_Panel.add(Blank4);
    
    
    
    c.add(t1_Panel, BorderLayout.NORTH);
    c.add(GeForce_Panel, BorderLayout.CENTER);
    c.add(Ok_Panel, BorderLayout.SOUTH);
		
		

    ok.addActionListener(this);

    
   
    

  }

  public static void main(String[] args) {
	JDialog f = new NodeInputDialog(new JFrame(), new SSP_Main());
	f.show();
	
  }
  

  
  public void actionPerformed(ActionEvent evt)
  {
	  if ((evt.getSource() == ok))
	  {	
		  if (radioGroup.getSelectedCheckbox() == radio1)
		  {
			  p.CLBMHardwareModelCode  =  "<Place name = \"GeForce_GTS_450\">\n    <Thing name = \"grid\">\n        <Place name = \"dimensionality\">\n            <Thing>3</Thing>\n            <Action>SET</Action>\n        </Place>\n        <Place name = \"dimensions\">\n            <Thing>\n                <Place name = \"x\">\n                    <Thing>65535</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"y\">\n                    <Thing>65535</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"z\">\n                    <Thing>65535</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"size\">\n                    <Thing>3</Thing>\n                    <Action>SET</Action>\n                </Place>\n            </Thing>\n            <Action>SET</Action>\n        </Place>\n    </Thing>\n    <Thing name = \"block\">\n        <Place name = \"dimensionality\">\n            <Thing>3</Thing>\n            <Action>SET</Action>\n        </Place>\n        <Place name = \"dimensions\">\n            <Thing>\n                <Place name = \"x\">\n                    <Thing>1024</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"y\">\n                    <Thing>1024</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"z\">\n                    <Thing>64</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"size\">\n                    <Thing>3</Thing>\n                    <Action>SET</Action>\n                </Place>\n            </Thing>\n            <Action>SET</Action>\n        </Place>\n    </Thing>\n    <Thing name = \"thread\">1024</Thing>\n    <Thing name = \"sharedMemory\">48KB</Thing>\n    <Thing name = \"localMemory\">512KB</Thing>\n    <Thing name = \"ConstantMemory\">64KB</Thing>\n</Place>\n";
		  }
		  if (radioGroup.getSelectedCheckbox()  ==  radio2)
		  {
			  p.CLBMHardwareModelCode  =  "<Place name = \"GeForce_GTX_280\">\n    <Thing name = \"grid\">\n        <Place name = \"dimensionality\">\n            <Thing>2</Thing>\n            <Action>SET</Action>\n        </Place>\n        <Place name = \"dimensions\">\n            <Thing>\n                <Place name = \"x\">\n                    <Thing>65535</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"y\">\n                    <Thing>65535</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"size\">\n                    <Thing>2</Thing>\n                    <Action>SET</Action>\n                </Place>\n            </Thing>\n            <Action>SET</Action>\n        </Place>\n    </Thing>\n    <Thing name = \"block\">\n        <Place name = \"dimensionality\">\n            <Thing>3</Thing>\n            <Action>SET</Action>\n        </Place>\n        <Place name = \"dimensions\">\n            <Thing>\n                <Place name = \"x\">\n                    <Thing>512</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"y\">\n                    <Thing>512</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"z\">\n                    <Thing>64</Thing>\n                    <Action>SET</Action>\n                </Place>\n                <Place name = \"size\">\n                    <Thing>3</Thing>\n                    <Action>SET</Action>\n                </Place>\n            </Thing>\n            <Action>SET</Action>\n        </Place>\n    </Thing>\n    <Thing name = \"thread\">512</Thing>\n    <Thing name = \"sharedMemory\">16KB</Thing>\n    <Thing name = \"localMemory\">16KB</Thing>\n    <Thing name = \"ConstantMemory\">64KB</Thing>\n</Place>\n";			  
		  }
		  if (!p.CUDACodeActiveFlag)
			  p.CLBMHardwareCodeActive = true;
		  else
			  p.CUDACodeActiveFlagValue = true;
		  setVisible(false);
	  }	 
	  
  }

	
}