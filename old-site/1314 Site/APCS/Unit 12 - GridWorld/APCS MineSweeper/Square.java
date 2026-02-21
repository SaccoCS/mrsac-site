import info.gridworld.actor.*;
import info.gridworld.grid.*;
import java.util.ArrayList;
import java.awt.Color;

public class Square extends Actor
{

    private boolean isABomb;
    private boolean hasActed;
    public Square(boolean isABomb)
    {
        setColor(null);
        this.isABomb = isABomb;
    }

    public void act()
    {
        hasActed = true;
        Grid<Actor> gr = getGrid();

        int numBombs = numberOfBombsAround();

        if( isABomb )
        {
            (new Bomb()).putSelfInGrid(gr,getLocation());

            return;
        }

        else if( numBombs == 0 )
        {
            ArrayList<Actor> neighbors = gr.getNeighbors(getLocation());

            for( Actor a: neighbors)
            {
                if( a instanceof Square&& !((Square)a).alreadyActed())
                    a.act();
            }
            (new Zero()).putSelfInGrid(gr,getLocation());

        }
        else 
        {
            Actor numberActor = null;
            switch(numBombs)
            {
                case 1: numberActor = new One();break;
                case 2: numberActor = new Two();break;
                case 3: numberActor = new Three();break;
                case 4: numberActor = new Four();break;
                case 5: numberActor = new Five();break;
                case 6: numberActor = new Six();break;
                case 7: numberActor = new Seven();break;
                case 8: numberActor = new Eight();break;

            }
            numberActor.putSelfInGrid(gr,getLocation());
        }

    }

    public boolean alreadyActed()
    {
        return hasActed;
    }

    public void reset()
    {
        hasActed = false;
    }

    public int numberOfBombsAround()
    {
        Grid<Actor> gr = getGrid();

        ArrayList<Actor> neighbors = gr.getNeighbors(getLocation());
        int count =0;

        for( Actor a: neighbors)
        {
            if( a instanceof Square && ((Square)a).isABomb()|| a instanceof Bomb)
            {
                count++;
            }
        }

        return count;

    }

    public boolean isABomb()
    {
        return isABomb;
    }

    public String toString()
    {
        int numBombs = numberOfBombsAround();
        String toReturn = "";

        if( isABomb)
            toReturn+="BOMB with "+ numBombs + " surrounding";
        else
            toReturn+=numBombs;

        return toReturn;
    }
}