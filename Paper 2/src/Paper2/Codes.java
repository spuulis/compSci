package Paper2;

public class Codes {
    private String routeName; // e.g. New Amsterdam – Diamond City
    private String routeCode;

    public Codes(String a, String b) {
        this.routeName = a;
        this.routeCode = b;
    }

    public String getRouteCode() {
        return routeCode;
    }

    public String getRouteName() {
        return routeName;
    }
}
