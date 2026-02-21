import javax.swing.*;
import java.awt.*;

public class StickyCornersFrame extends JFrame
{
    StickyCornersPanel myPanel;                 //This name will change with each project
    public StickyCornersFrame()
    {
        myPanel = new StickyCornersPanel();      //This name will change with each project
        this.add( myPanel );
        
        this.pack();
        this.setVisible(true);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    
}