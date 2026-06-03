import java.lang.*;
import java.util.*;
class PalindromCheck
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter String:");
        String s=sc.nextLine().trim();
        String sb=s.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
        int left=0,right=sb.length()-1;
        boolean pal=true;
        while(left<right)
        {
            if(sb.charAt(left)!=sb.charAt(right))
            {
                pal=false;
                break;
            }
            left++;
            right--;
        }
        if(pal)  System.out.println(s + "is palindrome");
        else   System.out.println(s + "is not palindrome");
    }
}