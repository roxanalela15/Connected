package com.BackConnected.model;

public class ReadReceiptRequest {

    private String channel;
    private String emails;
    private String emailr;

    public ReadReceiptRequest() {
        super();
    }
    public String getChannel() {
        return channel;
    }
    public void setChannel(String channel) {
        this.channel = channel;
    }
    public String getEmailS() {
        return emails;
    }
    public void setEmailS(String email) {
        this.emails = email;
    }
    public String getEmailR() {
        return emailr;
    }
    public void setEmailR(String email) {
        this.emailr = email;
    }


}