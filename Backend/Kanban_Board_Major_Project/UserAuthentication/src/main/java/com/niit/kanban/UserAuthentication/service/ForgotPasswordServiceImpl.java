package com.niit.kanban.UserAuthentication.service;

import com.niit.kanban.UserAuthentication.domain.User;
import com.niit.kanban.UserAuthentication.exception.UserNotFoundException;
import com.niit.kanban.UserAuthentication.repository.UserRepository;
import com.niit.kanban.UserAuthentication.request.ForgotPasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Optional;
import java.util.Random;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ForgotPasswordServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Long generateOtp(String email) throws UserNotFoundException {
        if (Optional.ofNullable(userRepository.findByEmail(email)).isEmpty())
            throw new UserNotFoundException();
        Random random = new Random();
        return (long) (random.nextInt(900000) + 100000);
    }

    @Override
    public void saveOtp(String email, Long otp) throws UserNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty())
            throw new UserNotFoundException();
        User user = userOptional.get();
        user.setOtp(otp);
        user.setOtpExpirationTime(LocalTime.now().plusMinutes(5));
        userRepository.save(user);
    }

    @Override
    public User forgotPassword(ForgotPasswordRequest request) throws UserNotFoundException {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByOtpAndEmail(request.getOtp(), request.getEmail()));
        if (userOptional.isEmpty())
            throw new UserNotFoundException();
        User user = userOptional.get();
        user.setPassword(request.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setOtp(null);
        user.setOtpExpirationTime(null);
        return userRepository.save(user);
    }

    @Override
    public User getUserByOtp(Long otp) throws UserNotFoundException {
        return Optional.ofNullable(userRepository.findByOtp(otp)).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public String validateOtp(Long otp) throws UserNotFoundException {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByOtp(otp));
        if (userOptional.isEmpty())
            throw new UserNotFoundException();
        User user = userOptional.get();
        if (user.getOtpExpirationTime().isBefore(LocalTime.now())) {
            user.setOtp(null);
            throw new RuntimeException("Your OTP is expired. Create a new OTP if you ant to proceed.");
        }
        return "OTP Validated Successfully";
    }
}
