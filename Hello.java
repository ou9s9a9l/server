import java.util.*;
public class InputTest{
public static void main(String[] args){
Scanner in = new Scanner(System.in); 
System.out.println("Please input a float number:");
float a = in.nextFloat(); 
System.out.println("Please input a string: "); 
Scanner str = new Scanner(System.in);
System.out.println("The string is :" + str.next());
System.out.println("The float number is: " + a);
for(int i = 0;i < 4;i++){
System.out.println("Please input a int number: "); 
int b = in.nextInt();
System.out.println("The int number is: " + b);
}
}
}