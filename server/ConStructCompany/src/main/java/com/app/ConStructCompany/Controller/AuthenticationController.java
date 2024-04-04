package com.app.ConStructCompany.Controller;

import com.app.ConStructCompany.Request.LoginRequest;
import com.app.ConStructCompany.Request.RegisterRequest;
import com.app.ConStructCompany.Response.RegisterResponse;
import com.app.ConStructCompany.Service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/login")
    public ResponseEntity<?> loginInto(@RequestBody LoginRequest loginRequest, HttpServletResponse httpServletResponse){
        try{
            //thuc hien login
            String token = authenticationService.LoginAccount(loginRequest);
            //add cookie
            Cookie cookie =new Cookie("jwt",token);
            cookie.setDomain("localhost");
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(-1);
            httpServletResponse.addCookie(cookie);
            return ResponseEntity.ok(token);
        }catch (UsernameNotFoundException | BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerInto(@RequestBody RegisterRequest registerRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            // Handle validation errors
            List<String> errors = new ArrayList<>();
            bindingResult.getFieldErrors().forEach(error -> errors.add(error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        RegisterResponse registerResponse = authenticationService.RegisterAccount(registerRequest);
        if (!registerResponse.isStatus()){
            return ResponseEntity.badRequest().body(registerResponse.getMess());
        }
        return ResponseEntity.ok(registerResponse.getMess());
    }
}
