package com.nickesqueda.laceybeesbookinventoryapi.service.impl;

import com.nickesqueda.laceybeesbookinventoryapi.dto.StatsDto;
import com.nickesqueda.laceybeesbookinventoryapi.model.Stats;
import com.nickesqueda.laceybeesbookinventoryapi.repository.StatsRepository;
import com.nickesqueda.laceybeesbookinventoryapi.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl implements StatsService {

  private final StatsRepository statsRepository;
  private final ModelMapper modelMapper;

  @Override
  public StatsDto getStats() {
    Stats stats = statsRepository.getStats();
    return modelMapper.map(stats, StatsDto.class);
  }
}
