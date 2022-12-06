package com.oopsie.shoppingapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@RestController
public class OopsieServer {
	public static void main(String[] args) {
		try {
			SendEmail.sendmail("divyateja2004@gmail.com", "App was successfully deployed");
		} catch (Exception e) {
			e.printStackTrace();
		}
		SpringApplication.run(OopsieServer.class, args);
	}
}
