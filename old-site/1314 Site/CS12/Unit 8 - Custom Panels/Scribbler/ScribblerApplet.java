import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.util.*;

public class ScribblerApplet extends JApplet
{
    ScribblerPanel dPanel;    

    
    public void init()
    {
        dPanel = new ScribblerPanel();
        this.add(BorderLayout.CENTER,dPanel);
    }
    

}