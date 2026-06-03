import java.util.*;
class LambdaExp
{
    public static void main(String[] args) {
        List<String> al = new ArrayList<>();
        al.add("Rahul");
        al.add("Akshaya");
        al.add("Priya");
        Collections.sort(al, (a, b) -> a.compareTo(b));

        System.out.println(al);
    }
}