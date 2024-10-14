package com.nickesqueda.laceybeesbookinventoryapi.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

public class StatsIntegrationTest extends BaseIntegrationTest {

  @Test
  void getStats_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(statsUri))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.totalBookCount").value(8))
        .andExpect(jsonPath("$.totalBookCategoryCount").value(4))
        .andExpect(jsonPath("$.totalBookTagCount").value(3))
        .andExpect(jsonPath("$.readBookCount").value(3))
        .andExpect(jsonPath("$.unreadBookCount").value(3))
        .andExpect(jsonPath("$.didNotFinishBookCount").value(2))
        .andExpect(jsonPath("$.authorCount").value(8));
  }
}
