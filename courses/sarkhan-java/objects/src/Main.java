public class Main {
    public static void main(String[] args) {
        User.companyName = "BSP Tech";
        User.foo();

        User u = new User();
        u.foo2();
        u.name = "Aslan";

        changeName(u, "Cavidan");
        System.out.println("User u name property after changeName = " + u.name);
    }

    public static void changeName(User userObj, String newName) {
        userObj.name = newName;
    }
}