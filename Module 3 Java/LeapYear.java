import java.lang.*;
import java.util.*;
class LeapYear
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if((n%4==0 || n%400==0) && n%100!=0)
            System.err.println(n + " is leap year");
        else
            System.err.println(n + " is not leap year");
    }
}