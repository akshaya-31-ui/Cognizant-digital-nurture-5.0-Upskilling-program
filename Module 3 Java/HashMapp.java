import java.util.*;
class HashMapp
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        HashMap<Integer,String> hm=new HashMap<>();
        while(true) 
        { 
           System.out.println("Enter student id and name (or '-1' to finish): ");
           int id=sc.nextInt();
           sc.nextLine();
           if(id==-1)
                break;
           String name=sc.nextLine();
           hm.put(id,name);   
        }
        for(int key:hm.keySet())
        {
            System.out.println(key + " " + hm.get(key));
        }
    }
}