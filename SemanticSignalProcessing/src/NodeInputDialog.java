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



public class NodeInputDialog extends JDialog implements ActionListener {
	
	
	public String Shape;
	public String Name;
	public JTextField t1 = new JTextField();
	public IntegerTextField t2 = new IntegerTextField();
	public IntegerTextField t3 = new IntegerTextField();
	public IntegerTextField t4 = new IntegerTextField();
	public IntegerTextField t5 = new IntegerTextField();
	public IntegerTextField t6 = new IntegerTextField();
	JButton ok = new JButton("Ok");
	public SSP_Main p;
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
	
	public void init()
	{
		
	}
	
  public NodeInputDialog(JFrame frame, SSP_Main parent) {
    super(frame, true);
    
    //this.frame = frame;
    Name = "hello";
    p = parent;
    setBounds(200,150,360,220);
    setTitle("Information Aqucition");
    Container c = this.getContentPane();
    c.setLayout(new BorderLayout());
    if ((parent.NodeType == "Thing") || (parent.NodeType == "Action") || (parent.NodeType == "Cause") )
    {
    	
    	Shape = parent.NodeType;
    	
    	JPanel p1 = new JPanel();
        p1.setLayout(new GridLayout(3, 1));
        Box b1 = Box.createVerticalBox();
    	b1.add(Box.createGlue());
        b1.add(new JLabel("  Name:             "));
        b1.add(Box.createGlue());
        Box b2 = Box.createVerticalBox();
        b2.add(Box.createGlue());
        b2.add(new JLabel("  Position(Pixels): "));
        b2.add(Box.createGlue());
        Box b3 = Box.createVerticalBox();
        b3.add(Box.createGlue());
        b3.add(new JLabel("  Size:             "));
        b3.add(Box.createGlue());
        p1.add(b1);
        p1.add(b2);
        p1.add(b3);
        
        JPanel p2 = new JPanel();
        p2.setLayout(new GridLayout(3,2));          
        Box b4 = Box.createVerticalBox();
        b4.add(Box.createGlue());
        b4.add(new JLabel(" "));
        b4.add(Box.createGlue());
        
        Box b5 = Box.createVerticalBox();
        b5.add(Box.createGlue());
        b5.add(new JLabel("    "));
        b5.add(Box.createGlue());
        
        p2.add(t1);
        p2.add(b4);
        p2.add(t2);
        p2.add(t3);
        p2.add(t4);
        p2.add(b5);
        
        JPanel p3 = new JPanel();
        p3.setLayout(new GridLayout(3,1));
        Box b6 = Box.createVerticalBox();
        b6.add(Box.createGlue());
        if (Shape == "Thing")      	
        	b6.add(new JLabel("  Please complete the following fields for a Thing:  ")); 
        if (Shape == "Action")     
        	b6.add(new JLabel("  Please complete the following fields for an Action:  "));
        if (Shape == "Cause")
        	b6.add(new JLabel("  Please complete the following fields for a Cause:  "));
              
        b6.add(Box.createGlue());
        Box b7 = Box.createVerticalBox();
        b7.add(Box.createGlue());
        b7.add(new JLabel("  "));
        b7.add(Box.createGlue());
        Box b8 = Box.createVerticalBox();
        b8.add(Box.createGlue());
        b8.add(new JLabel("  "));
        b8.add(Box.createGlue());
        p3.add(b7);
        p3.add(b6);
        p3.add(b8);
        
        JPanel p4 = new JPanel();       
        p4.add(ok);
        
        c.add(p1, BorderLayout.WEST);
        c.add(p2, BorderLayout.CENTER);
        c.add(p3, BorderLayout.NORTH);
        c.add(p4, BorderLayout.SOUTH); 
		
		
		t1.addActionListener(this);
		t2.addActionListener(this);
		t3.addActionListener(this);
		t4.addActionListener(this);	
		ok.addActionListener(this);
    
    }
    if (parent.NodeType == "Place")
    {
    	Shape = parent.NodeType;  	
    	JPanel p1 = new JPanel();
        p1.setLayout(new GridLayout(3, 1));
        Box b1 = Box.createVerticalBox();
    	b1.add(Box.createGlue());
        b1.add(new JLabel("  Name:                "));
        b1.add(Box.createGlue());
        Box b2 = Box.createVerticalBox();
        b2.add(Box.createGlue());
        b2.add(new JLabel("  Position(Pixels):    "));
        b2.add(Box.createGlue());
        Box b3 = Box.createVerticalBox();
        b3.add(Box.createGlue());
        b3.add(new JLabel("  Size(Width, Height): "));
        b3.add(Box.createGlue());
        p1.add(b1);
        p1.add(b2);
        p1.add(b3);
        
        JPanel p2 = new JPanel();
        p2.setLayout(new GridLayout(3,2));          
        Box b4 = Box.createVerticalBox();
        b4.add(Box.createGlue());
        b4.add(new JLabel(" "));
        b4.add(Box.createGlue());
              
        p2.add(t1);
        p2.add(b4);
        p2.add(t2);
        p2.add(t3);
        p2.add(t4);
        p2.add(t5);
        
        JPanel p3 = new JPanel();
        p3.setLayout(new GridLayout(3,1));
        Box b6 = Box.createVerticalBox();
        b6.add(Box.createGlue());
        b6.add(new JLabel("  Please complete the following fields for a Place:  "));
        b6.add(Box.createGlue());
        Box b7 = Box.createVerticalBox();
        b7.add(Box.createGlue());
        b7.add(new JLabel("  "));
        b7.add(Box.createGlue());
        Box b8 = Box.createVerticalBox();
        b8.add(Box.createGlue());
        b8.add(new JLabel("  "));
        b8.add(Box.createGlue());
        p3.add(b7);
        p3.add(b6);
        p3.add(b8);
        
        JPanel p4 = new JPanel();       
        p4.add(ok);
        
        c.add(p1, BorderLayout.WEST);
        c.add(p2, BorderLayout.CENTER);
        c.add(p3, BorderLayout.NORTH);
        c.add(p4, BorderLayout.SOUTH);

	
		
		t1.addActionListener(this);
		t2.addActionListener(this);
		t3.addActionListener(this);
		t4.addActionListener(this);	
		t5.addActionListener(this);	
		ok.addActionListener(this);
		
    }
    if (parent.NodeType == "Path")
    {
    	Shape = parent.NodeType;
	
    	JPanel p1 = new JPanel();
        p1.setLayout(new GridLayout(4, 1));
        Box b1 = Box.createVerticalBox();
    	b1.add(Box.createGlue());
        b1.add(new JLabel("  Name:               "));
        b1.add(Box.createGlue());
        Box b2 = Box.createVerticalBox();
        b2.add(Box.createGlue());
        b2.add(new JLabel("  Position(Pixels):   "));
        b2.add(Box.createGlue());
        Box b3 = Box.createVerticalBox();
        b3.add(Box.createGlue());
        b3.add(new JLabel("  Size(Width, Height): "));
        b3.add(Box.createGlue());
        Box bb = Box.createVerticalBox();
        bb.add(Box.createGlue());
        bb.add(new JLabel("  Size(Horn):          "));
        bb.add(Box.createGlue());
        p1.add(b1);
        p1.add(b2);
        p1.add(b3);
        p1.add(bb);
        
        JPanel p2 = new JPanel();
        p2.setLayout(new GridLayout(4,2));          
        Box b4 = Box.createVerticalBox();
        b4.add(Box.createGlue());
        b4.add(new JLabel(" "));
        b4.add(Box.createGlue());
        
        Box b5 = Box.createVerticalBox();
        b5.add(Box.createGlue());
        b5.add(new JLabel("    "));
        b5.add(Box.createGlue());
        
        p2.add(t1);
        p2.add(b4);
        p2.add(t2);
        p2.add(t3);
        p2.add(t4);
        p2.add(t5);
        p2.add(t6);
        p2.add(b5);
        
        JPanel p3 = new JPanel();
        p3.setLayout(new GridLayout(3,1));
        Box b6 = Box.createVerticalBox();
        b6.add(Box.createGlue());
        b6.add(new JLabel("  Please complete the following fields for a Path:  "));
        b6.add(Box.createGlue());
        Box b7 = Box.createVerticalBox();
        b7.add(Box.createGlue());
        b7.add(new JLabel("  "));
        b7.add(Box.createGlue());
        Box b8 = Box.createVerticalBox();
        b8.add(Box.createGlue());
        b8.add(new JLabel("  "));
        b8.add(Box.createGlue());
        p3.add(b7);
        p3.add(b6);
        p3.add(b8);
        
        JPanel p4 = new JPanel();       
        p4.add(ok);
        
        c.add(p1, BorderLayout.WEST);
        c.add(p2, BorderLayout.CENTER);
        c.add(p3, BorderLayout.NORTH);
        c.add(p4, BorderLayout.SOUTH);

	
		
		t1.addActionListener(this);
		t2.addActionListener(this);
		t3.addActionListener(this);
		t4.addActionListener(this);	
		t5.addActionListener(this);	
		t6.addActionListener(this);	
		ok.addActionListener(this);
    }

    

   
    

  }

