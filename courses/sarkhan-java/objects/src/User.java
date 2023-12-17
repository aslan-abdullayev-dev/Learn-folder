public class User {
    public String name;
    public String surname;
    public int age;
    public static String companyName;

    public static void foo() {
        System.out.println("user class static foo");
    }

    public void foo2() {
        System.out.println("user class non-static foo");
    }
}
