package com.BackConnected.model;

import java.sql.Timestamp;
import java.util.Date;

public class ChatMessage {
    private String text;
    private String user;
    private Date timestamp;

    public ChatMessage(){

    }

    public ChatMessage(String text ,String user, Date timestamp) {
        this.text = text;
        this.user = user;
        this.timestamp = timestamp;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

}

