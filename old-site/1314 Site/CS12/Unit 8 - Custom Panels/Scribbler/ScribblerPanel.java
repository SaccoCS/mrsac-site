import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.*;

public class ScribblerPanel extends JPanel
{
    private int x;
    private int y;

    private BufferedImage backBuffer;   //The image that will be painted
    private Graphics2D painter;         //The tool that will paint onto backBuffer

    public ScribblerPanel()
    {   
        backBuffer = new BufferedImage(500,500, BufferedImage.TYPE_INT_RGB);
        painter = backBuffer.createGraphics();      //Attaches painter to the background image

        //Draws the initial background and border 
        //painter.setColor(Color.WHITE);
        //painter.fillRect(0,0,500, 500);
        painter.setBackground( Color.WHITE );
        painter.clearRect(0,0,500,500);
        this.setPreferredSize( new Dimension(500,500));
        this.addMouseMotionListener(new MML());
        this.addMouseListener(new ML());
    }

    //This is all paintComponent needs to be.  
    public void paintComponent(Graphics g)
    {
        g.drawImage(backBuffer,0,0,this);
        g.setColor(Color.BLACK);
        g.drawRect(0,0,this.getWidth()-1, this.getHeight()-1);
    }

    class MML implements MouseMotionListener
    {
        public void mouseMoved(MouseEvent m)
        {

        }

        public void mouseDragged(MouseEvent m)
        {           
            painter.setColor(Color.RED);
            painter.drawLine(x,y,m.getX(),m.getY());
            x=m.getX();        
            y=m.getY();         

            repaint();   //calls the paintComponent method to repaint the panel
        }

    }
    
    class ML implements MouseListener
    {
        public void mousePressed(MouseEvent m)
        {
            
            if( m.getButton() == MouseEvent.BUTTON3)
             {
                 painter.setColor(Color.WHITE);
                 painter.fillRect(0,0,500,500);
                 repaint();
                 }
            x=m.getX();
            y=m.getY();
            
        }
        public void mouseReleased(MouseEvent m)
        {}
        public void mouseExited(MouseEvent m)
        {}
        public void mouseEntered(MouseEvent m)
        {}
        public void mouseClicked(MouseEvent m)
        {
            
        }
        }
}

