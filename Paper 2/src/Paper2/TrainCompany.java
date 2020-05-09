package Paper2;

public class TrainCompany {
    private String companyName;
    private String companyCode; // Unused???
    private int numberOfJourneys;
    private Journey[] journeyHistory = new Journey[100000];
    public TrainCompany(String x, String y) {
        this.companyName = x;
        this.companyCode = y;
        this.numberOfJourneys = 0;
    }

    // accessor and mutator methods
    Journey getJourney(int x) {
        return journeyHistory[x];
    }

    public void addJourney(Journey j) {
        journeyHistory[numberOfJourneys] = j;
        numberOfJourneys++;
    }

    public double averageDelay() {
        double avgDelay = 0;
        int n = numberOfJourneys;
        for(int i = 0; i < numberOfJourneys; i++) {
            if(journeyHistory[i].getWeather()) {
                n--;
            }
            else {
                avgDelay += journeyHistory[i].getDelay();
            }
        }
        /*
            Manuprāt, ir diezgan mulsinoši, ka uzdevuma nosacījumos ir minēts:
            "You can assume that each TrainCompany object has at least one
            journey.", jo tas 'hintotu', ka nākamā pārbaude nav jāveic. Tomēr,
            tā jebkurā gadījumā jāveic, jo nosacījumos arī minēts, ka: "The
            method does not count delays caused by weather". Tātad pirmā
            piezīme ir nevajadzīga un tai nav efekta.
        */
        if(n > 0) {
            avgDelay /= n;
            return avgDelay;
        }
        return 0;
    }

    // returns the average delay for all of a company’s journeys
    public String longestDelay(Codes[] c) {
        String code = "";
        int longestDelay = -1;
        for(int i = 0; i < numberOfJourneys; i++) {
            if(!journeyHistory[i].getWeather() && journeyHistory[i].getDelay() > longestDelay) {
                code = journeyHistory[i].getCode();
                longestDelay = journeyHistory[i].getDelay();
            }
        }
        for(int i = 0; i < c.length; i++) {
            if(c[i].getRouteCode() == code) {
                return c[i].getRouteName();
            }
        }
        return "";
    }

    // returns the route name for the journey with the longest delay
    public String toString(Codes[] c) {
        return companyName + " : Average Delay = " + Math.floor(averageDelay() * 10) / 10 
                + " minutes : Longest Delay = " + longestDelay(c);
    }
}
