package br.com.autoservicos.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import br.com.autoservicos.config.security.SecurityConfig;

//public class LocatoolsWebApplicationInitializer implements WebApplicationInitializer {
public class LocatoolsWebApplicationInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] {ApplicationConfig.class, PersistenceConfig.class, SecurityConfig.class};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] {WebMvcConfig.class};
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] {"/api/v1/*"};
	}
	
	@Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);
    }
 
//    @Override
//    public void onStartup(ServletContext servletContext) throws ServletException {
//        AnnotationConfigWebApplicationContext webApplicationContext = new AnnotationConfigWebApplicationContext();
//        webApplicationContext.register(ApplicationConfig.class, WebMvcConfig.class, PersistenceConfig.class, SecurityConfig.class);
//        servletContext.addListener(new ContextLoaderListener(webApplicationContext));
//        servletContext.addFilter("springSecurityFilterChain", new DelegatingFilterProxy("springSecurityFilterChain")).addMappingForUrlPatterns(null, true, "/api/v1/*");
//        servletContext.addFilter("teste", AuthenticationTokenProcessingFilter.class).addMappingForServletNames(EnumSet.of(DispatcherType.REQUEST), true, "dispatcherServlet");
//        Dynamic dynamc = servletContext.addServlet("dispatcherServlet", new DispatcherServlet(webApplicationContext));
//        dynamc.setLoadOnStartup(1);
//        dynamc.addMapping("/api/v1/*");
//    }
    
}
 