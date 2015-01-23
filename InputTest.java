import java.util.Scanner;

class Test
{
    public static void main(String[] args)
    {
        Scanner reader = new Scanner(System.in);
        int input = -1;

        while(input != 0)
        {
            System.out.println("=======================");
            System.out.println("What is Your Age? Enter 0 to exit;");
            input = reader.nextInt();
            System.out.println("You've entered " + input + "\n\n");
        }
    }
}