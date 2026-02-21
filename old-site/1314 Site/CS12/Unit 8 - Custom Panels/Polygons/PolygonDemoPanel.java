import javax.swing.*;
import java.awt.*;

public class PolygonDemoPanel extends JPanel
{

    Polygon myPoly = new Polygon();

    public PolygonDemoPanel()
    {   

        myPoly.addPoint(200,50);
        myPoly.addPoint(350,150);
        myPoly.addPoint(350,350);
        myPoly.addPoint(50,350);
        myPoly.addPoint(50,150);

        this.setPreferredSize( new Dimension(500,500));
    }

    public void paintComponent(Graphics g)
    {
        g.setColor(Color.WHITE);
        g.fillRect(0,0,500,500);

        g.setColor(Color.RED);
        g.fillPolygon(myPoly);

    }

}

