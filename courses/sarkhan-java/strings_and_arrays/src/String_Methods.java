public class String_Methods {
    public static void runStringMethods() {
        String str = "Salam";

        System.out.println("lastChar = " + str.charAt(str.length() - 1));

        System.out.println("mySubstring = " + str.substring(2, 3));

        System.out.println("contains lam = " + str.contains("lam"));

        System.out.println("startsWith Sa = " + str.startsWith("Sa"));

        System.out.println("endsWith lam = " + str.endsWith("lam"));

        System.out.println("equals ignore case  salam = " + str.equalsIgnoreCase("salam"));

        System.out.println("uppercase str = " + str.toUpperCase());

        System.out.println("lowercase str = " + str.toLowerCase());

        System.out.println("index of lam = " + str.indexOf("lam")); //! returns -1 if not found

        System.out.println("last index of a = " + str.lastIndexOf("a")); //! returns -1 if not found

        System.out.println("replace a with '' = " + str.replace("a", ""));
    }
}
