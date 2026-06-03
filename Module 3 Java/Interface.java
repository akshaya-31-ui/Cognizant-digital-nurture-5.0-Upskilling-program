import java.lang.*;
interface Playable
{
    void play();
}
class Interface
{
    public static void main(String[] args) {
        Guitar g=new Guitar();
        Piano p=new Piano();
        g.play();
        p.play();
    }
}
class Guitar implements Playable
{
    public void play()
    {
        System.out.println("used for music generation");
    }
}
class Piano implements Playable
{
    public void play()
    {
        System.out.println("can generate new tune");
    }
}