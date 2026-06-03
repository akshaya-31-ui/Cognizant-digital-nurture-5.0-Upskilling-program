import java.lang.*;
class MethodOverloading
{
    public static void main(String[] args) {
        int n1=add(2,3);
        double n2=add(2.4,5.7);
        int n3=add(2,5,7);
        System.out.println(n1 + " " + n2 + " " + n3);
    }
    public static int add(int a,int b)
    {
        return a+b;
    }
    public static double add(double a,double b)
    {
        return a+b;
    }
    public static int add(int a,int b,int c)
    {
        return a+b+c;
    }
}