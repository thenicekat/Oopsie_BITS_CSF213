package com.oopsie.shoppingapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class OopsieServer {
	public static void main(String[] args) {
		SpringApplication.run(OopsieServer.class, args);
	}
}