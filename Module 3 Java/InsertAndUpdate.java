import java.sql.*;
class StudentDAO {
    Connection con;
    StudentDAO() throws Exception 
    {
        con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/testdb",
                "root",
                "password"
        );
    }
    void insertStudent(int id, String name) throws Exception
    {
        PreparedStatement ps = con.prepareStatement(
                "INSERT INTO students VALUES (?, ?)"
        );
        ps.setInt(1, id);
        ps.setString(2, name);
        ps.executeUpdate();
    }
    void updateStudent(String name, int id) throws Exception 
    {
        PreparedStatement ps = con.prepareStatement(
                "UPDATE students SET name=? WHERE id=?"
        );
        ps.setString(1, name);
        ps.setInt(2, id);
        ps.executeUpdate();
    }
}
public class InsertAndUpdate
{
    public static void main(String[] args) throws Exception {

        StudentDAO dao = new StudentDAO();

        dao.insertStudent(1, "Akshaya");
        dao.updateStudent("Rahul", 1);
    }
}