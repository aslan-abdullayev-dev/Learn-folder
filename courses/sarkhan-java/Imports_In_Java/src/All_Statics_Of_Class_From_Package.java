import static p1.Print.*; //* importing all the static properties of the print class

public class All_Statics_Of_Class_From_Package {
    public static void main(String[] args) {
        printStatic();
        // Don`t have access to Print class, only static properties of Print
        // Need to import Print class separately
    }
}
