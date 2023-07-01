package com.niit.kanban.KanbanService.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.security.Key;

public class JWTFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
//        expecting token to come from header
        final String authHeader = request.getHeader("Authorization");
//        if the request method is options the request can pass through and validation of token is not required
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
//        If token is not coming than set the response status as UNAUTHORIZED
        } else if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            throw new ServletException("Missing or Invalid Token");
        }
//        extract token from the header
        String jwtToken = authHeader.substring(7);  //Bearer => 6+1 = 7, since token begins with Bearer
//        token validation
        try {
//        extract the claims
            Claims claims = Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(jwtToken).getBody();
//        set the claims in the request attribute and pass it to the next handler
            request.setAttribute("claims", claims);
//       pass the claims in the request
            filterChain.doFilter(request, response);  //some more filters , controller
        } catch (JwtException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token Mismatch");
        }
    }

    private Key getSignKey() {
        final String secretKeyString = "DoNotShareSuperSecretKeyWithAnyone";
        final byte[] secretKeyBytes = secretKeyString.getBytes();
        return Keys.hmacShaKeyFor(secretKeyBytes);
    }
}