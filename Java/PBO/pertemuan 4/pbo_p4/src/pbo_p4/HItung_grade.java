package pbo_p4;

import java.util.Scanner;

/**
 *
 * @author yan
 */
public class HItung_grade {

    public static void main(String[] args) {
        
        int nilai;
        String grade;
        Scanner scan = new Scanner(System.in);
   
       
        System.out.print("Inputkan nilai: ");
        nilai = scan.nextInt();
        // tentukan grade-nya
        if (nilai >= 90) {
            grade = "A";
        } else if (nilai >= 80) {
            grade = "B+";
        } else if (nilai >= 70) {
            grade = "B";
        } else if (nilai >= 60) {
            grade = "C+";
        } else if (nilai >= 50) {
            grade = "C";
        } else if (nilai >= 40) {
            grade = "D";
        } else {
            grade = "E";
        }
        // cetak hasilnya
        System.out.println("Grade: " + grade);
    }
}
