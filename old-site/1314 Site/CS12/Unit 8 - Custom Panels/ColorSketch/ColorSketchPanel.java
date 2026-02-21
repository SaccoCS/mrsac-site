import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.*;

public class ColorSketchPanel extends JPanel
{
    private int x;
    private int y;

    Rectangle redRect = new Rectangle(53,50,20,20);
    Rectangle greenRect = new Rectangle(177,50,20,20);
    Rectangle blueRect = new Rectangle(301,50,20,20);
    Rectangle blackRect = new Rectangle(425,50,20,20);

    Rectangle rect = new Rectangle(170,170,160,160);
    Color rectCol = Color.RED;
    Color backCol = Color.WHITE;

    Color myCol = Color.BLACK;

    private BufferedImage backBuffer;   //The image that will be painted
    private Graphics2D painter;         //The tool that will paint onto backBuffer

    public ColorSketchPanel()
    {   
        backBuffer = new BufferedImage(500,500, BufferedImage.TYPE_INT_RGB);
        painter = backBuffer.createGraphics();      //Attaches painter to the background image
        painter.setStroke(new BasicStroke(8,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND));

        //Draws the initial background and border 
        painter.setColor(Color.WHITE);
        painter.fillRect(0,0,500, 500);

        this.setPreferredSize( new Dimension(500,500));
        this.addMouseListener(new ML());
        this.addMouseMotionListener(new MML());
    }

    //This is all paintComponent needs to be.  
    public void paintComponent(Graphics g)
    {
        g.drawImage(backBuffer,0,0,this);

        g.setColor(Color.RED);
        g.fillRect((int)redRect.getX(),(int)redRect.getY(),(int)redRect.getWidth(), (int)redRect.getHeight());

        g.setColor(Color.GREEN);
        g.fillRect((int)greenRect.getX(),(int)greenRect.getY(),(int)greenRect.getWidth(), (int)greenRect.getHeight());

        g.setColor(Color.BLUE);
        g.fillRect((int)blueRect.getX(),(int)blueRect.getY(),(int)blueRect.getWidth(), (int)blueRect.getHeight());

        g.setColor(Color.BLACK);
        g.fillRect((int)blackRect.getX(),(int)blackRect.getY(),(int)blackRect.getWidth(), (int)blackRect.getHeight());
        
        g.drawRect(0,0,499,499);

    }

    class MML implements MouseMotionListener
    {
        public void mouseMoved(MouseEvent m)
        {

        }

        public void mouseDragged(MouseEvent m)
        {       

            painter.setColor(myCol);
            painter.drawLine(x,y,m.getX(),m.getY());

            x=m.getX();
            y=m.getY();
            repaint();

        }

    }

    class ML implements MouseListener
    {
        public void mousePressed(MouseEvent m)
        {

            if( redRect.contains(new Point(m.getX(),m.getY())))
                myCol = Color.RED;
            else if( blueRect.contains(new Point(m.getX(),m.getY())))
                myCol = Color.BLUE;
            else if( greenRect.contains(new Point(m.getX(),m.getY())))
                myCol = Color.GREEN;
            else if( blackRect.contains(new Point(m.getX(),m.getY())))
                myCol = Color.BLACK;

            x=m.getX();
            y=m.getY();

            if( m.getButton() == MouseEvent.BUTTON3)
            {
                painter.setColor(Color.WHITE);
                painter.fillRect(0,0,500,500);
            }
            repaint();

        }

        public void mouseReleased(MouseEvent m)
        {

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

