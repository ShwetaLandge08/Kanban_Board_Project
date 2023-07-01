package com.niit.kanban.UserAuthentication.security;

import com.niit.kanban.UserAuthentication.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtSecurityTokenGeneratorImpl implements JwtSecurityTokenGenerator {
    @Override
    public Map<String, String> generateToken(User user) {
        Map<String, String> claims = new HashMap<>();
        return createToken(claims, user);
    }

    private Map<String, String> createToken(Map<String, String> claims, User user) {
        claims.put("email", user.getEmail());
        claims.put("name", user.getName());
        claims.put("message", "User successfully logged in");
        String jwtToken = Jwts.builder().setClaims(claims).setSubject(user.getEmail()).setIssuedAt(new Date()).signWith(getSignKey()).compact();
        claims.put("token", jwtToken);
        return claims;
    }

    private Key getSignKey() {
        final String secretKeyString = "DoNotShareSuperSecretKeyWithAnyone";
        final byte[] secretKeyBytes = secretKeyString.getBytes();
        return Keys.hmacShaKeyFor(secretKeyBytes);
    }
}