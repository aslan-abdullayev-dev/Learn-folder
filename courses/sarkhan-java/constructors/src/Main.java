public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        System.out.println("age = " + s1.getAge());
        System.out.println("name = " + s1.getName());
        System.out.println("surname = " + s1.getSurname());

        System.out.println("===============================");

        Student s2 = new Student("Aslan", "Abdullayev", 29);
        System.out.println("age = " + s2.getAge());
        System.out.println("name = " + s2.getName());
        System.out.println("surname = " + s2.getSurname());
    }
}