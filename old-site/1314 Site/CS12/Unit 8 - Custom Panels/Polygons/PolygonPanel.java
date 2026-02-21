import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.*;

public class PolygonPanel extends JPanel
{
    private Color polyColor;

    Polygon currentPoly = new Polygon();

    private BufferedImage backBuffer;   //The image that will be painted
    private Graphics2D painter;         //The tool that will paint onto backBuffer

    public PolygonPanel()
    {   
        backBuffer = new BufferedImage(500,500, BufferedImage.TYPE_INT_RGB);
        painter = backBuffer.createGraphics();      //Attaches painter to the background image

        painter.setBackground( Color.WHITE );
        painter.clearRect(0,0,500,500);

        int r = (int)(Math.random()*256);
        int g = (int)(Math.random()*256);
        int b = (int)(Math.random()*256);
        polyColor = new Color(r,g,b);

        this.setPreferredSize( new Dimension(500,500));
        this.addMouseMotionListener(new MML());
        this.addMouseListener(new ML());
    }

    public void paintComponent(Graphics g)
    {
        g.drawImage(backBuffer,0,0,this);

        g.setColor(polyColor);
        g.fillPolygon(currentPoly);
        
        g.setColor(Color.BLACK);
        g.drawRect(0,0,499,499);

    }

    class MML implements MouseMotionListener
    {
        public void mouseMoved(MouseEvent m)
        {

        }

        public void mouseDragged(MouseEvent m)
        {           
            // currentPoly.addPoint(m.getX(), m.getY());        

            repaint();   //calls the paintComponent method to repaint the panel
        }

    }

    class ML implements MouseListener
    {
        public void mousePressed(MouseEvent m)
        {

            if( m.getButton() == MouseEvent.BUTTON1)
            {
                currentPoly.addPoint(m.getX(), m.getY());
            }
            else if(m.getButton() == MouseEvent.BUTTON3)
            {
                painter.setColor(polyColor);
                painter.fillPolygon(currentPoly);
                currentPoly.reset();
                int r = (int)(Math.random()*256);
                int g = (int)(Math.random()*256);
                int b = (int)(Math.random()*256);
                polyColor = new Color(r,g,b);
            }

            repaint();
        }

        public void mouseReleased(MouseEvent m)
        {
            //currentPoly.reset();
        }

        public void mouseExited(MouseEvent m)
        {}

        public void mouseEntered(MouseEvent m)
        {}

        public void mouseClicked(MouseEvent m)
        {

        }
    }
}

