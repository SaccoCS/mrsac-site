import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MouseHighlightPanel extends JPanel
{

    private int x;
    private int y;

    //Constructor: Called once when this object is created
    public MouseHighlightPanel()
    {   
        x=-100;
        y=-100;
        this.setPreferredSize( new Dimension(500,500));
        this.addMouseMotionListener(new ML());
    }

    //paintComponent is called as part of repaint()
    public void paintComponent(Graphics g)
    {
        Graphics2D g2 = (Graphics2D)g;  //upgrades to a Graphics2D

        g2.setColor(Color.white);
        g2.fillRect(0,0,this.getWidth()-1, this.getHeight()-1);
        g2.setColor(Color.BLACK);
        g2.drawRect(0,0,this.getWidth()-1, this.getHeight()-1);

        
        g2.setColor( Color.red);
        g.fillOval(x-25,y-25,50,50);

    }

    class ML implements MouseMotionListener
    {
        public void mouseMoved(MouseEvent m)
        {
            x=m.getX();
            y=m.getY();

            repaint();   //calls the paintComponent method to repaint the panel
        }

        public void mouseDragged(MouseEvent m)
        {           
            
        }

    }
}

