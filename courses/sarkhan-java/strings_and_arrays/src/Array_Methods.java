import java.util.Arrays;

public class Array_Methods {
    public static void runArrayMethods() {
        oneRowArray();
        multipleRowArray();
    }

    public static void oneRowArray() {
        int[] arr = {0, 0, 0, 0, 0}; //! ==> new int[5]
        arr[0] = 33;
        arr[1] = 12;

        for (int i = 0; i < arr.length; i++) {
            System.out.println(i + " index of arr = " + arr[i]);
        }
    }

    public static void multipleRowArray() {
        int[][] arr = new int[2][5]; //! ==> two first class children, each has five elements

        for (int i = 0; i < arr.length; i++) {
            int[] firstLevelItem = arr[i];
            for (int j = 0; j < firstLevelItem.length; j++) {
                firstLevelItem[j] = i * 10 + j;
                System.out.println(firstLevelItem[j]);
                System.out.println("firstLevelItem stringify = " + Arrays.toString(firstLevelItem));
            }
        }
    }
}