  public static void main(String[] args) {
	JDialog f = new NodeInputDialog(new JFrame(), new SSP_Main());
	f.show();
	
  }
  
  public void actionPerformed(ActionEvent evt)
  {
	  
	  if ((evt.getSource() == ok) && Shape == "Thing")
	  {	
		  if (t1.getText().isEmpty())
	        	p.NodeInformationRecord[p.Number].Name = "Thing";
		  else
			  p.NodeInformationRecord[p.Number].Name = t1.getText().toString();
		  if (t2.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[0] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[0] = Integer.parseInt(t2.getText().toString());
		  if (t3.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[1] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[1] = 85 + Integer.parseInt(t3.getText().toString());
		  if (t4.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Size[0] = 80;
		  else
			  p.NodeInformationRecord[p.Number].Size[0] = Integer.parseInt(t4.getText().toString());     	
		  p.NodeInformationRecord[p.Number].Size[1] = p.NodeInformationRecord[p.Number].Size[0]/2;	 
		  setVisible(false);
		  
	  }	 
	  if ((evt.getSource() == ok) && Shape == "Action")
	  {	
		  if (t1.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Name = "Action";
		  else
			  p.NodeInformationRecord[p.Number].Name = t1.getText().toString();
		  if (t2.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[0] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[0] = Integer.parseInt(t2.getText().toString());
		  if (t3.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[1] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[1] = 85 + Integer.parseInt(t3.getText().toString());
		  if (t4.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Size[0] = 80; 		
		  else
			  p.NodeInformationRecord[p.Number].Size[0] = Integer.parseInt(t4.getText().toString());		  
		  p.NodeInformationRecord[p.Number].Size[1] = 3*p.NodeInformationRecord[p.Number].Size[0]/4;
		  setVisible(false);
	  }	
	  if ((evt.getSource() == ok) && Shape == "Place")
	  {	
		  if (t1.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Name = "Place";
		  else
			  p.NodeInformationRecord[p.Number].Name = t1.getText().toString();
		  if (t2.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[0] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[0] = Integer.parseInt(t2.getText().toString());
		  if (t3.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[1] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[1] = 85 + Integer.parseInt(t3.getText().toString());
		  if (t4.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Size[0] = 80;
		  else
			  p.NodeInformationRecord[p.Number].Size[0] = Integer.parseInt(t4.getText().toString());
		  if (t5.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Size[1] = 150;
		  else
			  p.NodeInformationRecord[p.Number].Size[1] = Integer.parseInt(t5.getText().toString());
		  setVisible(false);
	  }	
	  if ((evt.getSource() == ok) && Shape == "Path")
	  {		
		  if (t1.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Name = "Path";
		  else
			  p.NodeInformationRecord[p.Number].Name = t1.getText().toString();
		  if (t2.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[0] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[0] = Integer.parseInt(t2.getText().toString());
		  if (t3.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[1] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[1] = 85 + Integer.parseInt(t3.getText().toString());
		  if (t4.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Size[0] = 150;
		  else
			  p.NodeInformationRecord[p.Number].Size[0] = Integer.parseInt(t4.getText().toString());
		  if (t5.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Size[1] = 80;
		  else
			  p.NodeInformationRecord[p.Number].Size[1] = Integer.parseInt(t5.getText().toString());
		  if (t6.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Size[2] = 30;
		  else
			  p.NodeInformationRecord[p.Number].Size[2] = Integer.parseInt(t6.getText().toString());
		  setVisible(false);
	  }	
	  if ((evt.getSource() == ok) && Shape == "Cause")
	  {		
		  if (t1.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Name = "Cause";
		  else
			  p.NodeInformationRecord[p.Number].Name = t1.getText().toString();
		  if (t2.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[0] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[0] = Integer.parseInt(t2.getText().toString());
		  if (t3.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Position[1] = 200;
		  else
			  p.NodeInformationRecord[p.Number].Position[1] = 85 + Integer.parseInt(t3.getText().toString());
		  if (t4.getText().isEmpty())
			  p.NodeInformationRecord[p.Number].Size[0] = 80;
		  else
			  p.NodeInformationRecord[p.Number].Size[0] = Integer.parseInt(t4.getText().toString());		 
		  setVisible(false);
	  }	
	  
  }

	
}