import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.util.*;

public class ColorCornersApplet extends JApplet
{
    ColorCornersPanel dPanel;    

    
    public void init()
    {
        dPanel = new ColorCornersPanel();
        this.add(BorderLayout.CENTER,dPanel);
    }
    

}