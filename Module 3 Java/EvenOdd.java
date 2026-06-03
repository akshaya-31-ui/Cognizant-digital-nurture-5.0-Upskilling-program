import java.lang.*;
import java.util.*;
class EvenOdd
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if(n%2==0)  System.out.println("Number is even");
        else  System.err.println("Number is Odd");
    }
}