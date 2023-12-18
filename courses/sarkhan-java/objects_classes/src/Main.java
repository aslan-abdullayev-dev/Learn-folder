public class Main {
    public static void main(String[] args) {
        System.out.println("user static string umumi = " + User.umumi);

        User u = new User();
        System.out.println("user non-static int age = " + u.age);
        u.age = 10;
        System.out.println("user non-static int age = " + u.age);
    }
}