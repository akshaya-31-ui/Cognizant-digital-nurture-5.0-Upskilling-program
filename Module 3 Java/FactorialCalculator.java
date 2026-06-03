import java.lang.*;
import java.util.*;
class FactorialCalculator
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        long res=1;
        if(n<0)  System.err.println("Enter +ve number");
        if(n>0)
        {
            for(int i=n;i>1;i--)
            {
                res*=i;
            }
            System.out.println("Factorial of Number is " + res);
        }
    }
}