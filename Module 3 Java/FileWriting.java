import java.io.FileWriter;
import java.io.IOException;
import java.lang.*;
import java.util.*;
class FileWriting
{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        String s=sc.nextLine();
        try{
            FileWriter file=new FileWriter("output.txt");
            file.write(s);
            file.close();
            System.out.println("Successfully wrote the file");
        } 
        catch (IOException e) 
        {
            System.out.println("error found");
            e.printStackTrace();
        }
    }
}