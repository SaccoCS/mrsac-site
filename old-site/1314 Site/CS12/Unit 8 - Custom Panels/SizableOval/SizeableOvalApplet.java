import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.util.*;

public class SizeableOvalApplet extends JApplet
{
    SizeableOvalPanel dPanel;    

    
    public void init()
    {
        dPanel = new SizeableOvalPanel();
        this.add(BorderLayout.CENTER,dPanel);
    }
    

}