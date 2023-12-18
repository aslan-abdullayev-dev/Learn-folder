public class User {
    private String name;
    private String surname;
    private int age;
    private static String companyName;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public static String getCompanyName() {
        return companyName;
    }

    public static void setCompanyName(String companyName) {
        User.companyName = companyName;
    }

    public static void foo() {
        System.out.println("user class static foo");
    }

    public void foo2() {
        System.out.println("user class non-static foo");
    }
}
