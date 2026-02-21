import info.gridworld.actor.*;
import info.gridworld.grid.*;
import info.gridworld.world.*;
import java.util.ArrayList;
import javax.swing.JOptionPane;

public class MineWorld extends ActorWorld
{
    private int numBombs;
    private int numRows;
    private int numCols;
    private boolean flagMode;

    public MineWorld()
    {
        this(10,10,10);
    }

    public MineWorld(int rows, int columns, int bombs)
    {
        super(new BoundedGrid<Actor>(rows,columns));
        numBombs = bombs;
        numRows = rows;
        numCols = columns;

        setMessage("Welcome to MineSweeper.  Press F to toggle flag mode.");

        flagMode = false;
        newGame();
    }

     public boolean locationClicked(Location loc)
    { 
        if( !isFlagMode() && !(getGrid().get(loc) instanceof FlaggedSquare))
        {

            if( isLoser() || isWinner())    //put early so that there is one step where the final board is shown
            {
                newGame();
                return true;
            }

            actAtLocation(loc);
            //resetAllActors();

        }
        else
        {
            swapFlagAt( loc );
        }

        if(isLoser())
        {
            actAllActors();
            JOptionPane.showMessageDialog(null, "You Lose :( Click the grid to reset"); //shows a result window

        }
        else if( isWinner())
        {
            JOptionPane.showMessageDialog(null, "You WIN!!! Click the grid to reset"); //shows a result window
        }

        if( flagMode )
        {
            flagMode = false;   //flag mode is eaten after the click
            setMessage("Flag Mode:  OFF");
        }
        return true;
    }

    public boolean keyPressed(String str, Location loc)
    {
        if( str.equalsIgnoreCase("F"))
        {    flagMode = !flagMode;

            if( flagMode )
                setMessage("Flag Mode:  ON");
            else
                setMessage("Flag Mode:  OFF");

        }
        return true;
    }
    
    public void newGame()
    {
        flagMode = false;
        clearGrid();
        int gridSize = 10;

        for( int i =0; i< numBombs; i++)
        {
            this.add(new Square(true));
        }

        for( int i =0; i< numRows*numCols - numBombs; i++)
        {
            this.add(new Square(false));
        }

        this.show();
    }    

    public void clearGrid()
    {
        for( Location loc: getGrid().getOccupiedLocations())
            getGrid().get(loc).removeSelfFromGrid();
    }

    public void actAtLocation(Location loc)
    {
        Actor obj;
        if(getGrid().isValid(loc) && (obj = getGrid().get(loc)) != null )   //if the Location clicked is valid and occupied, act
        {
            obj.act() ;   
        }
    }

    public void resetAllActors()
    {
        ArrayList<Location> occupiedLocs = getGrid().getOccupiedLocations();    //get the Occupied Locations from the grid

        for( Location aloc: occupiedLocs)   //loop through occupiedLocs
        {
            Actor tmp = getGrid().get(aloc);    //get the Actor at that Location

            if( tmp instanceof Square) {}        
                ((Square)tmp).reset();
        }
    }

    public void actAllActors()
    {
        ArrayList<Location> occupiedLocs = getGrid().getOccupiedLocations();
        for( Location aloc : occupiedLocs)  
        {

            if( getGrid().get(aloc) instanceof Bomb)        //if a Bomb has been exposed (game over)
            {

                for( Location bLoc : occupiedLocs)                 //loop through and tell all to act
                {

                    Actor tmpAct = getGrid().get(bLoc);
                    if(tmpAct != null )
                        tmpAct.act();

                }
            }
        }
    }

    public boolean isWinner()
    {

        boolean winner = true;
        int flagCount = 0;
        ArrayList<Location> occuLocs = getGrid().getOccupiedLocations();

        for( Location tloc : occuLocs)
        {
            Actor tmpAct = getGrid().get(tloc);
            if(  tmpAct instanceof Square && !((Square)tmpAct).isABomb())
            {
                winner = false;
            }
            if( tmpAct instanceof Bomb)
            {
                winner =  false;
            }

            if( tmpAct instanceof FlaggedSquare && ((FlaggedSquare)tmpAct).isABomb())
                flagCount++;

        }

        if( flagCount == numBombs)
        {
            clearNonFlags();
            return true;
        }
        return winner;
    }

    public void clearNonFlags()
    {
        for( Location loc : getGrid().getOccupiedLocations())
        {
            Actor tmpActor = getGrid().get(loc);
            if( !(getGrid().get(loc) instanceof FlaggedSquare))
                tmpActor.act();
        }
    }

    public boolean isLoser()
    {
        boolean loser = false;
        ArrayList<Location> occuLocs = getGrid().getOccupiedLocations();

        for( Location tloc : occuLocs)
        {
            Actor tmpAct = getGrid().get(tloc);

            if( tmpAct instanceof Bomb)
            {
                loser = true;   
                actAllActors();

            }

        }

        return loser;
    }

    public void promptAndReset()
    {
        newGame();
    }

    public boolean isFlagMode()
    {
        return flagMode;
    }

    public void swapFlagAt(Location loc)
    {
        Actor oldActor = getGrid().get(loc);

        Actor newActor = null;

        if( oldActor instanceof FlaggedSquare)
        {   
            newActor = new Square( ((FlaggedSquare)oldActor).isABomb());

        }
        else if(oldActor instanceof Square)
        {
            newActor = new FlaggedSquare( ((Square)oldActor).isABomb());
        }
        else
        {
            return;
        }

        newActor.putSelfInGrid( oldActor.getGrid(), oldActor.getLocation());
    }

   

    public static void main(String[] args)
    {

        MineWorld world = new MineWorld(10,10,10);

    }
    
   
   
}