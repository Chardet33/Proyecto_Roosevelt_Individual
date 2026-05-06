package com.roosevelt.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.roosevelt.backend.service.CustomUserDetailsService;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // @Value("${app.cors.allowed-origins}")
    // private String allowedOrigins;

    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
        System.out.println("CustomUserDetailsService inyectado: " + (customUserDetailsService != null));
    }
    // cors para conectarme con api

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        // .allowedOrigins("http://localhost:3000")
                        //.allowedOrigins(allowedOrigins)
                        .allowedOriginPatterns("*")

                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true)
                                   
                        .allowedHeaders("*");          
            }
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http

                .cors(Customizer.withDefaults())

                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/h2-console/**", "/roosevelt/**", "/api/auth/**")
                        .disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/api-docs/**").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/roosevelt/**").permitAll() //
                        .requestMatchers("/api/usuarios/**").permitAll()
                        // .requestMatchers("/api/rutas/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/rutas").permitAll() // Ver todas las rutas es público
                        .requestMatchers(HttpMethod.GET, "/api/zonas/**").permitAll()
                        .requestMatchers("/api/zonas/**").hasRole("ADMIN")
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/mensajes/**").permitAll()
                        // Para "Rutas Favoritas" (AppRouter: /fav-routes)
                        .requestMatchers("/api/rutasfav/**").authenticated()

                        // Acciones que requieren estar logueado (Crear, Editar, Borrar)
                        .requestMatchers(HttpMethod.POST, "/api/rutas/**", "/api/comentarios/**", "/api/likes/**")
                        .authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/rutas/**", "/api/usuarios/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/rutas/**", "/api/likes/**").authenticated()

                        // RESTRICCIONES DE ADMIN
                        .requestMatchers("/api/usuarios/admins").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/usuarios/**").hasRole("ADMIN")

                        .requestMatchers("/h2-console/**").permitAll() // Acceso identificado a consola H2

                        .anyRequest().authenticated()
                // .anyRequest().permitAll()
                )

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Crea sesión solo si es necesario
                                                                                  // (por defecto)
                )
                .headers(headers -> headers
                        .frameOptions(frame -> frame
                                .sameOrigin() // Permite iframes del mismo origen (necesario para H2)
                        ))
                // Fin de Configuraciones adicionales para H2
                .formLogin(form -> form.disable() // desactivamos formulario login por defecto
                )
                .httpBasic(httpBasic -> Customizer
                        .withDefaults() // Autentificación simple
                )
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        }));
        // para logout

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authProvider(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) { // ← muy recomendable añadirlo aquí

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
