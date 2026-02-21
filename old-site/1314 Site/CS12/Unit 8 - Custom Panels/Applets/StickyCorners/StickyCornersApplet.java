import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.util.*;

public class StickyCornersApplet extends JApplet
{
    StickyCornersPanel dPanel;    

    
    public void init()
    {
        dPanel = new StickyCornersPanel();
        this.add(BorderLayout.CENTER,dPanel);
    }
    

}