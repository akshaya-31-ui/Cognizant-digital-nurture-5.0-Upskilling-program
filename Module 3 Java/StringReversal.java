import java.lang.*;
import java.util.*;
class StringReversal
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.err.println("Enter String:");
        String s=sc.next().trim();
        StringBuilder rev_s=new StringBuilder();
        for(int i=s.length()-1;i>=0;i--)
        {
            rev_s.append(s.charAt(i));
        }
        System.err.println(rev_s);
    }
}