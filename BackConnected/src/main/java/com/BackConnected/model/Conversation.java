package com.BackConnected.model;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="conversation")
public class Conversation {
    @Id
    private String id;
    private String conversationId;
    private String senderId;
    private String recipientId;

        public Conversation(String conversationId, String senderId, String recipientId) {
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.recipientId = recipientId;
    }
    public void setId(String id) { this.id = id; }
    public String getId() {
        return id;
    }
    public String getConversationId() {
        return conversationId;
    }
    public void setConversationId(String conversationId) { this.conversationId = conversationId; }
    public String getSenderId() {
        return senderId;
    }
    public void setSenderId(String senderId) { this.senderId = senderId; }

    public String getRecipientId() {
        return recipientId;
    }
    public void setRecipientId(String recipientId) { this.recipientId = recipientId; }


}