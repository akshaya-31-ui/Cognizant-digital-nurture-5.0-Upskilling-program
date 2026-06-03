import java.util.*;

class SimpleCalculator
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int a=sc.nextInt();
        int b=sc.nextInt();
        System.out.println("enter operator(+,-,*,/):");
        char operator=sc.next().charAt(0);
        switch(operator) {
            case '+':System.out.println(a+b);
                   break;
            case '-':System.out.println(a-b);
                    break;
            case '*':System.out.println(a*b);
                    break;
            case '/':System.out.println(a/b);
                    break;
            default:System.out.println("Invalid operator");
        }
    }
}