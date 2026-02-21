import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.util.*;

public class PolygonApplet extends JApplet
{
    PolygonPanel dPanel;    

    
    public void init()
    {
        dPanel = new PolygonPanel();
        this.add(BorderLayout.CENTER,dPanel);
    }
    

}