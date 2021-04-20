package com.BackConnected;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages={
		"com.BackConnected.repository", "com.BackConnected.configuration","com.BackConnected.controller","com.BackConnected.model","com.BackConnected.service"})
public class BackConnectedApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackConnectedApplication.class, args);
	}

}
