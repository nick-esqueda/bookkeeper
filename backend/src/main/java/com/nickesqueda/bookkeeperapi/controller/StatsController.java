package com.nickesqueda.bookkeeperapi.controller;

import com.nickesqueda.bookkeeperapi.dto.StatsDto;
import com.nickesqueda.bookkeeperapi.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class StatsController {

  private final StatsService statsService;

  @GetMapping("/stats")
  public StatsDto getStats() {
    return statsService.getStats();
  }
}
