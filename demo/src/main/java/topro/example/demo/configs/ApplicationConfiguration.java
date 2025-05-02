package topro.example.demo.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import topro.example.demo.repository.UserRepository;

@Configuration
// we use this class to configure the authentication manager and the authentication provider 
//for the reason that we need to inject the AdminRepository into the userDetailsService
public class ApplicationConfiguration {
    private final UserRepository adminRepository;
    public ApplicationConfiguration(UserRepository AdminRepository) {// we inject the AdminRepository
        this.adminRepository = AdminRepository;
    }

    @Bean
    // we create a userDetailsService bean that returns a lambda function
    UserDetailsService userDetailsService() { 
        return username -> adminRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    // we create a passwordEncoder bean that returns a new BCryptPasswordEncoder
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {// we create an authenticationManager bean that returns the authentication manager from the AuthenticationConfiguration
        return config.getAuthenticationManager();
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

   
}
