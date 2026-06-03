import java.lang.*;
import java.util.*;
class InvalidAgeException extends Exception
{
    public InvalidAgeException(String e)
    {
        super(e);
    }
}
class CustomException
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int age=sc.nextInt();
        try {
            checkAge(age);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }
static void checkAge(int age) throws InvalidAgeException
   {
      if(age<18)
        throw new InvalidAgeException("Age must be 18");
        else System.out.println("you are eligible");
   }
}