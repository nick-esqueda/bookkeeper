package com.nickesqueda.laceybeesbookinventoryapi.testconfig;

import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestConfig {
  // ENABLE THIS TO RESET ALL MIGRATIONS (ROLL BACK AND RE-DO)
  @Bean
  public FlywayMigrationStrategy clean() {
    return flyway -> {
      flyway.clean();
      flyway.migrate();
    };
  }
}
