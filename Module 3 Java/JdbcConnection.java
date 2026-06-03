import java.sql.*;

public class JdbcConnection {

    public static void main(String[] args) {
        try 
        {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/testdb",
                    "root",
                    "password"
            );
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM students");
            while (rs.next()) 
            {
                System.out.println(rs.getInt(1) + " " + rs.getString(2));
            }
            con.close();
        } 
        catch (Exception e) 
        {
            System.out.println(e);
        }
    }
}