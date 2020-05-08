package Paper2;

public class Journey {
    private String routeCode;
    private int delay;
    private boolean weatherRelated;

    public Journey(String routeCode, int delay, boolean weatherRelated) {
        this.routeCode = routeCode;
        this.delay = delay;
        this.weatherRelated = weatherRelated;
    }

    public int getDelay() {
        return delay;
    }

    public boolean getWeather() {
        return weatherRelated;
    }

    public String getCode() {
        return routeCode;
    }
}
