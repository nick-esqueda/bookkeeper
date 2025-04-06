package com.nickesqueda.bookkeeperapi.service.impl;

import com.nickesqueda.bookkeeperapi.dto.StatsDto;
import com.nickesqueda.bookkeeperapi.model.Stats;
import com.nickesqueda.bookkeeperapi.repository.StatsRepository;
import com.nickesqueda.bookkeeperapi.service.StatsService;
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
