import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        //        printEvenNumbers();
        //        printPrimeNumbers();
        //        printSumOfDigits();
        //        prntNumOfDigits();
        //        printFactorialOfNumber();
        //        isPalyndrome();
        //        numIsPalyndrome();
    }

    public static void printEvenNumbers() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number to get even numbers: ");
        int userInput = (int) sc.nextDouble();
        for (int i = 1; i <= userInput; i++) {
            if (i % 2 == 0) {
                System.out.println(i + " is even number");
            }
        }
    }

    public static void printPrimeNumbers() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number to get prime numbers: ");
        int userInput = (int) sc.nextDouble();
        for (int divider = 2; divider <= userInput; divider++) {
            if (userInput % divider == 0 && userInput != divider) {
                System.out.println("divider = " + divider);
                System.out.println(userInput + " is not a prime number");
                return;
            }
        }
        System.out.println(userInput + " is a prime number");
    }

    public static void printSumOfDigits() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number to get sum of digits: ");
        int userInput = (int) sc.nextDouble();
        int userInputCopy = userInput;
        int sumOfDigits = 0;
        while (userInputCopy >= 1) {
            sumOfDigits += userInputCopy % 10;
            userInputCopy = userInputCopy / 10;
        }
        System.out.println("sum of digits of \"" + userInput + "\" is " + sumOfDigits);
    }

    public static void prntNumOfDigits() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number to get number of digits");
        int userInput = (int) sc.nextDouble();
        int userInputCopy = userInput;
        int numOfDigits = 0;
        while (userInputCopy >= 1) {
            userInputCopy /= 10;
            numOfDigits++;
        }
        System.out.println(userInput + " has " + numOfDigits + " digits");
    }

    public static void printFactorialOfNumber() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a number to get its factorial");
        int userInput = (int) sc.nextDouble();
        int userInputCopy = userInput;
        int factorialResult = 1;
        while (userInputCopy >= 1) {
            factorialResult *= userInputCopy;
            userInputCopy--;
        }
        System.out.println("factorial of " + userInput + " is " + factorialResult);
    }

    public static void isPalyndrome() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a string to check it is a palyndrome");
        String userInput = sc.next();
        boolean strLengthIsEven = userInput.length() % 2 == 0;
        boolean isPalyndromeResult = true;
        for (int i = 0; i < userInput.length(); i++) {
            if (!strLengthIsEven && i == (int) ((float) userInput.length() / 2 - 0.5)) {
                //* don`t check char right in the middle of odd lengthed string
                break;
            }
            if (userInput.charAt(i) != userInput.charAt(userInput.length() - 1 - i)) {
                isPalyndromeResult = false;
                break;
            }
        }
        System.out.println(userInput + " is " + (isPalyndromeResult ? "" : "not ") + "palyndrome");
    }

    public static void numIsPalyndrome() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a numbre to check it is a palyndrome");
        int userInput = (int) sc.nextDouble();
        int userInputCopy = userInput;
        int reversedUserInput = 0;
        while (userInputCopy >= 1) {
            reversedUserInput = (reversedUserInput * 10) + (userInputCopy % 10);
            userInputCopy /= 10;
        }
        System.out.println("user input is " + (userInput == reversedUserInput ? "" : "not ") + "palyndrome");
    }

    public static void printThis(int a, char b, boolean c) {

    }
}