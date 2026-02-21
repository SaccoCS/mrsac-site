import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.util.*;

public class MouseHighlightApplet extends JApplet
{
    MouseHighlightPanel dPanel;    

    
    public void init()
    {
        dPanel = new MouseHighlightPanel();
        this.add(BorderLayout.CENTER,dPanel);
    }
    

}