public class SportsTeam
{
    private String teamName;
    private String teamMascot;
    private int seasonWins;
    private int seasonLosses;
    private int seasonTies;
    
    public SportsTeam(String tmpName)
    {
        teamName = tmpName;
        teamMascot = "No Mascots";
    }
    
    public void setTeamName(String tmpName)
    {
        teamName = tmpName;
    }
    
    public void setMascot(String tmpMascot)
    {
        teamMascot = tmpMascot;
    }
    
    public String getTeamName()
    {
        return teamName;
    }
    
    public String getTeamMascot()
    {
        return teamMascot;
    }
    
    public void winOne()
    {
        seasonWins = seasonWins + 1;
    }
    
    public void loseOne()
    {
        seasonLosses = seasonLosses + 1;
    }
    
    public void tieOne()
    {
        seasonTies = seasonTies + 1;
    }
    
    public int getWins()
    {
        return seasonWins;
    }
    
    public int getLosses()
    {
        return seasonLosses;
    }
    
    public int getTies()
    {
        return seasonTies;
    }
    
    public String toString()
    {
        String str = "The " + teamName + " " + teamMascot + " record is " + seasonWins+"-"+seasonLosses+"-"+seasonTies;
        return str;
    }
}