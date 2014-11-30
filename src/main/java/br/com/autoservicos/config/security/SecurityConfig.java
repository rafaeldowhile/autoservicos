package br.com.autoservicos.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.com.autoservicos.filter.UnauthorizedEntryPoint;

@Configuration
@EnableWebSecurity
@EnableWebMvcSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Override
    public void configure(WebSecurity web) throws Exception {
        web
            .ignoring()
                .antMatchers("/api/v1/authenticate")   // REST end-point for token creation
        .and()
            .ignoring()
                .antMatchers("/")   // the index page serves as root for the AngularJS app
        ;
    }
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf()
		.disable()
		.authorizeRequests()
		.antMatchers("/api/v1/authenticate")
		.permitAll()
		.and()
		.authorizeRequests()
		.antMatchers("/api/v1/*")
		.authenticated()
		.and()
		.addFilterBefore(authenticationTokenProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth)
			throws Exception {
		auth.userDetailsService(customUserDetailsService);
	}

	@Bean
	@Override
	public UserDetailsService userDetailsServiceBean() throws Exception {
		return super.userDetailsServiceBean();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public AuthenticationTokenProcessingFilter authenticationTokenProcessingFilter() {
		return new AuthenticationTokenProcessingFilter();
	}

	@Bean
	public UnauthorizedEntryPoint unauthorizedEntryPoint() {
		return new UnauthorizedEntryPoint();
	}
}
