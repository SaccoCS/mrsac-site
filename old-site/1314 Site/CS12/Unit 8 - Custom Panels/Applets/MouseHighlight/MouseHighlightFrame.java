import javax.swing.*;
import java.awt.*;

public class MouseHighlightFrame extends JFrame
{
    MouseHighlightPanel myPanel;                 //This name will change with each project
    public MouseHighlightFrame()
    {
        myPanel = new MouseHighlightPanel();      //This name will change with each project
        this.add( myPanel );
        
        this.pack();
        this.setVisible(true);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    
}