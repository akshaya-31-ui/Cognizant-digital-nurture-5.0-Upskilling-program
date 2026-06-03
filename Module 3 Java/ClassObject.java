import java.lang.*;
class ClassObject
{
    public static void main(String[] args) {
        Car c=new Car("Honda","Civic",2019);
        c.displayDetails();
    }
}
class Car 
{
    String make;
    String model;
    int year;
    public Car(String make,String model,int year) {
        this.make=make;
        this.model=model;
        this.year=year;
    }
    public void displayDetails()
    {
        System.out.println(make + " " + model + " " + year);
    }
}