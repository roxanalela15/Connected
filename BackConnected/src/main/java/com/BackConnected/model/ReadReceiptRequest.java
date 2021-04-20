package com.BackConnected.model;

public class ReadReceiptRequest {

    private String channel;
    private String email;

    public ReadReceiptRequest() {
        super();
    }
    public String getChannel() {
        return channel;
    }
    public void setChannel(String channel) {
        this.channel = channel;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }


}