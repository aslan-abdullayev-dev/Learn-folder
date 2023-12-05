public class For_Loops {
    public static void basicLoop() {
        System.out.println("basic loop -------------------");
        for (int i = 0; i < 10; i++) {
            System.out.println("salam " + (i + 1));
            int i2 = i * 3;
            System.out.println(i2);
        }
        System.out.println("son");
        System.out.println("basic loop -------------------");
    }

    public static void printRectangle() {
        System.out.println("printRectangle -------------------");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 10; j++) {
                System.out.print("*");
            }
            System.out.println(" ");
        }
        System.out.println("printRectangle -------------------");
    }

    public static void printTriangle() {
        System.out.println("printTriangle -------------------");
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < i + 1; j++) {
                System.out.print("*");
            }
            System.out.println(" ");
        }
        System.out.println("printTriangle -------------------");
    }
}
