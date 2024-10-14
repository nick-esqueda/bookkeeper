package com.nickesqueda.laceybeesbookinventoryapi.dto;

import lombok.Data;

@Data
public class StatsDto {
  int totalBookCount;
  int readBookCount;
  int unreadBookCount;
  int didNotFinishBookCount;
  int authorCount;
  int totalBookCategoryCount;
  int totalBookTagCount;
}
