package com.BackConnected.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ConversationNotification {
    @Id
    private String id;
    private String senderId;
    private String senderName;

    public ConversationNotification(String id, String senderId, String senderName) {
        this.id=id;
        this.senderId=senderId;
        this.senderName=senderName;
    }

    public void setId(String id) { this.id = id; }
    public String getId() {
        return id;
    }
    public void setSenderId(String senderId) { this.senderId = senderId; }
    public String getSenderId() {
        return senderId;
    }
    public void setSenderName(String senderName) { this.senderName = senderName; }
    public String getSenderName() {
        return senderName;
    }
}
