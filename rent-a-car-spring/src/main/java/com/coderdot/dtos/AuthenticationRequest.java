package com.coderdot.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class AuthenticationRequest {

    private String email;
    private String password;
}
