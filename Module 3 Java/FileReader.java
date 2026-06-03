import java.io.*;
import java.lang.*;
class FileReader
{
    public static void main(String[] args) {
        try {
            BufferedReader br=new BufferedReader(new java.io.FileReader("output.txt"));
            String line;
            while((line=br.readLine())!=null)
            {
                System.out.println(line);
            }
            br.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}