import java.lang.*;
import java.util.*;
class TryCatch
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int a=sc.nextInt(),b=sc.nextInt();
        try{
           int res=a/b;
           System.out.println(res); 
        }
        catch(ArithmeticException e)
        {
            System.out.println("Error! can't divide with zero: " + e.getMessage());
        }
    }
}