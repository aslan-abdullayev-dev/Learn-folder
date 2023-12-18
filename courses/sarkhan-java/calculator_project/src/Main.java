import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Birinci rəqəmi daxil edin");
        double num1 = sc.nextDouble();

        System.out.println("Ikinci rəqəmi daxil edin");
        double num2 = sc.nextDouble();

        System.out.println("Əməliyyat növünü daxil edin ( + - * / )");
        String operation = sc.next();

        switch (operation) {
            case "+" -> System.out.println(num1 + num2);
            case "-" -> System.out.println(num1 - num2);
            case "*" -> System.out.println(num1 * num2);
            case "/" -> System.out.println(num1 / num2);
        }
    }
}