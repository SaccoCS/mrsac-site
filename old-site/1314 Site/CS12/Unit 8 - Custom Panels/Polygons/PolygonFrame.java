import javax.swing.*;
import java.awt.*;

public class PolygonFrame extends JFrame
{
    PolygonPanel myPanel;                 //This name will change with each project
    
    public PolygonFrame()
    {
        myPanel = new PolygonPanel();      //This name will change with each project
        this.add( myPanel );
        
        this.pack();
        this.setVisible(true);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    
}