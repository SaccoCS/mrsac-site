import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.util.*;

public class ColorSketchApplet extends JApplet
{
    ColorSketchPanel dPanel;    

    
    public void init()
    {
        dPanel = new ColorSketchPanel();
        this.add(BorderLayout.CENTER,dPanel);
    }
    

}