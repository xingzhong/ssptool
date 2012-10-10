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




public class BitsGenerator extends JDialog implements ActionListener {
	
	
	public String Shape;
	public String Name;
	public JTextArea t1 = new JTextArea();
	
	
	//Checkbox radio3; 
	//Checkbox radio4; 
	public IntegerTextField t2 = new IntegerTextField();	
	public class IntegerTextField extends JTextField
	{
		
		final static String badchars = "`~!@#$%^&*()-_+=\\/\"':;?/>.<, ";
		public void processKeyEvent(KeyEvent ev)
		{
			char c = ev.getKeyChar();
			if ((Character.isLetter(c) && !ev.isAltDown()) || badchars.indexOf(c) > -1)
			{
				ev.consume();
				return;
			}
			if (c == '-' && getDocument().getLength() > 0)
				ev.consume();
			else
			{			
				super.processKeyEvent(ev);
				
			}
		}
	}
	
	JButton ok = new JButton("Ok");
	public SSP_Main p;
	
	
	public void init()
	{
		
	}
	
  public BitsGenerator(JFrame frame, SSP_Main parent) {
    super(frame, true);
    
    //this.frame = frame;
    Name = "hello";
    p = parent;
    setBounds(200,150,300,300);
    setTitle("Bits Generator");
    Container c = this.getContentPane();
    c.setLayout(null);
   	
    Box b1 = Box.createVerticalBox();
	b1.add(Box.createGlue());
    b1.add(new JLabel("Parameter configuration"));
    b1.add(Box.createGlue());
    
    t1 = new JTextArea("Please type an integer in the following entry\n(e.g., 1, 2, 3, etc) as your desired length of a \nbinary bit stream.");    
    
    Box b2 = Box.createVerticalBox();
	b2.add(Box.createGlue());
    b2.add(new JLabel("Number of bits:"));
    b2.add(Box.createGlue());
   
    
    //radio3 = new Checkbox("1/2", radioGroup,false); 
    //radio4 = new Checkbox("2/3", radioGroup,false); 
            
        
    //JPanel p4 = new JPanel();       
    //p4.add(ok);
        
    b1.setBounds(10,5,200,30);
    t1.setBounds(20,40,240,60);
    b2.setBounds(10,110,100,60);
    t2.setBounds(20,150,100,30);
    
    //radio3.setBounds(40,200,100,30);
    //radio4.setBounds(160,200,100,30);
    ok.setBounds(100,210,100,30);
    
    c.add(b1);
    c.add(t1);
    t1.setEditable(false);
    c.add(b2);
    c.add(t2);
   
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
		  if (t2.getText().isEmpty())
			  p.NodeInformationRecord[p.FlagSelected].BitsLength= 1;
		  else
			  p.NodeInformationRecord[p.FlagSelected].BitsLength = Integer.parseInt(t2.getText().toString());
		  //System.out.print(p.NodeInformationRecord[p.Number].ConvolutionalIndicator);
		  setVisible(false);		  
	  }

	  
  }

	
}
