public class Main {
    public static void main(String[] args) {
        System.out.println("user static string name = " + User.umumi);

        User u1 = new User();
        System.out.println("non static string name = " + u1.name);

        u1.name = "Aslan";
        System.out.println("non static string name = " + u1.name);
    }
}
