public class Main {
    public static void main(String[] args) {
        User.setCompanyName("BSP Tech");
        User.foo();

        User u = new User();
        u.foo2();
        u.setName("Aslan");

        changeName(u, "Cavidan");
        System.out.println("User u name property after changeName = " + u.getName());
    }

    public static void changeName(User userObj, String newName) {
        userObj.setName(newName);
    }
}