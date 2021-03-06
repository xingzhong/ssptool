import java.awt.event.ActionEvent;
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



public class CRCEncoder extends JDialog implements ActionListener {
	
	
	public String Shape;
	public String Name;
	public JTextArea t1 = new JTextArea();
	
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
	
  public CRCEncoder(JFrame frame, SSP_Main parent) {
    super(frame, true);
    
    //this.frame = frame;
    Name = "hello";
    p = parent;
    setBounds(200,150,300,300);
    setTitle("CRC Encoder");
    Container c = this.getContentPane();
    c.setLayout(null);
   	
    Box b1 = Box.createVerticalBox();
	b1.add(Box.createGlue());
    b1.add(new JLabel("Parameter configuration"));
    b1.add(Box.createGlue());
    
    t1 = new JTextArea("Please check any of the following generator \nmatrix, i.e., uncoded and (7,4), as desired \nCRC code.");    
    
    Box b2 = Box.createVerticalBox();
	b2.add(Box.createGlue());
    b2.add(new JLabel("Generator matrix:"));
    b2.add(Box.createGlue());
   
    radioGroup = new CheckboxGroup(); 
    radio1 = new Checkbox("Uncoded", radioGroup,true); 
    radio2 = new Checkbox("(7, 4)", radioGroup,false); 
    //radio3 = new Checkbox("1/2", radioGroup,false); 
    //radio4 = new Checkbox("2/3", radioGroup,false); 
            
        
    //JPanel p4 = new JPanel();       
    //p4.add(ok);
        
    b1.setBounds(10,5,200,30);
    t1.setBounds(20,40,240,60);
    b2.setBounds(10,110,100,30);
    radio1.setBounds(40,150,100,30);
    radio2.setBounds(160,150,100,30);
    //radio3.setBounds(40,200,100,30);
    //radio4.setBounds(160,200,100,30);
    ok.setBounds(100,210,100,30);
    
    c.add(b1);
    c.add(t1);
    t1.setEditable(false);
    c.add(b2);
    c.add(radio1);
    c.add(radio2);
    //c.add(radio3);
    //c.add(radio4);
    c.add(ok);
		
		

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
			  p.NodeInformationRecord[p.FlagSelected].ConvolutionalIndicator = 1;
		  if (radioGroup.getSelectedCheckbox() == radio2)
			  p.NodeInformationRecord[p.FlagSelected].ConvolutionalIndicator = 2;
		 // if (radioGroup.getSelectedCheckbox() == radio3)
		//	  p.NodeInformationRecord[p.FlagSelected].ConvolutionalIndicator = 3;
		 // if (radioGroup.getSelectedCheckbox() == radio4)
			//  p.NodeInformationRecord[p.FlagSelected].ConvolutionalIndicator = 4;
		  setVisible(false);
		  
	  }	 
	  
	  
  }

	
}