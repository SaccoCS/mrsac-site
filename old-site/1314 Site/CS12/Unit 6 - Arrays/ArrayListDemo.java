import java.util.ArrayList;

public class ArrayListDemo
{
    public static void main()
    {
        
        
        //Create an ArrayList to hold many Strings
        ArrayList<String> strList = new ArrayList<String>();
        
        //Add 3 Strings to the list using the add method
        String str = "Hello";
        strList.add( str );
        strList.add( "World" );
        strList.add( "!!!" );
        
        //print out everything in the List
        System.out.println( strList );
        
        
        //loop through the list and print out each String
        for( int i =0; i < strList.size(); i++)
        {
            String tmp = strList.get( i );   //access the item at index i (it does not get remove)
            System.out.println( tmp );       //print it out
        }
        
        
        //remove the element at index 1
        strList.remove( 1 );
        System.out.println( strList );
        
        //add "Sacco" at index 1 
        strList.add( 1, "Sacco" );
        System.out.println( strList );
        
        //create a new list of Integers
        ArrayList<Integer> intList = new ArrayList<Integer>();
        
        //add 5,7, and 10 to it
        intList.add(5);
        intList.add(7);
        intList.add(10);
        
        //print out all the numbers
        System.out.println(intList);
        
        
        //loop through the list and get the sum
        int sum=0;  //create a variable to hold the sum
        for( int i=0; i<intList.size(); i++)
        {
            int tmp = intList.get(i);       //access the item at index i 
            
            sum = sum+tmp;                  //add it to the sum
        }
        System.out.println("The sum is "+sum);  //print out the sum after everything is complete.
    }

}