import java.util.*;
class ArrayLisst
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        ArrayList<String> al=new ArrayList<>();
        while(true)
        {
            System.out.println("Enter student name(or 'stop' to finish): ");
            String s=sc.nextLine();
            if(s.equalsIgnoreCase("stop")) break;
            al.add(s);
        }
        System.out.println(al);
    }
}