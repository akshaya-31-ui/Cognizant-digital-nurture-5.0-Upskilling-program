import java.lang.*;
import java.util.*;
class NumberGuessingGame
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        java.util.Random rand=new java.util.Random();
        int ran=rand.nextInt(100)+1;
        int guess=-1;
        while(guess!=ran)
        {
            guess=sc.nextInt();
            if(guess<1 || guess>100)
                System.out.println("enter a number betwwem 1-100");
            else if(guess>ran)
                System.out.println("Your number is greater then secret number");
            else if(guess<ran)
                System.out.println("Your number is less then secret number");
            else 
               System.out.println("correct!the secret key was " + ran);
        }
    }
}