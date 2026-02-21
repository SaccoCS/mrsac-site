import javax.swing.*;
import java.awt.*;

public class ColorSketchFrame extends JFrame
{
    ColorSketchPanel myPanel;                 //This name will change with each project
    public ColorSketchFrame()
    {
        myPanel = new ColorSketchPanel();      //This name will change with each project
        this.add( myPanel );
        
        this.pack();
        this.setVisible(true);
        
    }
    
}