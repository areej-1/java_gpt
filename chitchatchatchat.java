import java.io.*;
import java.util.Scanner;

public class chitchatchatchat { 
    public static void main(String[] args) { 
        Scanner scanner = new Scanner(System.in);

        String input = "";
        int wordCount = 0;
        String conversationHistory = "";
        System.out.println("Type \"stop\" at any time to end the conversation.");
        System.out.println("AI: Hello! How can I help you today?");
        while(true) {

            input = scanner.nextLine();
            wordCount += input.split("\\s+").length;  // Add the number of words in the input
            if (input.equals("stop") || wordCount >= 4000) {
                System.out.println("AI: Thanks for chatting with me today!");
                break;
            }
 
            // Add the user's input to the conversation history
            conversationHistory += "Human: " + input + "\n";

            try {
                ProcessBuilder pb = new ProcessBuilder("/usr/local/bin/node", "/Users/areej/openai-quickstart-node/pages/api/generate1.js", input, conversationHistory);
                Process p = pb.start();

                BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
                BufferedReader errorReader = new BufferedReader(new InputStreamReader(p.getErrorStream()));

                String line;
                while ((line = reader.readLine()) != null) {
                    // Add the AI's response to the conversation history and print it
                    conversationHistory += line + "\n";
                    System.out.println(line);
                }
                while ((line = errorReader.readLine()) != null) {
                	wordCount += line.split("\\s+").length;  // Add the number of words in the response
                    System.err.println(line);
                }

                int exitCode = p.waitFor();
                if (exitCode != 0) {
                    System.err.println("Error occurred while calling the script-please try again in a moment.");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            conversationHistory = summarizeConvo(conversationHistory);
            System.out.println(conversationHistory);
            
            /*try {
                Thread.sleep(5000);  // 5 seconds delay
            } catch (InterruptedException e) {
                e.printStackTrace();
            }*/
        }
        scanner.close();
    }
    public static String summarizeConvo(String convoHis) {
    	String sumVer = "";
    	 try {
             ProcessBuilder pb = new ProcessBuilder("/usr/local/bin/node", "/Users/areej/openai-quickstart-node/pages/api/summarize.js", convoHis);
             Process p = pb.start();

             BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
             String line;
             while ((line = reader.readLine()) != null) {
                 sumVer += line + "\n";
             }

             int exitCode = p.waitFor();
             if (exitCode != 0) {
                 System.err.println("Error occurred while calling the script-please try again in a moment.");
             }
         } catch (Exception e) {
             e.printStackTrace();
         }
    	return sumVer;
    }
}
