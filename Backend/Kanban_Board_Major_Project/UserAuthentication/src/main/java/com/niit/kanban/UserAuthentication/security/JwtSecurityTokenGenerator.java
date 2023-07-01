package com.niit.kanban.UserAuthentication.security;

import com.niit.kanban.UserAuthentication.domain.User;

import java.util.Map;

public interface JwtSecurityTokenGenerator {
    Map<String, String> generateToken(User user);
}
