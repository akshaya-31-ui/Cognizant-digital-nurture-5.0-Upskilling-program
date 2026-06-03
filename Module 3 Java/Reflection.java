import java.lang.reflect.Method;
class TestClass 
{
    public void hello() 
    {
        System.out.println("Hello Reflection");
    }
}

public class Reflection 
{
    public static void main(String[] args) throws Exception 
    {
        Class<?> obj = Class.forName("TestClass");
        Object instance = obj.getDeclaredConstructor().newInstance();
        Method[] methods = obj.getDeclaredMethods();
        for (Method m : methods) 
        {
            System.out.println("Method: " + m.getName());
        }
        Method method = obj.getDeclaredMethod("hello");
        method.invoke(instance);
    }
}