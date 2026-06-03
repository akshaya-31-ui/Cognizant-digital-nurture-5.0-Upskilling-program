import java.lang.*;
import java.util.*;
class ArraySum
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("enter no.of elements:");
        int n=sc.nextInt();
        int[] arr=new int[n];
        int sum=0;
        for(int i=0;i<n;i++)
        {
            arr[i]=sc.nextInt();
            sum+=arr[i];
        }
        System.out.println("Sum: " + sum);
        System.err.println("Avg: "+ (sum/n));
    }
}