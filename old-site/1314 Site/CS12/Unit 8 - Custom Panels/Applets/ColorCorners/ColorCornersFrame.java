import javax.swing.*;
import java.awt.*;

public class ColorCornersFrame extends JFrame
{
    ColorCornersPanel myPanel;                 //This name will change with each project
    public ColorCornersFrame()
    {
        myPanel = new ColorCornersPanel();      //This name will change with each project
        this.add( myPanel );
        
        this.pack();
        this.setVisible(true);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    
}