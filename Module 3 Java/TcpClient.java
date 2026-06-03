import java.io.*;
import java.net.*;
public class TcpClient 
{
    public static void main(String[] args) throws Exception {
        Socket s = new Socket("localhost", 5000);
        PrintWriter out = new PrintWriter(s.getOutputStream(), true);
        System.out.println("Hello Server");
        s.close();
    }
}