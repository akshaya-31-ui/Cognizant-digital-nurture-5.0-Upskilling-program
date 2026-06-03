import java.lang.*;
class PatternMatchingForSwitch
{
    public static void main(String[] args) {
        checkType(100);
        checkType("Akshaya");
        checkType(3.4);
    }
    public static void checkType(Object ob)
    {
        switch(ob)
        {
            case Integer i->System.out.println("Integer: " + i);
            case String s->System.out.println("String: " + s);
            case Double d->System.out.println("Double: " + d);
            default->System.out.println("Unknown Type");
        }
    }
}