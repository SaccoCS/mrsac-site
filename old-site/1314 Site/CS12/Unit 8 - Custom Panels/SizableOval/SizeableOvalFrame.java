import javax.swing.*;
import java.awt.*;

public class SizeableOvalFrame extends JFrame
{
    SizeableOvalPanel myPanel;                 //This name will change with each project
    public SizeableOvalFrame()
    {
        myPanel = new SizeableOvalPanel();      //This name will change with each project
        this.add( myPanel );
        
        this.pack();
        this.setVisible(true);
        
    }
    
}