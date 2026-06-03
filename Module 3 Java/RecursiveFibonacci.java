import java.lang.*;
import java.util.*;
class RecursiveFibonacci
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int a=0,b=1;
        if(n==1)  System.out.println("0");
        else if(n==2)  System.out.println("1");
        else
           System.out.println(fibonacci(n-2,a,b));
    }
    public static int fibonacci(int n,int a,int b)
    {
        if(n==0)
          return b;
        int sum=a+b;
        a=b;
        b=sum;
        n--;
        return fibonacci(n, a, b);
    }
}