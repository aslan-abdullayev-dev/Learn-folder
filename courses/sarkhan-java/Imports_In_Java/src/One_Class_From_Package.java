import p1.Print; //* importing Print Class from other package

public class One_Class_From_Package {
    public static void main(String[] args) {
        Print.printStatic();

        Print print1 = new Print();
        print1.print();
    }
}
