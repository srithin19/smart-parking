package com.smartparking.dto;

public class BookingRequest {
    private String userName;

    public BookingRequest() {}

    public BookingRequest(String userName) {
        this.userName = userName;
    }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
}
