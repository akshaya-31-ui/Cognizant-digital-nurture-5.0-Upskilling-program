import java.lang.*;
import java.util.*;
class GradeCalculator
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int marks=sc.nextInt();
        if(marks>=90)
           System.err.println("A");
        else if(marks>=80)
           System.err.println("B");
        else if(marks>=70)
           System.err.println("C");
        else if(marks>=60)
          System.err.println("D");
        else 
           System.out.println("F");
    }
}