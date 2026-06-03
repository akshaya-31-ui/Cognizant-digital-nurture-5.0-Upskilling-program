import java.io.*;
import java.net.*;

public class TcpServer {

    public static void main(String[] args) throws Exception {
        ServerSocket ss = new ServerSocket(5000);
        Socket s = ss.accept();
        BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
        String msg = in.readLine();
        System.out.println("Client: " + msg);
        ss.close();
    }
}