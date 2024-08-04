package com.nickesqueda.laceybeesbookinventoryapi.config;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookTagSimpleResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookTag;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.Converter;
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

    // use a Converter to set book tags on the Book response DTO.
    Converter<List<BookTag>, List<BookTagSimpleResponseDto>> bookTagListConverter =
        context ->
            context.getSource().stream()
                .map(bookTag -> modelMapper.map(bookTag, BookTagSimpleResponseDto.class))
                .collect(Collectors.toList());
    modelMapper
        .createTypeMap(Book.class, BookResponseDto.class)
        .addMappings(
            mapper ->
                mapper
                    .using(bookTagListConverter)
                    .map(Book::getBookTags, BookResponseDto::setBookTags));

    return modelMapper;
  }
}
