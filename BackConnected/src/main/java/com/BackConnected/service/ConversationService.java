package com.BackConnected.service;

import com.BackConnected.model.Conversation;
import com.BackConnected.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConversationService {

    @Autowired
    ConversationRepository conversationRepository;

    public Optional<String> getConversationId(
            String senderId, String recipientId, boolean createIfNotExist) {

        return conversationRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .map(Conversation::getConversationId)
                .or(() -> {
                    if(!createIfNotExist) {
                        return  Optional.empty();
                    }
                    var conversationId =
                            String.format("%s_%s", senderId, recipientId);

                    Conversation senderRecipient = new Conversation(conversationId,senderId,recipientId);

                    Conversation recipientSender = new Conversation(conversationId,recipientId,senderId);

                    conversationRepository.save(senderRecipient);
                    conversationRepository.save(recipientSender);

                    return Optional.of(conversationId);
                });
    }
}
