package pt2.belajarjava;

import java.util.Scanner;

/**
 *
 * @author Andrian Maulana Dzikwan
 */
public class Pt2BelajarJava {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        int val1 = 56;
        double val2 = 0.543;
        boolean val3 = true;
        char val4 = 'A';
        String val5 = "Universitas Teknologi Bandung";
        int[] var6 = {4,7,3,8,1};

        System.out.println(val1);
        System.out.println(val2);
        System.out.println(val3);
        System.out.println(val4);
        System.out.println(val5);
        
        for(int i : var6){
            System.out.print(i+"");
        }

    }

}
