import javax.swing.*;
import java.awt.*;

public class ScribblerFrame extends JFrame
{
    ScribblerPanel myPanel;                 //This name will change with each project
    
    public ScribblerFrame()
    {
        myPanel = new ScribblerPanel();      //This name will change with each project
        this.add( myPanel );
        
        this.pack();
        this.setVisible(true);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    
}