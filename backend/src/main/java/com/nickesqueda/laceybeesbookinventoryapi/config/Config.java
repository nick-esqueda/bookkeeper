package com.nickesqueda.laceybeesbookinventoryapi.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
  @Bean
  public ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();
    // use STRICT matching strategy, so only properties with exact name matches are mapped.
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    return modelMapper;
  }
}
