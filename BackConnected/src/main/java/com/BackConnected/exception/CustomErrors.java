package com.BackConnected.exception;

import com.BackConnected.model.User;

public class CustomErrors extends User {

    private String error;

    public CustomErrors(String err) {
        error = err;
    }

    public String getError() {
        return error;
    }
}
