package com.nickesqueda.laceybeesbookinventoryapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableAspectJAutoProxy
public class LaceyBeesBookInventoryApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(LaceyBeesBookInventoryApiApplication.class, args);
	}

}
