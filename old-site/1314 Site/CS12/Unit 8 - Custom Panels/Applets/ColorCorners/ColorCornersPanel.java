import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class ColorCornersPanel extends JPanel
{

    private int x;
    private int y;

    //Constructor: Called once when this object is created
    public ColorCornersPanel()
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

        if(x!=-100)
        {
            double r = (double)x/this.getWidth()*256;
            double b = (double)y/this.getHeight()*256;
            g2.setColor( new Color((int)r,0,(int)b));

            g2.fillRect(0,0,this.getWidth()-1, this.getHeight()-1);
        }
        g2.setColor(Color.BLACK);
        g2.drawRect(0,0,this.getWidth()-1, this.getHeight()-1);
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

