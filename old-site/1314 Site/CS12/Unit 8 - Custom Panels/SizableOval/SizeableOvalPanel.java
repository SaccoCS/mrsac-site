import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.*;

public class SizeableOvalPanel extends JPanel
{
    private int startX;
    private int startY;
    private int endX;
    private int endY;

    Rectangle tmpRect;
    Color rectCol= Color.BLACK;

    private boolean mouseDown=false;

    private BufferedImage backBuffer;   //The image that will be painted
    private Graphics2D painter;         //The tool that will paint onto backBuffer

    public SizeableOvalPanel()
    {   
        backBuffer = new BufferedImage(500,500, BufferedImage.TYPE_INT_RGB);
        painter = backBuffer.createGraphics();      //Attaches painter to the background image
        painter.setStroke(new BasicStroke(8,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND));

        //Draws the initial background and border 
        painter.setColor(Color.WHITE);
        painter.fillRect(0,0,499, 499);

        this.setPreferredSize( new Dimension(500,500));
        this.addMouseListener(new ML());
        this.addMouseMotionListener(new MML());
    }

    //This is all paintComponent needs to be.  
    public void paintComponent(Graphics g)
    {
        Graphics2D g2 = (Graphics2D)g;
        g2.drawImage(backBuffer,0,0,this);

        g2.setColor(rectCol);
        
        int xUL = Math.min( startX, endX);
        int yUL = Math.min( startY, endY);
        int xBL = Math.max( startX, endX);
        int yBL = Math.max( startY, endY);
        
        g2.fillOval(xUL,yUL,xBL-xUL,yBL-yUL);
        
        g2.setColor(Color.BLACK);
        g2.drawRect(0,0,500,500);

    }

    class MML implements MouseMotionListener
    {
        public void mouseMoved(MouseEvent m)
        {

        }

        public void mouseDragged(MouseEvent m)
        {       
            endX = m.getX();
            endY = m.getY();

            repaint();

        }

    }

    class ML implements MouseListener
    {
        public void mousePressed(MouseEvent m)
        {

            rectCol = new Color((int)(Math.random()*256),(int)(Math.random()*256),(int)(Math.random()*256));
            startX = m.getX();
            startY = m.getY();
        }

        public void mouseReleased(MouseEvent m)
        {

            painter.setColor(rectCol);
            
            int xUL = Math.min( startX, endX);
        int yUL = Math.min( startY, endY);
        int xBL = Math.max( startX, endX);
        int yBL = Math.max( startY, endY);
        
        painter.fillOval(xUL,yUL,xBL-xUL,yBL-yUL);

        }

        public void mouseEntered(MouseEvent m)
        {

        }

        public void mouseExited(MouseEvent m)
        {

        }

        public void mouseClicked(MouseEvent m)
        {

        }

    }
}

