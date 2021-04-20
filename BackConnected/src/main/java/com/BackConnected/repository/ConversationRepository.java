package com.BackConnected.repository;

import com.BackConnected.model.Conversation;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ConversationRepository extends CrudRepository<Conversation, String> {
    Optional<Conversation> findBySenderIdAndRecipientId(String senderId, String recipientId);

}