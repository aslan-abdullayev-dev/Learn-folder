public class Main {
    public static void main(String[] args) {

        int i1 = 5;
        //* boxing happens under the hood. same as new Integer(5);

        Integer i2 = new Integer(5);
        //* explicitly asking java to create new value even if 5 already exists

        Integer i3 = new Integer(5);

        System.out.println(i1 == i2);
        //* false, unboxing happened

        System.out.println(i2 == i3);
        //* false, unboxing does not happen

        String s1 = "Salam";
        String s2 = new String("Salam");

        System.out.println(s1 == s2);

        //* --------------------------------------------------
        //* read about stringbuilder and stringbuffer
        String s3 = "Salam";
        s3 += " Necesen";
        s3 += ". Sagol yaxsiyam";

        //* every time we try to mutate s3 string it will cause new object to be created
        //* to prevent this behaviour and imporove efficeny in code we can use stringbuilder and stringbuffer
        //* both are doing the same thing - creating mutable strings, one is synchronized though
        //* --------------------------------------------------
    }
}
