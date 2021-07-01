package com.BackConnected;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages={
		"com.BackConnected.repository", "com.BackConnected.configuration","com.BackConnected.controller","com.BackConnected.model","com.BackConnected.service"})
@EnableJpaRepositories("com.BackConnected.repository")
public class BackConnectedApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackConnectedApplication.class, args);
	}

}
