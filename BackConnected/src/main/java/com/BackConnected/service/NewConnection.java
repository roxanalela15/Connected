package com.BackConnected.service;

import java.awt.Dimension;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;
import java.awt.GraphicsDevice;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import javax.swing.*;

public class NewConnection{

    ServerSocket socket = null;
    DataInputStream password = null;
    DataOutputStream verify = null;
    String width="";
    String height="";

    NewConnection(int port,String value1){
        Robot robot = null;
        Rectangle rectangle = null;
        try{
            System.out.println("Awaiting Connection from Client");
            socket=new ServerSocket(port);

            GraphicsEnvironment gEnv = GraphicsEnvironment.getLocalGraphicsEnvironment();
            GraphicsDevice gDev = gEnv.getDefaultScreenDevice();

            Dimension dim=Toolkit.getDefaultToolkit().getScreenSize();
            String width=""+dim.getWidth();
            String height=""+dim.getHeight();
            rectangle=new Rectangle(dim);
            robot=new Robot(gDev);

            drawGUI();

            while(true){
                Socket sc=socket.accept();
                password=new DataInputStream(sc.getInputStream());
                verify=new DataOutputStream(sc.getOutputStream());
                //String username=password.readUTF();
                String pssword=password.readUTF();

                if(pssword.equals(value1)){
                    verify.writeUTF("valid");
                    verify.writeUTF(width);
                    verify.writeUTF(height);
                    new ScreenShareService(sc,robot,rectangle);
                    new RemoteService(sc,robot);}
                else{
                    verify.writeUTF("Invalid");
                }
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
    }

    private void drawGUI(){
    }

}
