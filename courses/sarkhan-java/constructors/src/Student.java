public class Student {
    private String name;
    private String surname;
    private int age;

    public Student() {
        super();
        //* Last constructor calls super(). It is not possible to access object properties before that.
        System.out.println("Student() triggered");
        this.name = "undefined";
        this.surname = "undefined";
        this.age = -1;
    }

    public Student(String name, String surname, int age) {
        super();
        //* Last constructor calls super(). It is not possible to access object properties before that.
        System.out.println("Student(String name, String surname, int age) triggered");
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

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
}
