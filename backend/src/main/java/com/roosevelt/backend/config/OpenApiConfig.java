package com.roosevelt.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    
    // http://localhost:8080/apirestmergesec
    // http://localhost:8080/apirestmergesec/swagger-ui.html
    // http://localhost:8080/apirestmergesec/api-docs
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de usuarios")
                        .version("1.0.0")
                        .description("API REST para gestión de usuarios")
                        .contact(new Contact()
                                .name("Balmis")
                                .email("admin@balmis.com")
                                .url("https://www.bamis.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html"))
                        .termsOfService("https://www.balmis.com/terminos"));
        

    }
}
