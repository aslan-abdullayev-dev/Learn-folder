public class Main {
    public static void main(String[] args) {

        int i1 = 5;
        //* boxing happens under the hood. same as new Integer(5);

        Integer i2 = new Integer(5);
        //* explicitly asking java to create new value even if 5 already exists

        Integer i3 = new Integer(5);


        System.out.println(i1 == i2);
        //* true, unboxing happened

        System.out.println(i2 == i3);
        //* false, unboxing does not happen
    }
}